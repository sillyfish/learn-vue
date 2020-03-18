<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <BoardColumn
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        :board="board"
        :column="column"
        :columnIndex="$columnIndex"
      />
      <div class="column flex">
        <input
          type="text"
          v-model="columnName"
          class="p-2 mr-2 flex-grow"
          placeholder="New Colunm Name"
          @keyup.enter="createColumn"
        />
      </div>
      <div class="task-bg" v-if="isTaskOpen" @click.self="close">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BoardColumn from '../components/BoardColumn'

export default {
  components: { BoardColumn },
  data() {
    return {
      columnName: '',
    }
  },
  computed: {
    ...mapState(['board']),
    isTaskOpen() {
      return this.$route.name === 'task'
    },
  },
  methods: {
    close() {
      this.$router.push({ name: 'board' })
    },
    createColumn() {
      this.$store.commit('CREATE_COLUMN', this.columnName)
    },
  },
  created() {
    this.$store.dispatch('init')
  },
}
</script>

<style lang="css">
.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}

.board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
}

.task-bg {
  @apply pin absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>
