<template>
  <p-head></p-head>
  <!-- 输入框 -->
  <list :todo="defaultTodo"></list>
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
import PHead from './components/include/Header'
import List from './components/list/List'
import storage from 'src/js/storage'

export default {
  data () {
    return {
      // 默认数据
      defaultTodo: {
        content: '',
        isCompleted: false
      },
      todos: storage.getTodos(1464946412042)
    }
  },

  components: {
    PHead,
    List
  },

  // 监听子组件事件
  events: {
    updated () {
    }
  }
}
</script>

<style>

</style>
