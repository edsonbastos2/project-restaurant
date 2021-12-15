<template>
    <div class="item-list">
        <Loading v-if="isLoading"/>
        <Item v-for="item in listItem" :key="item.id" :item="item"/>
    </div>
</template>

<script>
import {api} from '@/services'
import Item from './Item.vue'
import Loading from './Loading.vue'
export default {
    components:{
        Item,
        Loading
    },
   
  data(){
      return {
          listItem:[],
          isLoading: false
      }
  },
  created(){},
  computed:{
    $selectCategory:{
      get(){
        return this.$store.state.selectedCategory
      }
    }
  },
  methods:{
    getProducts(){
      this.isLoading = true
      this.listItem = []
      setTimeout(() => {
        api.get(`${this.$selectCategory}`).then(resp => this.listItem = resp.data)
        this.isLoading = false
      }, 2000)
    }
  },
  watch:{
    $selectCategory(){
      this.getProducts()
    }
  }
}
</script>

<style lang="less" scoped>
.item-list{
    margin: 40px;
    display: flex;
    width: 100%;
    @media (max-width: 768px) {
    margin: 20px;
    flex-wrap: wrap;
  }
}
</style>