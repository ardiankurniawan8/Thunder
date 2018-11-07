export default function ({store}) {
  store.commit('ui/INC_FLASH_COUNTER')
  if (store.state.ui.flash_counter >= 1) {
    store.dispatch('ui/clearAlert')
  }
}
