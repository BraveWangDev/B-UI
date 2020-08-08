import Vue from 'vue'
import Button from './button'
import Icon from './icon'
import ButtonGroup from './button-group'

Vue.component('b-button', Button);
Vue.component('b-icon', Icon);
Vue.component('b-button-group', ButtonGroup);

new Vue({
    el:'#app',
    data:{
        loading1: false,    // 默认loading按钮
        loading2: false,    // 左loading按钮
        loading3: false     // 右loading按钮
    }
})

// 单元测试
import chai from 'chai'
import spies from 'chai-spies'
chai.use(spies);
const expect = chai.expect;

try{
    // Button组件的单元测试：icon参数
    // 测试按钮含有 icon
    {
        // console.log(Button)                  // 打印 Button 组件：是一个对象
        // 动态生成一个按钮
        const Constructor = Vue.extend(Button); // 将Button组件变成一个构造函数(Button是一个VueComponent函数)
        // 通过 VueComponent 函数构造一个button
        const vm = new Constructor({            // 通过new button的构造函数,创建一个button实例
            propsData: {
                icon: 'settings'
            }
        });
        vm.$mount()                             // 将button实例挂载到test上
        let useElement = vm.$el.querySelector('use')    // 在button元素中找use元素
        console.log(useElement)
        let href = useElement.getAttribute('xlink:href')        // 拿到useElement中xlink:href元
        expect(href).to.eq('#i-settings')                      // 断言: 我主观认为useElement中xlink:href元素值为settings
        // 测试完毕后，移除button并销毁实例
        vm.$el.remove();
        vm.$destroy();
    }

    // Button组件的单元测试：loading参数
    {
        const Constructor = Vue.extend(Button);
        const vm = new Constructor({
            propsData: {
                icon: 'settings',
                loading: false               // 添加loading参数
            }
        });
        vm.$mount()                     // $mount不写就是放到内存中
        let useElement = vm.$el.querySelector('use')
        console.log(useElement)
        let href = useElement.getAttribute('xlink:href')
        expect(href).to.eq('#i-loading')    // loading 为 true 时，settings 是看不到的，所以断言值为#i-loading
        // 测试完毕后，移除button并销毁实例
        vm.$el.remove();
        vm.$destroy();
    }

    // Button组件的单元测试：iconPosition参数 + order
    {
        const div = document.createElement('div');  // 创建一个 div，并添加到 body
        document.body.appendChild(div)
        const Constructor = Vue.extend(Button);
        const vm = new Constructor({
            propsData: {
                icon: 'settings',
                iconPosition: 'right'               // iconPosition为right 时 order 应为 2
            }
        });
        vm.$mount(div)                          // button挂载到 div（元素挂载到dom才会渲染，否则order取不到）
        let svg = vm.$el.querySelector('svg')   // 获取 svg 中的 order
        let { order } = window.getComputedStyle(svg);
        expect(order).to.eq("2")                    // css中的值都是字符串
        // 测试完毕后，移除button并销毁实例
        vm.$el.remove();
        vm.$destroy();
    }

    // Button组件的单元测试：click 事件
    {
        const Constructor = Vue.extend(Button);
        const vm = new Constructor({
            propsData: {
                icon: 'settings'
            }
        });
        vm.$mount()
        // // 这样虽然可以触发断言，这样做是错误的
        // // 因为我们要测的是 click 事件是否被触发
        // vm.$on('click', function () {
        //     expect(1).to.eq(1)
        // })
        // 检测 click 事件被触发，使用chai-spies中的监听函数
        let spy = chai.spy(function () {})  // 使用间谍监听 function
        vm.$on('click', spy);       // 如果vm的click被触发，就会执行spy这个间谍
        let button = vm.$el;        // bButton.$el 就是 button
        button.click();             // 触发 button 上的click 事件
        expect(spy).to.have.been.called();  // 期望间谍已经被调用
    }
}catch (error) {
    window.errors = [error];
}finally {
    // 如果有错误就全部打印出来
    window.errors && window.errors.forEach((error)=>{
        console.error(error.message);
    })
}
