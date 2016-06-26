<template>
  <p>
    <input type="checkbox" v-model="todo.isCompleted" @click="updateStatus" />
    <input type="text" class="flex-item-1" v-model="todo.content" @keyup.enter="updateContent" @blur="updateContent" />
  </p>
</template>

<script>
import todo from 'src/js/todo'

export default {
  props: ['todo'],
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
    }
  }
}

</script>

<style lang="sass" scoped>

</style>