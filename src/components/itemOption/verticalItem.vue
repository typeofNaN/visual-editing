<template>
  <div>
    <template v-if="list && list.length">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="form-list-panel"
      >
        <upload
          :label="'图片' + (index + 1)"
          :index="index"
          :item="item"
        ></upload>
        <el-form-item
          class="small"
          label="标题："
        >
          <el-input
            v-model="item.title"
            :maxlength="128"
            placeholder="必填"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="small"
          label="描述："
        >
          <el-input
            v-model="item.desc"
            :maxlength="128"
            placeholder="必填"
          ></el-input>
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
            v-if="index !== list.length - 1"
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
    >添加列表项</el-button>
  </div>
</template>

<script>
import util from '@/utils/tools'
import upload from '@/components/upload.vue'
import compConfig from '@/config/comp.config.ts'

export default {
  components: {
    upload
  },
  data () {
    return {
      list: this.items,
      defaultConf: util.copyObj(compConfig['vertical-list'])
    }
  },
  props: {
    items: {
      type: Array,
      default: null
    }
  },
  methods: {
    upItem (idx) {
      const tmp = util.copyObj(this.list[idx])
      this.list.splice(idx, 1)
      this.list.splice(idx - 1, 0, tmp)
    },
    downItem (idx) {
      const tmp = util.copyObj(this.list[idx])
      this.list.splice(idx, 1)
      this.list.splice(idx + 1, 0, tmp)
    },
    delItem (idx) {
      this.list.splice(idx, 1)
    },
    addItem () {
      if (this.list.length < 20) {
        this.list.push(util.copyObj(this.defaultConf.action.config[0]))
      } else {
        this.$alert('最多添加20个列表项！')
      }
    }
  }
}
</script>
