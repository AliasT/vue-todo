<template>
  <div class="hello">
    <p>{{name}}</p>
    <p>{{loc_name}}</p>
  </div>
</template>

<script>

  import $ from 'jquery'
  export default {
    data () {
      return {
        // note: changing this line won't causes changes
        // with hot-reload because the reloaded component
        // preserves its current state and we are modifying
        // its initial state.
        name: '',
        loc_name: ''
      }
    },
    created () {
      $.get('/user/me').done((data) => {
        this.$data = data
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
