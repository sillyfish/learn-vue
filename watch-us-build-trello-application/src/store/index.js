import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from '../default-board'
import { saveStorePlugin, uuid } from '../utils'

Vue.use(Vuex)

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default new Vuex.Store({
  plugins: [saveStorePlugin],
  state: {
    board,
  },
  mutations: {
    INIT(state, board) {
      state = board
    },
    CREATE_TASK(state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: '',
      })
    },
    CREATE_COLUMN(state, name) {
      state.board.columns.push({
        name,
        tasks: [],
      })
    },
    UPDATE_TASK(state, { task, key, value }) {
      task[key] = value
      // Vue.set(task, key, value)
    },
    MOVE_TASK(state, { fromTasks, toTasks, fromTaskIndex, toTaskIndex }) {
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0]
      // toTasks.push(taskToMove)
      toTasks.splice(toTaskIndex, 0, taskToMove)
    },
    MOVE_COLUMN(state, { fromColumnIndex, toColumnIndex }) {
      const { columns } = state.board
      const fromColumn = columns.splice(fromColumnIndex, 1)[0]
      columns.splice(toColumnIndex, 0, fromColumn)
    },
  },
  actions: {
    init({ commit }) {
      commit('INIT', board)
    },
  },
  modules: {},
  getters: {
    getTask(state) {
      return id => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task
            }
          }
        }
      }
    },
  },
})
