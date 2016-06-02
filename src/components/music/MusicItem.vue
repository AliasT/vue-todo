<template>
  <!-- 单个音乐展示页 -->
  <p>{{music.title}}</p>
  <img v-bind:src="music.image" />
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      isLoading: false,
      music: {
        title: '',
        image: ''
      }
    }
  },
  created () {
    $.ajax('https://api.douban.com/v2/music/1432411', {
      dataType: 'jsonp'
    }).done((res) => {
      this.$data.music.title = res.title
      this.$data.music.image = res.image
    })
  }
}

</script>

<style>

</style>