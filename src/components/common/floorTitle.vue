<template>
  <div
    :class="['comp-content', component.active ? 'active' : '']"
    :style="getStyle"
  >
    <div
      class="line"
      :style="{ backgroundColor: getColor }"
    ></div>
    <div
      class="text-box"
      v-html="getText"
    ></div>
    <div
      class="line"
      :style="{ backgroundColor: getColor }"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'FloorTitle'
})
export default class FloorTitle extends Vue {
  @Prop({ default: null })
  private component: any

  private get getStyle (): string {
    const ret: Array<string> = []
    this.component.style.forEach((item: any) => {
      const unit = item.unit || ''
      if (item.val) {
        if (Array.isArray(item.attr)) {
          item.attr.forEach((atr: string, i: number) => {
            ret.push(atr + ':' + item.val[i])
          })
        } else if (item.attr === 'background-image') {
          ret.push(item.attr + ':url(' + item.val + ')')
        } else {
          ret.push(item.attr + ':' + item.val + unit)
        }
      }
    })
    return ret.join(';')
  }

  private get getColor (): string {
    let color: string = '#606266'
    this.component.style.forEach((item: any) => {
      if (item.val) {
        if (item.attr === 'color') {
          color = item.val
        }
      }
    })

    return color
  }

  private get getText (): string {
    const arr = this.component.base[0].val.split('\n')
    if (arr.length) {
      return arr.join('<br/>')
    }
    return this.component.base[0].val
  }
}
</script>

<style lang="scss" scoped>
.comp-content {
  display: flex;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;

  .line {
    width: 40px;
    height: 2px;
  }

  .text-box {
    padding: 0 10px;
  }
}
</style>
