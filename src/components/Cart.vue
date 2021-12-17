<template>
    <div class="cart">
        <h2 class="cart--title">Seu pedido</h2>
        <CartItem v-for="item in $cartList" :key="item.id" :item="item"/>
    </div>
</template>

<script>
import CartItem from '@/components/CartItem.vue'
export default {
    name:'Cart',

    components:{
        CartItem
    },

    computed:{
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

    &--title{
        font-size: 24px;
        font-weight: 600;
    }
}
</style>