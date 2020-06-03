<template>
  <div id="ft">
    <el-form-item
      class="small"
      v-if="item.type === 'text'"
      :label="item.label + '：'"
    >
      <el-input
        v-model="item.val"
        :maxlength="item.maxLength || 128"
        :placeholder="item.placeholder ? item.placeholder : item.isNecessary ? '必填' : '非必填'"
        @blur="item.rules ? inputBlur(item.rules, item) : null"
      >
      </el-input>
    </el-form-item>
    <el-form-item
      class="small"
      v-if="item.type === 'color-picker'"
      :label="item.label + '：'"
    >
      <el-color-picker v-model="item.val"></el-color-picker>
    </el-form-item>

    <el-form-item
      v-if="item.type === 'font'"
      class="small"
      :label="item.label + '：'"
    >
      <div
        :class="['font-set', item.val[0] === '600' ? 'checked' : '']"
        @click="setFont(item, item.attr[0])"
      >
        <svg-icon icon-class="blod" />
      </div>
      <div
        :class="['font-set', item.val[1] === 'underline' ? 'checked' : '']"
        @click="setFont(item, item.attr[1])"
      >
        <svg-icon icon-class="underline" />
      </div>
      <div
        :class="['font-set', item.val[2] === 'italic' ? 'checked' : '']"
        @click="setFont(item, item.attr[2])"
      >
        <svg-icon icon-class="italic" />
      </div>
      <div
        :class="['font-set', item.val[3] === 'left' ? 'checked' : '']"
        @click="setAlign(item, 'left')"
      >
        <svg-icon icon-class="textLeft" />
      </div>
      <div
        :class="['font-set', item.val[3] === 'center' ? 'checked' : '']"
        @click="setAlign(item, 'center')"
      >
        <svg-icon icon-class="textCenter" />
      </div>
      <div
        :class="['font-set', item.val[3] === 'right' ? 'checked' : '']"
        @click="setAlign(item, 'right')"
      >
        <svg-icon icon-class="textRight" />
      </div>
    </el-form-item>
    <el-form-item
      class="small"
      v-if="item.type === 'textarea'"
      :label="item.label + '：'"
    >
      <el-input
        type="textarea"
        v-model="item.val"
        :rows="4"
        :placeholder="item.placeholder"
      ></el-input>
    </el-form-item>
    <el-form-item
      v-if="item.type === 'input-number'"
      class="small"
      :label="item.label + '：'"
    >
      <el-input-number
        v-model="item.val"
        :min="item.min"
        :max="item.max"
        :step="item.step"
      ></el-input-number>
    </el-form-item>
    <el-form-item
      v-if="item.type === 'slider'"
      class="small small_slider"
      :label="item.label + '：'"
    >
      <el-slider
        v-model="item.val"
        :min="item.min"
        :max="item.max"
        :step="item.step"
        :marks="{ min: item.min, max: item.max }"
      ></el-slider>
    </el-form-item>
    <el-form-item
      class="small"
      v-if="item.type === 'select'"
      :label="item.label + '：'"
    >
      <el-select
        v-model="item.val"
        placeholder="默认选项"
      >
        <el-option
          v-for="opt in item.options"
          :key="opt.val"
          :label="opt.name"
          :value="opt.val"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      v-if="item.type === 'radio'"
      class="small"
      :label="item.label + '：'"
    >
      <template v-for="(opt, idx) in item.options">
        <el-radio
          v-model="item.val"
          :label="opt.val"
          :key="idx"
        >{{ opt.name }}</el-radio>
      </template>
    </el-form-item>
    <el-form-item
      v-if="item.type === 'datetime'"
      class="small"
      :label="item.label + '：'"
    >
      <el-date-picker
        type="datetime"
        v-model="item.val"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="选择日期"
      ></el-date-picker>
    </el-form-item>
    <upload
      v-if="item.type === 'upload'"
      :id="index"
      :label="item.label"
      :item="item"
      v-on:uploadSuccess="uploadSuccess"
    ></upload>
    <el-form-item
      v-if="item.type == 'desc'"
      class="small"
      :label="item.label + '：'"
    >
      <span
        class="form-item-desc"
        v-html="item.val"
      ></span>
    </el-form-item>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import upload from '@/components/upload.vue'

@Component({
  name: 'FormItem',
  components: {
    upload
  }
})
export default class FormItem extends Vue {
  @Prop({ default: null })
  private item: any

  @Prop({ default: null })
  private index!: number

  private setFont (item: any, attr: string): void {
    if (attr === 'font-weight') {
      this.$set(item.val, 0, item.val[0] === '600' ? '400' : '600')
    }
    if (attr === 'text-decoration') {
      this.$set(item.val, 1, item.val[1] === 'underline' ? 'none' : 'underline')
    }
    if (attr === 'font-style') {
      this.$set(item.val, 2, item.val[2] === 'italic' ? 'inherit' : 'italic')
    }
  }

  private setAlign (item: any, align: any): void {
    this.$set(item.val, 3, align)
  }

  private inputBlur (rule: any, item: any): any {
    const reg = new RegExp(rule.regex)
    if (!item.val.match(reg)) {
      this.$alert(rule.tips, '提示')
      item.val = ''
      return false
    }
  }

  private uploadSuccess (): void {
    this.$message.success('upload Success')
  }
}
</script>

<style lang="scss" scoped>
span.form-item-desc {
  font-size: 12px;
  color: #666;
  line-height: 1.2;
}
</style>

<style lang="scss">
#ft {
  .small_slider {
    .el-form-item__label {
      line-height: 38px !important;
    }

    .el-form-item__content {
      padding: 0 10px;
    }
  }
}
</style>
