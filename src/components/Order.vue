<template>
  <div class="order">
    <form>
      <div class="user--data">
        <p class="section-title">Seus Dados</p>
        <div class="input--field">
          <label>{{ formData.name.label }}</label>
          <input
            type="text"
            :placeholder="formData.name.placeholder"
            v-model="formData.name.value"
            @blur="formData.name.isValid"
            :class="{ error: !formData.name.valid }"
          />
          <p class="errorMessage" v-if="!formData.name.valid">
            {{ formData.name.errorMessage }}
          </p>
        </div>
        <div class="input--field">
          <label>{{ formData.cellphone.label }}</label>
          <input
            type="text"
            :placeholder="formData.cellphone.placeholder"
            v-mask="'(##) # ####-####'"
            v-model="formData.cellphone.value"
            @blur="formData.cellphone.isValid"
            :class="{ error: !formData.cellphone.valid }"
          />
          <p class="errorMessage" v-if="!formData.cellphone.valid">
            {{ formData.cellphone.errorMessage }}
          </p>
        </div>
      </div>

      <div class="address">
        <p class="section-title">Endereço</p>
        <div class="delivery--type">
          <div class="radio--options">
            <input
              type="radio"
              name="delivery-type"
              id="store"
              value="store"
              v-model="deliveryType"
            />
            <label for="store">Retirar na loja</label>
          </div>
          <div class="radio--options">
            <input
              type="radio"
              name="delivery-type"
              id="delivery"
              value="delivery"
              v-model="deliveryType"
            />
            <label for="delivery">Delivery</label>
          </div>
        </div>

        <div class="addressInfo" v-if="deliveryType === 'delivery' && hasAddressInfo && isDelivery">
          <p>Cidade:<span>{{formData.city.value}}</span></p>
          <p>Cep:<span>{{formData.cep.value}}</span></p>
          <p>Rua:<span>{{formData.address.value}}</span></p>
          <p>Número:<span>{{formData.number.value}}</span></p>
        </div>

        <a @click="openModal" v-if="isDeliveryType">{{addressButtonLabel}}</a>
      </div>

      <div class="payment">
        <p class="section-title">Pagamento</p>
        <p>Método de pagamento</p>
        <div class="delivery--type">
          <div class="radio--options">
            <input
              type="radio"
              name="payment-type"
              id="credit-card"
              value="credit-card"
              v-model="paymentType"
              
            />
            <label for="credit-card">Cartão de credito</label>
          </div>
          <div class="radio--options">
            <input
              type="radio"
              name="payment-type"
              id="cash"
              value="cash"
              v-model="paymentType"
            />
            <label for="cash">Dinheiro</label>
          </div>
        </div>
      </div>
    </form>
    <button class="button" @click="orderItens">Concluir pedido</button>

    <Modal :show="showModal" @on-modal-close="handleCloseModal">
      <div class="address--content">
        <h1>Adicione o endereço</h1>
        <div class="input--field">
          <label>{{ formData.cep.label }}</label>
          <input
            type="text"
            :placeholder="formData.cep.placeholder"
            v-model="formData.cep.value"
            @blur="formData.cep.isValid"
            :class="{ error: !formData.cep.valid }"
          />
          <p class="errorMessage" v-if="!formData.cep.valid">
            {{ formData.cep.errorMessage }}
          </p>
        </div>

        <div class="address--container">
          <div class="input--field">
            <label>{{ formData.address.label }}</label>
            <input
              type="text"
              :placeholder="formData.address.placeholder"
              v-model="formData.address.value"
              @blur="formData.address.isValid"
              :class="{ error: !formData.address.valid }"
            />
            <p class="errorMessage" v-if="!formData.address.valid">
              {{ formData.address.errorMessage }}
            </p>
          </div>

          <div class="input--field">
            <label>{{ formData.number.label }}</label>
            <input
              type="text"
              :placeholder="formData.number.placeholder"
              v-model="formData.number.value"
              @blur="formData.number.isValid"
              :class="{ error: !formData.number.valid }"
            />
            <p class="errorMessage" v-if="!formData.number.valid">
              {{ formData.number.errorMessage }}
            </p>
          </div>
        </div>

        <div class="input--field">
          <label>{{ formData.city.label }}</label>
          <input
            type="text"
            :placeholder="formData.city.placeholder"
            v-model="formData.city.value"
            @blur="formData.city.isValid"
            :class="{ error: !formData.city.valid }"
          />
          <p class="errorMessage" v-if="!formData.city.valid">
            {{ formData.city.errorMessage }}
          </p>
        </div>
        <div class="input--field">
          <label>{{ formData.bairro.label }}</label>
          <input
            type="text"
            :placeholder="formData.bairro.placeholder"
            v-model="formData.bairro.value"
            @blur="formData.bairro.isValid"
            :class="{ error: !formData.bairro.valid }"
          />
          <p class="errorMessage" v-if="!formData.bairro.valid">
            {{ formData.bairro.errorMessage }}
          </p>
        </div>

        <button class="button-secondary" @click="handleCloseModal">
          Cancel
        </button>
        <button class="button" @click="validateAddressForm">Adicionar</button>
      </div>
    </Modal>

    <Modal :show="showAddressInvalidModal" @on-modal-close="hideInvalidAddressModal">
      <div class="warning-content">
        <span v-html="warningIcon" class="icon"></span>
        <span>Na modalidade delivery é necessário adicionar um endereço.</span>
      </div>
    </Modal>

    <Modal :show="showSuccessModal" @on-modal-close="hideSuccessModal">
      <div class="success-modal">
        <span v-html="successIcon" class="icon"></span>
        <span>Pedido realizado com sucesso!</span>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';
import feather from 'feather-icons';
export default {
  components: {
    Modal,
  },
  data() {
    return {
      formData: {
        name: {
          value: '',
          errorMessage: 'Campo obrigatório',
          placeholder: 'Digite seu nome',
          label: 'Nome',
          valid: true,
          isValid: () => {
            this.formData.name.valid = !!this.formData.name.value.length;
          },
        },
        cellphone: {
          value: '',
          errorMessage: 'Campo obrigatório',
          placeholder: 'Digite seu celular',
          label: 'Celular',
          valid: true,
          isValid: () => {
            this.formData.cellphone.valid =
              !!this.formData.cellphone.value.length;
          },
        },
        cep: {
          value: '',
          errorMessage: 'Campo obrigatório',
          placeholder: 'Digite seu CEP',
          label: 'Cep',
          valid: true,
          isValid: () => {
            this.formData.cep.valid = !!this.formData.cep.value.length;
          },
        },
        address: {
          value: '',
          errorMessage: 'Campo obrigatório',
          placeholder: 'Digite seu endereço',
          label: 'Endereço',
          valid: true,
          isValid: () => {
            this.formData.address.valid = !!this.formData.address.value.length;
          },
        },
        city: {
          value: '',
          errorMessage: 'Campo obrigatório',
          placeholder: 'Digite sua cidade',
          label: 'Cidade',
          valid: true,
          isValid: () => {
            this.formData.city.valid = !!this.formData.city.value.length;
          },
        },
        bairro: {
          value: '',
          errorMessage: 'Campo obrigatório',
          placeholder: 'Digite seu bairro',
          label: 'Bairro',
          valid: true,
          isValid: () => {
            this.formData.bairro.valid = !!this.formData.bairro.value.length;
          },
        },
        number: {
          value: '',
          errorMessage: 'Obrigatório',
          placeholder: 'Nº',
          label: 'Número',
          valid: true,
          isValid: () => {
            this.formData.number.valid = !!this.formData.number.value.length;
          },
        },
      },
      showModal: false,
      showAddressInvalidModal:false,
      showSuccessModal:false,
      deliveryType:'store',
      paymentType:'credit-card',
      isDelivery:false
    };
  },

  computed: {

    warningIcon(){
      return feather.icons['alert-triangle'].toSvg()
    },

    successIcon(){
      return feather.icons['check-circle'].toSvg()
    },

    isAddressFormValid() {
      let isValid = true;
      isValid &= this.formData.cep.valid;
      isValid &= this.formData.city.valid;
      isValid &= this.formData.bairro.valid;
      isValid &= this.formData.address.valid;
      isValid &= this.formData.number.valid;
      return isValid;
    },
    isUserFormDataValid(){
      let isValid = true;
      isValid &= this.formData.cellphone.valid;
      isValid &= this.formData.name.valid;
      return isValid
    },
    isDeliveryType(){
      return this.deliveryType === 'delivery'
    },
    hasAddressInfo(){
      return(
        this.formData.cep.value ||
        this.formData.city.value ||
        this.formData.bairro.value ||
        this.formData.address.value ||
        this.formData.number.value
      )
    },

    addressButtonLabel(){
      return this.hasAddressInfo ? 'Editar endereço' : 'Adicionar endereço'
    },
  },
  methods: {
    triggerValidations() {
      this.formData.name.isValid();
      this.formData.cellphone.isValid();
      if(this.isDeliveryType){
        this.triggerAddressValidate()
        this.showAddressInvalidModal = !this.isAddressFormValid
      }
    },
    triggerAddressValidate() {
      this.formData.cep.isValid();
      this.formData.city.isValid();
      this.formData.bairro.isValid();
      this.formData.address.isValid();
      this.formData.number.isValid();
    },
    orderItens() {
      this.triggerValidations();
      if(!this.isUserFormDataValid || !this.isAddressFormValid) return
      this.showSuccessModal = true
    },
    openModal() {
      this.showModal = true;
    },
    handleCloseModal() {
      this.showModal = false;
    },
    hideSuccessModal(){
      this.$router.push({name:'Home'})
    },
    validateAddressForm() {
      this.triggerAddressValidate();
      if (!this.isAddressFormValid) return;
      this.showModal = false;
      this.isDelivery = true
    },

    hideInvalidAddressModal(){
      this.showAddressInvalidModal = false
    }
  },
};
</script>

<style lang="less" scoped>
.order {
  width: 720px;
  background-color: #fff;
  border-radius: 8px;
  padding: 30px 50px;
  margin: 30px auto;

  .section-title {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .input--field {
    display: flex;
    flex-direction: column;

    & + .input--field {
      margin-top: 15px;
    }
  }

  label {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 5px;
  }

  form {
    display: flex;
    flex-direction: column;
    .delivery--type {
        display: flex;
      }

    .address {
      margin: 10px 0;
      .addressInfo{
        border: 1px solid var(--dark-Grey);
        border-radius: 8px;
        width: fit-content;
        padding: 10px 20px;
        color: var(--dark-Grey);
        font-size: 13px;
        margin: 10px 0;

        p{
          span{
            margin-left: 10px;
          }
        }
      }

      a {
        color: var(--pink);
        font-weight: normal;
        font-size: 12px;
        text-decoration: underline;
        cursor: pointer;
      }
    }

    .radio--options {
      display: flex;
      align-items: center;

      & + .radio--options {
        margin-left: 10px;
      }

      label {
        padding-left: 10px;
        margin-bottom: 0;
      }
    }
  }

  .button {
    margin: 30px auto;
  }

  .address--container {
    display: flex;
    align-items: center;
    margin: 10px 0;

    .input--field {
      margin: 0;
      width: 100%;

      & + .input--field {
        width: 30%;
        margin-left: 10px;
      }
    }
  }

  .payment{
    margin: 10px 0;
  }

  .errorMessage {
    font-size: 12px;
    color: var(--error);
    margin: 10px 0;
  }

  .address--content {
    button {
      cursor: pointer;
      & + button {
        margin-left: 10px;
      }
    }
  }

  .warning-content, .success-modal{
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-bottom: 20px;
    .icon{
      margin-bottom: 20px;
    }
  }

  @media(max-width: 768px){
    width: 100%;
    padding: 0;

    .address--content{
      h1{
        font-size: 1.3rem;
      }
    }
  }
}
</style>
