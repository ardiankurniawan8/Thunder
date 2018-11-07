export const state = () => ({
  me: null,
  token: null,
  org: null,
  last_active: null,
  authorizations: null
})

export const mutations = {

  SET_ME (state, user) {
    state.me = user

    // Set authorizations
    // if (state.me && state.me.authorizations !== undefined) {
    //   state.me.authorizations.forEach(function (item) {
    //     if (item.service === 'dashboard') {
    //       state.authorizations = item.scopes
    //     }
    //   })
    // }
  },

  SET_ACCESS_TOKEN (state, token) {
    state.token = token
  },

  SET_ORG (state, org) {
    state.org = org || null
  },

  TOUCH (state) {
    state.last_active = new Date()
  }
}

export const actions = {
  login (store, {user, token}) {
    store.commit('SET_ME', user)
    store.commit('SET_ACCESS_TOKEN', token)
    store.commit('TOUCH')
  },
  logout (store) {
    store.commit('SET_ME', null)
    store.commit('SET_ACCESS_TOKEN', null)
    store.commit('SET_ORG', null)
  },
  set_org (store, org) {
    store.commit('SET_ORG', org)
  },
  update_token (store, {user, token}) {
    store.commit('SET_ME', user)
    store.commit('SET_ACCESS_TOKEN', token)
    store.commit('TOUCH')
  },
  touch (store) {
    store.commit('TOUCH')
  }
}
