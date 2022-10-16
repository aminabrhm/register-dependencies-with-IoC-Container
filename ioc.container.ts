export class IoCContainer {
    private static _instance: IoCContainer = new IoCContainer()  // singlton pattern
    private _dependencies: {[key: string]: Object} = {} // use key string bc interface does not implement in JS 

    constructor() {
        if (IoCContainer._instance) {  // singlton pattern
            throw new Error(`it's a singleton class cann't make instance of it `)
        }
        IoCContainer._instance = this
    }

    public static get instance(): IoCContainer {  // singlton pattern 
        return IoCContainer._instance
    }

    register(name: string, dependencies: string[], implementation: any){ //function every DI should have
        if(this._dependencies[name]){
            throw new Error('dependencey already registerd')
        }
        let dependenciesImplemention = this.getDependenciesImplemention(dependencies)
        this._dependencies[name] = new implementation(...dependenciesImplemention)
    }
    
    resolve<T>(name: string): T{  //function every DI should have
        if(!this._dependencies[name]){
            throw new Error(`Dependuncy not registerd ${name}`)
        }
        return this._dependencies[name] as T
    }

    getDependenciesImplemention(names: string[]): Object[]{
        return names.map(name => this.resolve(name))
    }
}

export function Register(name: string, dependencies: string[]): Function{
    let container = IoCContainer.instance
    return function<T extends {new (...args: any[]): {}}>(constructer: T){
        container.register(name, dependencies, constructer)
    }
}