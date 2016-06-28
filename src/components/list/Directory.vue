<template>
  <!-- 文件夹列表 -->
  <div id="pages">
    <p @click="newDirectory" class="page-button">+</p>
    <ul class="pages-list"  >
      <!-- track_by是必须的 -->
      <li v-for="directory in directories" track-by="$index" data-index="{{ $index }}" @dblclick="editDirectory($index, $event)" @click="showCurrent(directory._id.$oid, $index)" >          
        <p><input type="text" value="{{ directory.name }}" disabled :class="{ 'white-bg': currentIndex === $index }"@keyup.enter="updateDirectory(directory)"></p>
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
  import _ from 'underscore'
  // import $ from 'jquery'

  var clicked = null
  var isEditing = false

  export default {
    data () {
      return {
        directories: [],
        createdIsDone: true,
        currentDirectoryId: '',
        currentIndex: 0
      }
    },

    ready () {
      // 获取文件夹列表, 渲染第一个文件夹的所有todo
      directory.get((resJSON) => {
        this.directories = resJSON
        this.currentDirectoryId = _.first(this.directories)._id.$oid
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
        const newDirectory = { name: event.target.value.trim() }
        this.directories.push(newDirectory)   // 显示数据先做改动
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

      updateDirectory () {
      },
      // 文件夹选择
      showCurrent (id, index) {
        if (clicked) {
          clearTimeout(clicked)
        }
        clicked = setTimeout(() => {
          if (clicked && !isEditing) {
            this.currentDirectoryId = id
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