import $ from 'jquery'

export default {
  create (reqJSON) {
    $.ajax({
      url: '/directory',
      type: 'post',
      data: reqJSON
    }).done(function (resJSON) {

    }).fail(function (xhr, status) {

    })
  },

  get (fn) {
    $.ajax({
      url: '/directory',
      method: 'get'
    }).done(function (resJSON) {
      fn(resJSON)
    }).fail(function (xhr, status) {

    })
  },

  patch (reqJSON, fn) {
    $.ajax({
      url: '/directory/' + reqJSON._id.$oid,
      method: 'patch',
      data: { req: JSON.stringify(reqJSON) }
    }).done(function (resJSON) {
      fn(resJSON)
    })
  }
}
