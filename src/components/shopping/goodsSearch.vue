<template>
  <div
    :class="['comp-content', component.active ? 'active' : '']"
    :style="getStyle"
  >
    <div
      class="search-box"
      :style="{
        flexDirection: iconPosition ? 'row' : 'row-reverse',
        borderRadius: (getSearchBoxHeight / 2) + 'px'
      }"
    >
      <input
        class="search_input"
        readonly
        type="text"
        :style="{
          height: getSearchBoxHeight + 'px',
          borderRadius: (getSearchBoxHeight / 2) + 'px'
        }"
        placeholder="please enter..."
      >
      <i class="el-icon-search"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'GoodsSearch'
})
export default class GoodsSearch extends Vue {
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

  private get getSearchBoxHeight (): number {
    let arr = this.component.others.config.find((i: any) => i.attr === 'height')
    return arr.val
  }

  private get iconPosition (): Boolean {
    let bool: Boolean = true
    let arr = this.component.others.config.find((i: any) => i.attr === 'position')

    if (arr.val === 'left') {
      bool = false
    }

    return bool
  }
}
</script>

<style lang="scss" scoped>
.comp-content {
  background-repeat: no-repeat;
}
.search-box {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #909299;
  background-color: #fff;

  .search_input {
    border: none;
    outline: none;
    width: 100%;
    text-indent: 10px;
    cursor: pointer;
  }

  i {
    margin: 0 10px;
  }
}
</style>
