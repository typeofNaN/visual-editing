<template>
  <div
    :class="['comp-content', component.active ? 'active' : '']"
    :style="getStyle"
  >
    <el-carousel
      trigger="click"
      :height="height"
      :id="component.domId"
      :indicator-position="pagination ? '' : 'none'"
      :autoplay="autoplay"
      :interval="interval"
      class="swiper-container"
    >
      <el-carousel-item
        v-for="(banner, index) in banners"
        :key="index"
        class="swiper-slide"
      >
        <img
          :src="banner.val"
          alt=""
          class="swiper_img"
        >
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'SwiperBanner',
  props: {
    component: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      banners: this.component.action.config,
      autoplay: this.component.base[0].val,
      pagination: this.component.base[1].val,
      interval: this.component.base[2].val,
      height: this.getMaxHeight(),
      width: this.getWidth()
    }
  },
  computed: {
    getStyle () {
      const ret = []
      this.component.style.forEach((item) => {
        const unit = item.unit || ''
        item.val && ret.push(item.attr + ':' + item.val + unit)
      })
      return ret.join(';')
    }
  },
  watch: {
    component: {
      handler () {
        this.banners = this.component.action.config
        this.autoplay = this.component.base[0].val
        this.pagination = this.component.base[1].val
        this.interval = this.component.base[2].val
        this.height = this.getMaxHeight()
        this.width = this.getWidth()
      },
      deep: true
    }
  },
  methods: {
    getMaxHeight () {
      let h = 0
      if (this.component.action.config && this.component.action.config.length) {
        this.component.action.config.forEach((item) => {
          if (item.height && item.height > h) {
            h = item.height
          }
        })
      }
      return h > 0 ? h / 2 + 'px' : '112px'
    },
    getWidth () {
      return (750 - this.component.style[2].val - this.component.style[4].val) / 2 + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;

  .swiper-slide {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    .swiper_img {
      width: 100%;
      height: auto;
      -webkit-user-drag: none;
    }
  }
}
</style>
