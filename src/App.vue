<template>
  <!-- 输入框 -->
  <input type="checkbox" v-model="todo.isCompleted" v-on:click="updateContent" />
  <input type="text" v-model="todo.content" @keyup.enter="updateContent" v-on:blur="updateContent" />
  <div id="item-list">
    <ul>
      <li v-for="todo in todos">
        <list :todo="todo"></list>
      </li>
    </ul>
  </div>
</template>

<script>
// import Vue from 'vue'
import List from './components/list/List'
import todo from 'src/js/todo'

export default {
  data () {
    return {
      // 默认数据
      defaultTodo: {
        content: '',
        isCompleted: false
      },
      todos: todo.getTodos(1464946412042)
    }
  },

  components: {
    List
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
