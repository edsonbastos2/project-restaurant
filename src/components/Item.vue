<template>
    <div class="item">
        <div class="container">
            <div class="item--tag" v-if="item.offer">Oferta</div>
            <img class="item--img" :src="imgPath" alt="">
        </div>
        <div class="content">
            <h2 class="item--name">{{item.name}}</h2>
            <p class="item--description">{{item.description}}</p>
            <p class="item--price">{{item.price | currency}}</p>
        </div>
    </div>
</template>

<script>
export default {
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
        $selectCategory(){
            return this.$store.state.selectedCategory
        },
        imgPath(){
            return require(`@/assets/img/${this.$selectCategory}/${this.item.id}.png`)
        }
    }
}
</script>

<style lang="less" scoped>
.item{
    width: 215px;
    height: 290px;
    border-radius: 5px;
    background-color: #fff;
    position: relative;
    margin: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;

    &--name{
        font-weight: 600;
        font-size: 18px;
        margin: 8px auto;
    }

    &--tag{
        background-color: var(--pink);
        color: #fff;
        position: absolute;
        top:15px;
        right: 15px;
        border-radius: 8px;
        font-weight: 500;
        font-size: 12px;
        padding: 3px 8px;
    }

    &--img{
        display: block;
        width: 100%;
        margin: 0;
    }

    &--description{
        color: var(--dark-Grey);
        font-weight: 300;
        font-size: 12px;
        margin: 0;
    }

    &--price{
        font-weight: 600;
        font-size: 18px;
        color: var(--yellow);
    }

    .content{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    @media (max-width: 768px) {
        width: 100%;
        height: fit-content;
        border: 1px solid var(--lightGrey);
        display: flex;
        flex-direction: row;
        margin: 10px 0;
        padding: 10px;

        &--img{
            width: 86px;
            order: 0;
            margin: 0 0 10px 0;
        }

        &--price{
            text-align: right;
            margin: 5px 0 0 auto;
        }

        &--tag{
            position: static;
            order: 1;
            width: fit-content;
        }
        .content{
            flex-grow: 1;
        }
        .container{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
        }

    }
}
</style>