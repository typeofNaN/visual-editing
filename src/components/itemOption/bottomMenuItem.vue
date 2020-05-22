<template>
  <div>
    <template v-if="menus && menus.length">
      <div
        v-for="(menu, index) in menus"
        :key="index"
        class="form-list-panel"
      >
        <upload
          :label="'图片' + (index + 1)"
          :index="index"
          :item="menu"
          v-on:uploadSuccess="uploadSuccess"
        ></upload>
        <template v-if="menu.click">
          <el-form-item
            class="small"
            label="跳转到："
          >
            <span style="word-break: break-all;">{{ menu.click.href }}</span>
          </el-form-item>
        </template>
        <el-form-item
          class="small"
          label="链接文字："
        >
          <el-input
            v-model="menu.titleName"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="small"
          label="点击配置："
        >
          <el-button
            icon="el-icon-edit"
            round
            @click="showClick(menu, index)"
          >配置跳转</el-button>
        </el-form-item>
        <div class="list-item-opt">
          <a
            v-if="index !== 0"
            href="javascript:;"
            @click="upItem(index)"
          >
            <i class="el-icon-arrow-up"></i>
          </a>
          <a
            v-if="index !== menus.length - 1"
            href="javascript:;"
            @click="downItem(index)"
          >
            <i class="el-icon-arrow-down"></i>
          </a>
          <a
            v-if="index > 0"
            href="javascript:;"
            @click="delItem(index)"
          >
            <i class="el-icon-delete"></i>
          </a>
        </div>
      </div>
    </template>
    <el-button
      icon="el-icon-plus"
      style="margin-top:15px;"
      round
      @click="addItem"
    >添加导航项</el-button>
  </div>
</template>

<script>
import util from '@/utils/tools'
import compConfig from '@/config/comp.config.ts'
import upload from '@/components/upload.vue'

export default {
  data () {
    return {
      defaultConf: util.copyObj(compConfig['bottom-menu']),
      menus: this.items
    }
  },
  components: {
    upload
  },
  props: {
    items: {
      type: Array,
      default: null
    }
  },
  watch: {
    items: {
      handler (val) {
        this.menus = val
      },
      deep: true
    }
  },
  methods: {
    showClick (banner, idx) {
      // 底部导航只可配置外链
      this.$evt.$emit('click:show', idx, ['outside'])
    },
    upItem (idx) {
      const tmp = util.copyObj(this.menus[idx])
      this.menus.splice(idx, 1)
      this.menus.splice(idx - 1, 0, tmp)
    },
    downItem (idx) {
      const tmp = util.copyObj(this.slides[idx])
      this.menus.splice(idx, 1)
      this.menus.splice(idx + 1, 0, tmp)
    },
    delItem (idx) {
      this.menus.splice(idx, 1)
    },
    addItem () {
      if (this.menus.length < 10) {
        this.menus.push(util.copyObj(this.defaultConf.action.config[0]))
      } else {
        this.$alert('最多添加5个导航项！')
      }
    },
    uploadSuccess (item, img, idx) {
      console.log('uploadSuccess', item)
    }
  }
}
</script>
