<template>
    <div class="modal" v-if="show">
        <div class="modal--content">
            <div class="modal--close" v-html="closeIcon" @click="onCloseButtonClick"></div>
            <slot/>
        </div>
    </div>
</template>

<script>
import feather from 'feather-icons';
export default {
    props:{
        show:{
            type:Boolean,
            default: false
        }
    },
    data(){
        return{

        }
    },
    computed:{
        closeIcon(){
            return feather.icons.x.toSvg()
        }
    },
    methods:{
        onCloseButtonClick(){
            this.$emit('on-modal-close')
        }
    }
}
</script>

<style lang="less" scoped>
.modal{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.4);

    &--content{
        width: 600px;
        border-radius: 8px;
        padding: 30px;
        background-color: #fff;
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%);
    }

    &--close{
        text-align: right;
        cursor: pointer;
    }

    @media (max-width: 768px){
        &--content{
            width: 90%;
            padding: 15px;
        }
    }
}
</style>