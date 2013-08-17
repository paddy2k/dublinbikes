/*!
 * Geolocation Object - Dublin Bikes 2 Go! v3.5
 * http://dublinbikes2go.com
 *
 * Copyright (c) 2009, 2013 Paddy O'Reilly
 * Released under the GNU Public Licence V3
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * Date: 29-04-2013
 */

var Geo = Geo || {
  init: function(){
    window.geo = window.geo || new Poca('geo');
    geo.accuracy = geo.accuracy || false;

    try{
      geo.location = new LatLon(geo.position.coords.latitude, geo.position.coords.longitude);
    }
    catch(e){
      geo.position = {coords: {latitude: 53.34585, longitude: -6.25684}}; // Default location

      geo.location = new LatLon(geo.position.coords.latitude, geo.position.coords.longitude);
    }

    return geo.set('watch',
      navigator.geolocation.watchPosition(
        function(location){
//          geo.set('position', location);
          geo.position = {coords: {latitude: location.coords.latitude, longitude: location.coords.longitude}}; // Default location
          geo.location = new LatLon(location.coords.latitude, location.coords.longitude);
          geo.save();
        },
        function(error){
          // console.log(error);
        },
        {enableHighAccuracy: geo.accuracy}
      )
    ); 
  },
  toggle: function(bool){
    var geo = window.geo;
    geo.set('accuracy', bool || !geo.acuracy);

    navigator.geolocation.clearWatch(
      geo.watch
    );
    return this.init();
  }
}
