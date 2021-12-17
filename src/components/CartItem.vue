<template>
    <div class="item">
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
export default {
    name:'CartItem',
    props:{
        item:{
            type:Object,
            required: true
        }
    },
     filters:{
        currency(value){
            return `R$ ${value.toLocaleString('pt-br', {minimumFractionDigits:2})}`
        }
    },
    computed:{
        selectedCategory(){
            return this.$store.state.selectedCategory
        },
        imagePath(){
            return require(`@/assets/img/${this.selectedCategory}/${this.item.id}.png`)
        }
    }
}
</script>

<style lang="less" scoped>
.item{
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid var(--lightGrey);
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
}
</style>