<template>
  <div>
    <p class=container>{{$store.state.user.token}}</p>
    <div class="container addlist">
        <h4 @click="newList()">Añadir Lista</h4>
        <div>
          <h5 style="display:inline">Nombre: </h5><input style="display:inline" type="text" name="" id="inputadd"><button @click="newList('inputadd')">Add</button>
        </div>
      </div>
    <div class="container-list container" id='list-container'>

      <div
        class="child-list mt-5"
        v-for="list in this.lists"
        :key="list.id"
        :id="'parent'+list.id"
      >
        <p :id="'listname'+list.id"  class="element-list">{{list.nombre}}</p>
        <input type="text" placeholder="edit" class="hiddelement" :id="'input'+list.id">
        <button @click="saveList(list.id, 'input'+list.id,'listname'+list.id,'savebutton'+list.id)" class="hiddelement" :id="'savebutton'+list.id">Save</button>
        <div><button @click="toggleList(list.id, 'input'+list.id,'listname'+list.id,'savebutton'+list.id)" class="buttonE" style="display:inline">E</button>
        <button @click="delateList(list.id,'parent'+list.id,'list-container')" class="buttonD" style="display:inline">D</button></div>
        
        <div v-for="card in cards" :key="card.id" :id="'child'+card.id+list.id">
          <div class="element-card" v-if="card.lista == list.id" :id="'element-card'+card.id+list.id">
            <div style="display:inline-block;">
            <p>{{card.nombre}}</p>
            </div>
          </div>
          <div class="showlist"> 
            <a v-if="card.lista==list.id" :id="'editbtn'+card.id+list.id" class="button-edit" @click="togglehidde('editbtn' + card.id+list.id, 'element-card' + card.id+list.id,'idedit' + card.id+list.id,'btn'+card.id+list.id,'edit',card.id, list.id)"
            >Edit</a>
            <a v-if="card.lista==list.id"
              @click="delateCards(card.id,'parent'+list.id, 'child'+card.id+list.id)"
              class="button-delate"
            >Delate</a>
            </div>
            <div v-if="card.lista == list.id" style="dip"><input class="hiddelement" :id="'idedit' + card.id+list.id" type="text" placeholder="Editar" value /> 
            <a @click="togglehidde('editbtn' + card.id+list.id, 'element-card' + card.id+list.id,'idedit' + card.id+list.id,'btn'+card.id+list.id, 'save',card.id, list.id)" class="hiddelement button-save" :id="'btn'+card.id+list.id">Save</a>  
            
             </div>
        </div>
        <div :id="'card'+ list.id"></div>
        <div class="button-card">
          <input :id="'id' + list.id" type="text" placeholder="Tarea" value />
          <a @click="pushCards('id'+list.id, 'card'+list.id, list.id)" class="button-task">Add</a>
        </div>
      </div>
    </div>

  

    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.js"></script>
    <script>
      token = {{"'"+tkn+"'"}}
      function delatelem(parent, child, id) {
      parent.removeChild(child);
      const url = "https://rocky-chamber-99447.herokuapp.com/api/v1/tarjetas/" + id + "/";
      const yourConfig = {
        headers: {
          Authorization: "Bearer " + token
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
    }

    

    </script>
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
      input1: "tarea",
      cardid: '',
      cardidarr: [],
      toptop: '',
      lasttablero:'vacío'
    };
  },
  computed: {
    topid: function(){
     let val = 0
    this.cards.forEach(element=>{if(element.id > val){val = element.id}})
    return val   
    },
    tkn: function() {
      return this.$store.state.user.token.toString();
    },
    table: function() {
      this.tablero = this.elemdeploy.filter(
        element => element.id == 10
      );
      return this.tablero;
    },

  //  lister: function() {
    //  this.lists = this.lists.filter(
        //element => element.tablero == this.$route.params.id
       // element => element.tablero == 11
      
      //);
      //return this.lists;
    //}
  },

  created() {
    this.getCards();
    this.getTableros();
    this.getListas();
    this.removeElementsByClass("list-group-item");
    this.destroy("hidden123");
    this.calltopid()
    this.callcardid()
    this.getlastid()
    this.getlastidtablero()
  },
  updated() {
    this.destroy("hidden123");
  },
  






  
  methods: {
    delateList(id, child, parent){


      


        //const url = "/api/api/v1/listas/"+id
        //const url = "/api/api/v1/listas/" + 6 + "/";
        const url = `https://rocky-chamber-99447.herokuapp.com/api/v1/listas/${id}/`
        console.log(url)
        let parent1 = document.getElementById(parent);
        let child1 = document.getElementById(child);
      parent1.removeChild(child1);
        const yourConfig = {
        headers: {
          Authorization: `Bearer ${this.$store.state.user.token}`
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

    toggleList(id,input,name,save){
        var element = document.getElementById(name);
      element.classList.toggle("hiddelement");
      
      //var element1 = document.getElementById(id2);
      //element1.classList.toggle("hiddelement");


      var element2 = document.getElementById(input);
      element2.classList.toggle("showelement");

      element2.value = element.innerHTML

      var element3 = document.getElementById(save);
      element3.classList.toggle("showelement");},


    saveList(id,input,nombre,save){

        const url = `https://rocky-chamber-99447.herokuapp.com/api/v1/listas/${id}/`
         var element3 = document.getElementById(input).value;
         document.getElementById(nombre).innerHTML = element3
         this.toggleList(id,input,nombre,save)
      const yourConfigh = {
        headers: {
          Authorization: `Bearer ${this.$store.state.user.token}`
        }
      };
      const yourConfigb = {
        nombre: element3,
      };

      axios
        .patch(url, yourConfigb, yourConfigh)
        .then(response => {
           response
           
        })
        .catch(() => {
          alert("error");
        });
        
    },


    
    newList(id){
      console.log(document.getElementById(id).value)
      var d = new Date()
      var fecha = `${d.getFullYear()}-${1}${d.getMonth()+1}-${d.getDate()}`
      console.log(fecha)
      const url = "https://rocky-chamber-99447.herokuapp.com/api/v1/listas/";
      const yourConfigh = {
        headers: {
          Authorization: `Bearer ${this.$store.state.user.token}`
        }
      };
      if (document.getElementById(id).value == "") {
        document.getElementById(id).value = "empty";
      }

      const yourConfigb = {
        nombre: document.getElementById(id).value,
        tablero: parseInt(this.lasttablero),
        fecha_creacion: '2025-12-12',
        posicion: '1000'
      };
      axios
        .post(url, yourConfigb, yourConfigh)
        .then(response => {
           this.lists.push(response.data)
           //this.getlastid(idtemp, c,b,b1, idtemp1,a);
        })
        .catch(() => {
          //alert("error");
          
        });


    },
    togglehidde(id,id2,id3,id4,save,idp,lst){

var element = document.getElementById(id);
   element.classList.toggle("hiddelement");
  
   var element1 = document.getElementById(id2);
   element1.classList.toggle("hiddelement");

   var element2 = document.getElementById(id3);
   element2.classList.toggle("showelement");

   var element3 = document.getElementById(id4);
   element3.classList.toggle("showelement");


  
  if(save == 'edit')
  element2.value = element1.firstChild.firstChild.innerHTML
  else
  element1.firstChild.firstChild.innerHTML = element2.value

   {
      const url = "https://rocky-chamber-99447.herokuapp.com/api/v1/tarjetas/" + idp + '/';
      const yourConfigh = {
        headers: {
          Authorization: `Bearer ${this.$store.state.user.token}`
        }
      };
      const yourConfigb = {
        nombre: element1.firstChild.firstChild.innerHTML,
        lista: lst.toString(),
      };

      axios
        .patch(url, yourConfigb, yourConfigh)
        .then(response => {
           response
        })
        .catch(() => {
          alert("error");
        });
    }


    },
    calltopid(){
      return this.topid

    },
    callcardid(){
      return this.cardid
    },
    
    delateCards(id, parent, child) {
      const url = "https://rocky-chamber-99447.herokuapp.com/api/v1/tarjetas/" + id + "/";
      console.log(url)
      let parent1 = document.getElementById(parent);
      let child1 = document.getElementById(child);
      parent1.removeChild(child1);
      const yourConfig = {
        headers: {
          Authorization: "Bearer" + this.$store.state.user.token
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
      var idtemp = "temp" + Date.now();
      var c = document.getElementById(a).value;
      //document.getElementById(a).value
      var d = document.getElementById(b).innerHTML;
      var b1 = '"' + b.toString() + '"';
      var idtemp1 = '"' + idtemp.toString() + '"';
      this.pushCards1(c, idd, idtemp, c,b, b1, idtemp1,a);
      //this.getlastid(idtemp, c,b, b1, idtemp1);
    },

    destroy(className) {
      var elements = document.getElementsByClassName(className);
      while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
      }
    },
    numpageprevnext(act, num) {
      if (num <= 0) num = 1;

      if (act == "na") this.prevp = Number(num);
      else if (act == "bef" && num != 1) this.prevp = Number(num) - 1;
      else if (act == "next" && num < this.larr.length)
        this.prevp = Number(num) + 1;

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
      while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
      }
    },
    listperTab(idt, idl, lista) {
      if (idt == idl) return lista;
      else return "hidden123";
    },
    getlastid(idtemp,c,b,b1,idtemp1,a){
      let x = `<a v-if="card.lista==list.id" :id="'editbtn'+card.id+list.id" class="button-edit" @click="togglehidde('editbtn' + card.id+list.id, 'element-card' + card.id+list.id,'idedit' + card.id+list.id,'btn'+card.id+list.id,'edit',card.id, list.id)">Edit</a>`
      const yourConfig = {
        headers: {
          Authorization: "Bearer " + this.$store.state.user.token
        } 
      };
      axios
        .get("https://rocky-chamber-99447.herokuapp.com/api/v1/tarjetas1/", yourConfig)
        .then(response => {
          this.toptop = response.data.results;
          document.getElementById(a).value = ""
        })  
        .catch(() => {
          //alert("error");
        });
    },
    getlastidtablero(){
      const yourConfig = {
        headers: {
          Authorization: "Bearer " + this.$store.state.user.token
        } 
      };
      axios
        .get("https://rocky-chamber-99447.herokuapp.com/api/v1/tableros/", yourConfig)
        .then(response => { 
          this.lasttablero = response.data.results[0].id
        })  
        .catch(() => {
          //alert("error");
        });
    },
    getCards() {
      const url = "https://rocky-chamber-99447.herokuapp.com/api/v1/tarjetas/";
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
    pushCards1(nombre1, id, idtemp, c,b, b1, idtemp1,a) {
      var d = new Date()
      var fecha = `${d.getFullYear()}-${1}${d.getMonth()+1}-${d.getDate()}`
      const url = "https://rocky-chamber-99447.herokuapp.com/api/v1/tarjetas/";
      const yourConfigh = {
        headers: {
          Authorization: `Bearer ${this.$store.state.user.token}`
        }
      };
      if (nombre1 == "") {
        nombre1 = "empty";
      }

      const yourConfigb = {
        nombre: nombre1,
        lista: id.toString(),
        descripcion: "VSCC",
        miembros: ["1"],
        dueño: "1",
        fecha_creacion: '2030-11-11',
        fecha_vencimiento: "2031-11-11",
        posicion: "1111"
      };
      axios
        .post(url, yourConfigb, yourConfigh)
        .then(response => {
           this.cards.push(response.data)
           this.getlastid(idtemp, c,b, b1, idtemp1,a);
        })
        .catch(() => {
          //alert("error");
          
        });
    },

    getTableros() {
      const url = "https://rocky-chamber-99447.herokuapp.com/api/v1/tableros/";
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
      const url = "https://rocky-chamber-99447.herokuapp.com/api/v1/listas/";
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
    display: flex
    align-items: center
    margin: 10px

.button-task
    background: green
    color: black
    padding: 5px
    cursor: pointer
    

.button-delate
    background: red
    color: black
    padding: 5px
    margin: 2px
    cursor: pointer

.button-edit
    background: blue
    color: black
    padding: 5px
    margin: 2px
    cursor: pointer

.button-save
    background: cyan
    color: black
    padding: 5px
    margin: 2px
    cursor: pointer
    display: inline

.showlist
  display: flex
  flex-direction: row
  align-items: center
  justify-content: space-around

.hiddelement
  display: none

.showelement
  display: block

.addlist
  border: 1px solid black
  margin-top: 50px
  margin-left: 400px
  text-align: center
  cursor: pointer
  width: 400px
  padding: 20px

.buttonE
  background: yellow

.buttonD
  background: red


</style>

