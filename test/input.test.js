const expect = chai.expect;
import Vue from 'vue'
import Input from '../src/input'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Input', () => {

    // 期待 Input 组件存在
    it('存在.', () => {
        expect(Input).to.exist
    })

    describe('props', () => {
        const Constructor = Vue.extend(Input)
        let vm
        afterEach(()=>{
            vm.$destroy()
        })
        it('接收 value', () => {
            vm = new Constructor({
                propsData: {
                    value: '1234'   // 传入value = 1234
                }
            }).$mount()
            const inputElement = vm.$el.querySelector('input')
            expect(inputElement.value).to.equal('1234') // 期待value = 1234
        })

        it('接收 disabled', () => {
            vm = new Constructor({
                propsData: {
                    disabled: true
                }
            }).$mount()
            const inputElement = vm.$el.querySelector('input')
            console.log(inputElement.outerHTML);
            expect(inputElement.disabled).to.equal(true)
        })

        it('接收 readonly', () => {
            vm = new Constructor({
                propsData: {
                    readonly: true
                }
            }).$mount()
            const inputElement = vm.$el.querySelector('input')
            console.log(inputElement.outerHTML);
            expect(inputElement.readOnly).to.equal(true)
        })

        it('接收 error', () => {
            vm = new Constructor({
                propsData: {
                    error: "test error"
                }
            }).$mount()
            // error-icon
            const useElement = vm.$el.querySelector('use')
            expect(useElement.getAttribute('xlink:href')).to.equal('#i-error')
            // error描述的 span
            const errorMessage = vm.$el.querySelector('.error-message')
            console.log(errorMessage);
            expect(errorMessage.innerText).to.equal("test error")
        })
    })

    describe('事件', () => {
        const Constructor = Vue.extend(Input)
        let vm
        afterEach(()=>{
            vm.$destroy()
        })
        // 优化：合并为一个测试用例
        it('支持 change/input/focus/blur 事件', () => {
            ['change','input','focus','blur'].forEach((eventName)=>{
                vm = new Constructor({}).$mount()
                const callback = sinon.fake();
                vm.$on(eventName, callback)
                let event = new Event(eventName) // 触发 input 的事件
                console.log(event);
                let inputElement = vm.$el.querySelector('input')
                inputElement.dispatchEvent(event)
                console.log(eventName);
                //期待：当触发change事件后，callback函数被调用，且第一个参数为event
                expect(callback).to.have.been.calledWith(1)
            })
        })

        // it('支持 change 事件', () => {
        //     vm = new Constructor({}).$mount()
        //     const callback = sinon.fake();
        //     vm.$on('change', callback)
        //     // 触发 input 的 change 事件
        //     let event = new Event('change')
        //     console.log(event);
        //     let inputElement = vm.$el.querySelector('input')
        //     inputElement.dispatchEvent(event)
        //     //期待：当触发change事件后，callback函数被调用，且第一个参数为event
        //     expect(callback).to.have.been.calledWith(event)
        // })
        // it('支持 input 事件', () => {
        //     vm = new Constructor({}).$mount()
        //     const callback = sinon.fake();
        //     vm.$on('input', callback)
        //     // 触发 input 的 input 事件
        //     let event = new Event('input')
        //     let inputElement = vm.$el.querySelector('input')
        //     inputElement.dispatchEvent(event)
        //     //期待：当触发change事件后，callback函数被调用，且第一个参数为event
        //     expect(callback).to.have.been.calledWith(event)
        // })
        // it('支持 focus 事件', () => {
        //     vm = new Constructor({}).$mount()
        //     const callback = sinon.fake();
        //     vm.$on('focus', callback)
        //     // 触发 input 的 focus 事件
        //     let event = new Event('focus')
        //     let inputElement = vm.$el.querySelector('input')
        //     inputElement.dispatchEvent(event)
        //     //期待：当触发change事件后，callback函数被调用，且第一个参数为event
        //     expect(callback).to.have.been.calledWith(event)
        // })
        // it('支持 blur 事件', () => {
        //     vm = new Constructor({}).$mount()
        //     const callback = sinon.fake();
        //     vm.$on('blur', callback)
        //     // 触发 input 的 blur 事件
        //     let event = new Event('blur')
        //     let inputElement = vm.$el.querySelector('input')
        //     inputElement.dispatchEvent(event)
        //     //期待：当触发change事件后，callback函数被调用，且第一个参数为event
        //     expect(callback).to.have.been.calledWith(event)
        // })
    })
})
