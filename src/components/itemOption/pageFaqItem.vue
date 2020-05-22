<template>
  <div>
    <template v-if="items && items.length">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="form-list-panel"
      >
        <upload
          :label="'头像' + (index + 1)"
          :index="index"
          :item="item"
        ></upload>
        <el-form-item
          class="small"
          label="昵称："
        >
          <el-input
            v-model="item.nickName"
            :maxlength="32"
            placeholder="用户昵称"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="small"
          label="聊天内容："
        >
          <el-input
            type="textarea"
            v-model="item.text"
            :rows="4"
            placeholder="段落文案"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="small"
          label="本人身份："
        >
            <el-radio
              v-model="item.isAuthor"
              :label="1"
            >是</el-radio>
            <el-radio
              v-model="item.isAuthor"
              :label="0"
            >否</el-radio>
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
import upload from '@/components/upload.vue'

export default {
  data () {
    return {
      items: this.paragraphs,
      defaultConf: util.copyObj(compConfig['page-paragraph'])
    }
  },
  components: {
    upload
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
