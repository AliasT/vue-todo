<template>
  <!-- 文件夹列表 -->
  <div id="pages" :class="{ 'loading': loading }">
    <p @click="newDirectory" class="page-button">+</p>
    <ul class="pages-list"  >
      <!-- track_by是必须的 -->
      <li v-for="(key, directory) in directories" track-by="$index" data-index="{{ key }}" @dblclick="editDirectory($index, $event)" @click="showCurrent(key, $index)" >          
        <p :class="{ 'current': currentIndex === $index, }" v-swipe="swipe">
          <input type="text" v-model="directory.name" disabled @keyup.enter="syncDirectory(key, directory, $event)" @blur="blurEvent($event, key)">
        </p>
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
  var cachedDirectories = null

  export default {
    data () {
      return {
        directories: {},
        createdIsDone: true,
        currentDirectoryId: '',
        currentIndex: 0,
        loading: true     // 正在加载数据
      }
    },

    ready () {
      // 获取文件夹列表, 渲染第一个文件夹的所有todo
      directory._ref.on('value', (snapshot) => {
        cachedDirectories = snapshot.val()
        Object.assign(this.directories, cachedDirectories)
        this.loading = false
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
      swipe () {
        console.log(arguments)
      },

      blurEvent (e, key) {
        if (e.target.value !== cachedDirectories[key].name) {
          this.syncDirectory(key, this.directories[key], e)
        }
        isEditing = false
      },

      newDirectory (event) {
        this.createdIsDone = false
      },

      // 新增文件夹
      addDirectory (event) {
        this.createdIsDone = true   // 隐藏新建输入框
        var newDirectory = { name: event.target.value.trim() }
        directory.create(newDirectory)
      },

      // 编辑文件夹名称双击事件
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

      // 同步修改的文件夹名称
      syncDirectory (key, modifiedDirectory, event) {
        directory.patch({ [key]: modifiedDirectory })
        isEditing = false
        event.target.setAttribute('disabled', 'disabled')
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

  .white {
    background: #fff;
  }
  
  #detail {
    transition: width .5s;
  }
  #pages {
    display: inline-block;
    height: 100%;
    width: 160px;
    transition: width .3s ease-out;
    overflow: hidden;
    &.loading {
      width: 0;
    }
  }
  .pages-list {
    li {
      p {
        input {
          background: #eee;
        }
        &.current {
          input {
            @extend .white;
          }
          @extend .white;
          position: relative;
          &:after {
            font-family: 'iconfont';
            content: '\e600';
            position: absolute;
            display: block;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
  }
</style>