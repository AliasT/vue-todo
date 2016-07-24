<template>
  <!-- 文件夹列表 -->
  <div id="pages">
    <p @click="newDirectory" class="page-button">+</p>
    <ul class="pages-list"  >
      <!-- track_by是必须的 -->
      <li v-for="(key, directory) in directories" track-by="$index" data-index="{{ key }}" @dblclick="editDirectory($index, $event)" @click="showCurrent(key, $index)" >          
        <p><input type="text" v-model="directory.name" disabled :class="{ 'white-bg': currentIndex === $index }"@keyup.enter="syncDirectory(key, directory)"></p>
      </li>
      <!-- 用来新增文件夹的输入框 -->
      <li>
        <p><input type="text" placeholder="文件夹名称" :class="{ 'hidden': createdIsDone } " @keyup.enter="addDirectory"></p>
      </li>
    </ul>
  </div>
</template>

<script>
  import directory from 'src/js/directory'
  // import _ from 'underscore'
  // import $ from 'jquery'
  // import fetch from "whatwg-fetch"
  
  var clicked = null
  var isEditing = false

  export default {
    data () {
      return {
        directories: {},
        createdIsDone: true,
        currentDirectoryId: '',
        currentIndex: 0
      }
    },

    ready () {
      // 获取文件夹列表, 渲染第一个文件夹的所有todo
      directory._ref.on('value', (snapshot) => {
        this.directories = snapshot.val()
      })
    },

    // 数据监听列表
    watch: {
      'currentDirectoryId': function (newVal, oldVal) {
        this.$parent.$broadcast('updateDirectoryId', newVal)
      }
    },
    // 事件列表
    methods: {
      newDirectory (event) {
        this.createdIsDone = false
      },

      addDirectory (event) {
        this.createdIsDone = true   // 隐藏新建输入框
        var newDirectory = { name: event.target.value.trim() }
        directory.create(newDirectory)
      },

      editDirectory (index, event) {
        clicked = null
        let target = event.target
        if (target.tagName === 'INPUT') {
          this.currentIndex = index
          isEditing = true
          target.removeAttribute('disabled')
          target.focus()
        }
      },

      syncDirectory (key, modifiedDirectory) {
        directory.patch({ [key]: modifiedDirectory })
      },
      // 文件夹选择
      showCurrent (key, index) {
        if (clicked) {
          clearTimeout(clicked)
        }
        clicked = setTimeout(() => {
          if (clicked && !isEditing) {
            this.currentDirectoryId = key
            this.currentIndex = index
            clicked = null
          }
        }, 200)
      }
    }
  }
</script>

<style lang="sass">
  .hidden {
    display: none;
  }

  .pages-list {
    li {
      input {
        background: #eee;
        &.white-bg {
          background: #fff;
        }
      }
    }
  }
</style>