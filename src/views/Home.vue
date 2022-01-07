<template>
  <div class="home">
    <router-link to="/cart" v-if="isMobile()" class="cart--icon">
      <CartIcon />
    </router-link>
    <CategoryMenu />
    <ItemList />
    <Cart v-if="isDesktop()" />
  </div>
</template>

<script>
import CategoryMenu from '@/components/CategoryMenu.vue';
import ItemList from '@/components/Item-List.vue';
import Cart from '@/components/Cart.vue';
import CartIcon from '@/assets/icons/cart.svg';
import Mixins from '@/mixins/mixins';
export default {
  components: {
    CategoryMenu,
    ItemList,
    Cart,
    CartIcon,
  },
  mixins: [Mixins],
};
</script>

<style lang="less" scoped>
.home {
  display: grid;
  grid-template-columns: 140px 1fr 643px;

  .cart--icon {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--pink);
    margin: 10px 10px 10px auto;
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
</style>
