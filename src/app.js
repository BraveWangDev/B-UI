import Vue from 'vue'
import Button from './button'
import Icon from './icon'
import ButtonGroup from './button-group'
import Input from './input'

Vue.component('b-button', Button);
Vue.component('b-icon', Icon);
Vue.component('b-button-group', ButtonGroup);
Vue.component('b-input', Input);

new Vue({
    el:'#app',
    data:{
        loading1: false,    // 默认loading按钮
        loading2: false,    // 左loading按钮
        loading3: false,    // 右loading按钮
        message: 'hi'
    },
    created(){
        // // 触发input的change事件
        // setTimeout(()=>{
        //     let event = new Event('change')
        //     let inputElement = this.$el.querySelector('input')
        //     inputElement.dispatchEvent(event)
        // }, 3000)
    },
    methods: {
        inputChange(e, param2){
            console.log(e);
            // console.log(e.target.value);
            // console.log("param2 = " + param2);
        }
    }
})
