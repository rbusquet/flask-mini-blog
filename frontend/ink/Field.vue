<template>
  <div :class="defineClassName">
    <label v-if="label" :class="defineItemClassName('label')" :for="id">{{ label }}</label>
    <div :class="defineItemClassName('control')">
      <slot></slot>
    </div>

    <div v-if="attachment" :class="defineItemClassName('attachment')">{{ attachment }}</div>
    <div v-if="error" :class="defineItemClassName('error')">{{ error }}</div>
    <div v-if="help" :class="defineItemClassName('help')">{{ help }}</div>
    <div v-if="info" :class="defineItemClassName('info')">{{ info }}</div>
  </div>
</template>

<script>
import { bemHelper } from "./helpers";

export default {
  props: [
    "id",
    "label",
    "error",
    /** Help contents */
    "help",
    /** Info contents */
    "info",
    /** Modifier for required */
    "isRequired",
    /** Modifier for stacked */
    "isStacked",
    /** Modifier for full width */
    "isFull",
    "density",
    "attachment"
  ],
  computed: {
    defineClassName() {
      const b = bemHelper();

      return b("field", {
        required: this.isRequired,
        invalid: Boolean(this.error),
        stacked: this.isStacked,
        full: this.isStacked || this.isFull,
        [`density-${this.density}`]: Boolean(this.density)
      });
    }
  },
  methods: {
    defineItemClassName(item) {
      const b = bemHelper();

      return b(`field--${item}`, {
        stacked: this.isStacked,
        full: this.isStacked || this.isFull
      });
    }
  }
};
</script>
