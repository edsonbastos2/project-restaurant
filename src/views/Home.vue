<template>
  <div class="container">
      <CategoryMenu/>
  </div>
</template>

<script>
import CategoryMenu from '@/components/CategoryMenu.vue'
import {api} from '@/services'

export default {
  components:{
    CategoryMenu
  },
  created(){
    this.getProducts()
  },
  methods:{
    getProducts(){
     api.get('burguers').then(resp => console.log(resp))
     
    }
  }
};
</script>

<style lang="less" scoped>
</style>
