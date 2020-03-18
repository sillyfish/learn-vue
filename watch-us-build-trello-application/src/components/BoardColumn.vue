<template>
  <div
    class="column"
    @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
    draggable="true"
    @dragstart.self="pickupColumn($event, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
  >
    <div class="flex item-center mb-2 font-bold">
      {{ column.name }}
    </div>
    <div class="list-rest">
      <ColumnTask
        v-for="(task, $taskIndex) of column.tasks"
        :key="$taskIndex"
        :board="board"
        :column="column"
        :task="task"
        :taskIndex="$taskIndex"
        :column-index="columnIndex"
      />
      <input
        type="text"
        class="block p-2 w-full bg-transparent"
        placeholder="+ Enter new task"
        @keyup.enter="createTask($event, column)"
      />
    </div>
  </div>
</template>
<script>
import ColumnTask from './ColumnTask'
import MoveTaskOrColumnMixin from '../mixins/MoveTaskOrColumnMixin'

export default {
  name: 'BoardColumn',
  components: { ColumnTask },
  mixins: [MoveTaskOrColumnMixin],
  methods: {
    createTask(event, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: event.target.value,
      })
      event.target.value = ''
    },
    pickupColumn(event, fromColumnIndex) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'

      event.dataTransfer.setData('from-column-index', fromColumnIndex)
      event.dataTransfer.setData('type', 'column')
    },
  },
}
</script>
<style lang="css">
.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
