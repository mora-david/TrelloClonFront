<template>
<div>
    <div class="container mt-5 login-box">
    <form @submit.prevent="onSubmit()">
  <div class="form-group">
    <label for="exampleInputEmail1">User:</label>
    <input type="username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="form.username">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Pass:</label>
    <input type="password" class="form-control" id="exampleInputPassword1" v-model="form.password">
  </div>
  <div class="form-group form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button  type="submit" class="btn btn-primary btnbtn">Submit</button>
</form>
</div>
<div>{{$store.state.user.username}}</div>
<div>{{$store.state.user.password}}</div>
<div>{{$store.state.user.token}}</div>
</div>
</template>

<script>
import { mapMutations } from 'vuex'
import axios from 'axios'
export default {
  data() {
    return {
    elemprueba: '',
      form: {
        username: 'dave',
        password: '123456'
      },

    }
  },
  created() {},
  methods: {
    ...mapMutations(['login']),
    onSubmit() {
      const dire = '/api/api/token/'
      const data = this.form
      axios
        .post(dire, data)
        .then((response) => {
          const obj = {
        username:this.form.username,
        pass:this.form.password,
        token:response.data.access
      } 
          this.login(obj)
            this.elemprueba = response
          console.log(response.data)
          alert('logeado')
        })
        .catch(() => {
          alert('error')
        })
    }
  }
}
</script>

<style lang="sass">
body
  color: black

.login-box
  width: 350px
  position: absolute
  top: 50%
  left: 50%
  color: white
  background: #2d3436
  top: 40%
  left: 50%
  transform: translate(-50%, -50%)
  transform:
  border-radius: 20px
  height: 300px

.login-box input[type = "username"], input[type = "password"]
  border-radius: 24px
  width: 250px
  margin-top: 5%
  margin-left: 5%
  display: inline-block


.btnbtn
  background: #2d3436
  border: solid #a29bfe
  text-align: center
  margin-left: 40%

.btnbtn:hover
  background: white
  color: grey

  

  

</style>


