<template>
  <div class="home">
      <CategoryMenu/>
      <ItemList/>
      <Cart v-if="isDesktop()"/>
  </div>
</template>

<script>
import CategoryMenu from '@/components/CategoryMenu.vue'
import ItemList from '@/components/Item-List.vue'
import Cart from '@/components/Cart.vue'
import Mixins from '@/mixins/mixins'

export default {
  components:{
    CategoryMenu,
    ItemList,
    Cart
  },
  mixins:[Mixins]
};
</script>

<style lang="less" scoped>
.home{
  display: grid;
  grid-template-columns: 140px 1fr 643px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
</style>
