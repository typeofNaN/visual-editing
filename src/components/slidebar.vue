<template>
  <div class="app-sidebar">
    <div
      class="sidebar-menu-group"
      v-for="(menu, index) in menuData"
      :key="index"
    >
      <div
        class="menu-group-title"
        @click="menu.collapse = !menu.collapse"
      >
        {{menu.title}}
        <i :class="[!menu.collapse ? 'el-icon-remove-outline' : 'el-icon-circle-plus-outline']"></i>
      </div>
      <el-collapse-transition>
        <div
          v-show="!menu.collapse"
          class="menu-group-list"
        >
          <div
            v-for="(item, idx) in menu.items"
            :key="idx"
            class="menu-item"
            :data-key="item.key"
            draggable="true"
            @dragstart="menuDrag($event, item.key)"
          >
            <div class="item-icon-box">
              <!-- <i
                :class="item.icon"
                aria-hidden="true"
              ></i> -->
              <svg-icon :icon-class="item.icon" />
            </div>
            <p class="item-text-box">{{item.text}}</p>
          </div>
        </div>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import menuConfig from '@/config/slideMenuConfig'

interface IMenuConfig {
  title: string,
  collapse: Boolean,
  items: Array<IMenuItem>
}

interface IMenuItem {
  key: string,
  text: string,
  icon: string
}

@Component({
  name: 'AppSide'
})
export default class AppSide extends Vue {
  private menuData: Array<IMenuConfig> = menuConfig

  private menuDrag (e: any, key: string) {
    e.dataTransfer.setData('cmp-type', key)
  }
}
</script>

<style lang="scss" scoped>
.app-sidebar {
  padding-left: 14px;
  padding-bottom: 20px;
  box-sizing: border-box;
  overflow-y: auto;

  .sidebar-menu-group {
    position: relative;

    .menu-group-title {
      position: relative;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      font-size: 14px;

      > i {
        position: absolute;
        right: 12px;
        top: 14px;
        color: #999;
      }
    }
    .menu-group-list {
      overflow: hidden;

      .menu-item {
        position: relative;
        box-sizing: content-box;
        float: left;
        width: 85px;
        height: 85px;
        background: #f4f5f6;
        color: #303133;
        border-right: 1px solid #fff;
        border-bottom: 1px solid #fff;
        cursor: move;
        z-index: 0;

        &:hover {
          opacity: .6;
        }

        .item-icon-box {
          text-align: center;
          margin-top: 18px;
          height: 32px;

          > svg {
            width: 24px;
            height: 24px;
          }
        }

        .item-text-box {
          text-align: center;
          height: 20px;
          line-height: 20px;
          margin: 0;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
