<template>
  <div
    :class="['comp-content', component.active ? 'active' : '']"
    :style="getStyle"
  >
    <div class="page-list">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="page-list-item"
        :style="getItemStyle('goods-list-item')"
      >
        <div class="goods_box">
          <div
            class="page-list-item__hd"
            :style="getItemStyle('goods-list-logo_')"
          >
            <div class="page-list-item__img">
              <img :src="item.val" alt="">
            </div>
          </div>
          <div class="page-list-item__bd">
            <div
              class="page-list-item__title"
              :style="getItemStyle('goods-list-title_')"
            >{{ item.name }}</div>
            <p
              class="page-list-item__desc"
              :style="getItemStyle('goods-list-price_')"
            >KS {{ item.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Goods',
  props: {
    component: {
      type: Object
    }
  },
  data () {
    return {
      list: this.component.action.config
    }
  },
  computed: {
    getStyle () {
      const ret = []
      this.component.style.forEach((item) => {
        const unit = item.unit || ''
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
  },
  methods: {
    getItemStyle (key) {
      const ret = []
      this.component.others.config.forEach((item) => {
        const isItem = item.attr.indexOf(key)
        const idx = item.attr.indexOf('_')
        if (isItem === 0) {
          const unit = item.unit || ''
          item.val && ret.push(item.attr.substring(idx + 1, item.attr.length) + ':' + item.val + unit)
        }
      })
      return ret.join(';')
    }
  }
}
</script>

<style lang="scss" scoped>
.comp-content {
  background-repeat: no-repeat;
}

.page-list {
  // background-color: #fff;

  .page-list-item {
    position: relative;
    display: inline-block;
    text-align: left;
    width: 50%;
    box-sizing: border-box;

    .goods_box {
      border-radius: 10px;
      overflow: hidden;
      background-color: #fff;
      box-shadow: 0 0 2px 1px rgba(0, 0, 0, .15);
    }

    .page-list-item__hd {
      margin-bottom: .8em;
      text-align: center;

      .page-list-item__img {
        margin: 0 auto;
        width: 100%;
        height: 100%;
        background-color: #e9e9eb;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

        img {
          width: 100%;
        }
      }
    }

    .page-list-item__bd {
      min-width: 60px;

      .page-list-item__title {
        margin-bottom: .3em;
        padding: 0 10px;
        width: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        // white-space: nowrap;
        // word-wrap: normal;
        // word-wrap: break-word;
        // word-break: break-all;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        color: #333;
        font-size: 12px;
        height: 42px;
      }

      .page-list-item__desc {
        margin: 0;
        padding: 0 10px;
        line-height: 1.5;
        overflow: hidden;
        font-weight: 700;
        color: #39362b;
        font-size: 18px;
      }
    }
  }
}
</style>
