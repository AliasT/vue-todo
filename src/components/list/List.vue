<template>
  <input type="checkbox" v-model="todo.isCompleted" v-on:click="updateStatus" />
  <input type="text" v-model="todo.content" @keyup.enter="updateContent" v-on:blur="updateContent" />
</template>

<script>
import storage from 'src/js/storage'

export default {
  props: ['todo'],
  methods: {
    // 更新状态
    updateStatus (event) {
      this.isCompleted = !this.isCompleted
    },

    // 更新内容
    updateContent (event) {
      this.content = event.target.value
      storage.updateItem(this.todo)
      this.$dispatch('updated')
    }
  }
}

</script>

<style>

</style>