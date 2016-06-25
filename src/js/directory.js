import * as $ from 'jquery'

export default {
  create (reqJSON) {
    $.ajax({
      url: '/directory/create',
      type: 'post',
      data: reqJSON
    }).done(function (resJSON) {

    }).fail(function (xhr, status) {

    })
  }
}
