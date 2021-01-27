<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="info" sticky class="position-fixed w-100">
    <b-navbar-brand href="https://www.iplt20.com/" class="navbar-brand">
      <img :src="logo_url" alt="IPL logo">
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="match-list" class="font-weight-bold px-2">Match List</b-nav-item>
        <b-nav-item to="/delivery-list" class="font-weight-bold px-2">Delivery List</b-nav-item>
        <b-nav-item to="/team-list" class="font-weight-bold px-2">Team List</b-nav-item>
        <b-nav-item to="/most-run-by-avg-strikerate" class="font-weight-bold px-2">Average Strikerate</b-nav-item>
        <b-nav-item to="/teamwise-home-and-away" class="font-weight-bold px-2">Teamwise Home Away</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>

</template>

<script>
export default {
  data(){
    return{
      logo_url: 'https://cdn.freelogovectors.net/wp-content/uploads/2020/07/Indian-Premier-League-IPL-logo.png',
    }
  },
}
</script>

<style scoped>
img {
  width: 75px;
}
</style>