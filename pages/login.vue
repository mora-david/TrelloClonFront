<template>
<div>
    <div class="container mt-5">
    <form @submit.prevent="onSubmit()">
  <div class="form-group">
    <label for="exampleInputEmail1">Username</label>
    <input type="username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="form.username">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" v-model="form.password">
  </div>
  <div class="form-group form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button  type="submit" class="btn btn-primary">Submit</button>
</form>
</div>
<div>{{form.username}}</div>
<div>{{form.password}}</div>
<div>{{elemprueba}}</div>

</div>
</template>

<script>
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
    onSubmit() {
      const dire = '/api/api/token/'
      const data = this.form
      axios
        .post(dire, data)
        .then((response) => {
            this.elemprueba = response
          console.log(response.data)
          alert('logeado')
        })
        .catch(() => {
          alert('error')
        })
      // alert('La sesión se inició correctamente')
    }
  }
}
</script>


