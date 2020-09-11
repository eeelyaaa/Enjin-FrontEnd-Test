<template>
  <div class="home">
    <input type="text" v-model="search" @click="searchFunc('name')" placeholder="Search! by name" />
    <input type="text" v-model="search" @click="searchFunc('address')" placeholder="Search! by address" />
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

    <table id="firstTable">
      <thead>
        <tr>
          <th @click="sort('name')">Name</th>
          <th @click="sort('address')">Address</th>
          <th @click="sort('phone')">Phone</th>
          <th @click="sort('occupation')">Occupation</th>
          <th @click="sort('created_at')">Created At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in sortedDataTable" :key="i.id">
          <td>{{i.name}}</td>
          <td>{{i.address}}</td>
          <td>{{i.phone}}</td>
          <td>{{i.occupation}}</td>
          <td>{{i.created_at}}</td>
        </tr>
      </tbody>
    </table>
    <p>
      <button @click="pPage">Previous</button>
      <button @click="nPage">Next</button>
    </p>
    debug: sort={{currentSort}}, dir={{currentSortDir}}
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
      pageSize: 5,
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
      console.log(this.search);
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
table {
  font-family: 'Open Sans', sans-serif;
  width: 750px;
  border-collapse: collapse;
  border: 3px solid #44475C;
  margin: 10px 10px 0 10px;
}

table th {
  text-transform: uppercase;
  text-align: left;
  background: #44475C;
  color: #FFF;
  padding: 8px;
  min-width: 30px;
}

table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7D82A8;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: #D4D8F9;
}

</style>
