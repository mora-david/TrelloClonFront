<template>
    <div>
      <h1 class="text-center mb-5">TABLEROS</h1>
      <div class="container mt-5">
    
    <div class="d-flex flex-row bd-highlight mb-3 justify-content-center flex-wrap">
    <div v-for="category in elemdeploy" :key="category.id" class=" p-2 bd-highlight">
      <div class="">
      <div class="card cardtab" style="width: 18rem;">
  <div class="card-body">
    <h4 class="card-title text-center">{{category.nombre}}</h4>
    <p>{{category.id}}</p>
    <h5 class="card-title text-center">{{category.dueño.username}}</h5>
    <p class="card-text text-center">{{category.descripcion}}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li :class="'list-group-item'+' '+listperTab(category.id, list.tablero, list.nombre)" :id="list.nombre+category.id"  v-for="list in lists" :key="list.id">{{listperTab(category.id, list.tablero, list.nombre)}}</li>
  </ul>
  <div class="card-body row justify-content-between">
    <a href="#" class="card-link">Tablero</a>
    <a href="#" class="card-link">Favoritos</a>
  </div>
  </div>
</div>
</div>
</div>
    </div>
    <nav aria-label="Page navigation">
  <ul class="pagination example row justify-content-center">
    <li class="page-item" @click="numpageprevnext('bef',prevp), elemforpage3(3, prevp)" >
      <a class="page-link" href="#" aria-label="Previous" >
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only" >Previous</span>
      </a>
    </li>
    <li class="page-item" v-for="lar in larr" :key="lar.id"><a class="page-link" href="#" @click="elemforpage3(3, lar), numpageprevnext('na',lar)">{{lar}}</a></li>
    <li class="page-item" @click="numpageprevnext('next', prevp), elemforpage3(3, prevp)">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only">Next</span>
      </a>
    </li>
  </ul>
</nav>  
  <div>
  </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      categories: [],
      prueba: '',
      lists: [],
      dompr:'',
      larr:[],
      elemdeploy: [],
      prevp: 1,
    }
  },
  created() {
    this.getTableros()
    this.getListas()
    this.removeElementsByClass('list-group-item')
    this.destroy('hidden123')
  },
  updated(){
this.destroy('hidden123')
  },
  methods: {
          destroy(className){
          var elements = document.getElementsByClassName(className);
          while(elements.length > 0){
          elements[0].parentNode.removeChild(elements[0]);
    }
          },
          numpageprevnext(act, num){
          console.log(this.larr.length)
          console.log(num)
          if(num<=0)
          num = 1

          if (act == 'na')
          this.prevp = Number(num)

          else if(act == 'bef' && num != 1)
          this.prevp = Number(num) - 1

          else if(act == 'next' && num < this.larr.length)
          this.prevp = Number(num) + 1
          console.log(this.prevp)
      },
          elemforpage3(a, b){
          this.elemdeploy = []
          var elemperpag = a
          var numpag = b
          for(var i=0;i<a;i++){
              if(this.categories[(b * a - i)-1] != null)
              this.elemdeploy.push(this.categories[(b * a - i)-1])
          }

      },
      arrPag(){
            var temparray=[]
            for(var i=1;i<=this.categories.length; i++){
                temparray.push(i)
            }
            var ko = temparray.length/3
            for(var j=1; j<=ko;j++){
                this.larr.push(j)
            }
            if(temparray.length%3 != 0){
                this.larr.push(this.larr.length+1)
            }
        },
    removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    this.dompr = elements
    console.log(this.dompr[0])
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
},
    listperTab(idt, idl, lista){
      
      if(idt == idl)
      return lista
      else
      return 'hidden123'
    },
    getTableros() {
      const url = 'https://rocky-chamber-99447.herokuapp.com/api/v1/tableros/'
      const yourConfig = {
   headers: {
      Authorization: "Bearer " + this.$store.state.user.token
   }
}
      axios
        .get(url, yourConfig)
        .then((response) => {
          this.categories = response.data.results
          this.prueba = response.data
          this.arrPag()
          this.elemdeploy= this.categories.slice(0, 3)
        })
        .catch(() => {
          alert('error')
        })
    },
        getListas() {
          const yourConfig = {
   headers: {
      Authorization: "Bearer " + this.$store.state.user.token
   }
}
      const url = 'https://rocky-chamber-99447.herokuapp.com/api/v1/listas/'
      axios
        .get(url, yourConfig)
        .then((response) => {
          this.lists = response.data.results
        })
        .catch(() => {
          alert('error')
        })
    }
  }}
</script>

<style lang="sass">
body
  color: #ea4c4c

.cardtab
  border-radius: 20px
  background: #e6d8e0
</style>