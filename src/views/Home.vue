<template>
  <div class="home">
    <input type="text" v-model="search" @click="searchFunc('name')" placeholder="Search! by name" class="bg-gray-200 hover:bg-white hover:border-gray-300 hover:border-solid hover:border-4 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300 border-blue-400 border-solid border-4 rounded mx-2"/>
    <input type="text" v-model="search" @click="searchFunc('address')" placeholder="Search! by address" class="bg-gray-200 hover:bg-white hover:border-black-1 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300 border-blue-400 border-solid border-4 rounded mx-2"/>
    <select v-model="search" @click="searchFunc('occupation')" >
      <option disabled value="">Please Select For Occupation</option>
      <option>Developer</option>
      <option>Doctor</option>
      <option>Chef</option>
      <option>Designer</option>
      <option>Uber Driver</option>
      <option>Soilder</option>
      <option>Dentist</option>
    </select>

    <div class="w-full">
      <table id="firstTable" class="table-auto m-auto">
        <thead>
          <tr class="group border bg-indigo-600 text-white hover:bg-white hover:text-indigo-600">
            <th class="bg-indigo-600 text-white hover:bg-white hover:text-indigo-600" @click="sort('name')">Name</th>
            <th class="bg-indigo-600 text-white hover:bg-white hover:text-indigo-600" @click="sort('address')">Address</th>
            <th class="bg-indigo-600 text-white hover:bg-white hover:text-indigo-600" @click="sort('phone')">Phone</th>
            <th class="bg-indigo-600 text-white hover:bg-white hover:text-indigo-600" @click="sort('occupation')">Occupation</th>
            <th class="bg-indigo-600 text-white hover:bg-white hover:text-indigo-600" @click="sort('created_at')">Created At</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in sortedDataTable" :key="i.id">
            <td class="border">{{i.name}}</td>
            <td class="border">{{i.address}}</td>
            <td class="border">{{i.phone}}</td>
            <td class="border">{{i.occupation}}</td>
            <td class="border">{{i.created_at}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>
      <button @click="pPage" class="bg-transparent hover:bg-blue-400 text-blue-800 hover:text-white border-blue-400 border-solid border-4 rounded-tl-lg m-5 px-10">Previous</button>
      <button @click="nPage" class="bg-transparent hover:bg-blue-400 text-blue-800 hover:text-white border-blue-400 border-solid border-4 rounded-tr-lg m-5 px-10">Next</button>
    </p>
    debugging: sort={{currentSort}}, dir={{currentSortDir}}
    <div class="max-w-sm rounded overflow-hidden shadow-xl m-auto mt-8 bg-gray-100">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Some Info On the Project</div>
        <p class="text-gray-700 text-base">
         When you first open the project, the table will be empty. To show data,<br>click inside one of the search fields <br>
         Under the table, you will notice text that says debugging... This shows by which header the table is sorted  <br>
         and by whether it is in ascending or descending order <br>
        </p>
      </div>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios'


export default {
  name: 'Home',
  components: {
    //HelloWorld
  },
  data() {
    return { 
      dataTable: [],
      currentSort: 'name',
      currentSortDir: 'asc',
      pageSize: 8,
      currentPage: 1,
      search: '',
      searchType: ''
    }
  },
  methods: {
    sort: function(s) {
      //if s==current sort, reverse
      if (s===this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    },
    searchFunc: function(s) {
      this.searchType = s;
    },
    nPage:function() {
      if((this.currentPage*this.pageSize) < this.dataTable.length) this.currentPage++;
    },
    pPage: function() {
      if(this.currentPage > 1) this.currentPage--;
    }
  },
  created() {
    axios.get('http://localhost:8080/provided-data.json').then(res=> {
        this.dataTable = res.data;
      }).catch(err => console.log(err));
  },
  computed: {
    sortedDataTable: function() {
      return this.dataTable.slice().sort((a,b) => {
        let modifier = 1;
        if (this.currentSortDir ==='desc') modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      }).filter(i => {
        if (this.searchType === 'name') {
          return i.name.toLowerCase().includes(this.search.toLowerCase());
        }
        if (this.searchType === 'address') {
          return i.address.toLowerCase().includes(this.search.toLowerCase());
        }
        if(this.searchType === 'occupation') {
          return i.occupation.toLowerCase().includes(this.search.toLowerCase());
        }
      }).filter((row, index) => {
        let start = (this.currentPage-1)*this.pageSize;
        let end = this.currentPage*this.pageSize;
        if(index >= start && index < end) return true;
      });
    }
  }
}
</script>

<style scoped>
</style>
