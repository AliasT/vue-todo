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
