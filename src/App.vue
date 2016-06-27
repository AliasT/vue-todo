<template>
  <div id="app">
    <!-- 文件夹列表 -->
    <div id="pages">
      <p @click="newDirectory" class="page-button">+</p>
      <ul class="pages-list" @click.prevent="showCurrent" @dbclick="editDirectory">
        <!-- track_by是必须的 -->
        <li v-for="directory in directories" track-by="$index" data-index="{{$index}}">          
          <p><input type="text" value="{{ directory.name }}"></p>
        </li>
        <!-- 用来新增文件夹的输入框 -->
        <li>
          <p><input type="text" placeholder="文件夹名称" :class="{ 'hidden': createdIsDone } " @keyup.enter="addDirectory"></p>
        </li>
      </ul>
    </div>

    <div id="detail">
      <!-- 输入框 -->
      <form action="" >
        <div class="flex center">
          <input type="text" class="flex-item-1"  v-model="defaultTodo.content" />
          <p class="todo-button">
            <input type="submit" value="new" @click.prevent="addTodo">
          </p>
        </div>
      </form>

      <!-- 展示列表 -->
      <div id="item-list">
        <ul>
          <li v-for="todo in todos" class="flex center">
            <list :todo.sync="todo"></list>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import List from './components/list/List'
  import todo from 'src/js/todo'
  import directory from 'src/js/directory'
  import $ from 'jquery'
  import _ from 'underscore'

  const defaultTodo = {
    content: '',
    isCompleted: false
  }

  export default {
    components: {
      List
    },

    data () {
      return {
        // 默认数据
        defaultTodo: _.extend({}, defaultTodo),
        todos: [],
        createdIsDone: true,
        directories: [],
        currentDirectoryId: ''
      }
    },

    watch: {
      'currentDirectoryId': function (newVal, oldVal) {
        todo.getTodos(this.currentDirectoryId, (resJSON2) => {
          this.todos = resJSON2
        })
      }
    },

    ready () {
      // 获取文件夹列表, 渲染第一个文件夹的所有todo
      directory.get((resJSON) => {
        this.directories = resJSON
        this.currentDirectoryId = _.first(this.directories)._id.$oid
      })
    },
    methods: {
      addTodo (event) {
        const newTodo = todo.addTodo(this.defaultTodo, 1464946412042)
        this.defaultTodo = _.extend({}, defaultTodo)
        this.todos.unshift(newTodo)
      },

      newDirectory (event) {
        this.createdIsDone = false
      },

      addDirectory (event) {
        this.createdIsDone = true   // 隐藏新建输入框
        const newDirectory = { name: event.target.value.trim() }
        this.directories.push(newDirectory)   // 显示数据先做改动
        directory.create(newDirectory)
      },

      editDirectory (event) {
      },

      // 文件夹选择
      showCurrent (event) {
        const $target = $(event.target)
        if ($target.is('li input')) {
          this.currentDirectoryId = this.directories[+$target.closest('li').data('index')]._id.$oid
        }
      }
    },
    // 监听子组件事件
    events: {
      updated () {
        this.todos = todo.getTodos(1464946412042)
      }
    }
  }
</script>

<style lang="sass">
  $li-border: solid 1px #eee;
  body {
    padding: 10px;
    box-sizing: border-box;
  }

  #app {
    border: solid 1px #ccc;
    padding: 10px;
    height: 100%;
    &:after {
      content: '';
      display: block;
      clear:both;
    }
    display: flex;
  }

  #pages {
    background: #eee;
    * {
      box-sizing: border-box;
      width: 100%;
    }
    
    .page-button {
      padding: 6px 0;
      text-align: center;
      background: #eee;
      cursor: pointer;
    }

    ul {
      li {
        border-bottom: $li-border;
        input {
          background: #eee;
        }
      }
    }

    input[type=text] {
      border: 0;
    }
  }

  #detail {
    flex: 1;
    padding: 0 0 0 10px;
    #item-list {
      ul {
        li { border-bottom: $li-border }
      }

      input[type=text] {
        border: 0;
      }
    }

    .todo-button {
      line-height: 35px;
      height: 35px;
      
      input[type=submit] {
        height: 100%;
        padding: 0 7px;
      }
    }
  }

  .hidden {
    display: none;
  }

</style>
