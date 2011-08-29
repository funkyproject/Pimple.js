Pimple = new Class() ({
	__init__: function() {
		this._values = [];
	},
	
	set: function(name, callable) {
		this._values[name] = callable;
	},
	
	get: function(name) {
		
		if(!this.has(name))
			throw new Error('Identifier '+name+'  is not defined');
		
		return (this._values[name] instanceof Function ) ? 
				this._values[name](this):
				this._values[name];
	},
	
	has: function(name) {
		return (this._values[name] != undefined)? true : false;
	},
	
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
	
	protect: function(callback) {
		if(! callback instanceof Function )
			throw new Error('Callback is not a function');
		
		var cb = callback; 
		return function(c) {
			return cb;
		};
	},
	
	raw: function(name) {
		if(!this.has(name))
			throw new Error('Identifier '+name+'  is not defined');
		
		return $this._values[name];
	}
});