<template>
  <div>
    <div class="container-list container">
      <div class="child-list mt-5" v-for="list in this.lister" :key="list.id" :id="'parent'+list.id">
        <p class="element-list">{{list.nombre}}</p>

        <div v-for="card in cards" :key="card.id" :id="'child'+card.id+list.id">
          <div class="element-card" v-if="card.lista == list.id" >
            <i style="margin:7px" class="fas fa-grip-vertical" :id="'card' + card.id"></i>
            {{card.nombre}}
            <a @click="delateCards(card.id,'parent'+list.id, 'child'+card.id+list.id)" class="button-task">Delate</a>
          </div>
        </div>
        <div :id="'card'+ list.id"></div>
        <div class="button-card">
          <input :id="'id' + list.id" type="text" placeholder="Tarea" value=""/>
          <a @click="pushCards('id'+list.id, 'card'+list.id, list.id)" class="button-task">Add</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      categories: [],
      prueba: "",
      lists: [],
      dompr: "",
      larr: [],
      elemdeploy: [],
      prevp: 1,
      tablero: [1],
      cards: [1],
      input1: "tarea"
    };
  },
  computed: {
    table: function() {
      this.tablero = this.elemdeploy.filter(
        element => element.id == this.$route.params.id
      );
      return this.tablero;
    },

    lister: function() {
      this.lists = this.lists.filter(
        element => element.tablero == this.$route.params.id
      );
      return this.lists;
    }
  },
  created() {
    this.getCards();
    this.getTableros();
    this.getListas();
    this.removeElementsByClass("list-group-item");
    this.destroy("hidden123");
  },
  updated() {
    this.destroy("hidden123");
  },
  methods: {
    delateCards(id,parent, child){
      const url = "/api/api/v1/tarjetas/"+id+'/';
      let parent1 = document.getElementById(parent)
      let child1 = document.getElementById(child)
      console.log(parent1)
      console.log(child1)
      //parent1.removeChild(child1)
      const yourConfig = {
        headers: {
          Authorization: "Bearer"+this.$store.state.user.token
        }
      };
      axios
        .delete(url, yourConfig)
        .then(response => {
          return response.data.results;
        })
        .catch(() => {
          alert("error");
        });

    },
    pushCards(a, b, idd) {
      var c = document.getElementById(a).value;
      var d = document.getElementById(b).innerHTML;
      var e =
        '<div class="element-card" v-if="card.lista == list.id"><i style="margin:7px" class="fas fa-grip-vertical">' +
        `${c}` +
        "</i></div>";
      document.getElementById(b).innerHTML += e;
      this.pushCards1(c,idd);
    },

    destroy(className) {
      var elements = document.getElementsByClassName(className);
      while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
      }
    },
    numpageprevnext(act, num) {
      console.log(this.larr.length);
      console.log(num);
      if (num <= 0) num = 1;

      if (act == "na") this.prevp = Number(num);
      else if (act == "bef" && num != 1) this.prevp = Number(num) - 1;
      else if (act == "next" && num < this.larr.length)
        this.prevp = Number(num) + 1;
      console.log(this.prevp);
    },
    elemforpage3(a, b) {
      this.elemdeploy = [];
      var elemperpag = a;
      var numpag = b;
      for (var i = 0; i < a; i++) {
        if (this.categories[b * a - i - 1] != null)
          this.elemdeploy.push(this.categories[b * a - i - 1]);
      }
    },
    arrPag() {
      var temparray = [];
      for (var i = 1; i <= this.categories.length; i++) {
        temparray.push(i);
      }
      var ko = temparray.length / 3;
      for (var j = 1; j <= ko; j++) {
        this.larr.push(j);
      }
      if (temparray.length % 3 != 0) {
        this.larr.push(this.larr.length + 1);
      }
    },
    removeElementsByClass(className) {
      var elements = document.getElementsByClassName(className);
      this.dompr = elements;
      console.log(this.dompr[0]);
      while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
      }
    },
    listperTab(idt, idl, lista) {
      if (idt == idl) return lista;
      else return "hidden123";
    },
    getCards() {
      const url = "/api/api/v1/tarjetas/";
      const yourConfig = {
        headers: {
          Authorization: "Bearer " + this.$store.state.user.token
        }
      };
      axios
        .get(url, yourConfig)
        .then(response => {
          this.cards = response.data.results;
        })
        .catch(() => {
          alert("error");
        });
    },
    pushCards1(nombre1, id) {
      console.log(nombre1)
      const url = "/api/api/v1/tarjetas/";
      const yourConfigh = {
        headers: {
          Authorization: `Bearer ${this.$store.state.user.token}`
        }}
        if(nombre1 == ''){
          nombre1 = 'empty'
        }
       
        
      const yourConfigb = {
        nombre: nombre1,
        lista: id.toString(),
        descripcion: "VSCC",
        miembros: ["1"],
        dueño: "1",
        fecha_creacion: "2020-11-11",
        fecha_vencimiento: "2021-11-11",
        posicion: "666"}
        
      axios
        .post(url, yourConfigb, yourConfigh)
        .then(response => {
          return response;
        })
        .catch(() => {
          alert("error");
        });
    },

    getTableros() {
      const url = "/api/api/v1/tableros/";
      const yourConfig = {
        headers: {
          Authorization: "Bearer " + this.$store.state.user.token
        }
      };
      axios
        .get(url, yourConfig)
        .then(response => {
          this.categories = response.data.results;
          this.prueba = response.data;
          this.arrPag();
          this.elemdeploy = this.categories.slice(0, 3);
        })
        .catch(() => {
          alert("error");
        });
    },
    getListas() {
      const yourConfig = {
        headers: {
          Authorization: "Bearer " + this.$store.state.user.token
        }
      };
      const url = "/api/api/v1/listas/";
      axios
        .get(url, yourConfig)
        .then(response => {
          this.lists = response.data.results;
        })
        .catch(() => {
          alert("error");
        });
    }
  }
};
</script>

<style lang="sass">
body
  color: black

.container-list
    display: flex
    flex-wrap: wrap
    

.child-list
    padding: 20px
    width: 30%
    border: 1px solid black
    margin: 5px
    background: #d6f5e024

.element-card
    border: 1px solid black
    padding: 5px
    margin: 5px
    text-align: center
    display: flex
    background: #f7e02878
    

.element-list
    font-size: 1.5rem
    padding: 10px
    margin: 5px
    text-align: center

.button-card
    display:flex
    align-items:center
    margin: 10px

.button-task
    background: green
    color: black
    padding: 5px

</style>