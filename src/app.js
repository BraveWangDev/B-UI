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
const expect = chai.expect;

// Button组件的单元测试：icon参数
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
    vm.$mount('#test')                      // 将button实例挂载到test上
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
            loading: true               // 添加loading参数
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

