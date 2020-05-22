<template>
  <div>
    <template v-if="items && items.length">
      <div
        class="form-list-panel"
        v-for="(item, index) in items"
        :key="index"
      >
        <el-form-item
          class="small"
          label="数字标识："
        >
          <el-input
            v-model="item.label"
            :maxlength="8"
            placeholder="数字标识"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="small"
          label="文本内容："
        >
          <el-input
            type="textarea"
            v-model="item.content"
            :rows="4"
            placeholder="段落文案"
          ></el-input>
        </el-form-item>
        <div class="list-item-opt">
          <a
            v-if="index !== 0"
            href="javascript:;"
            @click="upInput(index)"
          >
            <i class="el-icon-arrow-up"></i>
          </a>
          <a
            v-if="index !== items.length - 1"
            href="javascript:;"
            @click="downInput(index)"
          >
            <i class="el-icon-arrow-down"></i>
          </a>
          <a
            v-if="index > 0"
            href="javascript:;"
            @click="delInput(index)"
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
      @click="addInput"
    >添加段落项</el-button>
  </div>
</template>

<script>
import util from '@/utils/tools'
import compConfig from '@/config/comp.config.ts'

export default {
  data () {
    return {
      items: this.paragraphs,
      defaultConf: util.copyObj(compConfig['page-paragraph'])
    }
  },
  props: {
    paragraphs: {
      type: Array,
      default: null
    }
  },
  methods: {
    upInput (idx) {
      const tmp = util.copyObj(this.items[idx])
      this.items.splice(idx, 1)
      this.items.splice(idx - 1, 0, tmp)
    },
    downInput (idx) {
      const tmp = util.copyObj(this.items[idx])
      this.items.splice(idx, 1)
      this.items.splice(idx + 1, 0, tmp)
    },
    delInput (idx) {
      this.items.splice(idx, 1)
    },
    addInput () {
      if (this.items.length <= 20) {
        this.items.push(util.copyObj(this.defaultConf.action.config[0]))
      } else {
        this.$alert('最多添加20个段落项！')
      }
    }
  }
}
</script>
