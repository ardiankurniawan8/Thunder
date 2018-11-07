export default function (ctx) {
  let now = new Date()
  if (!ctx.store.state.authentication.last_active) {
    let timeDiff = Math.abs(now.getTime() - ctx.store.state.authentication.last_active.getTime())
    if (timeDiff > (1000 * 60 * 30)) {
      ctx.store.dispatch('authentication/logout')
    } else {
      ctx.store.dispatch('authentication/touch')
    }
  } else {
    if (!ctx.store.state.authentication.me) {
      ctx.store.dispatch('authentication/logout')
    }
  }
}
