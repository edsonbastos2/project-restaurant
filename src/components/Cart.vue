<template>
    <div class="cart">
        <router-link to="/" class="cart--go-back" v-if="isMobile()">↩ Voltar</router-link>
        <h2 class="cart--title">Seu pedido</h2>
        <div class="cart--content-payment">
            <p v-if="noHasItem">Seu Carrinho ainda está vazio</p>
            <transition-group name="list">
                <CartItem v-for="item in $cartList" :key="item.id" :item="item"/>
            </transition-group>
        </div>
        <div class="cart--total" v-if="!noHasItem">
            <span>Total: </span>
            <span class="price">{{$getTotal | currency}}</span>
        </div>
        <button class="button payment-button" @click="gotToPayment">Finalizar Compra</button>
    </div>
</template>

<script>
import CartItem from '@/components/CartItem.vue'
import { mapGetters } from 'vuex'
import Mixin from '@/mixins/mixins.js'
export default {
    name:'Cart',

    components:{
        CartItem,
    },
    mixins:[Mixin],

    filters:{
        currency(value){
            return `R$ ${value.toLocaleString('pt-br', {minimumFractionDigits:2})}`
        }
    },
    computed:{
        ...mapGetters(['$getTotal']),
        $cartList(){
            return this.$store.state.cartList
        },
        noHasItem(){
            return !this.$cartList.length
        },
        
    },
    methods:{
        gotToPayment(){
            this.$router.push({name: 'Payment'})
        }
    }
}
</script>

<style lang="less" scoped>
.cart{
    background-color: #fff;
    width: 643px;
    min-width: 643px;
    height: 100vh;
    padding: 50px;
    display: flex;
    flex-direction: column;

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

    &--content-payment{
        flex-grow: 1;
        overflow: auto;
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

    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }
    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
        opacity: 0;
        transform: translateX(-30px);
    }

    .payment-button{
        width: 397px;
        margin: 20px auto;
    }

    @media (max-width: 768px) {
        width: 100%;
        min-width: unset;
        padding: 50px 20px 20px;

        .payment-button{
            width: 100%;
        }
    }
}
</style>