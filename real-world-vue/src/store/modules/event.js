import EventService from '@/services/EventService'

export const namespaced = false

export const state = {
  todos: [
    { id: 1, text: '...', done: true },
    { id: 2, text: '...', done: false },
    { id: 3, text: '...', done: true },
    { id: 4, text: '...', done: false },
  ],
  events: [],
  totalCount: 0,
  event: {},
  perPage: 3,
}
export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_TOTAL_COUNT(state, count) {
    state.totalCount = count
  },
  SET_EVENT(state, event) {
    state.event = event
  },
}
export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        const notification = {
          type: 'success',
          message: `Add event success`,
        }
        dispatch('notification/add', notification)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: `There comes an error: ${error.message}`,
        }
        dispatch('notification/add', notification)
        throw error
      })
  },
  fetchEvents({ commit, dispatch, state }, /* { perPage, */ page /* } */) {
    return (
      EventService.getEvents(state.perPage, page)
        // axios
        // .get('http://localhost:3000/events')
        .then(response => {
          const totalCount = response.headers['x-total-count']
          console.log(`Total events are ${totalCount}`)
          commit('SET_TOTAL_COUNT', totalCount)
          commit('SET_EVENTS', response.data)
        })
        .catch(error => {
          // console.log(`This is an error: ${error.response}`)
          const notification = {
            type: 'error',
            message: `There comes an error: ${error.message}`,
          }
          dispatch('notification/add', notification)
        })
    )
  },
  fetchEvent({ commit, dispatch, getters }, id) {
    const event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
      return event
    }
    return EventService.getEvent(id).then(response => {
      // this.event = response.data
      commit('SET_EVENT', response.data)
      return response.data
    })
    /*
      .catch(error => {
        // console.log(`This is an error: ${error.response}`)
        const notification = {
          type: 'error',
          message: `There comes an error: ${error.message}`,
        }
        dispatch('notification/add', notification)
      })
*/
  },
}
export const getters = {
  catLength: state => state.categories.length,
  doneTodos: state => state.todos.filter(todo => todo.done),
  activeTodosCount: (state, getters) =>
    state.todos.length - getters.doneTodos.length,
  getEventById: state => id => state.events.find(event => event.id === id),
}
