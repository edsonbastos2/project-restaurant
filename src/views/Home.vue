<template>
  <div class="container">
      <CategoryMenu/>
      <ItemList/>
  </div>
</template>

<script>
import CategoryMenu from '@/components/CategoryMenu.vue'
import ItemList from '@/components/Item-List.vue'

export default {
  components:{
    CategoryMenu,
    ItemList
  },
  
};
</script>

<style lang="less" scoped>
.container{
  display: grid;
  grid-template-columns: 140px 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
</style>
