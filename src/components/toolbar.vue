<template>
  <el-row class="app-toolbar">
    <el-col :span="8">
      <span>
        <i class="el-icon-mobile-phone"></i>
      </span>
    </el-col>
    <el-col :span="16">
      <div
        class="bar-btn"
        @click="saveAll"
      >
        <i class="el-icon-success"></i>
        <span>保存</span>
      </div>
      <div
        class="bar-btn"
        @click="showPreview"
      >
        <i class="el-icon-view"></i>
        <span>预览</span>
      </div>
      <div
        class="bar-btn"
        @click="reset"
      >
        <i class="el-icon-refresh"></i>
        <span>重置</span>
      </div>
      <div
        class="bar-btn"
        @click="showPageSet"
      >
        <i class="el-icon-setting"></i>
        <span>页面设置</span>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'AppToolbar',
  methods: {
    showPageSet () {
      this.$emit('showPageSet')
    },
    showPreview () {
      this.$emit('showPreview')
    },
    saveAll () {
      this.$emit('savePageSet')
    },
    reset () {
      this.$emit('reset')
    }
  }
}
</script>

<style lang="scss" scoped>
.app-toolbar {
  position: relative;
  height: 40px;
  line-height: 38px;
  background-color: #fff;
  border-bottom: 1px solid #e8e8e8;
  padding-left: 15px;

  > :last-child {
    text-align: right;
  }

  .bar-btn {
    display: inline-block;
    white-space: nowrap;
    padding: 0 16px;
    font-size: 14px;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    cursor: pointer;

    &:hover {
      background-color: #e8e8e8;
    }
  }
}
</style>
