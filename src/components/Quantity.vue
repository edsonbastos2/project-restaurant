<template>
    <div class="item--quantity">
        <button class="buttons" @click="onDecreaseButtonClick" :disabled="item.quantity===0">-</button>
        <span class="number">{{item.quantity}}</span>
        <button class="buttons" @click="onIncreaseButtonClick">+</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    props:{
        item:{},
        useStore:{
            type:Boolean,
            default: true
        }
    },
    methods:{
        ...mapActions([
            'decreaseQuantity',
            'increaseQuantity'
        ]),
        onDecreaseButtonClick(){
            if(this.useStore){
                this.decreaseQuantity(this.item.id)
                return
            }

            --this.item.quantity
        },
        onIncreaseButtonClick(){
            if(this.useStore){
                this.increaseQuantity(this.item.id)
                return
            }

            ++this.item.quantity
        }
    }
}
</script>

<style lang="less" scoped>
 .item--quantity{
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
</style>