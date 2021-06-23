/**
 * JS中的 class
 * 使用 class 关键字声明一个类，在JS里面`class`是一种函数
 * 
 * class 与原来的函数写法是有区别的
 * - 通过class创建的函数具有特殊的内部标记属性`[[IsClassConstructor]]:true`
 * - 类构造器字符串表现形式都是以`class`开头
 * - 类方法不可枚举
 * - 类总是使用`use strict`，类中的所有代码都自动进入严格模式
 * 
 * ** class 的继承 **
 * 在JS中使用`extends`关键字进行继承操作，其语法为`class Child extends Parent`
 * 在继承后`Child`实例化后的对象继承`Parent`的属性和方法
 * `Child.prototype.[[Prototype]] = Parent.prototype`
 */

class User {
    age = 12;
    constructor(name) { this.name = name }

    sayHi() {
        console.log(this.name);
    }
}

const zs = new User();
console.log(zs.age);

// Task 1

class Clock {
    timer = null;
    template = null;
    constructor({ template }) {
        this.template = template;
    }

    render = () => {
        let date = new Date();

        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        let mins = date.getMinutes();
        if (mins < 10) mins = '0' + mins;

        let secs = date.getSeconds();
        if (secs < 10) secs = '0' + secs;

        let output = this.template
            .replace('h', hours)
            .replace('m', mins)
            .replace('s', secs);

        console.log(output);
    }

    stop = () => {
        clearInterval(this.timer);
    }

    start = () => {
        this.render();
        this.timer = setInterval(this.render, 1000);
    }
}

let clock = new Clock({template: 'h:m:s'});
// clock.start();


class Animal  {
    constructor(name) {
        this.speed = 0;
        this.name = name;
    }

    run(speed) {
        this.speed = speed;
        console.log(`${this.name} run with speed ${this.speed}.`);
    }

    stop() {
        this.speed = 0;
        console.log(`${this.name} stands still.`)
    }
}

class Rabbit extends Animal {
    hide() {
        console.log(`${this.name} hides!`);
    }
}

let rabbit = new Rabbit('White Rabbit');
rabbit.run(5);
rabbit.hide();

console.log(`Rabbit.prototype.[[Prototype]] = ${Rabbit.prototype.__proto__}`);
console.log(`Rabbit.prototype.[[Prototype]] === Animal.prototype ? ${Rabbit.prototype.__proto__ === Animal.prototype}`);
