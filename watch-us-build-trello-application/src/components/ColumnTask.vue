<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      class="task"
      @click.native="goToTask(task.id)"
      :transferData="{
        type: 'task',
        fromTaskIndex: taskIndex,
        fromColumnIndex: columnIndex,
      }"
    >
      <span class="v-full flex-no-shrink font-bold">
        {{ task.name }}
      </span>
      <p v-if="task.description" class="w-full flex-no-shrink mt-1 text-sm">
        {{ task.description }}
      </p>
    </AppDrag>
  </AppDrop>
</template>
<script>
import MoveTaskOrColumnMixin from '../mixins/MoveTaskOrColumnMixin'
import AppDrag from './AppDrag'
import AppDrop from './AppDrop'

export default {
  name: 'ColumnTask',
  components: { AppDrop, AppDrag },
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
      this.$router.push({ name: 'task', params: { id } })
    },
  },
}
</script>
<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}
</style>
