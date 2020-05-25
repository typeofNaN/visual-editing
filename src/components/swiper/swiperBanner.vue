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

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

@Component({
  name: 'SwiperBanner'
})
export default class SwiperBanner extends Vue {
  @Prop({ default: null })
  private component: any

  private banners: Array<any> = this.component.action.config
  private autoplay: Boolean = this.component.base[0].val
  private pagination: Boolean = this.component.base[1].val
  private interval: number = this.component.base[2].val
  private height: string = this.getMaxHeight()
  private width: string = this.getWidth()

  private get getStyle (): string {
    const ret: Array<string> = []
    this.component.style.forEach((item: any) => {
      const unit: string = item.unit || ''
      item.val && ret.push(item.attr + ':' + item.val + unit)
    })
    return ret.join(';')
  }

  @Watch('component', { deep: true })
  private watchComponent (): void {
    this.banners = this.component.action.config
    this.autoplay = this.component.base[0].val
    this.pagination = this.component.base[1].val
    this.interval = this.component.base[2].val
    this.height = this.getMaxHeight()
    this.width = this.getWidth()
  }

  private getMaxHeight (): string {
    let h:number = 0
    if (this.component.action.config && this.component.action.config.length) {
      this.component.action.config.forEach((item: any) => {
        if (item.height && item.height > h) {
          h = item.height
        }
      })
    }
    return h > 0 ? h / 2 + 'px' : '112px'
  }

  private getWidth (): string {
    return (750 - this.component.style[2].val - this.component.style[4].val) / 2 + 'px'
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
