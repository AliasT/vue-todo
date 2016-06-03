import localStorage from 'localStorage'
import _ from 'underscore'

function getItem (name) {
  return JSON.parse(localStorage.getItem(name))
}

function setItem (name, value) {
  return localStorage.setItem(name, JSON.stringify(value))
}

export default {
  updateItem (target) {
    let time = target.id || Date.now()
    let result = getItem('1464946412042')

    result.push(time)

    if (!target.id) setItem('1464946412042', result)

    setItem(time, { isCompleted: target.isCompleted, content: target.content, id: time })
  },

  getTodos (listId) {
    return _.map(getItem(listId), function (v, i) {
      return getItem(v)
    })
  }
}
