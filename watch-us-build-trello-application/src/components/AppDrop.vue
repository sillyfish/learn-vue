<template>
  <div @drop.stop="onDrop($event)" @dragover.prevent @dragenter.prevent>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AppDrop',
  methods: {
    onDrop(event) {
      console.log(`dataTransfer: ${event.dataTransfer.getData('payload')}`)
      const transferData = JSON.parse(event.dataTransfer.getData('payload'))

      this.$emit('drop', transferData)
    },
  },
}
</script>

<style scoped></style>
