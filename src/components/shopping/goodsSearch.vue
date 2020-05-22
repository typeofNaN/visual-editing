<template>
  <div
    :class="['comp-content', component.active ? 'active' : '']"
    :style="getStyle"
  >
    <div
      class="search-box"
      :style="{
        flexDirection: iconPosition ? 'row' : 'row-reverse',
        borderRadius: (getSearchBoxHeight / 2) + 'px'
      }"
    >
      <input
        class="search_input"
        readonly
        type="text"
        :style="{
          height: getSearchBoxHeight + 'px',
          borderRadius: (getSearchBoxHeight / 2) + 'px'
        }"
        placeholder="please enter..."
      >
      <i class="el-icon-search"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsSearch',
  props: {
    component: {
      type: Object,
      default: null
    }
  },
  computed: {
    getStyle () {
      const ret = []
      this.component.style.forEach((item) => {
        const unit = item.unit || ''
        if (item.val) {
          if (Array.isArray(item.attr)) {
            item.attr.forEach((atr, i) => {
              ret.push(atr + ':' + item.val[i])
            })
          } else {
            ret.push(item.attr + ':' + item.val + unit)
          }
        }
      })
      return ret.join(';')
    },
    getSearchBoxHeight () {
      let arr = this.component.others.config.find(i => i.attr === 'height')
      return arr.val
    },

    iconPosition () {
      let bool = true
      let arr = this.component.others.config.find(i => i.attr === 'position')

      if (arr.val === 'left') {
        bool = false
      }

      return bool
    }
  }
}
</script>

<style lang="scss" scoped>
.comp-content {
  background-repeat: no-repeat;
}
.search-box {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #909299;
  background-color: #fff;

  .search_input {
    border: none;
    outline: none;
    width: 100%;
    text-indent: 10px;
    cursor: pointer;
  }

  i {
    margin: 0 10px;
  }
}
</style>
