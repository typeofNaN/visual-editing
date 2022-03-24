<template>
  <div
    :class="['comp-content', component.active ? 'active' : '']"
    :style="getStyle"
  >
    <div class="timeout-box">
      <div
        v-if="!imgUrl"
        class="image-placeholder"
      >
        <i class="el-icon-time"></i>
      </div>
      <div
        class="timeout-item day"
        :style="dayStyle"
      >{{ countTime('day', component.action.config[0]) }}</div>
      <div
        class="timeout-item hour"
        :style="hourStyle"
      >{{ countTime('hour', component.action.config[1]) }}</div>
      <div
        class="timeout-item minute"
        :style="minuteStyle"
      >{{ countTime('minute', component.action.config[2]) }}</div>
      <div
        class="timeout-item second"
        :style="secondStyle"
      >{{ countTime('second', component.action.config[3]) }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

@Component({
  name: 'Timeout'
})
export default class Timeout extends Vue {
  @Prop({ default: null })
  private component: any


  private dayStyle: string = this.getTimeStyle(0)
  private hourStyle: string = this.getTimeStyle(1)
  private minuteStyle: string = this.getTimeStyle(2)
  private secondStyle: string = this.getTimeStyle(3)
  private imgUrl: string = this.component.style[1].val

  private get getStyle (): string {
    const ret: Array<string> = []
    this.component.style.forEach((item: any) => {
      if (item.attr === 'background-image' && item.val) {
        ret.push(item.attr + ':url(' + item.val + ')')
        ret.push('height:' + item.height / 2 + 'px')
        ret.push('background-size:contain')
      } else {
        const unit: string = item.unit || ''
        item.val && ret.push(item.attr + ':' + item.val + unit)
      }
    })
    return ret.join(';')
  }

  @Watch('component', { deep: true })
  private watchComponent (): void {
    this.dayStyle = this.getTimeStyle(0)
    this.hourStyle = this.getTimeStyle(1)
    this.minuteStyle = this.getTimeStyle(2)
    this.secondStyle = this.getTimeStyle(3)
    this.imgUrl = this.component.style[1].val
  }

  private getTimeStyle (idx: number): string {
    const ret: Array<string> = []
    if (this.component.action.config[idx].show) {
      ret.push('left:' + this.component.action.config[idx].x + 'px')
      ret.push('top:' + this.component.action.config[idx].y + 'px')
      ret.push('width:' + this.component.action.config[idx].w + 'px')
      ret.push('height:' + this.component.action.config[idx].h + 'px')
      ret.push('line-height:' + this.component.action.config[idx].h + 'px')
      ret.push('font-size:' + this.component.action.config[idx].font + 'px')
      ret.push('font-weight:' + this.component.action.config[idx].weight)
      ret.push('color:' + this.component.action.config[idx].color)
      return ret.join(';')
    } else {
      return 'display:none;'
    }
  }

  private countTime (key: string, config: any): string | number {
    const end: string = this.component.style[0].val
    if (end) {
      const time = new Date().getTime()
      const sTime = new Date(end.replace(/-/g, '/')).getTime()
      const ms: number = sTime - time
      if (ms < 0) {
        return '00'
      } else {
        let day, hour, allHour, minute, allMinute, second, allSecond
        day = Math.floor(ms / 1000 / 60 / 60 / 24)
        day = day < 10 ? '0' + day : day

        hour = Math.floor(ms / 1000 / 60 / 60 % 24)
        hour = hour < 10 ? '0' + hour : hour
        allHour = Math.floor(ms / 1000 / 60 / 60)
        allHour = allHour < 10 ? '0' + allHour : allHour

        minute = Math.floor(ms / 1000 / 60 % 60)
        minute = minute < 10 ? '0' + minute : minute
        allMinute = Math.floor(ms / 1000 / 60)
        allMinute = allMinute < 10 ? '0' + allMinute : allMinute

        second = Math.floor(ms / 1000 % 60)
        second = second < 10 ? '0' + second : second
        allSecond = Math.floor(ms / 1000)
        allSecond = allSecond < 10 ? '0' + allSecond : allSecond

        switch (key) {
          case 'day':
            return day
          case 'hour':
            return config.show ? hour : allHour
          case 'minute':
            return config.show ? minute : allMinute
          case 'second':
            return config.show ? second : allSecond
        }
      }
    }
    return '00'
  }
}
</script>

<style lang="scss" scoped>
.timeout-box {
  position: relative;

  .timeout-item {
    position: absolute;
    text-align: center;
  }

  .image-placeholder {
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  img {
    display: block;
    margin: 0;
    width: 100%;
    height: auto;
    border: 0;
    -webkit-user-drag: none;
  }
}
</style>
