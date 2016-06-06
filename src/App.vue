<template>
  <!-- 输入框 -->
  <form action="" >
    <input type="checkbox" v-model="defaultTodo.isCompleted" />
    <input type="text" v-model="defaultTodo.content" />
    <input type="submit" value="new" @click.prevent="addTodo">
  </form>

  <!-- 展示列表 -->
  <div id="item-list">
    <ul>
      <li v-for="todo in todos">
        <list :todo="todo"></list>
      </li>
    </ul>
  </div>
</template>

<script>
import List from './components/list/List'
import todo from 'src/js/todo'
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
      todos: todo.getTodos(1464946412042)
    }
  },

  methods: {
    addTodo (event) {
      const newTodo = todo.addTodo(this.defaultTodo, 1464946412042)
      this.defaultTodo = _.extend({}, defaultTodo)
      this.todos.unshift(newTodo)
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

<style>

</style>
