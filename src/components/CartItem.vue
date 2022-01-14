<template>
    <div class="item">
        <Quantity :item="item"/>
        <div class="item--img-container">
            <img class="item--img" :src="imagePath" alt="">
        </div>
        <div class="content">
            <h3 class="item--name">{{item.name}}</h3>
            <a class="item--observation">Adicionar observação</a>
        </div>
        <p class="item--price">{{item.price | currency}}</p>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import Quantity from '@/components/Quantity.vue'
export default {
    name:'CartItem',
    props:{
        item:{
            type:Object,
            required: true
        }
    },
    components:{
        Quantity
    },
     filters:{
        currency(value){
            return `R$ ${value.toLocaleString('pt-br', {minimumFractionDigits:2})}`
        }
    },
    computed:{
        imagePath(){
            return require(`@/assets/img/${this.item.id}.png`)
        }
    },
    methods:{
        ...mapActions([
            'decreaseQuantity',
            'increaseQuantity'
        ])
    }
}
</script>

<style lang="less" scoped>
.item{
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid var(--lightGrey);

    &--quantity{
        display: flex;
        align-items: center;
        padding-right: 40px;

        .number{
            width: 28px;
            text-align: center;
            color: var(--yellow);
            font-size: 18px;
            font-weight: 500;
        }

        .buttons{
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            background: none;
            border: none;
        }
    }

    &--img-container{
        background-color: var(--lightYellow);
        width: 81px;
        height: 66px;
        border-radius: 8px;
        display: flex;
        align-items: center;
    }
    &--img{
        width: 65px;
        display: block;
        margin: auto;
    }

    &--name{
        font-weight: 600;
        font-size: 18px;
        margin: 0;
    }

    &--observation{
        font-weight: 500;
        font-size: 12px;
        color: var(--dark-Grey);
        text-decoration: underline;
    }

    &--price{
        font-weight: 600;
        font-size: 18px;
        color: var(--yellow);
        line-height: 27px;
    }
    .content{
        flex-grow: 1;
        padding: 0 20px;
    }

    @media (max-width: 768px) {
        flex-wrap: wrap;
        &--img-container{
            order: 1;
        }

        .content{
            order: 2;
            padding: 0 10px;
        }

        &--price{
            order: 3;
        }

        &--quantity{
            order: 4;
            padding: 0;
            width: 81px;
            display: flex;
            align-items: center;
            justify-content: center;
        }



    }
}
</style>