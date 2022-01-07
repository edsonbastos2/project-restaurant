<template>
    <div class="cart">
        <router-link to="/" class="cart--go-back">↩ Voltar</router-link>
        <h2 class="cart--title">Seu pedido</h2>
        <CartItem v-for="item in $cartList" :key="item.id" :item="item"/>
        <div class="cart--total">
            <span>Total: </span>
            <span class="price">{{$getTotal | currency}}</span>
        </div>
    </div>
</template>

<script>
import CartItem from '@/components/CartItem.vue'
import { mapGetters } from 'vuex'
export default {
    name:'Cart',

    components:{
        CartItem
    },

    filters:{
        currency(value){
            return `R$ ${value.toLocaleString('pt-br', {minimumFractionDigits:2})}`
        }
    },

    computed:{
        ...mapGetters(['$getTotal']),
        $cartList(){
            return this.$store.state.cartList
        }
    }
}
</script>

<style lang="less" scoped>
.cart{
    background-color: #fff;
    width: 643px;
    min-width: 643px;
    padding: 50px;

    &--go-back{
        text-decoration: none;
        color: var(--dark);
        font-size: 18px;
        font-weight: 600;
    }

    &--title{
        font-size: 24px;
        font-weight: 600;
        margin-top: 40px;
    }

    &--total{
        font-size: 18px;
        font-weight: 600;
        text-align: right;
        margin-top: 30px;

        .price{
            color: var(--yellow);
            padding-left: 10px;
        }
    }

    @media (max-width: 768px) {
        width: 100%;
        min-width: unset;
        padding: 50px 20px 20px;
    }
}
</style>