app<template>
  <div id="app">
    <Directory></Directory>
    <List></List>
    
  </div>
</template>

<script>
  import List from './components/list/List'
  import Directory from './components/list/Directory'
  import todo from 'src/js/todo'

  export default {
    components: {
      List,
      Directory
    },
    data () {
      return {}
    },

    // 监听子组件事件
    events: {
      updated () {
        this.todos = todo.getTodos(1464946412042)
      }
    }
  }
</script>

<style lang="sass">
  $li-border: solid 1px #eee;
  body {
    padding: 10px;
    box-sizing: border-box;
  }

  #app {
    border: solid 1px #ccc;
    padding: 10px;
    height: 100%;
    &:after {
      content: '';
      display: block;
      clear:both;
    }
    display: flex;
  }

  #pages {
    background: #eee;
    * {
      box-sizing: border-box;
      width: 100%;
    }
    
    .page-button {
      padding: 6px 0;
      text-align: center;
      background: #eee;
      cursor: pointer;
    }

    ul {
      li {
        border-bottom: $li-border;
      }
    }

    input[type=text] {
      border: 0;
    }
  }

  #detail {
    flex: 1;
    padding: 0 0 0 10px;
    #item-list {
      ul {
        li { border-bottom: $li-border }
      }

      input[type=text] {
        border: 0;
      }
    }

    .todo-button {
      line-height: 35px;
      height: 35px;
      
      input[type=submit] {
        height: 100%;
        padding: 0 7px;
      }
    }
  }

</style>
