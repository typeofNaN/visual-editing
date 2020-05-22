<template>
  <div
    :class="['comp-content', component.active ? 'active' : '']"
    :style="getStyle"
  >
    <div class="page-paragraph__title">
      <span class="title-icon">
        <i :class="component.base[0].val"></i>
      </span>
      <span class="title-h1">{{ component.base[1].val }}</span>
    </div>
    <div
      v-for="(item, index) in component.action.config"
      :key="index"
      class="page-paragraph"
    >
      <label class="page-paragraph__label">
        {{ item.label }}
      </label>
      <div
        v-html="item.content"
        class="page-paragraph__content"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'PageParagraph'
})
export default class pageParagraph extends Vue {
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
}
</script>

<style lang="scss" scoped>
.page-paragraph__title {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .title-icon {
    display: flex;
    align-items: center;
    margin-right: 10px;

    > i.theme-1 {
      display: block;
      width: 4px;
      height: 14px;
      background-color: #007aff;
    }
    > i.theme-2 {
      display: block;
      width: 8px;
      height: 8px;
      border: 2px solid #007aff;
      border-radius: 50%;
      box-sizing: border-box;
    }
  }
  .title-h1 {
    display: block;
    font-size: 16px;
    font-weight: 600;
  }
}

.page-paragraph {
  display: flex;

  .page-paragraph__label {
    display: block;
    text-align: left;
    width: 20px;
    line-height: 1.5;
  }

  .page-paragraph__content {
    flex: 1;
    line-height: 1.5;
    font-size: 14px;
  }
}
</style>
