<template>
    <v-alert
      v-if="visible"
      :type="type"
      closable
      @click:close="visible = false"
      class="mb-4"
    >
      {{ message }}
    </v-alert>
  </template>
  
  <script>
  export default {
    name: 'AlertMessage',
    props: {
      message: String,
      type: {
        type: String,
        default: 'info',
      },
      modelValue: {
        type: Boolean,
        required: true,
      },
    },
    computed: {
      visible: {
        get() {
          return this.modelValue;
        },
        set(val) {
          this.$emit('update:modelValue', val);
        },
      },
    },
  };
  </script>
  