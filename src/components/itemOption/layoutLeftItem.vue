<template>
  <div>
    <template v-if="items && items.length">
      <div
        v-for="(item, index) in items"
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
          label="图片位置："
        >
          {{ item.text }}
        </el-form-item>
        <template v-if="item.click">
          <el-form-item
            class="small"
            label="跳转到："
          >
            <span style="word-break: break-all;">{{ item.click.href }}</span>
          </el-form-item>
        </template>
        <el-form-item
          class="small"
          label="点击配置："
        >
          <el-button
            icon="el-icon-edit"
            round
            @click="showClick(item, index)"
          >配置跳转</el-button>
        </el-form-item>
      </div>
    </template>
  </div>
</template>

<script>
import util from '@/utils/tools'
import compConfig from '@/config/comp.config.ts'
import upload from '@/components/upload.vue'

export default {
  data () {
    return {
      defaultConf: util.copyObj(compConfig['grid-menu']),
      items: this.grids
    }
  },
  components: {
    upload
  },
  props: {
    grids: {
      type: Array,
      default: null
    }
  },
  watch: {
    grids: {
      handler (val) {
        this.items = val
      },
      deep: true
    }
  },
  methods: {
    showClick (banner, idx) {
      this.$evt.$emit('click:show', idx, ['outside'])
    }
  }
}
</script>
