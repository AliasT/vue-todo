import storage from 'src/js/storage'
import _ from 'underscore'

export default {
  // 添加todo
  addTodo (todo, listId) {
    let newTodo = _.extend({}, todo)
    newTodo.id = Date.now()
    newTodo.listId = listId
    storage.setItem(newTodo.id, newTodo)  // 添加一项至具体的列表

    let list = storage.getItem(listId)
    list.push(newTodo.id)
    storage.setItem(listId, list)

    return newTodo
  },

  // 更新todo
  updateTodo (todo) {
    storage.setItem(todo.id, todo)
  },

  // 获取所有todos
  getTodos (listId) {
    const list = storage.getItem(listId)
    return _.map(list, function (todoId, index) {
      return storage.getItem(todoId)
    })
  },

  // 移除todo
  removeTodo (todo) {
    let list = storage.getItem(todo.listId)
    list.splice(_.indexOf(list, todo.id), 1)
  }
}
