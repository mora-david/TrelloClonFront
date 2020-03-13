<template>
<div>
    <div class="container" id="navbar">
    <nuxt-link class="toplinks" to="/">Home</nuxt-link>
    <nuxt-link style="display:none" class="toplinks" to="/tableros">Tableros</nuxt-link>
    <nuxt-link class="toplinks" to="/tablero/11" v-if="$store.state.user.username !=''">Listas</nuxt-link>
    <nuxt-link v-if="$store.state.user.username ==''" class="toplinks" to="/login">Login</nuxt-link>
    <p v-if="$store.state.user.username !=''" class="toplinks toplinksp" @click="logout()" >Logout</p>
    <nuxt-link class="toplinks" to="/register">Register</nuxt-link>
    </div>
</div>
</template>

<style>
#navbar{
    min-height:100px
}
.toplinks{
    color:rgb(187, 199, 197);
    padding:10px;
}
.toplinksp{
    padding: 10px;
    padding-top: 23px;


}
</style>

<script>
import { mapMutations } from 'vuex'
import axios from 'axios'
export default {
  data() {},
  created() {},
  methods: {
    ...mapMutations(['login']),
    logout() {
        const obj = {
        username:'',
        pass:'',
        token:''}

        this.login(obj)
        this.$router.push('/login')
      }
      }
      }    

</script>