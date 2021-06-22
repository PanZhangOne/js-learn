/**
 * 现代操作JS原型的方法
 * Object.create(proto, [descriptors])
 *  创建一个对象，使用给定的proto作为该对象的原型
 * Object.getPrototypeOf(obj)
 *  返回对象的[[Prototype]]
 * Object.setPrototypeOf(obj, proto)
 *  设置对象的[[Prototype]]
 * 
 * 原型的简史
 * 
 * - 构造函数的`prototype`属性一直都有
 * 
 * - 在2012年，`Object.create` 出现在了标准中(ES2015)，它提供了使用给定原型创建对象的能力。
 * 但是没有提供`get/set`它的能力。因此其他一些浏览器厂商实现了非标准的`__proto__`访问器
 * 
 * - 在2015年，`Object.setPrototypeOf`和`Object.getPrototypeOf`方法加入到标准中，
 * 执行与`__proto__`相同的功能。由于`__proto__`已经被大多数浏览器包括Node.js等实现，
 * 但是它已经过时，所以被加入到了该标准的附件B中，在非浏览器环境是可选的
 */


const animal = {eats: true};
let rabbit = Object.create(animal, {
    jumps: {value: true, configurable: true, enumerable: true}
});
console.log(Object.getPrototypeOf(rabbit) === animal);
console.log(`rabbit can jump ? ${rabbit.jumps}`);

const clone = (obj) => Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));

const rabbit2 = clone(rabbit);
console.log(rabbit2);
console.log(`rabbit2 prototype is animal ? ${Object.getPrototypeOf(rabbit2) === animal}`);
console.log(`rabbit2.eats = ${rabbit2.eats}`);


// 为dictionary 添加toString方法
let dictionary = Object.create(null, {
    toString: {
        value() {
            return Object.keys(this).join(',');
        },
        // enumerable 默认为false
        // enumerable: false
    },
});


dictionary.apple = 'Apple';
dictionary.__proto__ = 'test';

console.log('task1: ---------------------');
for (let key in dictionary) {
    console.log(key);
}
console.log('dictionary:', dictionary.toString());
console.log('task1: ---------------------');


// 调用方式的差异

function Rabbit(name) {
    this.name = name;
}
Rabbit.prototype.sayHi = function() {
    console.log(this.name);
};
let rabbit3 = new Rabbit('Rabbit3');

console.log('task2: ---------------------');

/**
 * 作为一个普通对象的方法调用，此时`sayHi()`方法里面的this指向rabbit3该对象
 * 输出 Rabbit3
 * 
 * 下面的其他调用都是在Rabbit的原型上调用方法，所以都是输出undefined
 */
rabbit3.sayHi();
Rabbit.prototype.sayHi();
Object.getPrototypeOf(rabbit3).sayHi();
rabbit3.__proto__.sayHi();
console.log('task2: ---------------------');
