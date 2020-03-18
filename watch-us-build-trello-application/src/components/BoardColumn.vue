<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      class="column"
      :transferData="{
        type: 'column',
        fromColumnIndex: columnIndex,
      }"
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
    </AppDrag>
  </AppDrop>
</template>
<script>
import ColumnTask from './ColumnTask'
import MoveTaskOrColumnMixin from '../mixins/MoveTaskOrColumnMixin'
import AppDrag from './AppDrag'
import AppDrop from './AppDrop'

export default {
  name: 'BoardColumn',
  components: { AppDrop, AppDrag, ColumnTask },
  mixins: [MoveTaskOrColumnMixin],
  methods: {
    createTask(event, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks: this.column.tasks,
        name: event.target.value,
      })
      event.target.value = ''
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
