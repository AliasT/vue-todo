<template>
  <div id="detail">
    <!-- 输入框 -->
    <form action="" >
      <div class="flex center">
        <input type="text" class="flex-item-1"  v-model="defaultTodo.content" />
        <p class="todo-button">
          <input type="submit" value="new" @click.prevent="addTodo">
        </p>
      </div>
    </form>

    <!-- 展示列表 -->
    <div id="item-list">
      <ul>
        <li v-for="todo in todos" class="flex center">
          <p>
            <input type="checkbox" v-model="todo.is_completed" @click="updateStatus" />
            <input type="text" class="flex-item-1" v-model="todo.content" @keyup.enter="updateContent" @blur="updateContent" />
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
      todos: []
    }
  },
  methods: {
    updateStatus (event) {
      this.todo.isCompleted = !this.todo.isCompleted
      this.updateTodo(event)
    },
    // 更新内容
    updateContent (event) {
      this.todo.content = event.target.value
      this.updateTodo(event)
    },

    updateTodo (event) {
      todo.updateTodo(this.todo)
      this.$dispatch('updated')
    },

    addTodo (event) {
      const newTodo = todo.addTodo(this.defaultTodo, 1464946412042)
      this.defaultTodo = _.extend({}, defaultTodo)
      this.todos.unshift(newTodo)
    }
  },

  events: {
    updateDirectoryId: function (directoryId) {
      todo.getTodos(directoryId, (resJSON) => {
        this.todos = resJSON
      })
    }
  }
}

</script>

<style lang="sass" scoped>

</style>