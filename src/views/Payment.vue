<template>
    <div class="payment">
        <div class="payment--content">
            <router-link to="/" class="payment--go-back">↩ Voltar</router-link>
            <Order/>
        </div>
        <Cart v-if="isDesktop()" />
    </div>
</template>

<script>
import Cart from '@/components/Cart.vue';
import Mixins from '@/mixins/mixins';
import Order from '@/components/Order.vue'
export default {
    mixins: [Mixins],
    components:{
        Cart,
        Order
    }
}
</script>

<style lang="less" scoped>
    .payment{
        display: flex;

        &--content{
            padding: 50px;
            flex-grow: 1;

            .payment--go-back{
                text-decoration: none;
                color: var(--dark);
                font-size: 18px;
                font-weight: 600;
            }
        }

        @media(max-width: 768px){
            .payment--content{
                padding: 50px 20px;
            }
        }

    }
</style>