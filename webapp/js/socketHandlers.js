/*!
 * DB2Go Sockets.io Callbacks
 *
 * Copyright (c) 2009, 2013 Paddy O'Reilly
 * Released under the GNU Public Licence V3
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * Date: 29-04-2013
 */

Util.ready(function(){
  // Open Socket to NodeServer
  socket = io.connect('http://dublinbikes2go.com:8000', {
     transports: ['jsonp-polling']
  }).
    on('all-stations', function (stationList) {
      // Refresh all stations based on latest from server
      for(var id in stationList){
        // Set locations as floats - hack
        stationList[id].lat = parseFloat(stationList[id].lat);
        stationList[id].lng = parseFloat(stationList[id].lng);

        stations.set(id, stationList[id], true);
      }
      stations.save();
    }).
    on('update', function (message) {
      var station = stations[message.station];
      station.free   = message.free;
      station.total  = message.total;
      station.open   = message.open;
      stations.save();

      // Update station values in the DOM
      console.log(document.querySelectorAll('.station'+ station.id +' .bikes').textContent);
      console.log(document.querySelectorAll('.station'+ station.id +' .stands').innerText);

      document.querySelectorAll('.station'+ station.id +' .bikes').forEach(function(content){
       content.textContent = station.available;
      });
      document.querySelectorAll('.station'+ station.id +' .total').forEach(function(content){
       content.textContent = station.total;
      });
      document.querySelectorAll('.station'+ station.id +' .stands').forEach(function(content){
       content.textContent = station.free;
      });
      // console.log('WS:UP-' + station.id);

      stations.save();
    });
});