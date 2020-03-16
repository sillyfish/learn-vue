<template>
  <div class="field">
    <label v-if="label">{{ label }}</label>
    <select
      :value="value"
      @change="updateValue"
      v-bind="$attrs"
      v-on="listeners"
    >
      <option
        v-for="option in options"
        :key="option"
        :selected="option === value"
        >{{ option }}</option
      >
    </select>
  </div>
</template>

<script>
import { formFieldMixin } from '../mixins/formFieldMixin'

export default {
  name: 'BaseSelect',
  mixins: [formFieldMixin],
  // inheritAttrs: false,
  props: {
    /*
    label: {
      type: String,
      default: '',
    },
    value: [String, Number],
*/
    options: {
      type: Array,
      required: true,
    },
  },
  /*
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
      }
    },
  },
  methods: {
    updateValue(event) {
      console.log(event.target.value)
      this.$emit('input', event.target.value)
    },
  },
*/
}
</script>

<style scoped></style>
