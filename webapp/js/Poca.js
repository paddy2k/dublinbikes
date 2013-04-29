/*!
 * Poca - v0.1
 * A simple HTML5 object storage
 *
 * Copyright (c) 2009, 2013 Paddy O'Reilly
 * Released under the GNU Public Licence V3
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * Date: 29-04-2013
 */

var Poca = function(name, prototype){
  // If no prototype provided, provide fake passthru
  prototype = prototype || function(item){return item;};

  // Load from localStorage or initialise new object
  var store = JSON.parse(localStorage[name] || "{}");
  // Apply prototype to items and save to this
  for(var item in store){
    if(store.hasOwnProperty(item) && !this.__lookupGetter__(item)){
      this[item] = prototype(store[item]);
    }
  }
  delete store; // Object no longer needed

  // Return a count of the real objects in storage
  this.__defineGetter__("length", function(){
    var length = 0;
    this.each(function(){
      length++;
    });
    return length;
  });
 
  this.getName = function(){
    return name;
  }
  this.getPrototype = function(){
    return prototype;
  }

  return this;
}

// Save the content of this to local storage outside asyncronously
Poca.prototype.save = function(){
  var _this = this;

  setTimeout(function(){
    // return 'string' === typeof (localStorage[name] = JSON.stringify(this))
    // localStorage[name] = JSON.stringify(this); // throws cyclic error
    
    localStorage[_this.getName()] = JSON.stringify(_this);
  }, 0);
  return this;
}

// Set a new item with the correct prototype to this and save
Poca.prototype.set = function(name, object, unsaved){
  this[name] = this.getPrototype()(object);
  if(!unsaved){    
    this.save();
  }
  return this[name];
}

Poca.prototype.get = function(filter, sort, limit){
  var response = [];
  filter = filter || function(){return true};

  this.each(function(item, name){
    if( typeof item != 'function'){
      response.push(item);
    }
  });

  if(typeof sort === "function"){
    response.sort(sort);
  }

  if(limit){
    var tempResponse = [];
    response.forEach(function(value, index){
      if(limit<=index){
        return;
      }
      tempResponse.push(value);
    });
    response = tempResponse;
  }

  return response;
}

// Wipe the storage object
Poca.prototype.reset = function(){
  this.each(function(item){
    delete item;
  });
  return localStorage.removeItem(name);
}

// Loop through all the valid items
Poca.prototype.each = function(callback){
  for(var item in this){
    if(this.hasOwnProperty(item) && !this.__lookupGetter__(item)){
      callback(this[item], item);
    }
  }
  return this;
}