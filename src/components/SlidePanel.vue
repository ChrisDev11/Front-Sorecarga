<template>
  <div class="panel-wrap" :class="{ visible: visible}">
    <div class="panel">
        <div>
            <button class="btn btn-danger"
            @click="closePanel()"
            >
            Fechar
        </button>
        <h2>{{ title }}</h2>
        </div>
        <slot name="content"></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SlidePanel',
  props: {
    title: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:visible'],
  methods: {
    closePanel() {
      this.$emit('update:visible', false);
    },
  },
};
</script>



<style lang="scss" scoped>
.panel {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #333;
  color: #eee;
  overflow: auto;
  padding: 1em;

  &-wrap {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    width: 30em;
    transform: translateX(100%);
    transition: 0.3s ease-out;

    &.visible {
      transform: translateX(0);
    }
  }
}
</style>