import storage from 'src/js/storage'
import _ from 'underscore'
import Wilddog from 'wilddog'

function getBaseUrl (id) {
  return '/' + id + '/todo'
}

function getTodoUrl (directoryId) {
  return function (id) {
    return getBaseUrl(directoryId) + '/' + id
  }
}

export default {
  _ref: new Wilddog('https://xiaobing.wilddogio.com/directory'),
  // 获取所有todos
  getTodos (id, fn) {
    this._ref.child(getBaseUrl(id)).on('value', function (resJSON) {
      fn(resJSON.val())
    })
  },

  // 添加todo
  addTodo (reqJSON, id) {
    this._ref.child(getBaseUrl(id)).push(reqJSON)
  },

  // 更新todo
  updateTodo (key, todo) {
    this._ref.child(getTodoUrl(todo.directory_id)(key)).update(todo)
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
