<template>
  <div
    class="task"
    draggable="true"
    @dragstart="pickupTask($event, taskIndex, columnIndex)"
    @click="goToTask(task.id)"
    @drop.stop="moveTaskOrColumn($event, column.tasks, columnIndex, taskIndex)"
    @dragover.prevent
    @dragenter.prevent
  >
    <span class="v-full flex-no-shrink font-bold">
      {{ task.name }}
    </span>
    <p v-if="task.description" class="w-full flex-no-shrink mt-1 text-sm">
      {{ task.description }}
    </p>
  </div>
</template>
<script>
import MoveTaskOrColumnMixin from '../mixins/MoveTaskOrColumnMixin'

export default {
  name: 'ColumnTask',
  mixins: [MoveTaskOrColumnMixin],
  props: {
    task: {
      type: Object,
      required: true,
    },
    taskIndex: {
      type: Number,
      required: true,
    },
  },
  methods: {
    goToTask(id) {
      this.$router.push({ name: 'task', params: { id: id } })
    },
    pickupTask(event, taskIndex, fromColumnIndex) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'

      event.dataTransfer.setData('from-task-index', taskIndex)
      event.dataTransfer.setData('from-column-index', fromColumnIndex)
      event.dataTransfer.setData('type', 'task')
    },
  },
}
</script>
<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}
</style>
