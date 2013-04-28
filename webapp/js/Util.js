var Util = Util || {
  prefixes : ["webkit", "moz", "ms", "O", ""],
  // get : function(url, callback){
  //   var request = new XMLHttpRequest();
  //   request.open("GET", url, true);
  //   request.onreadystatechange = function(){
  //     if(request.readyState === 4 && request.status === 200) {
  //       callback(request.response);
  //     }
  //   };
  //   request.send(null);
  // },
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
  }
};

// Useful for looping through query selector results
NodeList.prototype.forEach = Array.prototype.forEach;