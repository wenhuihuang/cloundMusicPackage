基于React+Webpack+ES6的前端项目模版目录

一、之安装和初始化

    1.安装脚手架
        全局安装yeoman
        npm install -g yo

        然后直接安装脚手架
        npm install -g generator-reactpackage

    2.创建react项目
        yo reactpackage

        如果不行就创建一个项目目录 之后进入目录 yo初始化

二、

    目录结构


    │  entry.js
    │  index.js
    │  routes.js
    │
    │
    ├─actions Action 本质上是 JavaScript 普通对象。我们约定，action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。多数情况下，type 会被定义成字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放 action
    ├─components 展示组件 描述如何展现（骨架、样式）
    │  ├─musicList
    │  └─public
    │          Header.js
    │
    ├─containers 容器组件 描述如何运行（数据获取、状态更新）
    │      Root.js
    │
    ├─images
    │      yeoman.png
    │
    ├─
    ├─reducers  reducer 就是一个纯函数，接收旧的state和action，返回新的state  (previousState, action) => newState  保持 reducer 纯净非常重要
    └─styles
            app.scss
