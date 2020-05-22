<template>
  <div class="app-option">
    <el-form
      ref="options-form"
      label-width="80px"
      size="mini"
    >
      <div>
        <h2>【页面配置】</h2>
        <form-item
          v-for="(item, index) in option.base"
          :item="item"
          :index="index"
          :key="index"
        ></form-item>
      </div>
      <div>
        <h3><i class="el-icon-setting"></i> 样式配置</h3>
        <form-item
          v-for="(item, index) in option.style"
          :item="item"
          :index="index"
          :key="index"
        ></form-item>
      </div>
      <!-- <template>
        <h3><i class="el-icon-setting"></i> 分享配置</h3>
        <form-item
          v-for="(item, index) in option.weixin"
          :item="item"
          :index="index"
          :key="index"
        ></form-item>
      </template> -->
    </el-form>
  </div>
</template>

<script>
import formItem from './formItem.vue'

export default {
  name: 'AppPageOption',
  components: {
    formItem
  },
  props: {
    option: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss">
.app-option {
  width: 360px;
  padding: 0 10px 0 5px;
  overflow: auto;

  h2 {
    margin: 13px 0;
    font-size: 14px;
  }

  .el-form {
    padding-bottom: 30px;

    h3 {
      margin-bottom: 10px;
      background-color: #f2f3f4;
      padding: 5px 10px;
      font-size: 14px;
    }

    .el-form-item.small {
      margin-bottom: 5px;

      .font-set {
        display: inline-block;
        width: 28px;
        height: 28px;
        text-align: center;
        cursor: pointer;
        &.checked {
          color: #fff;
          background-color: #333;
        }
      }

      .el-date-editor.el-input {
        width: 186px;
        .el-input__inner {
          padding-left: 30px !important;
        }
      }

      .el-input__inner {
        padding: 0 10px;
      }

      .el-textarea__inner {
        padding: 5px 10px;
      }

      .el-form-item__label {
        padding-right: 0;
      }
    }
  }
}
</style>
