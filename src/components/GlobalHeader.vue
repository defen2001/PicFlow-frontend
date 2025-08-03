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
          :items="visibleMenuItems"
          @click="handleMenuSelect"
          class="nav-menu"
        >
        </a-menu>
      </a-col>
      <!-- 右侧：用户信息 -->
      <a-col flex="200px">
        <template class="header-right">
          <!--          <a-input-search placeholder="搜索" class="search-input" style="max-width: 180px" />-->
          <div class="user-login">
            <div v-if="loginUserStore.loginUser.id">
              <a-dropdown>
                <ASpace>
                  <a-avatar :src="loginUserStore.loginUser.userAvatar" />
                  {{ loginUserStore.loginUser.userName ?? '无名' }}
                </ASpace>
                <template #overlay>
                  <a-menu>
                    <a-menu-item @click="doLogout">
                      <LogoutOutlined />
                      退出登录
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
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
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import { message } from 'ant-design-vue'
import { logoutUsingPost } from '@/api/userController.ts'

const router = useRouter()

const loginUserStore = useLoginUserStore()
loginUserStore.fetchLoginUser()

// 原始菜单配置
const originMenuItems = [
  {
    key: '/',
    label: '主页',
    title: '主页',
    show: true, // 所有用户可见
  },
  {
    key: '/add_picture',
    label: '创建图片',
    title: '创建图片',
  },
  {
    key: '/admin/userManage',
    label: '用户管理',
    title: '用户管理',
    requiredRole: 'admin', // 需要管理员权限
  },
  {
    key: '/admin/pictureManage',
    label: '图片管理',
    title: '图片管理',
  },
  {
    key: '/about',
    label: '联系我们',
    title: '联系我们',
    // 不配置权限则默认显示
  },
]

// 动态过滤后的菜单
const visibleMenuItems = computed(() => {
  return originMenuItems.filter((item) => {
    // 如果有show属性直接返回
    if (item.show !== undefined) return item.show
    // 检查角色权限
    if (item.requiredRole) {
      return loginUserStore.loginUser.userRole === item.requiredRole
    }
    return true
  })
})

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

// 用户注销
const doLogout = async () => {
  const res = await logoutUsingPost()
  console.log(res)
  if (res.data.code === 0) {
    loginUserStore.setLoginUser({
      userName: '未登录',
    })
    message.success('退出登录成功')
    await router.push('/')
  } else {
    message.error('退出登录失败，' + res.data.message)
  }
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
  margin-right: 20px;
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
