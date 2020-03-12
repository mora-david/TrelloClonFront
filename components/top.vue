<template>
<div>
    <div class="container" id="navbar">
    <nuxt-link class="toplinks" to="/">Home</nuxt-link>
    <nuxt-link style="display:none" class="toplinks" to="/tableros">Tableros</nuxt-link>
    <nuxt-link class="toplinks" to="/tablero/11">Listas</nuxt-link>
    <nuxt-link class="toplinks" to="/login">Login</nuxt-link>
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
</style>