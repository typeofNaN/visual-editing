<template>
  <el-dialog
    id="preview"
    title="页面预览"
    :close-on-click-modal="false"
    :append-to-body="false"
    :visible.sync="visible"
    @close="$emit('update:show', false)"
    width="395px"
  >
    <el-row>
      <el-col
        :span="12"
        class="app_box"
        :style="'text-align: center; width:375px;' + getStyle()"
      >
        <div class="pre-desc">
          <h3 style="color:red;">预览说明：</h3>
          <p>1、部分组件尚未实现预览；</p>
          <p>2、组件尚未点击效果；</p>
          <p>3、预览仅供参考，不代表真机效果；</p>
        </div>
        <div
          v-for="(comp, index) in compList"
          :key="index"
        >
          <div
            v-if="comp.type !== 'placeholder'"
            :key="index"
            :data-index="index"
          >
            <!-- 文本控件 -->
            <base-text
              v-if="comp.type === 'text'"
              :component="comp"
            ></base-text>
            <!-- 图片控件 -->
            <base-image
              v-if="comp.type === 'img'"
              :component="comp"
            ></base-image>
            <!-- 表单控件 -->
            <base-form
              v-if="comp.type === 'form'"
              :component="comp"
            ></base-form>
            <!-- 页面标题 -->
            <page-title
              v-if="comp.type === 'page-title'"
              :component="comp"
            ></page-title>
            <!-- 页面段落 -->
            <page-paragraph
              v-if="comp.type === 'page-paragraph'"
              :component="comp"
            ></page-paragraph>
            <!-- 页面引言 -->
            <page-intro
              v-if="comp.type === 'page-intro'"
              :component="comp"
            ></page-intro>
            <!-- 倒计时控件 -->
            <timeout
              v-if="comp.type === 'timeout'"
              :component="comp"
            ></timeout>
            <!-- 楼层标题 -->
            <floor-title
              v-if="comp.type === 'floor-title'"
              :component="comp"
            ></floor-title>
            <!-- 页面FAQ -->
            <page-faq
              v-if="comp.type === 'page-faq'"
              :component="comp"
            ></page-faq>

            <!-- 网格菜单控件 -->
            <grid-menu
              v-if="comp.type === 'grid-menu'"
              :component="comp"
            ></grid-menu>
              <!-- 楼层导航控件 -->
            <floor-menu
              v-if="comp.type === 'floor-menu'"
              :component="comp"
            ></floor-menu>

            <!-- 平铺布局 -->
            <layout-repeat
              v-if="comp.type === 'layout-repeat'"
              :component="comp"
            ></layout-repeat>
            <!-- 两栏布局左 -->
            <layout-left
              v-if="comp.type === 'layout-left'"
              :component="comp"
            ></layout-left>
            <!-- 两栏布局右 -->
            <layout-right
              v-if="comp.type === 'layout-right'"
              :component="comp"
            ></layout-right>

            <!-- 商品搜索 -->
            <goods-search
              v-if="comp.type === 'goods-search'"
              :component="comp"
            ></goods-search>
            <!-- 优惠券 -->
            <coupon
              v-if="comp.type === 'coupon'"
              :component="comp"
            ></coupon>
            <!-- 自定义商品 -->
            <goods
              v-if="comp.type === 'goods'"
              :component="comp"
            ></goods>

            <!-- 轮播图控件 -->
            <swiper-banner
              v-if="comp.type === 'swiper-banner'"
              :component="comp"
            ></swiper-banner>
            <!-- 横向滚动控件 -->
            <scroll-left
              v-if="comp.type === 'scroll-left'"
              :component="comp"
            ></scroll-left>

            <!-- 横向列表 -->
            <horizontal-list
              v-if="comp.type === 'horizontal-list'"
              :component="comp"
            ></horizontal-list>
            <!-- 纵向列表 -->
            <vertical-list
              v-if="comp.type === 'vertical-list'"
              :component="comp"
            ></vertical-list>

            <!-- 滚动新闻控件 -->
            <news-marquee
              v-if="comp.type === 'news-marquee'"
              :component="comp"
            ></news-marquee>
          </div>
        </div>
        <!-- 底部导航控件 -->
        <div v-if="bottomMenu">
          <bottom-menu :component="bottomMenu"></bottom-menu>
        </div>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

@Component({
  name: 'Preview'
})
export default class Preview extends Vue {
  @Prop({ default: false })
  private show!: Boolean


  private visible: Boolean = this.show
  private compList: Array<any> = []
  private pageStyle: Array<any> = []
  private bottomMenu: any = null

  @Watch('show', { immediate: true })
  private watchShow (): void {
    this.visible = this.show
    this.pageStyle = JSON.parse(localStorage.getItem('pageConfig') as string).style || []
    this.compList = JSON.parse(localStorage.getItem('pageDateSet') as string).config || []
    this.bottomMenu = JSON.parse(localStorage.getItem('pageDateSet') as string).menu || null
  }

  private cancel (): void {
    this.visible = false
  }

  private getStyle (): string {
    const ret: Array<string> = []
    this.pageStyle.forEach((item: any) => {
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
.app_box {
  min-height: 600px;
}
</style>

<style lang="scss">
#preview {
  .el-dialog {
    border-radius: 10px !important;
  }

  .el-dialog__body {
    padding: 0px 10px 50px 10px !important;

    .pre-desc {
      position: absolute;
      left: 110%;
      top: 200px;
      width: 180px;
      height: 250px;
      padding: 10px;
      background-color: #fff;
      border-radius: 4px;

      > h3 {
        margin-bottom: 10px;
      }

      > p {
        margin: 0;
        text-align: left;
        line-height: 1.5;
      }
    }
  }
}
</style>
