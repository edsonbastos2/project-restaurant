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
  created(){
    this.getProducts()
  },
  computed:{
    $selectCategory(){
        return this.$store.state.selectedCategory
    }
  },
  methods:{
    getProducts(){
      this.isLoading = true
      this.listItem = []
      setTimeout(() => {
        api.get(`${this.$selectCategory}`).then(resp => this.listItem = resp.data)
        this.isLoading = false
      }, 1000)
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
    width: 100%;
    margin: 50px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;

    @media (max-width: 768px) {
      flex-wrap: wrap;
      margin: 0;
      padding: 20px;
      align-content: center;
  }
}
</style>