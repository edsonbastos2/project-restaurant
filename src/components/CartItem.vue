<template>
    <div class="item">
        <Quantity :item="item"/>
        <div class="item--img-container">
            <img class="item--img" :src="imagePath" alt="">
        </div>
        <div class="content">
            <h3 class="item--name">{{item.name}}</h3>
            <a class="item--observation" @click="openModalObservation">Adicionar observação</a>
            <p class="item--observation-text">{{item.observation}}</p>
        </div>
        <p class="item--price">{{item.price | currency}}</p>
        <Modal :show="showModal" @on-modal-close="closeModalObservation">
            <div class="modal--container">
                <h2>Adicionar Observação</h2>
                <textarea v-model="item.observation" rows="10"></textarea>
                <button class="button-secondary" @click="closeModalObservation">Cancela</button>
                <button class="button" @click="addObservation">Salvar</button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import Quantity from '@/components/Quantity.vue'
import Modal from './Modal.vue'
export default {
    name:'CartItem',
    props:{
        item:{
            type:Object,
            required: true
        }
    },
    data(){
        return{
            showModal:false
        }
    },
    components:{
        Quantity,
        Modal
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
        ]),
        openModalObservation(){
            this.showModal = true
        },
        closeModalObservation(){
            this.showModal = false
        },
        addObservation(){
            this.$store.dispatch('setObservation', this.item)
            this.showModal = false
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
        cursor:pointer;
    }

    &--observation-text{
        font-size: 12px; 
        color: var(--dark-Grey);
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

    .modal--container{
        text-align: center;
        textarea{
            margin-bottom: 20px;
            width: 100%;
        }
        button + button{
            margin-left: 15px;
        }
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

        .modal--container{
            textarea{
                margin-bottom: 5px;
            }
        }

    }
}
</style>