<template>
  <div
    :class="['comp-content', component.active ? 'active' : '']"
    :style="getStyle"
  >
    <div class="page-title">
      <h3 :style="getH3Style">{{ component.base[0].val }}</h3>
      <p
        v-if="component.base[1].val"
        :style="getPStyle"
      >{{ component.base[1].val }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'PageTitle'
})
export default class PageTitle extends Vue {
  @Prop({ default: null })
  private component: any

  private get getStyle (): string {
    const ret: Array<string> = []
    this.component.style.forEach((item: any) => {
      const unit: string = item.unit || ''
      if (item.val) {
        if (item.attr === 'background-image') {
          ret.push(item.attr + ':url(' + item.val + ')')
        } else {
          ret.push(item.attr + ':' + item.val + unit)
        }
      }
    })
    return ret.join(';')
  }

  private get getH3Style (): string {
    const ret: Array<string> = []
    this.component.others.config.forEach((item: any, idx: number) => {
      const unit: string = item.unit || ''
      if (item.val && idx < 4) {
        if (Array.isArray(item.attr)) {
          item.attr.forEach((atr: string, i: number) => {
            ret.push(atr + ':' + item.val[i])
          })
        } else {
          ret.push(item.attr + ':' + item.val + unit)
        }
      }
    })
    return ret.join(';')
  }

  private get getPStyle (): string {
    const ret: Array<string> = []
    this.component.others.config.forEach((item: any, idx: number) => {
      const unit: string = item.unit || ''
      if (item.val && idx > 3) {
        if (Array.isArray(item.attr)) {
          item.attr.forEach((atr: string, i: number) => {
            ret.push(atr + ':' + item.val[i])
          })
        } else {
          ret.push(item.attr + ':' + item.val + unit)
        }
      }
    })
    return ret.join(';')
  }
}
</script>

<style lang="scss" scoped>
.comp-content {
  background-repeat: no-repeat;
}
.page-title {
  position: relative;
  box-sizing: border-box;

  * {
    margin: 0;
    padding: 0;
    line-height: 1;
  }

  > h3 {
    display: block;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
