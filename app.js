"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var ioc_container_1 = require("./ioc.container");
var concrteA = /** @class */ (function () {
    function concrteA() {
    }
    concrteA.prototype.doA = function () {
        console.log('Doing A');
    };
    concrteA = __decorate([
        (0, ioc_container_1.Register)("IDepA", [])
    ], concrteA);
    return concrteA;
}());
var concrteB = /** @class */ (function () {
    function concrteB() {
    }
    concrteB.prototype.doB = function () {
        console.log('Doing b');
    };
    concrteB = __decorate([
        (0, ioc_container_1.Register)("IDepB", [])
    ], concrteB);
    return concrteB;
}());
var concrteC = /** @class */ (function () {
    function concrteC(_concrateA, _concrateB) {
        this._concrateA = _concrateA;
        this._concrateB = _concrateB;
    }
    concrteC.prototype.doC = function () {
        this._concrateA.doA();
        this._concrateB.doB();
        console.log('Doing c');
    };
    return concrteC;
}());
var a = ioc_container_1.IoCContainer.instance;
// a.register('IDepA',[], concrteA)
// a.register('IDepB',[], concrteB)
a.register('IDepC', ['IDepA', 'IDepB'], concrteC);
var log = a.resolve('IDepC');
console.log(log.doC());
// export function disable(target:Object, methodName: string, descriptor: PropertyDescriptor){ // class prototype, method name, property discripter assing to that method 
//     descriptor.value =() => {
//         console.log('Hey from dectroter');
//     }
//     descriptor.enumerable = true
//  }
//  class testDecortor {
//     @disable // no parmeters assgin here if we want to add we use decortor factories
//     foo(){
//         console.log('foo');
//     }
//  }
//  let an = new testDecortor()
//  console.log(an.foo());
