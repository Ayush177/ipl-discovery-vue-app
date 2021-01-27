<template>
  <div id="app">
    <the-navbar></the-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>
<style>
.page{
  margin-top: 100px;
}
</style>