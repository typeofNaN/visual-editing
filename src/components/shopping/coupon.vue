<template>
  <div
    :class="['comp-content', component.active ? 'active' : '']"
    :style="getStyle"
  >
    <ul class="coupon-menu">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="coupon-menu-item"
        :style="getItemStyle"
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
        <span v-if="item.text">{{ item.text }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Coupon',
  props: {
    component: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      items: this.component.action.config
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
    },
    getItemStyle () {
      const column = parseInt(this.component.base[0].val)
      const num = this.items.length > column ? 100 / column : 100 / this.items.length
      return 'width:' + num + '%;'
    }
  },
  watch: {
    component: {
      handler () {
        this.items = this.component.action.config
      },
      deep: true
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.coupon-menu {
  position: relative;
  margin: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  list-style: none;

  .coupon-menu-item {
    padding: 2px;
    display: inline-block;
    vertical-align: middle;
    list-style-type: none;

    > .image-placeholder {
      margin: 0 auto;
      width: 40px;
      height: 40px;
      line-height: 40px;
      border: 1px solid #e8e8e8;
      text-align: center;

      > i {
        font-size: 20px;
        vertical-align: middle;
      }
    }

    > img {
      display: block;
      margin: 0 auto;
      width: 100%;
      height: auto;
      -webkit-user-drag: none;
    }
  }
}
</style>
