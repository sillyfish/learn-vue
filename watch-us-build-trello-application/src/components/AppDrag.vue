<template>
  <div
    draggable="true"
    @dragover.prevent
    @dragenter.prevent
    @dragstart.self="onDrag"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AppDrag',
  props: {
    transferData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onDrag(event) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'

      event.dataTransfer.setData('payload', JSON.stringify(this.transferData))
    },
  },
}
</script>

<style scoped></style>
