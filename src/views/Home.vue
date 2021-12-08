<template>
  <div class="container">
      <Smothie/>
    <h1>Home</h1>
  </div>
</template>

<script>
import Smothie from '../assets/icons/smothie.svg'
export default {
    components:{
        Smothie
    }
};
</script>

<style lang="less" scoped>
.container {
    svg{
        path{
            fill:red
        }
    }
  h1 {
    color: var(--pink);
    font-size: 35px;
  }
}
</style>
