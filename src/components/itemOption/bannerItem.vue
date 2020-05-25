<template>
  <div>
    <template v-if="slides && slides.length">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="form-list-panel"
      >
        <upload
          :label="'图片' + (index + 1)"
          :index="index"
          :item="slide"
          @uploadSuccess="uploadSuccess"
        >
        </upload>
        <template v-if="slide.click">
          <el-form-item
            class="small"
            label="跳转到："
          >
            <span style="word-break: break-all;">{{ slide.click.href }}</span>
          </el-form-item>
        </template>
        <el-form-item class="small" label="点击配置：">
          <el-button
            icon="el-icon-edit"
            round
            @click="showClick(slide, index)"
          >配置跳转</el-button>
        </el-form-item>
        <div class="list-item-opt">
          <a
            v-if="index !== 0"
            href="javascript:;"
            @click="upBanner(index)"
          >
            <i class="el-icon-arrow-up"></i>
          </a>
          <a
            v-if="index !== slides.length - 1"
            href="javascript:;"
            @click="downBanner(index)"
          >
            <i class="el-icon-arrow-down"></i>
          </a>
          <a
            v-if="index > 0"
            href="javascript:;"
            @click="delBanner(index)"
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
      @click="addBanner"
    >添加图片项</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

import util from '@/utils/tools'
import compConfig from '@/config/comp.config'
import upload from '@/components/upload.vue'

@Component({
  name: 'BannerItem',
  components: {
    upload
  }
})
export default class BannerItem extends Vue {
  @Prop({ default: null })
  private banners?: Array<any>

  $evt: any
  private defaultConf: any = util.copyObj(compConfig['swiper-banner'])
  private slides: Array<any> = this.banners || []

  @Watch('banners', { deep: true })
  private watchBanners (val: Array<any>): void {
    this.slides = val
  }

  private showClick (banner: any, idx: number): void {
    this.$evt.$emit('click:show', idx, ['outside', 'code'])
  }

  private upBanner (idx: number): void {
    const tmp: any = util.copyObj(this.slides[idx])
    this.slides.splice(idx, 1)
    this.slides.splice(idx - 1, 0, tmp)
  }

  private downBanner (idx: number): void {
    const tmp: any = util.copyObj(this.slides[idx])
    this.slides.splice(idx, 1)
    this.slides.splice(idx + 1, 0, tmp)
  }

  private delBanner (idx: number): void {
    this.slides.splice(idx, 1)
  }

  private addBanner (): void {
    if (this.slides.length < 10) {
      this.slides.push(util.copyObj(this.defaultConf.action.config[0]))
    } else {
      this.$alert('最多添加10个图片项！')
    }
  }

  private uploadSuccess (): void {
    console.log('uploadSuccess')
  }
}
</script>
