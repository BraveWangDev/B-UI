<template>
    <svg class="b-icon">
        <!--:是 v-bind 缩写，动态赋值-->
        <!--`#i-${icon}` 是一个js 字符串-->
        <!--${data}是一个模板字符串的插值，来自props-->
        <use :xlink:href="`#i-${name}`"></use>
    </svg>
</template>
<script>
    import './svg'
    export default {
        name: 'BIcon',
        props:['name']
    }
</script>
<style lang="scss" scoped>
    /*1em: 图标和字体大小一致*/
    .b-icon {
        width: 1em;
        height: 1em;
    }
</style>
