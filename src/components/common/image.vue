<template>
  <div
    :class="['comp-content', component.active ? 'active' : '']"
    :style="getStyle"
  >
    <div class="image-box">
      <img
        v-if="imgUrl"
        :src="imgUrl"
      >
      <div
        v-else
        class="image-placeholder"
      >
        <i class="el-icon-picture-outline"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

@Component({
  name: 'BaseImage'
})
export default class BaseImage extends Vue {
  @Prop({ default: null })
  private component: any

  private imgUrl: string = this.component.style[1].val

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
    this.imgUrl = this.component.style[1].val
  }
}
</script>

<style lang="scss" scoped>
.image-box {
  overflow: hidden;

  .image-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    text-align: center;

    > i {
      font-size: 40px;
    }
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
