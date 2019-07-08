import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    meta: {
      title: '首页',
      icon: 'lock',
      code: '/index',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/bascon',
    component: Layout,
    redirect: '/bascon/mech',
    name: 'Permission',
    meta: {
      title: '基础配置',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'mech',
        component: () => import('@/views/bascon'),
        name: 'PagePermission',
        redirect: '/bascon/mech/mechList',
        meta: {
          title: '机构列表',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        },
        children: [
          {
            path: 'mechList',
            component: () => import('@/views/bascon/mech'),
            name: 'PagePermissio2n',
            meta: {
              title: '机构列表',
              roles: ['admin', 'editor'] // or you can only set roles in sub nav
            }
          }
        ]
      },
      {
        path: 'staff',
        component: () => import('@/views/bascon'),
        name: 'PagePermiss2ion',
        redirect: '/bascon/staff/staList',
        meta: {
          title: '员工列表',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        },
        children: [
          {
            path: 'staList',
            component: () => import('@/views/bascon/staff'),
            name: 'PagePe43rmissio2n',
            meta: {
              title: '员工列表',
              roles: ['admin', 'editor'] // or you can only set roles in sub nav
            }
          }
        ]
      }
    ]
  },
  {
    path: '/juris',
    component: Layout,
    redirect: '/juris/func',
    name: 'juris',
    meta: {
      title: '权限配置',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'func',
        component: () => import('@/views/percon'),
        name: 'func',
        redirect: '/juris/func/funcList',
        meta: {
          title: '功能列表',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        },
        children: [
          {
            path: 'funcList',
            component: () => import('@/views/percon/func'),
            name: 'funcList',
            meta: {
              title: '功能列表',
              roles: ['admin', 'editor'] // or you can only set roles in sub nav
            }
          }
        ]
      },
      {
        path: 'menu',
        component: () => import('@/views/percon'),
        name: 'menu',
        redirect: '/juris/menu/menuList',
        meta: {
          title: '菜单列表',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        },
        children: [
          {
            path: 'menuList',
            component: () => import('@/views/percon/menu'),
            name: 'menuList',
            meta: {
              title: '菜单列表',
              roles: ['admin', 'editor'] // or you can only set roles in sub nav
            }
          }
        ]
      },
      {
        path: 'role',
        component: () => import('@/views/percon'),
        name: 'role',
        redirect: '/juris/role/roleList',
        meta: {
          title: '角色列表',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        },
        children: [
          {
            path: 'roleList',
            component: () => import('@/views/percon/role'),
            name: 'roleList',
            meta: {
              title: '角色列表',
              roles: ['admin', 'editor'] // or you can only set roles in sub nav
            }
          }
        ]
      }
    ]
  },
  {
    path: '/chatCom',
    component: Layout,
    redirect: '/chatCom/fica',
    name: 'chatCom',
    meta: {
      title: '互动社区',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'fica',
        component: () => import('@/views/chatCom'),
        name: 'fica',
        redirect: '/chatCom/fica/ficaList',
        meta: {
          title: '分类管理',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        },
        children: [
          {
            path: 'ficaList',
            component: () => import('@/views/chatCom/fica'),
            name: 'ficaList',
            meta: {
              title: '分类管理',
              roles: ['admin', 'editor'] // or you can only set roles in sub nav
            }
          }
        ]
      },
      {
        path: 'topic',
        component: () => import('@/views/chatCom'),
        name: 'topic',
        redirect: '/chatCom/topic/topicList',
        meta: {
          title: '话题管理',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        },
        children: [
          {
            path: 'topicList',
            component: () => import('@/views/chatCom/topic'),
            name: 'topicList',
            meta: {
              title: '话题管理',
              roles: ['admin', 'editor'] // or you can only set roles in sub nav
            }
          }
        ]
      },
      {
        path: 'postman',
        component: () => import('@/views/chatCom'),
        name: 'postman',
        redirect: '/chatCom/postman/postmanList',
        meta: {
          title: '帖子管理',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        },
        children: [
          {
            path: 'postmanList',
            component: () => import('@/views/chatCom/postman'),
            name: 'postmanList',
            meta: {
              title: '帖子管理',
              roles: ['admin', 'editor'] // or you can only set roles in sub nav
            }
          }
        ]
      }
    ]
  },
  {
    path: '/traffic',
    component: Layout,
    redirect: '/traffic/askft',
    name: 'traffic',
    meta: {
      title: '路况管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'askft',
        component: () => import('@/views/traffic'),
        name: 'askft',
        redirect: '/traffic/askft/trafficList',
        meta: {
          title: '测试',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        },
        children: [
          {
            path: 'trafficList',
            component: () => import('@/views/traffic/test'),
            name: 'trafficList',
            meta: {
              title: '测试',
              roles: ['admin', 'editor'] // or you can only set roles in sub nav
            }
          }
        ]
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
