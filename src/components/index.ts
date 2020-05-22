import BaseText from './common/text.vue'
import BaseImage from './common/image.vue'
import BaseForm from './common/form.vue'
import PageTitle from './common/pageTitle.vue'
import PageParagraph from './common/pageParagraph.vue'
import PageIntro from './common/pageIntro.vue'
import Timeout from './common/timeout.vue'
import FloorTitle from './common/floorTitle.vue'
import PageFaq from './common/pageFaq.vue'

import BottomMenu from './navLink/bottomMenu.vue'
import GridMenu from './navLink/gridMenu.vue'
import FloorMenu from './navLink/floorMenu.vue'

import LayoutRepeat from './lay/layoutRepeat.vue'
import LayoutLeft from './lay/layoutLeft.vue'
import LayoutRight from './lay/layoutRight.vue'

import GoodsSearch from './shopping/goodsSearch.vue'
import Coupon from './shopping/coupon.vue'
import Goods from './shopping/goods.vue'

import SwiperBanner from './swiper/swiperBanner.vue'
import ScrollLeft from './swiper/scrollLeft.vue'

import HorizontalList from './list/horizontalList.vue'
import VerticalList from './list/verticalList.vue'

import NewsMarquee from './animate/newsMarquee.vue'

export default {
  install (Vue: any) {
    Vue.component(BaseText.name, BaseText)
    Vue.component(BaseImage.name, BaseImage)
    Vue.component(BaseForm.name, BaseForm)
    Vue.component(PageTitle.name, PageTitle)
    Vue.component(PageParagraph.name, PageParagraph)
    Vue.component(PageIntro.name, PageIntro)
    Vue.component(Timeout.name, Timeout)
    Vue.component(FloorTitle.name, FloorTitle)
    Vue.component(PageFaq.name, PageFaq)

    Vue.component(BottomMenu.name, BottomMenu)
    Vue.component(GridMenu.name, GridMenu)
    Vue.component(FloorMenu.name, FloorMenu)

    Vue.component(LayoutRepeat.name, LayoutRepeat)
    Vue.component(LayoutLeft.name, LayoutLeft)
    Vue.component(LayoutRight.name, LayoutRight)

    Vue.component(GoodsSearch.name, GoodsSearch)
    Vue.component(Coupon.name, Coupon)
    Vue.component(Goods.name, Goods)

    Vue.component(SwiperBanner.name, SwiperBanner)
    Vue.component(ScrollLeft.name, ScrollLeft)

    Vue.component(HorizontalList.name, HorizontalList)
    Vue.component(VerticalList.name, VerticalList)

    Vue.component(NewsMarquee.name, NewsMarquee)
  }
}
