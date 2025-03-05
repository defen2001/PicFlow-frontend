<template>
  <div id="globalHeader">
    <a-row :wrap="false">
      <a-col flex="150px">
        <!-- 左侧：logo 和网站名称 -->
        <router-link to="/">
          <div class="logo-section">
            <img src="@/assets/logo.svg" alt="Logo" class="logo" />
            <span class="site-name">网站名称</span>
          </div>
        </router-link>
      </a-col>
      <!-- 中间：导航栏 -->
      <a-col flex="auto">
        <a-menu
          mode="horizontal"
          :selectedKeys="activeMenu"
          @click="handleMenuSelect"
          class="nav-menu"
        >
          <a-menu-item key="/">首页</a-menu-item>
          <a-menu-item key="/about">关于我们</a-menu-item>
          <a-menu-item key="/contact">联系我们</a-menu-item>
        </a-menu>
      </a-col>
      <!-- 右侧：用户信息 -->
      <a-col flex="200px">
        <template class="header-right">
          <a-input-search placeholder="搜索" class="search-input" style="max-width: 180px" />
          <div class="user-login">
            <div v-if="loginUserStore.loginUser.id" class="user-name">
              {{ loginUserStore.loginUser.userName ?? '无名' }}
            </div>
            <div v-else>
              <a-button type="primary" href="/user/login">登录</a-button>
            </div>
          </div>
        </template>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'

const router = useRouter()

const loginUserStore = useLoginUserStore()
loginUserStore.fetchLoginUser()

// 当前激活的菜单项
const activeMenu = ref<string[]>([])

// 点击菜单项时，更新激活项并通过 router.push 进行路由跳转
const handleMenuSelect = ({ key }: { key: string }) => {
  // activeMenu.value = key;
  router.push({
    path: key,
  })
  // router.push(`/${key}`);
}

// 路由切换后更新选中菜单
router.afterEach((to, from) => {
  activeMenu.value = [to.path]
})
</script>

<style scoped>
#globalHeader {
  background: #fff;
  box-shadow: 0 2px 8px #f0f1f2;
}

/* 左侧区域 */
.logo-section {
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
  margin-right: 10px;
}

.site-name {
  font-size: 20px;
  font-weight: bold;
  color: black;
}

/* 导航栏 */
.nav-menu {
  line-height: 64px;
}

/* 右侧区域 */
.header-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* 避免内容溢出 */
  overflow: hidden;
}

.search-input {
  /* 当空间不足时自动隐藏搜索框 */
  flex-shrink: 1;
}

.user-login {
  margin-left: 10px;
  /* 确保文本不会溢出 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.user-name {
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
