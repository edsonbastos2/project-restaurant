<template>
  <div class="order">
    <form>
      <label>{{ formData.name.label }}</label>
      <input
        type="text"
        placeholder="Digite seu Nome"
        v-model="formData.name.value"
        @blur="formData.name.isValid"
        :class="{'error': !formData.name.valid}"
      />
      <p class="errorMessage" v-if="!formData.name.valid">
        {{ formData.name.errorMessage }}
      </p>
    </form>
    <button class="button" @click="orderItens">Concluir pedido</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: {
          value: '',
          errorMessage: 'Campo obrigatório',
          label: 'Nome',
          valid: true,
          isValid: () => {
            this.formData.name.valid = this.formData.name.value.length;
          },
        },
      },
    };
  },
  methods: {
    triggerValidations() {
      this.formData.name.isValid();
    },
    orderItens() {
      this.triggerValidations();
    },
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

  form {
    display: flex;
    flex-direction: column;

    label {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 5px;
    }

    .errorMessage {
      font-size: 12px;
      color: var(--error);
      margin: 10px 0;
    }
  }
}
</style>
