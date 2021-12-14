<template>
    <div class="item-list">
        <Item v-for="item in listItem" :key="item.id" :item="item"/>
    </div>
</template>

<script>
import {api} from '@/services'
import Item from './Item.vue'
export default {
    components:{
        Item
    },
   created(){
    this.getProducts()
  },
  data(){
      return {
          listItem:[]
      }
  },
  methods:{
    getProducts(){
     api.get('burguers').then(resp => this.listItem = resp.data)
     
    }
  }
}
</script>

<style lang="less" scoped>
.item-list{
    margin: 40px;
    display: flex;
    @media (max-width: 768px) {
    margin: 20px;
    flex-wrap: wrap;
  }
}
</style>