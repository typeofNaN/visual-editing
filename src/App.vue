<template>
  <div id="h5_setting">
    <div class="h5_left">
      <app-sidebar></app-sidebar>
    </div>
    <div class="h5_main">
      <app-toolbar
        @showPageSet="showPageSet"
        @savePageSet="savePageSet"
        @showPreview="showPreview"
        @reset="reset"
      ></app-toolbar>
      <div class="scroll-y">
        <div
          class="app-phone"
          @dragover.self="dragPhoneOver"
          @dragleave.self="dragPhoneLeave"
          @drop.self="dropPhone"
          @dragover.prevent
        >
          <template v-for="(comp, idx) in compList">
            <!-- 占位提示控件 -->
            <div
              v-if="comp.type === 'placeholder'"
              :key="idx"
              class="place-holder"
              @dragover.stop="dragover"
              @dragleave.stop="dragleave"
              @drop.stop="drop"
              @dragover.prevent
              :data-index="idx"
            >放在这里</div>

            <div
              v-else
              :class="['tpl-container', comp.active ? 'current' : '']"
              :style="{ border: comp.active ? '1px solid red' : '' }"
              :key="idx"
              :data-index="idx"
              @click.capture="clickComp"
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

              <!-- 控件操作 -->
              <div class="comp-menu">
                <a
                  href="javascript:void(0)"
                  :class="[idx == 1 ? 'disabled' : '']"
                  @click="upComp(idx)"
                >
                  <span class="tips">上移</span>
                  <i class="el-icon-top"></i>
                </a>
                <a
                  href="javascript:void(0)"
                  :class="[idx == compList.length - 2 ? 'disabled' : '']"
                  @click="downComp(idx)"
                >
                  <span class="tips">下移</span>
                  <i class="el-icon-bottom"></i>
                </a>
                <a
                  href="javascript:void(0)"
                  @click="delComp(idx)"
                >
                  <span class="tips">删除</span>
                  <i class="el-icon-delete"></i>
                </a>
              </div>
            </div>
          </template>
        </div>

        <!-- 底部导航控件 -->
        <div
          v-if="bottomMenu"
          :class="['absolute-tpl', bottomMenu.active ? 'current' : '']"
          @click="clickBtmMenu"
        >
          <bottom-menu :component="bottomMenu"></bottom-menu>
          <div class="comp-menu">
            <a
              href="javascript:void(0)"
              @click="delBtmMenu"
            >
              <span class="tips">删除</span>
              <i class="el-icon-delete"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="h5_right">
      <preview-dialog :show.sync="previewShow"></preview-dialog>
      <app-opt
        v-if="currentConfig"
        :option="currentConfig"
      ></app-opt>
      <app-page-opt
        v-else
        :option="pageConfig"
      ></app-page-opt>
      <click-config
        :show.sync="clickShow"
        :option="currentConfig"
        :comps="compList"
        :index="click.index"
        :tabs="click.tabs"
      ></click-config>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

import util from '@/utils/tools'
// 页面默认配置
import pageOption from '@/config/appPageConfig'
// 组件默认配置
import compConfig from '@/config/componentConfig'

import AppSidebar from '@/components/slidebar.vue'
import AppToolbar from '@/components/toolbar.vue'

import appOpt from '@/components/option.vue'
import appPageOpt from '@/components/pageOption.vue'
import clickConfig from '@/components/clickToUrl.vue'
import previewDialog from '@/components/preview.vue'

@Component({
  name: 'App',
  components: {
    AppSidebar,
    AppToolbar,
    appOpt,
    appPageOpt,
    clickConfig,
    previewDialog
  }
})
export default class App extends Vue {
  $evt: any
  private clickShow: Boolean = false
  private previewShow: Boolean = false
  private click: any = {
    index: 0,
    tabs: []
  }
  private compList: Array<any> = [{
    type: 'placeholder'
  }]
  private bottomMenu: any = null
  private pageConfig: any = JSON.parse(localStorage.getItem('pageConfig') as string) || util.copyObj(pageOption)
  private currentIndex: number = -1
  private currentConfig: any = null

  private mounted (): void {
    this.$evt.$on('click:show', (idx: number, tabs: any) => {
      this.click.index = idx
      if (Array.isArray(tabs) && tabs.length) this.click.tabs = tabs
      else this.click.tabs = ['outside', 'page', 'tel']
      this.clickShow = true
    })
    this.$evt.$on('click:submit', (idx: number, config: any) => {
      if (idx > -1 && config) {
        if (this.currentIndex >= 0) {
          this.compList[this.currentIndex].action.config[idx].click = config
        } else if (this.currentIndex === -2) {
          // 底部导航栏点击配置
          this.bottomMenu.action.config[idx].click = config
        }
      }
    })
    this.readLocalData()
    this.showPageSet()
  }

  @Watch('compList', { deep: true })
  private watchCompList (val: Array<any>): void {
    if (val && val.length > 1) {
      localStorage.setItem('pageDateSet', JSON.stringify({
        time: Date.now(),
        menu: this.bottomMenu,
        config: val
      }))
    }
  }

  @Watch('bottomMenu', { deep: true })
  private watchBottomMenu (val: Array<any>): void {
    localStorage.setItem('pageDateSet', JSON.stringify({
      time: Date.now(),
      menu: val,
      config: this.compList
    }))
  }

  private showPageSet (): void {
    this.resetCompUnchecked()
    this.currentIndex = -1
    this.currentConfig = null
  }

  private savePageSet (): void {
    console.warn('save Info: ', JSON.stringify(this.compList))
    this.$message({
      message: '打开chomre devtool查看保存的信息！',
      type: 'success'
    })
  }

  private showPreview (): void {
    localStorage.setItem('pageConfig', JSON.stringify(this.pageConfig))
    this.previewShow = true
  }

  private reset (): void {
    this.$confirm('确定要重置此页面吗，不可撤回？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      center: true
    }).then(() => {
      localStorage.setItem('pageDateSet', '')
      this.compList = [{ type: 'placeholder' }]
    }).catch(() => {})
  }

  private readLocalData (): void {
    const tmp: string | null = localStorage.getItem('pageDateSet')
    if (tmp) {
      const localData = JSON.parse(tmp)
      const t = util.parseTime(localData.time)
      this.$confirm('您有一份【' + t + '】未保存的编辑内容, 是否恢复到当前编辑界面？', '提示', {
        confirmButtonText: '载入',
        cancelButtonText: '丢弃',
        type: 'warning',
        center: true
      }).then(() => {
        this.compList = localData.config
        this.bottomMenu = localData.menu
        this.resetCompUnchecked()
      }).catch(() => {
        localStorage.setItem('pageDateSet', '')
      })
    }
  }

  private resetCompUnchecked (): void {
    if (this.bottomMenu) this.bottomMenu.active = false
    this.compList.forEach((val: any) => {
      if (val.active) {
        val.active = false
      }
    })
  }

  private replacePlaceholderWithComp (index: number, key: string): void {
    const comp = util.copyObj((compConfig as any)[key])
    const config = {
      type: key,
      active: true,
      domId: key + '-' + util.createDomID()
    }
    Object.assign(comp, config)
    this.compList.splice(index + 1, 0, comp)
    // 再插入一个占位控件
    this.compList.splice(index + 2, 0, {
      type: 'placeholder'
    })
    // 显示配置项
    this.currentIndex = index + 1
    this.currentConfig = comp
  }

  private addBottomMenu (): void {
    const comp = util.copyObj(compConfig['bottom-menu'])
    const config = {
      type: 'bottom-menu',
      active: true,
      domId: 'bottom-menu-' + util.createDomID()
    }
    Object.assign(comp, config)
    this.bottomMenu = comp
    // 显示配置项
    this.currentIndex = -1
    this.currentConfig = comp
  }

  private clickComp (e: any): void {
    if (this.bottomMenu) this.bottomMenu.active = false
    const idx = parseInt(e.currentTarget.dataset.index)
    this.compList.forEach((val, index) => {
      if (index === idx) {
        val.active = true
        this.currentIndex = index
        this.currentConfig = val
      } else {
        val.active = false
      }
    })
  }

  private clickBtmMenu (e: any): void {
    this.resetCompUnchecked()
    if (this.bottomMenu) this.bottomMenu.active = true
    this.currentIndex = -2
    this.currentConfig = this.bottomMenu
  }

  private delBtmMenu (): void {
    this.bottomMenu = null
    // 显示页面配置参数
    this.showPageSet()
  }

  private upComp (idx: number): any {
    if (idx < 2) {
      return false
    }
    // 复制当前控件
    const tmp = util.copyObj(this.compList[idx])
    // 再删除控件+占位坑
    this.compList.splice(idx, 2)
    // 再插入控件
    this.compList.splice(idx - 2, 0, tmp)
    // 最后插入一个占位控件
    this.compList.splice(idx - 1, 0, {
      type: 'placeholder'
    })
    // 显示当前组件配置
    this.currentIndex = idx - 2
    this.currentConfig = this.compList[idx - 2]
  }

  private downComp (idx: number): any {
    if (idx === this.compList.length - 2) {
      return false
    }
    // 复制当前控件
    const tmp = util.copyObj(this.compList[idx])
    // 再删除控件+占位坑
    this.compList.splice(idx, 2)
    // 再插入控件
    this.compList.splice(idx + 2, 0, tmp)
    // 最后插入一个占位控件
    this.compList.splice(idx + 3, 0, {
      type: 'placeholder',
      active: false
    })
    // 显示当前组件配置
    this.currentIndex = idx + 2
    this.currentConfig = this.compList[idx + 2]
  }

  private delComp (idx: number): any {
    // 删除控件
    this.compList.splice(idx, 2)
    // 显示页面配置参数
    this.showPageSet()
  }

  private dragover (e: any): void {
    const target = e.target
    if (!target.classList.contains('active')) target.classList.add('active')
  }

  private drop (e: any): void {
    const target = e.target
    target.classList.remove('active')
    const key = e.dataTransfer.getData('cmp-type')
    if (key === 'bottom-menu') return
    const idx = parseInt(target.dataset.index)
    if ((compConfig as any)[key]) {
      this.resetCompUnchecked()
      this.replacePlaceholderWithComp(idx, key)
    } else {
      this.$message.warning('没有查询到该组件的配置信息。。。')
    }
  }

  private dragleave (e: any): void {
    e.target.classList.remove('active')
  }

  private dragPhoneOver (): void {
    const target: HTMLElement | null = document.querySelector('.place-holder:last-child')
    if (target && !target.classList.contains('active')) {
      target.classList.add('active')
    }
  }

  private dropPhone (e: any): void {
    const target: HTMLElement | null = document.querySelector('.place-holder:last-child')
    if (target) {
      target.classList.remove('active')
      const key: string = e.dataTransfer.getData('cmp-type')
      const idx: number = parseInt(target.dataset.index as string)
      if ((compConfig as any)[key]) {
        if (key === 'bottom-menu') {
          if (this.bottomMenu) {
            this.$message.info('已经存在一个底部导航组件了，请勿重复添加！')
          } else {
            this.addBottomMenu()
          }
        } else {
          this.resetCompUnchecked()
          this.replacePlaceholderWithComp(idx, key)
        }
      } else {
        this.$message.warning('没有查询到该组件的配置信息。。。')
      }
    }
  }

  private dragPhoneLeave (): void {
    const target: HTMLElement | null = document.querySelector('.place-holder:last-child')
    target && target.classList.remove('active')
  }
}
</script>

<style lang="scss" scoped>
#h5_setting {
  display: flex;
  height: 100vh;

  .h5_left {
    width: 296px;
    height: 100%;
    overflow-y: auto;
    border: 1px solid #dcdfe6;
  }

  .h5_main {
    width: calc(100% - 680px);
    background-color: #f2f3f4;
    border-top: 1px solid #dcdfe6;
    border-bottom: 1px solid #dcdfe6;
    position: relative;
    flex: 1;
    min-width: 377px;

    .scroll-y {
      position: absolute;
      top: 40px;
      bottom: 0;
      width: 100%;
      padding-top: 30px;
      padding-bottom: 30px;
      overflow-y: auto;
    }

    .app-phone {
      position: relative;
      box-sizing: border-box;
      width: 377px;
      min-height: 667px;
      padding-bottom: 100px;
      margin: 0 auto;
      background-color: #fff;
      transform: translateX(-20px);

      .place-holder {
        position: relative;
        display: block;
        height: 10px;
        text-align: center;
        font-size: 0;
        background: #fff;
        background-image: linear-gradient(#fff 2px, transparent 0), linear-gradient(90deg, #999 1px, transparent 0);
        background-size: 3px 3px, 3px 3px;

        &.active {
          height: 40px;
          line-height: 40px;
          border: 1px dashed #f32e37;
          background-color: #ffe800;
          background-image: none;
          color: #333;
          font-size: 14px;
          margin: 0;
        }
      }

      .tpl-container {
        position: relative;
        width: 100%;
        background-color: transparent;
        position: relative;
        border: 1px solid #f2f3f4;
        transition: opacity .1s ease-out;
        user-select: none;
        box-sizing: border-box;
        z-index: auto;
        opacity: 1;
        cursor: pointer;

        &.current {
          .comp-menu {
            display: block;
          }
        }

        .comp-content {
          position: relative;
        }
      }
    }

    .comp-menu {
      position: absolute;
      display: none;
      top: 0;
      right: -38px;
      width: 32px;

      > a {
        display: inline-block;
        position: relative;
        width: 36px;
        height: 36px;
        margin-bottom: 2px;
        text-align: center;
        color: #666;
        background: #fff;
        font-size: 18px;
        line-height: 36px;

        &.disabled {
          color: #e4e4e4;
        }

        &:hover {
          &.disabled {
            color: #e4e4e4;
          }
          color: #333;
          .tips {
            display: block;
          }
        }

        .tips {
          font-size: 12px;
          position: absolute;
          left: 120%;
          background-color: #111;
          height: 18px;
          padding: 0 5px;
          line-height: 19px;
          border-radius: 2px;
          white-space: nowrap;
          display: none;
          color: #eee;
          top: 5px;

          &::before {
            content: ' ';
            display: block;
            position: absolute;
            left: -5px;
            top: 4.5px;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 5px 6px 5px 0;
            border-color: transparent #111 transparent transparent;
          }
        }
      }
    }

    .absolute-tpl {
      width: 377px;
      margin: 0 auto;
      transform: translateX(-20px);
      border-top: 1px solid #e8e8e8;

      &.current {
        border: 1px solid #2aa7ff;

        .comp-menu {
          display: block;
        }
      }
    }
  }

  .h5_right {
    width: 370px;
    height: 100%;
    overflow-y: auto;
    border: 1px solid #dcdfe6;
  }
}
</style>
