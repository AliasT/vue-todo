// import fetch from "whatwg-fetch"
var Wilddog = require('wilddog')

export default {
  _ref: new Wilddog('https://xiaobing.wilddogio.com/directory'),
  create (reqJSON) {
    debugger
    this._ref.push(reqJSON)
  },
  patch (key, value) {
    this._ref.update(key, value)
  }
}
