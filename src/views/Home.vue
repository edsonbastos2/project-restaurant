<template>
  <div class="container">
      <CategoryMenu/>
      <ItemList/>
      <Cart/>
  </div>
</template>

<script>
import CategoryMenu from '@/components/CategoryMenu.vue'
import ItemList from '@/components/Item-List.vue'
import Cart from '@/components/Cart.vue'

export default {
  components:{
    CategoryMenu,
    ItemList,
    Cart
  },
  
};
</script>

<style lang="less" scoped>
.container{
  display: grid;
  grid-template-columns: 140px 1fr 643px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
</style>
