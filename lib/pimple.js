/**
 * @class lib.dependency_injection.Pimple
 * 
 * Pimple is a small Dependency Injection Container 
 * 
 * @author aurelien Fontaine <aurelien@efidev.fr>
 */
var Pimple = function() {
    this._values = [];
};

Pimple.prototype = {

    /**
     * @constructor
     */
    init: function(services) {
    },
    
    /**
     * Sets a parameter or an object.
     * Objects must be defined as Closures.
     * 
     * @param {String} name     The unique identifier for the parameter or object
     * @param {mixed}  callable The value of the parameter or a closure to defined an object
     */
    set: function(name, callable) {
        this._values[name] = callable;
    },
    
    /**
     *  Gets a parameter or an object.
     *  
     * @param {String} name The unique identifier for the parameter or object
     * @return {mixed}      The value of the parameter or an object
     * @throws Error          if the identifier is not defined
     */
    get: function(name) {
        
        if(!this.has(name))
            throw new Error('Identifier '+ name +'  is not defined');
        
        return (this._values[name] instanceof Function ) ? 
                this._values[name](this):
                this._values[name];
    },
    
    /**
     * Checks if a parameter or an object is set.
     * 
     * @param  {String} name The unique identifier for the parameter or object
     * @return {Boolean}
     */
    has: function(name) {
        return (this._values[name] != undefined)? true : false;
    },
    
    unset: function(name) {
        delete this._values[name];
    },
    
    /**
     * return a closure that stores the result of the given closure for
     * uniqueness in the scope of this instance of Pimple.
     * 
     * @param {Function}   callback A closure to wrap for uniqueness
     * @return {Function} The wrapped closure
     */
    share: function(callback) {
        
        if(! callback instanceof Function )
            throw new Error('Callback is not a function');
        var cb = callback;
        var obj;
        
        return function(c) {
            if(obj == null ) {
                obj = cb(c);
            }
            
            return obj;
        };
    },
    
    /**
     * Protects a callable from being interpreted as a service.
     * This is useful when you want to store a callable as a parameter.
     * 
     * @param {Function} callback A closure to protect from being evaluated
     * @return {Function} The protected closure
     */
    protect: function(callback) {
        if(! callback instanceof Function )
            throw new Error('Callback is not a function');
        
        var cb = callback; 
        
        return function() {
            return cb;
        };
    },
    
    /**
     * Gets a parameter or the closure defining an object.
     * 
     * @param {String} name The unique identifier for the parameter or object
     * @return {mixed} The value of the parameter or the closure defining an object
     * @throws {Error} if the identifier is not defined
     */
    raw: function(name) {
        if(!this.has(name))
            throw new Error('Identifier '+name+'  is not defined');
        
        return this._values[name];
    }
};