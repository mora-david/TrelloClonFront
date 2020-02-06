export const state = () => ({
    user: {
        username: '',
        password:'',
        token:'',
    }
  })

  export const strict = false
  
  export const mutations = {
    login (state, obj) {
      state.user.username = obj.username
      state.user.password = obj.pass
      state.user.token = obj.token
    }
  }

 
  
  