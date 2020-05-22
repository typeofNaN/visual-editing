<template>
  <div :class="['comp-content', component.active ? 'active' : '']">
    <div
      class="floor-menu"
      :style="{ backgroundColor: backgroundColor }"
    >
      <div
        id="floor_nav_menu"
        class="floor-menu-list"
      >
        <div class="floor-menu-inner">
          <a
            v-for="(item, index) in items"
            :key="index"
            class="floor-item"
            href="javascript:;"
            :style="getItemStyle(index)"
          >{{ item.text }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IScroll from 'iscroll'

export default {
  name: 'FloorMenu',
  props: {
    component: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      items: this.component.action.config,
      backgroundColor: this.component.style[0].val,
      fillColor: this.component.style[2].val,
      noScroll: null
    }
  },
  watch: {
    component: {
      handler () {
        this.items = this.component.action.config
        this.backgroundColor = this.component.style[0].val
        this.fillColor = this.component.style[2].val
      },
      deep: true
    }
  },
  mounted () {
    this.initScroll()
  },
  methods: {
    getItemStyle (idx) {
      const ret = []
      if (idx === 0) {
        ret.push('background-color:' + this.component.style[1].val)
        ret.push('color:' + this.component.style[3].val)
      } else {
        ret.push('background-color:' + this.component.style[0].val)
        ret.push('color:' + this.component.style[2].val)
      }
      return ret.join(';')
    },
    initScroll () {
      this.noScroll = null
      setTimeout(() => {
        this.noScroll = new IScroll('#floor_nav_menu', {
          scrollX: true,
          scrollY: false,
          eventPassthrough: true,
          preventDefault: false
        })
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.comp-content {
  overflow-x: hidden;
}

.floor-menu {
  display: flex;
  position: relative;
  width: 100%;
  height: 40px;
  line-height: 40px;

  .floor-menu-list {
    width: 100%;
    height: 40px;
    // overflow-y: hidden;
    // overflow-x: auto;
    -webkit-overflow-scrolling: touch;

    .floor-menu-inner {
      display: flex;
      position: relative;
      padding: 0 8px;
      height: 40px;
      white-space: nowrap;
      transform: translateZ(0);

      .floor-item {
        display: block;
        padding: 0 16px;
        line-height: 40px;
        font-size: 14px;
        text-decoration: none;
      }
    }
  }
}
</style>
