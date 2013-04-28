var Geo = Geo || {
  init: function(){
    window.geo = window.geo || new Storage('geo');
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
