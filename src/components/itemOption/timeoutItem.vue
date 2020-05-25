<template>
  <el-dialog
    id="timoutItem"
    title="配置倒计时"
    :close-on-click-modal="false"
    :append-to-body="false"
    :visible.sync="dialogShow"
    @close="$emit('update:show', false)"
    width="780px"
  >
    <el-row>
      <el-col
        :span="12"
        style="text-align:center;width:375px;"
      >
        <div
          v-if="areas.length"
          id="timesMap"
          class="area-container"
        >
          <img
            class="area-img"
            :src="img"
          >
          <div
            :class="['crop-box', currentTab === 'day' ? 'active' : '']"
            data-tab="day"
            :style="getStyle(areas[0])"
          >
            <div class="crop-box-content">
              <span
                class="crop-box-text"
                :style="getFontStyle(areas[0])"
              >{{ counts.day }}</span>
            </div>
            <div class="crop-box-tips">天</div>
            <span class="cropper-point point-e" data-direct="e"></span>
            <span class="cropper-point point-n" data-direct="n"></span>
            <span class="cropper-point point-w" data-direct="w"></span>
            <span class="cropper-point point-s" data-direct="s"></span>
            <span class="cropper-point point-ne" data-direct="ne"></span>
            <span class="cropper-point point-nw" data-direct="nw"></span>
            <span class="cropper-point point-sw" data-direct="sw"></span>
            <span class="cropper-point point-se" data-direct="se"></span>
          </div>
          <div
            :class="['crop-box', currentTab === 'hour' ? 'active' : '']"
            data-tab="hour"
            :style="getStyle(areas[1])"
          >
            <div class="crop-box-content">
              <span
                class="crop-box-text"
                :style="getFontStyle(areas[1])"
              >{{ areas[0].show ? counts.hour : counts.allHour }}</span>
            </div>
            <div class="crop-box-tips">时</div>
            <span class="cropper-point point-e" data-direct="e"></span>
            <span class="cropper-point point-n" data-direct="n"></span>
            <span class="cropper-point point-w" data-direct="w"></span>
            <span class="cropper-point point-s" data-direct="s"></span>
            <span class="cropper-point point-ne" data-direct="ne"></span>
            <span class="cropper-point point-nw" data-direct="nw"></span>
            <span class="cropper-point point-sw" data-direct="sw"></span>
            <span class="cropper-point point-se" data-direct="se"></span>
          </div>
          <div
            :class="['crop-box', currentTab === 'minute' ? 'active' : '']"
            data-tab="minute"
            :style="getStyle(areas[2])"
          >
            <div class="crop-box-content">
              <span
                class="crop-box-text"
                :style="getFontStyle(areas[2])"
              >{{ areas[1].show ? counts.minute : counts.allMinute }}</span>
            </div>
            <div class="crop-box-tips">分</div>
            <span class="cropper-point point-e" data-direct="e"></span>
            <span class="cropper-point point-n" data-direct="n"></span>
            <span class="cropper-point point-w" data-direct="w"></span>
            <span class="cropper-point point-s" data-direct="s"></span>
            <span class="cropper-point point-ne" data-direct="ne"></span>
            <span class="cropper-point point-nw" data-direct="nw"></span>
            <span class="cropper-point point-sw" data-direct="sw"></span>
            <span class="cropper-point point-se" data-direct="se"></span>
          </div>
          <div
            :class="['crop-box', currentTab === 'second' ? 'active' : '']"
            data-tab="second"
            :style="getStyle(areas[3])"
          >
            <div class="crop-box-content">
              <span
                v-if="areas[3].mini"
                class="crop-box-text"
                :style="getFontStyle(areas[3])"
              >{{ areas[2].show ? counts.second : counts.allSecond }}.{{ counts.millisecond }}</span>
              <span
                v-else
                class="crop-box-text"
                :style="getFontStyle(areas[3])"
              >{{ areas[2].show ? counts.second : counts.allSecond }}</span>
            </div>
            <div class="crop-box-tips">秒</div>
            <span class="cropper-point point-e" data-direct="e"></span>
            <span class="cropper-point point-n" data-direct="n"></span>
            <span class="cropper-point point-w" data-direct="w"></span>
            <span class="cropper-point point-s" data-direct="s"></span>
            <span class="cropper-point point-ne" data-direct="ne"></span>
            <span class="cropper-point point-nw" data-direct="nw"></span>
            <span class="cropper-point point-sw" data-direct="sw"></span>
            <span class="cropper-point point-se" data-direct="se"></span>
          </div>
        </div>
      </el-col>
      <el-col
        v-if="areas.length"
        :span="12"
        style="width:320px;margin-left:30px;"
      >
        <el-tabs
          v-model="currentTab"
          @tab-click="changTimes"
        >
          <el-tab-pane
            label=" 天数 "
            name="day"
          >
            <el-form label-width="100px">
              <el-form-item
                class="small"
                label="是否显示："
              >
                <el-switch
                  controls-position="left"
                  v-model="areas[0].show"
                ></el-switch>
              </el-form-item>
              <el-form-item
                class="small"
                label="字体大小："
              >
                <el-slider
                  v-model="areas[0].font"
                  :min="20"
                  :max="90"
                ></el-slider>
              </el-form-item>
              <el-form-item
                class="small"
                label="字体粗细："
              >
                <el-select
                  v-model="areas[0].weight"
                  placeholder="默认选项"
                >
                  <template v-for="(weight, index) in mapWeight">
                    <el-option
                      :label="weight.label"
                      :value="weight.val"
                      :key="index"
                    ></el-option>
                  </template>
                </el-select>
              </el-form-item>
              <el-form-item
                class="small"
                label="字体颜色："
              >
                <el-color-picker v-model="areas[0].color"></el-color-picker>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane
            label=" 小时 "
            name="hour"
          >
            <el-form label-width="100px">
              <el-form-item
                class="small"
                label="是否显示："
              >
                <el-switch
                  controls-position="left"
                  v-model="areas[1].show"
                ></el-switch>
              </el-form-item>
              <el-form-item
                class="small"
                label="字体大小："
              >
                <el-slider
                  v-model="areas[1].font"
                  :min="20"
                  :max="90"
                ></el-slider>
              </el-form-item>
              <el-form-item
                class="small"
                label="字体粗细："
              >
                <el-select
                  v-model="areas[1].weight"
                  placeholder="默认选项"
                >
                  <template v-for="(weight, index) in mapWeight">
                    <el-option
                      :label="weight.label"
                      :value="weight.val"
                      :key="index"
                    ></el-option>
                  </template>
                </el-select>
              </el-form-item>
              <el-form-item
                class="small"
                label="字体颜色："
              >
                <el-color-picker v-model="areas[1].color"></el-color-picker>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane
            label=" 分钟 "
            name="minute"
          >
            <el-form label-width="100px">
              <el-form-item
                class="small"
                label="是否显示："
              >
                <el-switch
                  controls-position="left"
                  v-model="areas[2].show"
                ></el-switch>
              </el-form-item>
              <el-form-item
                class="small"
                label="字体大小："
              >
                <el-slider
                  v-model="areas[2].font"
                  :min="20"
                  :max="90"
                ></el-slider>
              </el-form-item>
              <el-form-item
                class="small"
                label="字体粗细："
              >
                <el-select
                  v-model="areas[2].weight"
                  placeholder="默认选项"
                >
                  <template v-for="(weight, index) in mapWeight">
                    <el-option
                      :label="weight.label"
                      :value="weight.val"
                      :key="index"
                    ></el-option>
                  </template>
                </el-select>
              </el-form-item>
              <el-form-item
                class="small"
                label="字体颜色："
              >
                <el-color-picker v-model="areas[2].color"></el-color-picker>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane
            label=" 秒数 "
            name="second"
          >
            <el-form label-width="100px">
              <el-form-item
                class="small"
                label="是否显示："
              >
                <el-switch
                  controls-position="left"
                  v-model="areas[3].show"
                ></el-switch>
              </el-form-item>
              <el-form-item
                class="small"
                label="字体大小："
              >
                <el-slider
                  v-model="areas[3].font"
                  :min="20"
                  :max="90"
                ></el-slider>
              </el-form-item>
              <el-form-item
                class="small"
                label="字体粗细："
              >
                <el-select
                  v-model="areas[3].weight"
                  placeholder="默认选项"
                >
                  <template v-for="(weight, index) in mapWeight">
                    <el-option
                      :label="weight.label"
                      :value="weight.val"
                      :key="index"
                    ></el-option>
                  </template>
                </el-select>
              </el-form-item>
              <el-form-item
                class="small"
                label="字体颜色："
              >
                <el-color-picker v-model="areas[3].color"></el-color-picker>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="primary"
        @click="dialogShow = false"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

import dragArea from '@/utils/dragarea.js'

interface IMapWeight {
  val: number,
  label: string
}

@Component({
  name: 'TimeoutItem'
})
export default class TimeoutItem extends Vue {
  @Prop({ default: false })
  private show?: Boolean

  @Prop({ default: '' })
  private img?: string

  @Prop({ default: '' })
  private end?: string

  @Prop({ default: null })
  private times?: Array<any>

  private dialogShow: Boolean = this.show || false
  private currentTab: string = 'day'
  private mapKey: Array<string> = ['day', 'hour', 'minute', 'second']
  private mapWeight: Array<IMapWeight> = [
        {
          val: 200,
          label: 'Extra Light (Thin)'
        }, {
          val: 300,
          label: 'Light'
        }, {
          val: 400,
          label: 'Regular (Normal)'
        }, {
          val: 500,
          label: 'Medium'
        }, {
          val: 600,
          label: 'Semi Bold'
        }, {
          val: 700,
          label: 'Bold'
        }, {
          val: 800,
          label: 'Extra Bold'
        }
      ]
  private areas: Array<any> = this.times || []
  private counts: any = this.countTime()

  @Watch('show')
  private watchShow(isShow: Boolean) {
    if (isShow) {
      this.dialogShow = isShow
      this.$nextTick(() => (dragArea as any).init({
        container: 'timesMap',
        moveAdd: false,
        clickcallback: (area: any): void => {
          this.currentTab = area.dataset.tab
        },
        dragpointcallback: (area: any): void => {
          const tab: string = area.dataset.tab
          this.currentTab = tab
          const idx: number = this.mapKey.indexOf(tab)
          this.areas[idx].x = parseInt(area.style.left)
          this.areas[idx].y = parseInt(area.style.top)
          this.areas[idx].w = parseInt(area.style.width)
          this.areas[idx].h = parseInt(area.style.height)
        },
        dragareacallback: (area: any): void => {
          const tab: string = area.dataset.tab
          this.currentTab = tab
          const idx: number = this.mapKey.indexOf(tab)
          this.areas[idx].x = parseInt(area.style.left)
          this.areas[idx].y = parseInt(area.style.top)
          this.areas[idx].w = parseInt(area.style.width)
          this.areas[idx].h = parseInt(area.style.height)
        }
      }))
    }
  }

  @Watch('end')
  private watchEnd (): void {
    this.counts = this.countTime()
  }

  @Watch('times', { deep: true })
  private watchTimes (val: Array<any>): void {
    this.areas = val
    if (!val[1].show) {
      val[0].show = false
    }
    if (!val[2].show) {
      val[0].show = false
      val[1].show = false
    }
    if (!val[3].show) {
      val[0].show = false
      val[1].show = false
      val[2].show = false
    }
    if (!val[0].show &&
      !val[1].show &&
      !val[2].show &&
      !val[3].show) {
      this.$alert('至少需要显示一个数字！')
      val[3].show = true
    }

    if (val[0].show) {
      val[1].show = true
      val[2].show = true
      val[3].show = true
    }
    if (val[1].show) {
      val[2].show = true
      val[3].show = true
    }
    if (val[2].show) {
      val[3].show = true
    }
  }

  private countTime (): object {
    const ret = {
      day: '00',
      hour: '00',
      allHour: '00',
      minute: '00',
      allMinute: '00',
      second: '00',
      allSecond: '00'
    }
    if (this.end) {
      const time: number = new Date().getTime()
      const sTime: number = new Date(this.end.replace(/-/g, '/')).getTime()
      const ms: number = sTime - time
      if (ms < 0) {
        return ret
      } else {
        let day, hour, allHour, minute, allMinute, second, allSecond
        day = Math.floor(ms / 1000 / 60 / 60 / 24)
        day = day < 10 ? '0' + day : day

        hour = Math.floor(ms / 1000 / 60 / 60 % 24)
        hour = hour < 10 ? '0' + hour : hour
        allHour = Math.floor(ms / 1000 / 60 / 60)
        allHour = allHour < 10 ? '0' + allHour : allHour

        minute = Math.floor(ms / 1000 / 60 % 60)
        minute = minute < 10 ? '0' + minute : minute
        allMinute = Math.floor(ms / 1000 / 60)
        allMinute = allMinute < 10 ? '0' + allMinute : allMinute

        second = Math.floor(ms / 1000 % 60)
        second = second < 10 ? '0' + second : second
        allSecond = Math.floor(ms / 1000)
        allSecond = allSecond < 10 ? '0' + allSecond : allSecond

        return {
          day: day,
          hour: hour,
          allHour: allHour,
          minute: minute,
          allMinute: allMinute,
          second: second,
          allSecond: allSecond
        }
      }
    }
    return ret
  }

  private changTimes (tab: any): void {
    this.currentTab = tab.name
  }

  vgetStyle (style: any): string {
    const ret: Array<string> = []
    const dis: string = style.show ? 'block' : 'none'
    ret.push('display:' + dis)
    ret.push('left:' + style.x + 'px')
    ret.push('top:' + style.y + 'px')
    ret.push('width:' + style.w + 'px')
    ret.push('height:' + style.h + 'px')
    ret.push('line-height:' + style.h + 'px')
    return ret.join(';')
  }

  private getFontStyle (style: any): string {
    const ret: Array<string> = []
    ret.push('font-size:' + style.font + 'px')
    ret.push('font-weight:' + style.weight)
    ret.push('color:' + style.color)
    return ret.join(';')
  }
}
</script>

<style lang="scss">
#timoutItem {
  .el-dialog__body {
    padding: 0 10px 0 10px !important;

    .el-form-item {

      &.small {
        &.hide {
          display: none;
        }
        &.edit {
          color: #2aa7ff;
          border: 1px dashed #2aa7ff;
          width: 360px;
          padding: 5px 0 5px 0;
        }
      }
    }

    .area-container {
      position: relative;
      display: inline-block;
      width: 100%;
      margin: 0 auto;

      .area-img {
        display: block;
        width: 100%;
        height: auto;
      }

      .crop-box {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        box-sizing: border-box;
        direction: ltr;
        font-size: 0;
        line-height: 0;
        touch-action: none;
        user-select: none;

        &.active {
          border: 1px solid #39f;

          .crop-box-content {
            border: 0;
          }
          .cropper-point {
            display: block;
          }
        }

        .crop-box-content {
          position: relative;
          width: 100%;
          height: 100%;
          border: 1px solid #fff;
          cursor: move;
        }

        .crop-box-tips {
          position: absolute;
          left: 0;
          top: 0;
          font-size: 14px;
          color: #fff;
          background-color: #2aa7ff;
          width: 15px;
          height: 15px;
          line-height: 1;
        }

        .cropper-point {
          display: none;
          position: absolute;
          background-color: #39f;
          height: 6px;
          opacity: .75;
          width: 6px;
          box-sizing: border-box;

          &.point-e {
            cursor: ew-resize;
            margin-top: -3px;
            right: -4px;
            top: 50%;
          }
          &.point-n {
            cursor: ns-resize;
            left: 50%;
            margin-left: -3px;
            top: -4px;
          }
          &.point-w {
            cursor: ew-resize;
            left: -4px;
            margin-top: -3px;
            top: 50%;
          }
          &.point-s {
            bottom: -4px;
            cursor: s-resize;
            left: 50%;
            margin-left: -3px;
          }
          &.point-ne {
            cursor: nesw-resize;
            right: -4px;
            top: -4px;
          }
          &.point-nw {
            cursor: nwse-resize;
            left: -4px;
            top: -4px;
          }
          &.point-sw {
            bottom: -4px;
            cursor: nesw-resize;
            left: -4px;
          }
          &.point-se {
            bottom: -4px;
            right: -4px;
            cursor: nwse-resize;
          }
        }
      }
    }

    .form-right-list {
      width: 362px;
      margin-left: 30px;
      overflow-y: auto;
      .right-list-span {
        display: inline-block;
        vertical-align: middle;
        width: 190px;
        line-height: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &.warn {
          color: #f32e37;
        }
      }
      .right-list-a {
        margin-left: 10px;
        cursor: pointer;
        &:hover {
          color: #2aa7ff;
        }
      }
    }
  }
}
</style>
