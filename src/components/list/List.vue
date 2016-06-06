<template>
  <input type="checkbox" v-model="todo.isCompleted" v-on:click="updateContent" />
  <input type="text" v-model="todo.content" @keyup.enter="updateContent" v-on:blur="updateContent" />
</template>

<script>
import todo from 'src/js/todo'

export default {
  props: ['todo'],
  methods: {
    // 更新内容
    updateContent (event) {
      this.content = event.target.value
      todo.updateTodo(this.todo)
      this.$dispatch('updated')
    }
  }
}

</script>

<style>

</style>