<template>
<div>
  <div class="container">
  <h2>Registro</h2>
  </div>
  <div class="container">
  <form  @submit.prevent="newUser()">
    <div class="form-group">
    <label for="exampleInputEmail1">Username</label>
    <input v-model="formulario.username" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">First Name</label>
    <input v-model="formulario.first_name" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Last Name</label>
    <input v-model="formulario.last_name" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input v-model="formulario.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input v-model="formulario.password" type="password" class="form-control" id="exampleInputPassword1">
  </div>
  <div class="form-group form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
<button @click="createTablero()">prueba</button>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      formulario:{username:'xxx',first_name:'',last_name:'',email:'',password:''},
    }
  },
  created() {
    
  },
  updated(){
  },
  methods: {
        ...mapMutations(['login']),
    onSubmit() {
      console.log('login')
      const dire = 'https://rocky-chamber-99447.herokuapp.com/api/token/'
      const data = {username:this.formulario.username, password:this.formulario.password}
      axios
        .post(dire, data)
        .then((response) => {
          const obj = {
        username:this.formulario.username,
        pass:this.formulario.password,
        token:response.data.access
      } 
          this.login(obj)
            this.elemprueba = response
          console.log(response.data)
         // alert('logeado')
          this.createTablero()
        })
        .catch(() => {
         // alert('error')
        })
    }
  ,
    createTablero(){
      const url = "https://rocky-chamber-99447.herokuapp.com/api/v1/tableros/";
      const tablero= {
        nombre:'Default',
        descripcion:'pruebapost1',
        favorito:[1],
        miembros:[1],
        fecha_de_creacion:'2020-11-11',
        
      }
      const yourConfigh = {
        headers: {
          Authorization: `Bearer ${this.$store.state.user.token}`
        }
      };
      axios
        .post(url,tablero, yourConfigh)
        .then(response => {
          this.$router.push('/tablero')
          //alert('tablero')
           //this.lists.push(response.data)
           //this.getlastid(idtemp, c,b,b1, idtemp1,a);
        })
        .catch(() => {
        //  alert("error");
          
        });
    },
    newUser(id){
      const url = "https://rocky-chamber-99447.herokuapp.com/api/v1/users/";
      axios
        .post(url,this.formulario)
        .then(response => {
          var a = this.onSubmit()
           this.lists.push(response.data)
           //this.getlastid(idtemp, c,b,b1, idtemp1,a);
        })
        .catch(() => {
          
          //alert('error.message')
        });


    },
  }}
</script>