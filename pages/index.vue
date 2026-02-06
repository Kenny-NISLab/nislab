<template>
  <div>
    <div class="hero">
      <swiper :options="swiperOption" class="hero__swiper">
        <swiper-slide v-for="(image, index) in images" :key="index">
          <img
            :src="`/images/${image.src}`"
            :alt="`NISLABイメージ画像 ${index + 1}`"
            class="hero__image"
            :style="{ objectPosition: image.objectPosition }"
          />
        </swiper-slide>
      </swiper>
      <div class="hero__filter" />
      <!-- ===== 巻物バナー ===== -->
      <div class="hero__openLabWrap">
        <a
          href="/topics/6MYzq3iG7lF7wrqkKGNQ2b/"
          class="hero__openLabLink"
          aria-label="オープンラボ開催ページへ"
        >
          <img
            src="/images/scroll.png"
            alt=""
            class="hero__openLabImg"
            aria-hidden="true"
          />
          <span class="hero__openLabText">〜2/16 オープンラボ開催〜</span>
        </a>
      </div>
      <!-- ===== 巻物バナー===== -->
      <h2 class="hero__title">
        <span class="hero__univName">Doshisha University</span>
        <span v-for="(span, index) in name" :key="index" class="hero__labName">
          {{ span }}
        </span>
      </h2>
      <nuxt-link to="#about" class="hero__scroll">Scroll</nuxt-link>
    </div>
    <Section id="about">
      <Title :title="`About Us`" :sub-title="`NISLABとは`" />
      <p class="about__text">
        私たちネットワーク情報システム研究室（佐藤研究室）は，身の回りの家電や自動車などの組込みシステムからスマートフォンやクラウドまで，モノのインターネット（IoT:
        Internet of
        Things）により現実世界と仮想世界を融合し，いつでも，どこでも，誰もが自由で安全に利用可能なコンピューティング環境を実現できる分散システム（Network
        & Distributed
        Systems）の研究を行っています．モノの個体情報を識別したり，そのモノが置かれた周りの状況を把握したり，そのモノ自体を制御し，クラウドコンピューティングとの連携も考慮し，世界全体として飛躍的に安全性・効率性・利便性・持続可能性の高い情報化社会の実現を目指します．
      </p>
      <div class="about__button">
        <MoreButton :link-to="`/research`" />
      </div>
    </Section>

    <Section class="indexTopics" :bg="`#eee`">
      <Title :title="`New Topics`" :sub-title="`新着記事`" />
      <Cards class="indexTopics__cards" :number="6" :filter="true" />
      <div class="indexTopics__button">
        <MoreButton :link-to="`/topics`" />
      </div>
    </Section>
  </div>
</template>

<script>
import { Cards } from '~/components/common/index'
import { Section, Title, MoreButton } from '~/components/utility/index'

export default {
  components: {
    Cards,
    Section,
    Title,
    MoreButton,
  },
  data() {
    return {
      images: [
        { src: 'drone.webp', objectPosition: '30% 30%' },
        { src: 'vr.webp', objectPosition: '55% 0%' },
        { src: 'deliro.webp', objectPosition: 'left bottom' },
        { src: 'simulator.webp', objectPosition: '40% 50%' },
        { src: 'car.webp', objectPosition: '30% 50%' },
      ],
      name: ['Network', 'Information', 'System', 'Laboratory'],
      swiperOption: {
        speed: 1000,
        autoplay: {
          delay: 10000,
          disableOnInteraction: false,
        },
        loop: true,
        effect: 'fade',
      },
    }
  },
  head() {
    return {
      meta: [
        {
          hid: 'og:image',
          property: 'og:image',
          content: process.env.NUXT_ENV_BASE_URL + '/images/drone.webp',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  font-family: $font-set-en;

  &__filter {
    position: absolute;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: transparent;
    background-image: radial-gradient(
      rgba(0, 0, 255, 0.3) 35%,
      transparent 36%
    );
    background-repeat: repeat;
    background-position: 0 0, 20px 20px;
    background-size: 3px 3px;
  }

  &__swiper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  /* ===== 巻物バナー ===== */
  &__openLabWrap {
    position: absolute;
    top: 122px; 
    right: 32px;
    z-index: 5;
    filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.35));
    @include mq(sp) {
      top: 98px;
      right: 12px;
    }
  }

  &__openLabLink {
    position: relative;
    display: block;
    width: clamp(200px, 58vw, 360px);
    aspect-ratio: 1983 / 931;
    overflow: hidden;
    text-decoration: none;
    line-height: 0;
    transform: translateY(0);
    transition: transform 120ms ease;
    container-type: inline-size;

    &::after {
      content: '';
      position: absolute;
      z-index: 1;
      pointer-events: none;

      left: -1.614%;
      top: -23.3%;
      width: 103.278%;
      height: 146.6165%;

      background: #e97132;
      opacity: 0.95;
      mix-blend-mode: multiply;

      -webkit-mask-image: url('/images/scroll.png');
      mask-image: url('/images/scroll.png');
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-size: 100% 100%;
      mask-size: 100% 100%;
      -webkit-mask-position: 0 0;
      mask-position: 0 0;
    }
  }

  &__openLabImg {
    position: absolute;
    z-index: 0;
    pointer-events: none;
    left: -1.614%;
    top: -23.3%;
    width: 103.278%;
    height: 146.6165%;
    display: block;
    max-width: none;
    filter: brightness(1.08) contrast(1.02);
  }

  &__openLabText {
  position: absolute;
  z-index: 2;
  left: 50%;
  top: 32%;
  transform: translate(-50%, -50%);
  width: 92%;
  text-align: center;
  pointer-events: none;
  color: #fff;
  font-weight: 900;
  font-size: clamp(0.72rem, 2.8vw, 1.2rem);
  letter-spacing: 0.04em;
  white-space: nowrap;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.45);
  @supports (font-size: 1cqw) {
    font-size: clamp(0.72rem, 4.2cqw, 1.2rem);
  }
}

  &__openLabLink:hover {
    transform: translateY(-1px);
  }

  &__openLabLink:focus {
    outline: 2px solid #fff;
    outline-offset: 3px;
  }
  /* ===== 巻物バナー ===== */

  &__title {
    position: absolute;
    bottom: 32px;
    left: 32px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    font-weight: bold;
    color: #fff;
    filter: drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.6));
  }

  &__univName {
    display: inline;
    font-size: 2rem;
    border-bottom: 3px solid #fff;

    @include mq(sp) {
      font-size: 1.5rem;
    }
  }

  &__labName {
    font-size: 4rem;
    line-height: 1em;

    @include mq(sp) {
      font-size: 3rem;
    }
  }

  &__scroll {
    position: absolute;
    right: 32px;
    bottom: 32px;
    z-index: 2;
    display: flex;
    align-items: center;
    width: 1.5rem;
    height: 200px;
    overflow: hidden;
    font-size: 1.5rem;
    color: #fff;
    text-transform: uppercase;
    filter: drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.6));
    writing-mode: vertical-lr;

    &::after {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 2px;
      height: 100px;
      content: '';
      background: #fff;
      animation: scrollDown 3s cubic-bezier(1, 0, 0, 1) infinite;

      @keyframes scrollDown {
        0% {
          transform: scale(1, 0);
          transform-origin: 0 0;
        }
        50% {
          transform: scale(1, 1);
          transform-origin: 0 0;
        }
        50.1% {
          transform: scale(1, 1);
          transform-origin: 0 100%;
        }
        100% {
          transform: scale(1, 0);
          transform-origin: 0 100%;
        }
      }
    }
  }
}

.about {
  &__text {
    width: $content-width;
    max-width: 90%;
    margin: 0 auto;
    margin-top: 8rem;
    font-weight: 300;

    @include mq(sp) {
      margin-top: 4rem;
    }
  }

  &__button {
    margin-top: 8rem;
    text-align: center;

    @include mq(sp) {
      margin-top: 4rem;
    }
  }
}

.indexTopics {
  &__cards {
    margin-top: 8rem;

    @include mq(sp) {
      margin-top: 4rem;
    }
  }

  &__button {
    margin-top: 8rem;
    text-align: center;

    @include mq(sp) {
      margin-top: 4rem;
    }
  }
}
</style>
