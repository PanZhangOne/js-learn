/**
 * 在JS中对象有一个隐藏的属性`[[Prototype]]`，它要么为null要么就是另一个对象的引用
 * 被引用的对象被称为此对象的原型
 * 
 * 当需要从obj里面获取一个缺失的属性时，JS会自动从原型中获取该属性。这种行为被称为“原型继承”
 */

let animal = {
    name: 'animal',
    eats: true,
    printName() {
        console.log(this.name);
    }
}

let rabbit = {
    name: 'rabbit',
    jumps: true
}

// rabbit.__proto__ = animal;
// rabbit.[[Prototype]] = animal

Object.setPrototypeOf(rabbit, animal);

rabbit.printName();


let user = {
    name: 'John',
    surname: 'Smith',

    set fullName(value) {
        [this.name, this.surname] = value.split(' ');
    },

    get fullName() {
        return `${this.name} ${this.surname}`;
    }
}

let admin = {isAdmin: true};


Object.setPrototypeOf(admin, user);

console.log('admin.fullName', admin.fullName);

// Set adminName
admin.fullName = 'Zhang San';
console.log('user.fullName ->', user.fullName);
console.log('admin.fullName ->', admin.fullName);