<template>
  <section class="section" :style="styles">
    <slot></slot>
  </section>
</template>

<script>
export default {
  props: {
    bg: {
      type: String,
      required: false,
      default: '#fff',
    },
  },
  computed: {
    styles() {
      return {
        '--color': this.bg,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.section {
  max-width: 100%;
  padding: 12rem 0;
  margin: 0 auto;
  background-color: var(--color);

  @include mq(sp) {
    padding: 6rem 0;
  }
}
</style>
