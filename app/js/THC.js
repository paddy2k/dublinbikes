/*!
 * Total Hashchange Control (THC) - v0.1
 * Hashchange Event Managment Package
 *
 * Copyright (c) 2013 Paddy O'Reilly
 * Released under the GNU Public Licence V3
 * http://www.gnu.org/licenses/gpl-3.0.html
 * 
 * Date: 29-04-2013
 */
 
var THC = THC || {
  events: [],
  init: function(fallback){
    var _this = this;
    var prefix = "thc_";
    fallback = fallback || '';

    window.addEventListener('hashchange', function(event){
      var hash = _this.cleanHash(window.location.hash), returned = false, classList;

      _this.events.forEach(function(event){
        var returnOK = false;
        var current = hash.slice(0);
        var target = event.hash.slice(0);

        target.forEach(function(targetChunk){
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
      classList = document.body.className.match(new RegExp(prefix + '\\w*', 'g')) || [];
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
    return hash.split('/') || Array();
  }
}
