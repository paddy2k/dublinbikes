/*!
 * Station Prototype - Dublin Bikes 2 Go! v3.5
 * http://dublinbikes2go.com
 *
 * Copyright (c) 2009, 2013 Paddy O'Reilly
 * Released under the GNU Public Licence V3
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * Date: 29-04-2013
 */

var Station = function(data){
  var location = {};

  for(var item in data){
    if(data.hasOwnProperty(item)){
      this[item]  = data[item];
    }
  }

  this.__defineGetter__("location", function(){
    if(!location[this.id]){
      location[this.id] = new LatLon(this.lat, this.lng);
    }
    return location[this.id];
  });

  this.__defineGetter__("available", function(){
    return this.total - this.free;
  });

  this.__defineGetter__("bikes", function(){
    return this.available;
  });
  
  this.__defineGetter__("stands", function(){
    return this.free;
  });

  this.__defineGetter__("stats", function(){
    return  "http://chart.apis.google.com/chart?cht=lc&chs=320x100&chf=c,s,07656f|bg,s,07656f&chco=678a90,FF0000&chdl=Month|Today&chd=s:"
    +this.month +","
    +this.today
    +"&chxt=x,y&chxl=0:|6:00|8:15|10:30|12:45|15:00|17:15|19:30|21:45|24:00|1:|0%|33%|66%|100%&chxs=0,FFFFFF,10|1,FFFFFF,10";
  });
  return this;
}