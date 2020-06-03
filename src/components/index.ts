import BaseText from '@/components/common/text.vue'
import BaseImage from '@/components/common/image.vue'
import BaseForm from '@/components/common/form.vue'
import PageTitle from '@/components/common/pageTitle.vue'
import PageParagraph from '@/components/common/pageParagraph.vue'
import PageIntro from '@/components/common/pageIntro.vue'
import Timeout from '@/components/common/timeout.vue'
import FloorTitle from '@/components/common/floorTitle.vue'
import PageFaq from '@/components/common/pageFaq.vue'

import BottomMenu from '@/components/navLink/bottomMenu.vue'
import GridMenu from '@/components/navLink/gridMenu.vue'
import FloorMenu from '@/components/navLink/floorMenu.vue'

import LayoutRepeat from '@/components/lay/layoutRepeat.vue'
import LayoutLeft from '@/components/lay/layoutLeft.vue'
import LayoutRight from '@/components/lay/layoutRight.vue'

import GoodsSearch from '@/components/shopping/goodsSearch.vue'
import Coupon from '@/components/shopping/coupon.vue'
import Goods from '@/components/shopping/goods.vue'

import SwiperBanner from '@/components/swiper/swiperBanner.vue'
import ScrollLeft from '@/components/swiper/scrollLeft.vue'

import HorizontalList from '@/components/list/horizontalList.vue'
import VerticalList from '@/components/list/verticalList.vue'

import NewsMarquee from '@/components/animate/newsMarquee.vue'

export default {
  install (Vue: any) {
    Vue.component('BaseText', BaseText)
    Vue.component('BaseImage', BaseImage)
    Vue.component('BaseForm', BaseForm)
    Vue.component('PageTitle', PageTitle)
    Vue.component('PageParagraph', PageParagraph)
    Vue.component('PageIntro', PageIntro)
    Vue.component('Timeout', Timeout)
    Vue.component('FloorTitle', FloorTitle)
    Vue.component('PageFaq', PageFaq)

    Vue.component('BottomMenu', BottomMenu)
    Vue.component('GridMenu', GridMenu)
    Vue.component('FloorMenu', FloorMenu)

    Vue.component('LayoutRepeat', LayoutRepeat)
    Vue.component('LayoutLeft', LayoutLeft)
    Vue.component('LayoutRight', LayoutRight)

    Vue.component('GoodsSearch', GoodsSearch)
    Vue.component('Coupon', Coupon)
    Vue.component('Goods', Goods)

    Vue.component('SwiperBanner', SwiperBanner)
    Vue.component('ScrollLeft', ScrollLeft)

    Vue.component('HorizontalList', HorizontalList)
    Vue.component('VerticalList', VerticalList)

    Vue.component('NewsMarquee', NewsMarquee)
  }
}
