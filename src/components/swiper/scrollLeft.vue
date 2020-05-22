<template>
  <div
    :class="['comp-content', component.active ? 'active' : '']"
    :style="getStyle"
  >
    <section
      class="no-scroll"
      id="scroll"
    >
      <div class="scroll-content">
        <div
          v-for="(item, index) in scrolls"
          :key="index"
          class="scroll-item"
        >
          <img
            v-if="item.val"
            :src="item.val"
          >
          <div
            v-else
            class="image-placeholder"
          >
            <i class="el-icon-picture-outline"></i>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import IScroll from 'iscroll'

export default {
  name: 'ScrollLeft',
  props: {
    component: {
      type: Object
    }
  },
  data () {
    return {
      noScroll: null,
      scrolls: this.component.action.config
    }
  },
  computed: {
    getStyle () {
      const ret = []
      this.component.style.forEach((item) => {
        const unit = item.unit || ''
        item.val && ret.push(item.attr + ':' + item.val + unit)
      })
      return ret.join(';')
    }
  },
  watch: {
    component: {
      handler () {
        this.scrolls = this.component.action.config
        // 每改变项都需要重新初始化iscroll对象
        this.initScroll()
      },
      deep: true
    }
  },
  mounted () {
    this.initScroll()
  },
  methods: {
    initScroll () {
      this.noScroll = null
      setTimeout(() => {
        this.noScroll = new IScroll('#scroll', {
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

.no-scroll {
  position: relative;
  width: 96%;
  padding: 10px 2%;
  height: 100px;
  box-sizing: content-box;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  text-align: center;

  .scroll-content {
    position: absolute;
    white-space: nowrap;
    padding-right: 20px;
    box-sizing: content-box;
    transform: translateZ(0);
    text-size-adjust: none;
    font-size: 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    z-index: 1;

    .scroll-item {
      display: inline-block;
      width: 100px;
      height: 100px;
      flex-shrink: 0;
      margin-right: 8px;
      vertical-align: top;
      background: #FFF;
      box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, .15);
      font-size: 0;

      > img {
        display: block;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        -webkit-user-drag: none;
      }

      > .image-placeholder {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100px;
        border: 1px solid #e8e8e8;
        box-sizing: border-box;

        > i {
          font-size: 32px;
        }
      }
    }
  }
}
</style>
