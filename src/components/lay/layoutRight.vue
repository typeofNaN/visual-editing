<template>
  <div
    :class="['comp-content', component.active ? 'active' : '']"
    :style="getStyle"
  >
    <div class="layout_box">
      <div class="layout_box_left">
        <div class="top">
          <img
            v-if="items[0].val"
            :src="items[0].val"
          >
          <div
            v-else
            class="image-placeholder"
          >
            <i class="el-icon-picture-outline"></i>
          </div>
        </div>
        <div class="bot">
          <img
            v-if="items[1].val"
            :src="items[1].val"
          >
          <div
            v-else
            class="image-placeholder"
          >
            <i class="el-icon-picture-outline"></i>
          </div>
        </div>
      </div>
      <div class="layout_box_right">
        <img
          v-if="items[2].val"
          :src="items[2].val"
        >
        <div
          v-else
          class="image-placeholder"
        >
          <i class="el-icon-picture-outline"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

@Component({
  name: 'LayoutRight'
})
export default class LayoutRight extends Vue {
  @Prop({ default: null })
  private component: any

  private items: Array<any> = this.component.action.config


  private get getStyle (): string {
    const ret: Array<string> = []
    this.component.style.forEach((item: any) => {
      const unit = item.unit || ''
      item.val && ret.push(item.attr + ':' + item.val + unit)
    })
    return ret.join(';')
  }

  @Watch('component', { deep: true })
  private watchComponent (): void {
    this.items = this.component.action.config
  }
}
</script>

<style lang="scss" scoped>
.layout_box {
  display: flex;
  min-height: 100px;
  height: 100%;

  > div {
    flex: 1;
    margin: 2px;
    background-repeat: no-repeat;
  }

  .layout_box_left {
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50%;
      border-radius: 4px;
      overflow: hidden;

      img {
        width: 100%;
      }
    }
  }

  .layout_box_right {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    overflow: hidden;

    img {
      width: 100%;
    }
  }
}
</style>
