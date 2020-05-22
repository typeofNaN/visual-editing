<template>
  <div
    :class="['comp-content', component.active ? 'active' : '']"
    :style="getStyle"
  >
    <ul
      id="line-marquee"
      class="marquee-box"
    >
      <li
        v-for="(mq, index) in marquees"
        :key="index"
        :style="{ lineHeight: component.style[2].val + 'px' }"
        class="marquee-item"
      >{{ mq.text }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

import Marquee from '@/utils/newsMarquee.js'

interface option {
  successive: Boolean,
  speed: number,
  pause: number
}

@Component({
  name: 'NewsMarquee'
})
export default class NewsMarquee extends Vue {
  @Prop({ default: null })
  private component: any

  private marquee: any = null
  private marqueeOption: option = {
    successive: this.component.style[0].val, // 是否连续
    speed: 1000 / 60, // 滚动速度
    pause: 3500 // 停顿时间
  }
  private marquees: any = this.component.action.config

  private get getStyle (): string {
    const ret: Array<string> = []
    this.component.style.forEach((item: any) => {
      if (item.val) {
        if (Array.isArray(item.attr)) {
          item.attr.forEach((atr: string, i: number) => {
            ret.push(atr + ':' + item.val[i])
          })
        } else if (item.attr === 'background-image') {
          ret.push(item.attr + ':url(' + item.val + ')')
        } else {
          const unit = item.unit || ''
          ret.push(item.attr + ':' + item.val + unit)
        }
      }
    })
    return ret.join(';')
  }

  @Watch('component', { deep: true })
  private watchComponent (): void {
    this.marquees = this.component.action.config
    this.marqueeOption.successive = this.component.style[0].val
    // 需要重新初始化marquee对象
    if (this.marquee) {
      this.marquee.destroy()
      this.marquee = null
    }
    this.marquee = new Marquee('#line-marquee', this.marqueeOption)
  }

  private mounted (): void {
    this.marquee = new Marquee('#line-marquee', this.marqueeOption)
  }
}
</script>

<style lang="scss" scoped>
.marquee-box {
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  list-style: none;
  overflow: hidden;

  .marquee-item {
    display: block;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
