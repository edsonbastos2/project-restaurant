<template>
    <div class="item--quantity">
        <button class="buttons" @click="decreaseQuantity(item.id)" :disabled="item.quantity===0">-</button>
        <span class="number">{{item.quantity}}</span>
        <button class="buttons" @click="increaseQuantity(item.id)">+</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    props:{
        item:{}
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