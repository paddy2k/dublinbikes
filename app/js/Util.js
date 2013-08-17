/*!
 * DB2Go Utilities
 *
 * Copyright (c) 2009, 2013 Paddy O'Reilly
 * Released under the GNU Public Licence V3
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * Date: 29-04-2013
 */

var Util = Util || {
  prefixes : ["webkit", "moz", "ms", "O", ""],
  prefix : function(node, attribute, style){
    attribute = attribute.charAt(0).toUpperCase() + attribute.substr(1);

    for(var i=0,len=this.prefixes.length;i<len;i++){
      if(node.style[this.prefixes[i]+attribute]===""){
        return node.style[this.prefixes[i]+attribute] = style;
      }
    }
    
    return node.style[attribute.toLowerCase()] = style;
  },
  ready : function(readyFunction){
    document.addEventListener('DOMContentLoaded', readyFunction);
  }, 
  classChange: function(route){
    var classList, prefix = "_";
    var hash = route.split('/');
    alert(hash);
    console.log(hash);
    classList = document.body.className.match(new RegExp(prefix + '\\w*', 'g')) || [];
    classList.forEach(function(className){
      document.body.classList.remove(className);
    });
    hash.forEach(function(className){
      document.body.classList.add(prefix + className);
    });
  }
};

// Useful for looping through query selector results
NodeList.prototype.forEach = Array.prototype.forEach;