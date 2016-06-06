import localStorage from 'localStorage'

export default {
  getItem (name) {
    return JSON.parse(localStorage.getItem(name))
  },

  setItem (name, value) {
    localStorage.setItem(name, JSON.stringify(value))
  },

  removeItem (name) {
    localStorage.removeItem(name)
  }
}

// export default {
//   addTodo (todo) {
//     setT
//   }
//   updateItem (target) {
//     let result = getItem('1464946412042')
//     if (!target.id) result.push(Date.now)
//     let time = target.id || _.last(result)

//     if (!target.id) setItem('1464946412042', result)

//     setItem(time, { isCompleted: target.isCompleted, content: target.content, id: time })
//   },

//   getTodos (listId) {
//     return _.map(getItem(listId), function (v, i) {
//       return getItem(v)
//     }).reverse()
//   }
// }
