<template>
  <div class="index">
    <div class="logo">
      <img src="../../assets/logo.svg">
      <div class="name">Micro-note</div>
    </div>
    <div class="start">
      <!-- <Button size="large" type="dashed">Start</Button> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped>
.index{
  text-align: center;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
}
.index .logo{
  height: 60vh;
  width: 100vw;
  display:table-cell;
  text-align:center;
  vertical-align:middle;
}
.index .name{
  margin-top: 2vh;
  font-weight: bold;
  color: #80848f;
  font-size: 35px;
  font-family: fantasy;
}
.index .start{
  font-size: 30px;
}
</style>


