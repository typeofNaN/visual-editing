<template>
  <div
    :class="['comp-content', component.active ? 'active' : '']"
    :style="getStyle"
  >
    <div class="page-faq">
      <div
        v-for="(item, index) in component.action.config"
        :key="index"
        class="faq-item"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'PageFaq'
})
export default class PageFaq extends Vue {
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
}
</script>

<style lang="scss" scoped>
.page-faq {
  display: flex;
}
</style>
