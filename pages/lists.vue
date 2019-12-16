<template>
    <div>
      <div class="container mt-5">
    <h1 class="text-center mb-5">LISTAS</h1>
    <div class="d-flex flex-row bd-highlight mb-3 justify-content-center flex-wrap">
    <div v-for="list in elemdeploy" :key="list.id" class="p-2 bd-highlight">
      <div class="">
      <div class="card" style="width: 18rem;">
  <img src="" class="card-img-top" alt="...">
  <div class="card-body">
    <h4 class="card-title text-center">{{list.nombre}}</h4>
        <h4 class="card-title text-center">{{list.id}}</h4>

  </div>
  <div :style="ht100" :id="list.nombre + 'id'">
  <ul class="list-group list-group-flush">
    <li :class="'list-group-item '+ listperTab(card.lista, list.id, card.nombre)" v-for="card in cards" :key="card.id">{{listperTab(card.lista, list.id, card.nombre)}}</li>
  </ul>
  </div>
  <div class="card-body row justify-content-between">
    <a href="#" class="card-link">Tablero</a>
    <a href="#" class="card-link">Favoritos</a>
  </div>
  <div  class="row justify-content-center mt-3 mb-3">
      <button @click="showListasFull()" :id="list.nombre + 'btn'">BTN</button>
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
      prevp: 1,
      lists: [],
      larr:[],
      elemdeploy: [],
      ht100: 'height:100px; overflow:hidden',
      cards: []
    }
  },
  created() {
    this.getTableros()
    this.getCards()
  },
    updated(){
this.destroy('hidden123')
  },
  methods: {
    destroy(className){
          var elements = document.getElementsByClassName(className);
          while(elements.length > 0){
          elements[0].parentNode.removeChild(elements[0])}
          },
    listperTab(idt, idl, lista){
      
      if(idt == idl)
      return lista
      else
      return 'hidden123'
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
              if(this.lists[(b * a - i)-1] != null)
              this.elemdeploy.push(this.lists[(b * a - i)-1])
          }

      },
        arrPag(){
            var temparray=[]
            for(var i=1;i<=this.lists.length; i++){
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
      showListasFull(){
          if(this.ht100 == '')
          this.ht100 = 'height:100px; overflow:hidden'
          else
          this.ht100 = ''
      },
    getTableros() {
      const url = '/api/api/v1/listas/'
      axios
        .get(url)
        .then((response) => {
          this.lists = response.data.results
              this.arrPag()
        this.elemdeploy= this.lists.slice(0, 3)
        })
        .catch(() => {
          alert('error')
        })
    },
        getCards() {
      const url = '/api/api/v1/tarjetas/'
      axios
        .get(url)
        .then((response) => {
          this.cards = response.data.results
        })
        .catch(() => {
          alert('error')
        })
    }
  }}
</script>

<style>
body {
    
}
</style>