B-UI

[![Build Status](https://www.travis-ci.org/BraveWangDev/B-UI.svg?branch=master)](https://www.travis-ci.org/BraveWangDev/B-UI)

## 介绍

一个基于 Vue 的 UI 组件库

## 开始使用

1. 添加 CSS 样式
    使用本框架前，请在 css 中开启 boarder-box
    
    ```
    // 需要将before、after元素也设置为border-box，因为默认*元素是不包括before、after元素
    *{box-sizing: border-box;}
    *::before{box-sizing: border-box;}
    *::after{box-sizing: border-box;}
    或简写为：
    *,*::before,*::after{box-sizing: border-box;}
    ```
    IE 8 及以上浏览器都支持此样式
    
    需要设置默认颜色等变量（后续会改为 scss 变量）
    ```
    html {
        --button-height: 32px; /*高度*/
        --font-size: 14px; /*字体*/
        --button-bg: white; /*背景*/
        --button-active-bg: #eee; /*背景-按下*/
        --border-radius: 4px; /*边框圆角*/
        --color: #333; /*文字颜色*/
        --border-color: #999; /*边框颜色*/
        --border-color-hover: red; /*边框颜色-hover*/
    }
    ```
    IE 15 及以上浏览器都支持此样式

2. 安装 b-ui

    ```
    npm i --save b-ui-test
    ```
    
3. 引入 b-ui
    ```
    <script>import {Button} from 'b-ui-test'
    import 'b-ui-test/dist/index.css'
    
    export default {
      name: 'App',
      components: {
        'b-button': Button
      }
    }
    </script>
    ```
    
4. 引入 svg symbols
   ```
   <!--引入图标库-->
   <script src="//at.alicdn.com/t/font_1989058_ned9q1fpvd9.js"></script>
   ```

## 文档
## 提问
## 变更记录
## 联系方式
## 贡献代码




