export const namespaced = true

export const state = {
  notifications: [],
}

let nextId = 1

export const mutations = {
  ADD(state, notification) {
    state.notifications.push({
      ...notification,
      id: nextId++,
    })
  },
  REMOVE(state, notificationToRemove) {
    state.notifications = state.notifications.filter(
      notification => notificationToRemove.id !== notification.id
    )
  },
}

export const actions = {
  add({ commit }, notification) {
    commit('ADD', notification)
  },
  remove({ commit }, notificationToRemove) {
    commit('REMOVE', notificationToRemove)
  },
}
