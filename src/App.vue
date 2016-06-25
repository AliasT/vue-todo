<template>
  <div id="app">
    <!-- 文件夹列表 -->
    <div id="pages">
      <p @click="newDirectory">+</p>
      <ul class="pages-list">
        <li v-for="page in pages">
          
        </li>
        <!-- 用来新增文件夹的输入框 -->
        <li><input type="text" placeholder="文件夹名称" :class="{ 'hidden': createdIsDone } " @keyup.enter="addDirectory"></li>
      </ul>
    </div>

    <div id="detail">
      <!-- 输入框 -->
      <form action="" >
        <input type="text" v-model="defaultTodo.content" />
        <input type="submit" value="new" @click.prevent="addTodo">
      </form>

      <!-- 展示列表 -->
      <div id="item-list">
        <ul>
          <li v-for="todo in todos">
            <list :todo.sync="todo"></list>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import List from './components/list/List'
  import todo from 'src/js/todo'
  import directory from 'src/js/directory'
  import _ from 'underscore'

  const defaultTodo = {
    content: '',
    isCompleted: false
  }

  export default {
    components: {
      List
    },

    data () {
      return {
        // 默认数据
        defaultTodo: _.extend({}, defaultTodo),
        todos: todo.getCompleted(1464946412042),
        createdIsDone: true
      }
    },

    methods: {
      addTodo (event) {
        const newTodo = todo.addTodo(this.defaultTodo, 1464946412042)
        this.defaultTodo = _.extend({}, defaultTodo)
        this.todos.unshift(newTodo)
      },

      newDirectory (event) {
        this.createdIsDone = false
      },

      addDirectory (event) {
        const target = event.target
        const value = target.value.trim()

        console.log(directory)
        directory.create({ name: value })
        this.createdIsDone = true
      }
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
  #app {
    &:after {
      content: '';
      display: block;
      clear:both;
    }
  }

  #pages {
    float: left;
  }

  #detail {
    float: right;
  }

  .hidden {
    display: none;
  }
</style>
