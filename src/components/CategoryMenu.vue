<template>
  <div class="categoryMenu">
    <ul>
      <li
        v-for="category in categoriesList"
        :key="category.id"
        @click="onCategoryClick(category.id)"
        :class="{active: isActive(category.id)}"
      >
        <component :is="category.icon" />
        <p>{{ category.label }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import Pizza from '../assets/icons/pizza.svg';
import Combo from '../assets/icons/french-fries.svg';
import Deserts from '../assets/icons/ice-cream.svg';
import Drinks from '../assets/icons/smothie.svg';
import Burguer from '../assets/icons/food.svg';

export default {
  name: 'CategoryMenu',
  components: {
    Pizza,
    Combo,
    Deserts,
    Drinks,
    Burguer,
  },

  data() {
    return {
      categoriesList: [
        { label: 'Pizza', icon: 'Pizza', id: 'pizza' },
        { label: 'Bebidas', icon: 'Drinks', id: 'drinks' },
        { label: 'Doces', icon: 'Deserts', id: 'deserts' },
        { label: 'Combos', icon: 'Combo', id: 'combo' },
        { label: 'Burguers', icon: 'Burguer', id: 'burguers' },
      ],
      selectedCategory: '',
    };
  },
  mounted(){
    this.onCategoryClick('pizza')
  },
  methods: {
    onCategoryClick(id) {
      this.selectedCategory = id;
      this.$store.dispatch('changerCategory', id)
    },

    isActive(id){
        return this.selectedCategory === id
    }
  },
};
</script>

<style lang="less" scoped>
.categoryMenu {
  width: 130px;
  height: 100vh;
  background-color: #fff;
  display: flex;
  align-items: center;

   @media (max-width: 768px){
     width: 100%;
     height: fit-content;
     overflow-x: scroll;

      ul{
        display: flex;
        justify-content: space-around;
        margin: 0 30px;
        gap: 0.75rem;

        li:first-child{
          margin-left: 50px;
        }
        li:last-child{
          margin-right: 50px;
        }

        li{
          width: 78px;
          padding: 0.75rem;
        }

      }
    }

  ul {
    list-style: none;
    width: 100%;

    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      height: 100px;

      p{
          font-size: 1rem;
          font-weight: 500;
          color: var(--dark-Grey);
      }

      svg{
        path{
            fill: var(--dark-Grey);
        }
      }
      &.active{
          background-color: var(--yellow);
          border-radius: 5px;

          p{
              color: #000;
          }
          svg{
              path{
                  fill: #000
              }
          }
      }
    }
  }
}
</style>
