import storage from 'src/js/storage'
import _ from 'underscore'

export default {
  // 添加todo
  addTodo (todo, listId) {
    todo.id = Date.now()
    todo.listId = listId
    storage.setItem(todo.id, todo)  // 添加一项至具体的列表
    storage.setItem(listId, storage.getItem(listId).push(todo.id))
  },

  // 更新todo
  updateTodo (todo) {
    storage.setItem(todo.id, todo)
  },

  // 获取所有todos
  getTodos (listId) {
    let list = storage.getItem(listId)
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
