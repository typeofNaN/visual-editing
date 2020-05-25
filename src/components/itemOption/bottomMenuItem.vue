<template>
  <div>
    <template v-if="menus && menus.length">
      <div
        v-for="(menu, index) in menus"
        :key="index"
        class="form-list-panel"
      >
        <upload
          :label="'图片' + (index + 1)"
          :index="index"
          :item="menu"
          v-on:uploadSuccess="uploadSuccess"
        ></upload>
        <template v-if="menu.click">
          <el-form-item
            class="small"
            label="跳转到："
          >
            <span style="word-break: break-all;">{{ menu.click.href }}</span>
          </el-form-item>
        </template>
        <el-form-item
          class="small"
          label="链接文字："
        >
          <el-input
            v-model="menu.titleName"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="small"
          label="点击配置："
        >
          <el-button
            icon="el-icon-edit"
            round
            @click="showClick(menu, index)"
          >配置跳转</el-button>
        </el-form-item>
        <div class="list-item-opt">
          <a
            v-if="index !== 0"
            href="javascript:;"
            @click="upItem(index)"
          >
            <i class="el-icon-arrow-up"></i>
          </a>
          <a
            v-if="index !== menus.length - 1"
            href="javascript:;"
            @click="downItem(index)"
          >
            <i class="el-icon-arrow-down"></i>
          </a>
          <a
            v-if="index > 0"
            href="javascript:;"
            @click="delItem(index)"
          >
            <i class="el-icon-delete"></i>
          </a>
        </div>
      </div>
    </template>
    <el-button
      icon="el-icon-plus"
      style="margin-top:15px;"
      round
      @click="addItem"
    >添加导航项</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

import util from '@/utils/tools'
import compConfig from '@/config/componentConfig.ts'
import upload from '@/components/upload.vue'

@Component({
  name: 'BottomMenuItem',
  components: {
    upload
  }
})
export default class BottomMenuItem extends Vue {
  @Prop({ default: null })
  private items?: Array<any>

  $evt: any
  private defaultConf: any = util.copyObj(compConfig['bottom-menu'])
  private menus: Array<any> = this.items || []

  @Watch('items', { deep: true })
  private watchItems (val: Array<any>): void {
    this.menus = val
  }

  private showClick (item: any, idx: number): void {
    this.$evt.$emit('click:show', idx, ['outside'])
  }

  private upItem (idx: number): void {
    const tmp: any = util.copyObj(this.menus[idx])
    this.menus.splice(idx, 1)
    this.menus.splice(idx - 1, 0, tmp)
  }

  private downItem (idx: number): void {
    const tmp: any = util.copyObj(this.menus[idx])
    this.menus.splice(idx, 1)
    this.menus.splice(idx + 1, 0, tmp)
  }

  private delItem (idx: number): void {
    this.menus.splice(idx, 1)
  }

  private addItem (): void {
    if (this.menus.length < 10) {
      this.menus.push(util.copyObj(this.defaultConf.action.config[0]))
    } else {
      this.$alert('最多添加5个导航项！')
    }
  }

  private uploadSuccess (): void {
    console.log('uploadSuccess')
  }
}
</script>
