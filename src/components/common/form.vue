<template>
  <div
    :class="['comp-content', component.active ? 'active' : '']"
    :style="style"
  >
    <div class="form-box">
      <div v-if="inputs.length">
        <div
          v-for="(input, index) in inputs"
          :key="index"
          class="form-box-item"
          :style="{ marginTop: component.others.config[4].val + 'px' }"
        >
          <label :style="labelStyle">{{input.desc}}</label>
          <input
            v-if="input.type !== 'select'"
            class="item-input"
            :style="inputStyle"
            :type="input.type"
            :placeholder="input.placeholder ? input.placeholder : input.isNecessary ? '必填' : '非必填'"
          >
          <select
            v-else
            class="item-input"
          >
            <option></option>
          </select>
        </div>
      </div>
      <div
        v-else
        class="image-placeholder"
      >
        <i class="el-icon-tickets"></i>
      </div>
      <div
        class="form-btn"
        :style="buttonStyle"
      >提 交</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

@Component({
  name: 'BaseForm'
})
export default class BaseForm extends Vue {
  @Prop({ default: null })
  private component: any

  private style = this.getStyle()
  private labelStyle = this.getLabelStyle()
  private inputStyle = this.getInputStyle()
  private buttonStyle = this.getButtonStyle()
  private inputs = this.component.action.config

  @Watch('component', { deep: true })
  private watchComponent (): void {
    this.style = this.getStyle()
    this.labelStyle = this.getLabelStyle()
    this.inputStyle = this.getInputStyle()
    this.buttonStyle = this.getButtonStyle()
    this.inputs = this.component.action.config
  }

  private getStyle (): string {
    const ret: Array<string> = []
    this.component.style.forEach((item: any) => {
      if (item.val) {
        if (item.attr === 'background-image') {
          ret.push(item.attr + ':url(' + item.val + ')')
        } else {
          const unit = item.unit || ''
          ret.push(item.attr + ':' + item.val + unit)
        }
      }
    })
    return ret.join(';')
  }

  private getLabelStyle (): string {
    const ret: Array<string> = [
      'width:' + this.component.others.config[0].val + 'px',
      'height:' + this.component.others.config[1].val + 'px',
      'line-height:' + this.component.others.config[1].val + 'px'
    ]
    return ret.join(';')
  }

  private getInputStyle (): string {
    const ret: Array<string> = []
    this.component.others.config.forEach((item: any) => {
      const isInput: number = item.attr.indexOf('form-input_')
      const idx: number = item.attr.indexOf('_')
      if (isInput === 0) {
        const unit: string = item.unit || ''
        item.val && ret.push(item.attr.substring(idx + 1, item.attr.length) + ':' + item.val + unit)
      }
    })
    return ret.join(';')
  }

  private getButtonStyle (): string {
    const ret: Array<string> = []
    this.component.others.config.forEach((item: any) => {
      const isInput: number = item.attr.indexOf('form-btn_')
      const idx: number = item.attr.indexOf('_')
      if (isInput === 0) {
        const unit: string = item.unit || ''
        const attr: string = item.attr.substring(idx + 1, item.attr.length)
        item.val && ret.push(attr + ':' + item.val + unit)
        attr === 'height' && ret.push('line-height:' + (parseInt(item.val) - 2 + unit))
      }
    })
    return ret.join(';')
  }
}
</script>

<style lang="scss" scoped>
.form-box {
  position: relative;
  overflow: hidden;

  .image-placeholder {
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;

    > i {
      color: #83c0ff;
      font-size: 40px;
    }
  }

  .form-box-item {
    display: flex;

    > label {
      display: block;
    }

    .item-input {
      flex: 1;
      padding: 5px 10px;
      box-sizing: border-box;
      border: 1px solid;
      outline: 0;
    }
  }

  .form-btn {
    box-sizing: border-box;
    border: 1px solid;
    text-align: center;
  }
}
</style>
