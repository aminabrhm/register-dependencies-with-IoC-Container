"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.Register = exports.IoCContainer = void 0;
var IoCContainer = /** @class */ (function () {
    function IoCContainer() {
        this._dependencies = {}; // use key string bc interface does not implement in JS 
        if (IoCContainer._instance) { // singlton pattern
            throw new Error("it's a singleton class cann't make instance of it ");
        }
        IoCContainer._instance = this;
    }
    Object.defineProperty(IoCContainer, "instance", {
        get: function () {
            return IoCContainer._instance;
        },
        enumerable: false,
        configurable: true
    });
    IoCContainer.prototype.register = function (name, dependencies, implementation) {
        if (this._dependencies[name]) {
            throw new Error('dependencey already registerd');
        }
        var dependenciesImplemention = this.getDependenciesImplemention(dependencies);
        this._dependencies[name] = new (implementation.bind.apply(implementation, __spreadArray([void 0], dependenciesImplemention, false)))();
    };
    IoCContainer.prototype.resolve = function (name) {
        if (!this._dependencies[name]) {
            throw new Error("Dependuncy not registerd ".concat(name));
        }
        return this._dependencies[name];
    };
    IoCContainer.prototype.getDependenciesImplemention = function (names) {
        var _this = this;
        return names.map(function (name) { return _this.resolve(name); });
    };
    IoCContainer._instance = new IoCContainer(); // singlton pattern
    return IoCContainer;
}());
exports.IoCContainer = IoCContainer;
function Register(name, dependencies) {
    var container = IoCContainer.instance;
    return function (constructer) {
        container.register(name, dependencies, constructer);
    };
}
exports.Register = Register;
