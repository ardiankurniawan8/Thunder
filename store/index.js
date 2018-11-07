import createPersistedState from 'vuex-persistedstate'
import * as Cookie from 'js-cookie'

export const plugins = [
  createPersistedState({
    storage: {
      getItem: (key) => Cookie.get(key),
      setItem: (key, state) => Cookie.set(key, state, {expires: 1, secure: false}),
      removeItem: key => Cookie.remove(key)
    }
  })
]

export const state = () => ({
})

export const mutations = {
}

export const actions = {
}
