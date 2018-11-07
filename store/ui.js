export const state = () => ({
  alerts: {
    error: [],
    success: [],
    info: [],
    warning: []
  },
  flash_counter: 0,
  page: {
    title: null
  }
})

export const mutations = {
  SET_ALERT (state, message) {
    state.alerts.error = []
    state.alerts.success = []
    state.alerts.warning = []
    state.alerts.info = []

    if (message.error) {
      if (Array.isArray(message.error) && message.error.length > 0) {
        message.error.forEach(function (val) {
          state.alerts.error.push(val)
        })
      } else {
        state.alerts.error.push(message.error)
      }
    }

    if (message.success) {
      if (Array.isArray(message.success) && message.success.length > 0) {
        message.success.forEach(function (val) {
          state.alerts.success.push(val)
        })
      } else {
        state.alerts.success.push(message.success)
      }
    }

    if (message.info) {
      if (Array.isArray(message.info) && message.info.length > 0) {
        message.info.forEach(function (val) {
          state.alerts.info.push(val)
        })
      } else {
        state.alerts.info.push(message.info)
      }
    }

    if (message.warning) {
      if (Array.isArray(message.warning) && message.warning.length > 0) {
        message.warning.forEach(function (val) {
          state.alerts.warning.push(val)
        })
      } else {
        state.alerts.warning.push(message.warning)
      }
    }

    state.flash_counter = 0
  },
  INC_FLASH_COUNTER (state) {
    state.flash_counter++
  },
  SET_PAGE (state, page) {
    state.page = page
  }
}

export const actions = {
  alert (store, message) {
    store.commit('SET_ALERT', message)
  },
  clearAlert (store, message) {
    store.commit('SET_ALERT', {})
  },
  setPage (store, page) {
    store.commit('SET_PAGE', page)
  }
}
