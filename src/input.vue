<template>
    <!--如果error存在，添加class  { error }同{'error': error}-->
    <div class="wrapper" :class="{'error': error}">
        <input :value="value" type="text" :disabled="disabled" :readonly="readonly"
            @change="$emit('change', $event)"
            @input="$emit('input', $event)"
            @focus="$emit('focus', $event)"
            @blur="$emit('blur', $event)"
        >
        <!--icon标签是引入的Icon组件-->
        <template v-if="error">
            <icon name="error" class="icon-error"></icon>
            <span class="error-message">{{error}}</span>
        </template>
    </div>
</template>

<script>
    import Icon from './icon'
    export default {
        components:{
            Icon
        },
        name: 'BInput',
        props:{
            value:{
                type: String
            },
            disabled:{
                type: Boolean,
                default: false
            },
            readonly:{
                type: Boolean,
                default: false
            },
            error:{
                type: String
            },
        }
    }
</script>

<style lang="scss" scoped>
    $height: 32px;
    $border-color: #999;
    $border-color-hover: #666;
    $border-radius: 4px;
    $font-size: 12px;
    $box-shadow-color: rgba(0, 0, 0, 0.5);
    $red: #F14530;
    .wrapper{
        font-size: $font-size;
        display: inline-flex;  /* 使 error 内容居中 */
        align-items: center;
        /* 使 wrapper 中所有元素(除最后一个元素外)都有半个字的 margin */
        > *{
            margin-right: 0.5em;
            &:last-child{
                margin-right: 0;
            }
        }
        /*另外一种写法：如果不是最后一个元素，才有argin-right 0.5em*/
        /*> :not(:last-child){*/
            /*margin-right: 0.5em;*/
        /*}*/
        > input{
            height: 32px;
            border: 1px solid $border-color;
            border-radius: $border-radius;
            padding: 0 8px;         /* 输入内容与边框的间距 */
            font-size: inherit;
            /* hover 状态效果 */
            &:hover {
                border-color: $border-color-hover;
            }
            /* focus 状态效果 */
            &:focus {
                box-shadow: inset 0 1px 3px $box-shadow-color;
                outline: none;      /* 去掉蓝颜色 */
            }
            /* disabled,readonly 状态效果 */
            &[disabled], &[readonly] {
                border-color: #bbb;
                color: #bbb;
                cursor: not-allowed;/* 不允许操作 */
            }
        }
        /* error 状态效果 */
        &.error{
            > input{border-color: $red;}
        }
        /*设置消息icon红色*/
        .icon-error{
            fill: $red;
        }
        /*设置消息文字颜色*/
        .error-message{
            color: $red;
        }
    }
</style>
