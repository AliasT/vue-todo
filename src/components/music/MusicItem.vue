<template>
  <!-- 单个音乐展示页 -->
  <p>{{music.title}}</p>
  <img v-bind:src="music.image" /><!-- 只能使用这种方式绑定元素的特殊属性 -->
  <ul id="track-list">
    <li v-for="track in music.attrs.songs">
      {{ track.title }}
    </li>
  </ul>
</template>

<script>
import $ from 'jquery'

export default {
  data () {
    return {
      isLoading: false,
      music: {
        title: '',
        image: '',
        attrs: {
          songs: []
        }
      }
    }
  },
  created () {
    $.ajax('https://api.douban.com/v2/music/1432411', {
      dataType: 'jsonp',
      cache: true,
      jsonpCallback: 'music'
    }).done((res) => {
      $.extend(this.$data.music, res)
    })
  }
}

</script>

<style>

</style>