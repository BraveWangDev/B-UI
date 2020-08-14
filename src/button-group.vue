<template>
    <!--不能直接使用slot作为根节点，需要加 div-->
    <div class="b-button-group">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'BButtonGroup',
        // 当 UI 出现在页面时触发
        mounted(){
            console.log(this.$el.children)
            for(let node of this.$el.children) {
                if(node.nodeName.toLowerCase() !== 'button'){
                    console.warn(`b-button-group的子元素应该全是 b-group，但是你写的是${node.nodeName}`)
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .b-button-group{
        display: inline-flex;
        vertical-align: middle;
        > .b-button{                /* b-button-group内部的b-button */
            /* 解决按钮组内部button边缘重合问题：*/
            /*&:not(:first-child){    !* 方案一：如果不是第一个元素再加上 *!*/
                /*border-left: none;  !* 存在BUG：没有了左侧 border *!*/
            /*}*/
            border-radius: 0;       /* 重置border-radius */
            &:not(:first-child){    /* 方案二：如果不是第一个元素，左移一个像素，让右边的border盖住左边的border */
                margin-left: -1px;
            }
            &:first-child{          /* b-button-group内部的第一个b-button */
                border-top-left-radius: var(--border-radius);
                border-bottom-left-radius: var(--border-radius);
            }
            &:last-child{           /* b-button-group内部的最后一个b-button */
                border-top-right-radius: var(--border-radius);
                border-bottom-right-radius: var(--border-radius);
            }
            &:hover{                 /* 控制 hover 时选中的控件边框处于上层 */
                position: relative;
                z-index: 1;
            }
        }
    }
</style>
