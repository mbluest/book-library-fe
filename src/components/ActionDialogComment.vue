<template>
  <v-dialog v-model="internalVisible" max-width="600">
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>
        <v-textarea
          v-model="comment"
          label="Comment"
          rows="4"
          auto-grow
          outlined
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="close">Cancel</v-btn>
        <v-btn color="primary" @click="submit">{{ txtButton }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ActionDialogComment',
  props: {
    modelValue: Boolean, // ← v-model binds to this
    title: {
      type: String,
      default: 'Action'
    },
    txtButton: {
      type: String,
      default: 'Submit'
    }
  },
  emits: ['submit', 'update:modelValue'],
  data() {
    return {
      comment: ''
    };
  },
  computed: {
    internalVisible: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      }
    }
  },
  methods: {
    close() {
      this.internalVisible = false;
      this.comment = '';
    },
    submit() {
      this.$emit('submit', this.comment);
      this.internalVisible = false;
      this.comment = '';
    }
  }
};
</script>
