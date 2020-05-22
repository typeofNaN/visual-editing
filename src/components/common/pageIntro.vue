<template>
  <div
    :class="['comp-content', component.active ? 'active' : '']"
    :style="getStyle"
  >
    <div class="page-intro">
      <div class="intro-logo">
        <svg-icon icon-class="introduction"></svg-icon>
      </div>
      <div
        v-html="getText"
        class="intro-text"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'PageIntro'
})
export default class PageIntro extends Vue {
  @Prop({ default: null })
  private component: any

  private get getStyle (): string {
    const ret: Array<string> = []
    this.component.style.forEach((item: any) => {
      const unit: string = item.unit || ''
      if (item.val) {
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

  private get getText (): string {
    const arr: any = this.component.base[0].val.split('\n')
    if (arr.length) {
      return arr.join('<br/>')
    }
    return this.component.base[0].val
  }
}
</script>

<style lang="scss" scoped>
.comp-content {
  background-repeat: no-repeat;
}
.page-intro {
  display: flex;

  .intro-logo {
    width: 36px;

    > svg {
      width: 22px;
      height: 18px;
    }
  }

  .intro-text {
    flex: 1;
  }
}
</style>
