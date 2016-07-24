<template>
  <div id="detail">
    <!-- 输入框 -->
    <form action="" @submit.prevent="addTodo(defaultTodo)">
      <div class="flex center">
        <input type="text" class="flex-item-1"  v-model="defaultTodo.content" />
        <p class="todo-button">
          <input type="submit" value="new" @click.prevent="addTodo(defaultTodo)">
        </p>
      </div>
    </form>

    <!-- 展示列表 -->
    <div id="item-list">
      <ul>
        <li v-for="(key, todo) in todos" class="flex center">
          <p>
            <input type="checkbox" v-model="todo.is_completed" @change="updateTodo(key, todo)" />
            <input type="text" class="flex-item-1" v-model="todo.content" @keyup.enter="updateTodo(key, todo)" @blur="updateTodo(key, todo)" />
          </p>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import todo from 'src/js/todo'
import _ from 'underscore'

const defaultTodo = {
  content: '',
  is_completed: false
}

export default {
  data () {
    return {
      defaultTodo: _.extend({}, defaultTodo),
      todos: {},
      parentId: ''
    }
  },
  methods: {
    updateTodo (key, modifiedTodo) {
      todo.updateTodo(key, modifiedTodo)
    },

    addTodo (event) {
      todo.addTodo(_.extend({ directory_id: this.parentId }, this.defaultTodo), this.parentId)
      this.defaultTodo = _.extend({}, defaultTodo)
    }
  },

  events: {
    updateDirectoryId: function (directoryId) {
      this.parentId = directoryId
      todo.getTodos(directoryId, (resJSON) => {
        this.todos = resJSON
      })
    }
  }
}

</script>

<style lang="sass" scoped>

</style>