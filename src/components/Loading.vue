<template>
    <div class="loading">

    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
.loading{
  width: 50px;
  height: 50px;
  color: var(--pink);
  border: 3px solid var(--lightYellow);
  border-radius: 50%;
  border-top-color: var(--yellow);
  animation: load .5s linear infinite;
  margin: auto;
}

@keyframes load{
    to{
        transform: rotate(360deg);
    }
}
</style>