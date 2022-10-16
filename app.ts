import { IoCContainer, Register } from './ioc.container';

interface IDepA {
    doA(): void;
}

interface IDepB {
    doB(): void;
}

interface IDepC {
    doC(): void;
}

@Register("IDepA", [])
class concrteA implements IDepA {
    doA(): void {
        console.log('Doing A');  
    }
}

@Register("IDepB", [])
class concrteB implements IDepB {
    doB(): void {
        console.log('Doing b');  
    }
}

class concrteC implements IDepC {
    constructor(private _concrateA: concrteA, private _concrateB: concrteB){}
    doC(): void {
        this._concrateA.doA();
        this._concrateB.doB();
        console.log('Doing c');  
    }
}
let a = IoCContainer.instance
// a.register('IDepA',[], concrteA)
// a.register('IDepB',[], concrteB)
a.register('IDepC',['IDepA','IDepB'], concrteC)

let log = a.resolve<IDepC>('IDepC')
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


 