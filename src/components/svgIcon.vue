<template>
  <svg
    :class="svgClass"
    aria-hidden="true"
    v-on="$listeners"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

@Component({
  name: 'SvgIcon'
})
export default class SvgIcon extends Vue {
  @Prop({ default: '', required: true })
  private iconClass!: string

  @Prop({ default: '' })
  private className!: string

  private get iconName (): string {
    return `#icon-${this.iconClass}`
  }

  private get svgClass (): string {
    if (this.className) {
      return 'svg-icon ' + this.className
    } else {
      return 'svg-icon'
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>
