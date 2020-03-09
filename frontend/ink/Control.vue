<template>
  <div :class="defineClassName">
    <div v-if="prefix" :class="definePrefixClassName">{{ prefix }}</div>
    <slot></slot>
    <div v-if="shouldHaveAura" :class="defineOutlineClassName" />
    <label v-if="shouldHaveAura" :for="id" class="control--aura" />
    <div v-if="suffix" :class="defineSuffixClassName">{{ suffix }}</div>
  </div>
</template>

<script>
import { bemHelper } from "./helpers";

export default {
  props: {
    id: String,
    isCell: Boolean,
    type: String,
    size: Number,
    isInline: Boolean,
    isInvalid: Boolean,
    isDisabled: Boolean,
    suffix: String,
    prefix: String
  },
  computed: {
    defineClassName() {
      const { type, size, isCell, isInline, isInvalid, isDisabled } = this;
      const b = bemHelper();

      return b("control", {
        [`${type}`]: Boolean(type),
        [`${size}`]: Boolean(size) && !isCell,
        cell: isCell,
        inline: isInline,
        invalid: Boolean(isInvalid),
        disabled: isDisabled
      });
    },
    definePrefixClassName() {
      const b = bemHelper();

      return b("control--prefix", {
        cell: this.isCell
      });
    },

    defineSuffixClassName() {
      const b = bemHelper();

      return b("control--suffix", {
        cell: this.isCell
      });
    },

    defineOutlineClassName() {
      const { type, isResizable } = this;
      const b = bemHelper();

      return b("control--outline", {
        triangle: !type || (type === "textarea" && !isResizable)
      });
    },

    shouldHaveAura() {
      const { isCell, isCheckbox, isFilePicker, isRadio } = this;
      return isCell && !(isCheckbox || isFilePicker || isRadio);
    }
  }
};
</script>
