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
          label="图片位置："
        >
          {{ item.text }}
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
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

import util from '@/utils/tools'
import compConfig from '@/config/comp.config'
import upload from '@/components/upload.vue'

@Component({
  name: 'LayoutLeftItem',
  components: {
    upload
  }
})
export default class LayoutLeftItem extends Vue {
  @Prop({ default: null })
  private grids?: Array<any>

  $evt: any
  private defaultConf: any = util.copyObj(compConfig['grid-menu'])
  private items: Array<any> = this.grids || []

  @Watch('grids', { deep: true })
  private watchGrids (val: Array<any>) {
    this.items = val
  }

  private showClick (banner: any, idx: number): void {
    this.$evt.$emit('click:show', idx, ['outside'])
  }
}
</script>
