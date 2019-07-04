import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.code) {
    return true
    // return roles.includes(route.meta.code)
  } else {
    return true
  }
}

function addCodeRoutes(route, url) {
  if (route && typeof route === 'object' && route.length > 0) {
    route.forEach(tim => {
      if (tim.meta && typeof tim.meta === 'object') {
        if (url) {
          tim.meta.code = url + '/' + tim.path
        } else {
          tim.meta.code = tim.path
        }
        if (tim.children && tim.children.length > 0) {
          addCodeRoutes(tim.children, tim.meta.code)
        }
      }
    })
  }
  return route
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, route)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(async resolve => {
      let accessedRoutes
      if (roles.includes('adfmifvn')) {
        accessedRoutes = asyncRoutes || []
      } else {
        const arr = await addCodeRoutes(asyncRoutes)
        accessedRoutes = await filterAsyncRoutes(arr, roles)
      }
      await commit('SET_ROUTES', accessedRoutes)
      await resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
