// Hashchange Event Managment Package
// THC - Total Hashchange Control
var THC = THC || {
  events: [],
  init: function(fallback){
    var _this = this;

    window.addEventListener('hashchange', function(event){
      var hash = _this.cleanHash(window.location.hash), returned = false;

      _this.events.forEach(function(event){
        var returnOK = false;
        var current = hash.slice(0);
        var target = event.hash.slice(0);

        target.forEach(function(targetChunk, b, c){
           var currentChunk = current.shift();
           if(currentChunk == targetChunk){
             returnOK = returned = true;
           }
        });

        if(returnOK){
          event.callback(current);
          return true;
        }
      });

      if(!returned && fallback){
        window.location.hash = fallback;
      }

    }, false);

    // Trigger event for hash on load
    var temp = this.cleanHash(window.location.hash);
    window.location.hash = '';
    // Set new hash asyncronously, otherwise it'll fire the callback twice
    setTimeout(function(){
      window.location.hash+=  "!"+temp.join('/');
    }, 0);
  },

  on: function(hash, callback){
    this.events.push({hash: this.cleanHash(hash), callback: callback});
  },

  cleanHash: function(hash){
    while(hash.match(/^(#|!)/)){
      hash = hash.replace(/^(#|!)/, '')
    } 
    return hash.split('/');
  }
}