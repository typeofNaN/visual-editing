<template>
  <div>
    <template v-if="items && items.length">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="form-list-panel"
      >
        <upload
          :label="'图片' + (index + 1)"
          :index="index"
          :item="item"
        ></upload>
        <el-form-item
          class="small"
          label="文案："
        >
          <el-input
            v-model="item.text"
            :maxlength="12"
            placeholder="导航文案"
          ></el-input>
        </el-form-item>
        <template v-if="item.click">
          <el-form-item
            class="small"
            label="跳转到："
          >
            <span style="word-break: break-all;">{{ item.click.href }}</span>
          </el-form-item>
        </template>
        <el-form-item
          class="small"
          label="点击配置："
        >
          <el-button
            icon="el-icon-edit"
            round
            @click="showClick(item, index)"
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
            v-if="index !== items.length - 1"
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
    >添加点击项</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

import util from '@/utils/tools'
import compConfig from '@/config/componentConfig'
import upload from '@/components/upload.vue'

@Component({
  name: 'GridMenuItem',
  components: {
    upload
  }
})
export default class GridMenuItem extends Vue {
  @Prop({ default: null })
  private grids?: Array<any>

  $evt: any
  private defaultConf: any = util.copyObj(compConfig['grid-menu'])
  private items: Array<any> = this.grids || []

  @Watch('grids', { deep: true })
  private watchGrids (val: Array<any>): void {
    this.items = val
  }

  private showClick (menu: any, idx: number): void {
    this.$evt.$emit('click:show', idx, ['outside'])
  }

  private upItem (idx: number): void {
    const tmp: any = util.copyObj(this.items[idx])
    this.items.splice(idx, 1)
    this.items.splice(idx - 1, 0, tmp)
  }

  private downItem (idx: number): void {
    const tmp: any = util.copyObj(this.items[idx])
    this.items.splice(idx, 1)
    this.items.splice(idx + 1, 0, tmp)
  }

  private delItem (idx: number): void {
    this.items.splice(idx, 1)
  }

  private addItem (): void {
    if (this.items.length < 10) {
      this.items.push(util.copyObj(this.defaultConf.action.config[0]))
    } else {
      this.$alert('最多添加10个点击项！')
    }
  }
}
</script>
