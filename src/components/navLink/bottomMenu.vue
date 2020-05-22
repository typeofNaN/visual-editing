<template>
  <div
    class="bottom-menu"
    :style="getStyle"
  >
    <div
      v-for="(item, index) in menus"
      :key="index"
      class="menu-item"
      :style="{ width: 100 / menus.length + '%' }"
    >
      <img v-if="item.val" :src="item.val">
      <p v-if="item.val">{{ item.titleName }}</p>
      <div
        v-else
        class="image-placeholder"
      >
        <i class="el-icon-help"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomMenu',
  props: {
    component: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      menus: this.component.action.config
    }
  },
  watch: {
    component: {
      handler () {
        this.menus = this.component.action.config
      },
      deep: true
    }
  },
  computed: {
    getStyle () {
      const ret = []
      this.component.style.forEach((item) => {
        if (item.val) {
          const unit = item.unit || ''
          ret.push(item.attr + ':' + item.val + unit)
        }
      })
      return ret.join(';')
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom-menu {
  display: flex;
  justify-content: space-between;
  align-content: center;
  -webkit-box-pack: justify;
  -webkit-box-align: center;

  .menu-item {
    display: block;
    flex: 1;
    text-align: center;
    box-sizing: border-box;

    > img {
      height: 60%;
      width: auto;
    }

    > p {
      font-size: 12px;
    }

    > .image-placeholder {
      width: 100%;
      height: 100%;
      text-align: center;
      border-left: 1px solid #e8e8e8;
      display: flex;
      flex-direction: column;
      justify-content: center;

      &:first-child {
        border-left: 0;
      }

      > i {
        color: #83c0ff;
        font-size: 40px;
        vertical-align: middle;
      }
    }
  }
}
</style>
