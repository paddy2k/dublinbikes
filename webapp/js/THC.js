// Hashchange Event Managment Package
// THC - Total Hashchange Control
var THC = THC || {
  events: [],
  init: function(fallback){
    var _this = this;
    var prefix = "thc_";

    window.addEventListener('hashchange', function(event){
      var hash = _this.cleanHash(window.location.hash), returned = false, classList;

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

      // Add/remove classes based on path
      classList = document.body.className.match(new RegExp(prefix + '\\w+', 'g')) || [];
      classList.forEach(function(className){
        document.body.classList.remove(className);
      });
      hash.forEach(function(className){
        document.body.classList.add(prefix + className);
      });

      if(!returned && fallback){
        window.location.hash = fallback;
      }
    }, false);

    // Trigger event for hash on load
    var temp = this.cleanHash(window.location.hash);
    window.location.hash = '!';
    window.location.hash+=  temp.join('/');
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
