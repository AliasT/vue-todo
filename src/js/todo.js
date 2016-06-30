import storage from 'src/js/storage'
import _ from 'underscore'
import $ from 'jquery'

export default {
  // 添加todo
  addTodo (reqJSON, directoryId) {
    $.ajax({
      url: '/directory/' + directoryId + '/todo',
      type: 'post',
      data: { req: JSON.stringify(reqJSON) }
    }).fail(function () {
      // todo
    })
  },

  // 更新todo
  updateTodo (todo) {
    $.ajax({
      url: '/directory/' + todo.directory_id.$oid + '/todo/' + todo._id.$oid,
      type: 'patch',
      data: { req: JSON.stringify(todo) }
    }).fail(function () {
      // todo
    })
  },

  // 获取所有todos
  getTodos (directoryId, fn) {
    $.ajax({
      url: ['/directory/', directoryId, '/todo'].join(''),
      method: 'get'
    }).done(function (resJSON) {
      fn(resJSON)
    })
  },

  getCompleted (listId) {
    const todos = this.getTodos(listId)
    return _.filter(todos, function (todo, index) {
      return todo.isCompleted === true
    })
  },

  getUnCompleted (listId) {
    const todos = this.getTodos(listId)
    return _.filter(todos, function (todo, index) {
      return todo.isCompleted === false
    })
  },

  // 移除todo
  removeTodo (todo) {
    let list = storage.getItem(todo.listId)
    list.splice(_.indexOf(list, todo.id), 1)
  }
}
