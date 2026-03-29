<template>
  <nuxt-link :to="linkTo" class="button" role="button">
    <span>{{ text }}</span>
    <ChevronUp class="button__arrow" />
  </nuxt-link>
</template>

<script>
import { ChevronUp } from '~/components/assets/index'

export default {
  components: {
    ChevronUp,
  },
  props: {
    linkTo: {
      type: String,
      required: true,
      default: './',
    },
    text: {
      type: String,
      default: 'more',
    },
  },
}
</script>

<style lang="scss" scoped>
.button {
  position: relative;
  z-index: 1;
  display: inline-block;
  width: 240px;
  padding: 1rem 4rem;
  overflow: hidden;
  color: #fff;
  text-align: center;
  background: #000;
  border-radius: 30px;
  transition: all 0.3s;

  & span {
    position: relative;
    z-index: 1;
    display: block;
    font-family: $font-set-en;
  }

  &::before {
    position: absolute;
    top: 50%;
    left: 0;
    z-index: 1;
    width: 100px;
    height: 100px;
    content: '';
    background: $main-color;
    border-radius: 50%;
    transition: all 0.5s ease-in-out;
    transform: translateX(-80%) translateY(-25px);
  }

  &__arrow {
    position: absolute;
    top: 50%;
    right: 10%;
    z-index: 1;
    height: 1rem;
    transition: all 0.5s ease-in-out;
    transform: rotate(90deg) translate(-0.5rem, 0);
  }

  &:hover {
    &::before {
      width: 400px;
      height: 400px;
      transform: translateX(-1%) translateY(-175px);
    }

    .button__arrow {
      transform: rotate(90deg) translate(-0.5rem, -0.5rem);
    }
  }
}
</style>
