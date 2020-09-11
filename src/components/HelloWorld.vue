<template>
  <div class="hello">
    <table id="firstTable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Occupation</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in dataTable" :key="i.id">
          <td>{{i.name}}</td>
          <td>{{i.address}}</td>
          <td>{{i.phone}}</td>
          <td>{{i.occupation}}</td>
          <td>{{i.created_at}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: ["dataTable"]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
