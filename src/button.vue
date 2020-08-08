<template>
    <!--方法 1：如果iconPosition有值且left，icon 在左侧，其他值(right)在右侧-->
    <!--<button class="b-button" v-if="!iconPosition || iconPosition === 'left'">-->
        <!--&lt;!&ndash;v-if="icon" 当不传 icon 时，icon 的占位消失&ndash;&gt;-->
        <!--<svg v-if="icon" class="icon">-->
            <!--&lt;!&ndash;:是 v-bind 缩写，动态赋值&ndash;&gt;-->
            <!--&lt;!&ndash;`#i-${icon}` 是一个js 字符串&ndash;&gt;-->
            <!--&lt;!&ndash;${data}是一个模板字符串的插值，来自props&ndash;&gt;-->
            <!--<use :xlink:href="`#i-${icon}`"></use>-->
        <!--</svg>-->
        <!--<slot></slot>-->
    <!--</button>-->
    <!--<button class="b-button" v-else>-->
        <!--<slot></slot>-->
        <!--<svg v-if="icon" class="icon">-->
            <!--<use :xlink:href="`#i-${icon}`"></use>-->
        <!--</svg>-->
    <!--</button>-->

    <!--方法 2: 靠CSS样式控制icon的位置-->
    <!--:class="{[`icon-${iconPosition}`]: true} 解决下面三种情况"-->
    <!--<button class="b-button" :class="{'icon-undefined': true}">-->
    <!--<button class="b-button" :class="{'icon-left': true}">-->
    <!--<button class="b-button" :class="{'icon-right': true}">-->
    <!--<button class="b-button" :class="{[`icon-${iconPosition}`]: true}">-->
        <!--&lt;!&ndash;v-if="icon" 当不传 icon 时，icon 的占位消失&ndash;&gt;-->
        <!--<svg v-if="icon" class="icon">-->
            <!--&lt;!&ndash;:是 v-bind 缩写，动态赋值&ndash;&gt;-->
            <!--&lt;!&ndash;`#i-${icon}` 是一个js 字符串&ndash;&gt;-->
            <!--&lt;!&ndash;${data}是一个模板字符串的插值，来自props&ndash;&gt;-->
            <!--<use :xlink:href="`#i-${icon}`"></use>-->
        <!--</svg>-->
        <!--&lt;!&ndash;由于 slot 不能加 class，所以在外层 div 上添加 class&ndash;&gt;-->
        <!--<div class="content">-->
            <!--<slot></slot>-->
        <!--</div>-->
    <!--</button>-->

    <!--将 icon 部分体检为 b-icon 组件-->
    <!--@click="$emit('click')" : 被点击时触发 click 事件-->
    <button class="b-button" :class="{[`icon-${iconPosition}`]: true}"
    @click="$emit('click')">
        <!--使用b-button中接收到的icon参数，继续传入b-icon组件中-->
        <!--显示 icon 的条件: 有 icon 且当前不处于 loading 状态-->
        <b-icon class="icon" v-if="icon && !loading" :name="icon"></b-icon>
        <!--添加 class：loading-->
        <!--class 添加icon：让 loading 也有左右两种和与文字的间隙-->
        <b-icon v-if="loading" class="loading icon" name="loading"></b-icon>
        <!--由于 slot 不能加 class，所以在外层 div 上添加 class-->
        <div class="content">
            <slot></slot>
        </div>
    </button>
</template>
<script>
    // props:组件通信
    export default {
        // props:['icon', 'iconPosition']// left、right
        props:{
            icon:{},
            loading:{
                type: Boolean,
                default: false
            },
            iconPosition:{
                type: String,
                default: 'left',
                validator(value){
                    console.log(value)
                    return value === 'left' || value === 'right';
                }
            }
        }
    }
</script>
<style lang="scss">
    @keyframes spin {
        0%{ transform: rotate(0deg);}
        100%{ transform: rotate(360deg);}
    }
    .b-button{
        font-size: var(--font-size);
        height: var(--button-height);
        padding: 0 1em;             /*按钮左侧空一个字，不在按钮上加宽度width*/
        border-radius: var(--border-radius);
        border: 1px solid var(--border-color);
        background: var(--button-bg);
        /*b-button使用弹性盒flex布局*/
        display: inline-flex;
        justify-content: center;    /*jfc:c*/
        align-items: center;        /*alc:c*/
        vertical-align: middle;        /*va:t  解决内联元素对不齐问题，只要不是默认值baseline都可以*/
        /*&表示当前的选择器*/
        &:hover{            /*hover悬停时，边框变深*/
            border-color: var(--border-color-hover);
        }
        &:active{           /*active点击时，背景变深*/
            background-color: var(--button-active-bg);
        }
        &:focus{            /*去掉按钮点击的蓝色边框*/
            outline: none;
        }
        /*默认: icon在左，content在右*/
        > .icon{
            order: 1;
            margin-right:.3em;
            margin-left:0;
        }
        > .content{
            order: 2;
        }
        /*icon-right: content在左,icon在右*/
        &.icon-right{
            > .icon{
                order: 2;
                margin-left:.3em;
                margin-right: 0;
            }
            > .content{
                order: 1;
            }
        }
        /*使用spin动画，1s完成，无限循环，linear线性*/
        .loading{
            animation: spin 1s infinite linear;
        }
    }
</style>
