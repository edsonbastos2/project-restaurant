<template>
    <div class="add-cart">
        <router-link to="/" class="add-cart--go-back" v-if="isMobile()">↩ Voltar</router-link>
        <Item :item="item" class="add-cart--item"/>
        <div class="add-cart--container">
            <span>Quantidade</span>
            <Quantity :item="item" :useStore="false"/>
        </div>
        <p class="add-cart--observation">Observação:</p>
        <textarea v-model="item.observation" rows="10"></textarea>
        <button class="button btn" @click="onAddToCartButtonClick">Adicionar ao carrinho</button>
    </div>
</template>

<script>
import Mixin from '@/mixins/mixins.js'
import Item from './Item.vue'
import Quantity from './Quantity.vue'
import axios from 'axios'
export default {
    props:['id'],
    mixins:[Mixin],
    components:{
        Item,
        Quantity
    },
    created(){
         axios.get(`http://localhost:3000/${this.$selectCategory}/${this.id}`).then(resp => {
             this.item = {...resp.data,observation:'', quantity:1}
         })
    },
    data(){
        return{
            item:{},
        }
    },
    computed:{
        $selectCategory(){
            return this.$store.state.selectedCategory
        }
    },
    methods:{
        onAddToCartButtonClick(){
            this.$store.dispatch('addCarlist', this.item)
            this.$router.push({name:'Home'})
        }
    }
}
</script>

<style lang="less" scoped>
.add-cart{
    padding: 50px 20px;
    &--go-back{
        text-decoration: none;
        color: var(--dark);
        font-size: 18px;
        font-weight: 600;
    }

    &--item{
        margin-top: 50px;
    }

    &--container{
        border: 1px solid var(--lightGrey);
        padding: 10px 20px;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        margin: 20px 0;

        span{
            font-weight: 600;
            font-size: 16px;
        }
    }

    &--observation{
        font-weight: 600;
        font-size: 16px;
    }

    textarea{
        width: 100%;
        border-radius: 8px;
        border: 1px solid var(--lightGrey);
    }

    .btn{
        width: calc(100% - 40px);
        position: fixed;
        bottom: 10px;
        left: 20px;
        right: 20px;
    }
}
</style>