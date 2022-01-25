<template>
    <div class="item--quantity">
        <button class="buttons" @click="onDecreaseButtonClick" :disabled="item.quantity===0">-</button>
        <span class="number">{{item.quantity}}</span>
        <button class="buttons" @click="onIncreaseButtonClick">+</button>
        <Modal :show="showModal" @on-modal-close="onCloseQuantity">
            <div class="modal--container">
                <h2>Deseja excluir esse item do carrinho?</h2>
                <button class="button-secondary" @click="onCancel">Cancelar</button>
                <button class="button" @click="onRemoveItem">Sim, desejo!</button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import Modal from '@/components/Modal.vue'
export default {
    components:{
        Modal
    },
    props:{
        item:{},
        useStore:{
            type:Boolean,
            default: true
        }
    },
    data(){
        return{
            showModal: false
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
                if(!this.item.quantity) this.showModal = true
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
        },
        onCancel(){
            this.increaseQuantity(this.item.id)
            this.showModal = false
        },
        onRemoveItem(){
            this.showModal = false
            this.$nextTick(() => {
                this.$store.dispatch('removeFromCart', this.item.id)
            })
        },
        onCloseQuantity(){
            this.increaseQuantity(this.item.id)
            this.showModal = false
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

        .modal--container{
            text-align: center;
            h2{
                font-size: 20px;
            }
            button{
                margin-left: 10px;
                margin-top: 20px;
                cursor: pointer;
            }
        }
    }
</style>