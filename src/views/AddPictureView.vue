<template>
  <div id="addPictureView">
    <h2 style="margin-bottom: 16px">
      {{ route.query?.id ? '修改图片' : '创建图片' }}
    </h2>
    <a-typography-paragraph v-if="spaceId" type="secondary">
      保存至空间：<a :href="`/space/${spaceId}`" target="_blank">{{ spaceId }}</a>
    </a-typography-paragraph>
    <!-- 选择上传方式 -->
    <a-tabs v-model:active-key="uploadType">
      <a-tab-pane key="file" tab="文件上传">
        <!-- 图片上传插件 -->
        <PictureUpload :picture="picture" :spaceId="spaceId" :onSuccess="onSuccess" />
      </a-tab-pane>
      <a-tab-pane key="url" tab="URL 上传">
        <!-- Url 图片信息表单 -->
        <UrlPictureUpload :picture="picture" :spaceId="spaceId" :onSuccess="onSuccess" />
      </a-tab-pane>
    </a-tabs>
    <!--  图片编辑区域 -->
    <div v-if="picture" class="edit-bar">
      <a-space size="middle">
        <a-button :icon="h(EditOutlined)" @click="doEditPicture">编辑图片</a-button>
        <a-button type="primary" ghost :icon="h(FullscreenOutlined)" @click="doImagePainting">
          AI 扩图
        </a-button>
      </a-space>
      <ImageOutPainting
        ref="imageOutPaintingRef"
        :picture="picture"
        :spaceId="spaceId"
        :onSuccess="onImageOutPaintingSuccess"
      />
      <ImageCropper
        ref="imageCropperRef"
        :imageUrl="picture?.url"
        :picture="picture"
        :spaceId="spaceId"
        :space="space"
        :onSuccess="onCropSuccess"
      />
    </div>
    <!-- 图片信息表单 -->
    <a-form v-if="picture" layout="vertical" :model="pictureForm" @finish="handleSubmit">
      <a-form-item label="名称" name="name">
        <a-input v-model:value="pictureForm.name" placeholder="请输入名称" />
      </a-form-item>
      <a-form-item label="简介" name="introduction">
        <a-textarea
          v-model:value="pictureForm.introduction"
          placeholder="请输入简介"
          :rows="2"
          autoSize
          allowClear
        />
      </a-form-item>
      <a-form-item label="分类" name="category">
        <a-auto-complete
          v-model:value="pictureForm.category"
          :options="categoryOptions"
          placeholder="请输入分类"
          allowClear
        />
      </a-form-item>
      <a-form-item label="标签" name="tags">
        <a-select
          v-model:value="pictureForm.tags"
          mode="tags"
          :options="tagOptions"
          placeholder="请输入标签"
          allowClear
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import PictureUpload from '@/components/PictureUpload.vue'
import { computed, h, onMounted, reactive, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  editPictureUsingPost,
  getPictureVoByIdUsingGet,
  listPictureTagCategoryUsingGet,
} from '@/api/pictureController.ts'
import { message } from 'ant-design-vue'
import UrlPictureUpload from '@/components/UrlPictureUpload.vue'
import { EditOutlined, FullscreenOutlined } from '@ant-design/icons-vue'
import ImageCropper from '@/components/ImageCropper.vue'
import ImageOutPainting from '@/components/ImageOutPainting.vue'
import { getSpaceVoByIdUsingGet } from '@/api/spaceController.ts'

const picture = ref<API.PictureVo>()
const onSuccess = (newPicture: API.PictureVo) => {
  picture.value = newPicture
  pictureForm.name = newPicture.name
}

const pictureForm = reactive<API.PictureEditRequest>({})

const route = useRoute()
const router = useRouter()
// 上传类型
const uploadType = ref<'file' | 'url'>('file')

// 空间 id
const spaceId = computed(() => {
  return route.query?.spaceId
})

const space = ref<API.SpaceVo>()

// 获取空间信息
const fetchSpace = async () => {
  // 获取数据
  if (spaceId.value) {
    const res = await getSpaceVoByIdUsingGet({
      id: spaceId.value,
    })
    if (res.data.code === 0 && res.data.data) {
      space.value = res.data.data
    }
  }
}

watchEffect(() => {
  fetchSpace()
})

/**
 * 提交表单
 * @param values
 */
const handleSubmit = async (values: any) => {
  const pictureId = picture.value?.id
  if (!pictureId) {
    return
  }
  const res = await editPictureUsingPost({
    id: pictureId,
    spaceId: spaceId.value,
    ...values,
  })
  if (res.data.code === 0 && res.data.data) {
    message.success('提交成功')
    // 跳转到图片详情页
    router.push({
      path: `/picture/${pictureId}`,
    })
  } else {
    message.error('提交失败，' + res.data.message)
  }
}

const categoryOptions = ref<string[]>([])
const tagOptions = ref<string[]>([])

// 获取标签和分类选项
const getTagCategoryOptions = async () => {
  const res = await listPictureTagCategoryUsingGet()
  if (res.data.code === 0 && res.data.data) {
    // 转换成下拉选项组件接受的格式
    tagOptions.value = (res.data.data.tagList ?? []).map((data: string) => {
      return {
        value: data,
        label: data,
      }
    })
    categoryOptions.value = (res.data.data.categoryList ?? []).map((data: string) => {
      return {
        value: data,
        label: data,
      }
    })
  } else {
    message.error('加载选项失败，' + res.data.message)
  }
}

onMounted(() => {
  getTagCategoryOptions()
})

// 获取老数据
const getOldPicture = async () => {
  // 获取数据
  const id = route.query?.id
  if (id) {
    const res = await getPictureVoByIdUsingGet({
      id: id,
    })
    if (res.data.code === 0 && res.data.data) {
      const data = res.data.data
      picture.value = data
      pictureForm.name = data.name
      pictureForm.introduction = data.introduction
      pictureForm.category = data.category
      pictureForm.tags = data.tags
    }
  }
}

onMounted(() => {
  getOldPicture()
})

// --- 编辑图片 ---
// 图片编辑弹窗引用
const imageCropperRef = ref()

// 编辑图片
const doEditPicture = () => {
  if (imageCropperRef.value) {
    imageCropperRef.value.openModal()
  }
}

// 编辑成功事件
const onCropSuccess = (newPicture: API.PictureVo) => {
  picture.value = newPicture
}

// --- AI 扩图 ----
// AI 扩图弹窗引用
const imageOutPaintingRef = ref()

// AI 扩图
const doImagePainting = () => {
  if (imageOutPaintingRef.value) {
    imageOutPaintingRef.value.openModal()
  }
}

// 编辑成功事件
const onImageOutPaintingSuccess = (newPicture: API.PictureVo) => {
  picture.value = newPicture
}

</script>
<style scoped>
#addPictureView {
  max-width: 720px;
  margin: 0 auto;
}

#addPictureView .edit-bar {
  text-align: center;
  margin: 16px 0;
}
</style>
