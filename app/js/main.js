/*!
 * Dublin Bikes 2 Go! v3.5
 * http://dublinbikes2go.com
 *
 * Copyright (c) 2009, 2013 Paddy O'Reilly
 * Released under the GNU Public Licence V3
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * Date: 29-04-2013
 */

var stations = new Poca( 'stations',
                            function(station){
                              return new Station(station);
                            });
Util.ready(function(){
  Geo.init();

  routie({
    '!nearest': function(){
      var ul = document.createElement('ul');

      stations.get(
        function(item){ // Condition
          return true;
          // if(item.bikes>8){
          // }
        },
        function(a, b){ // Sorting
          return a.location.distanceTo(geo.location) - b.location.distanceTo(geo.location);
          return a.name > b.name;
        },
        false  
      ).forEach(function(station){
        var li = document.createElement('li');
        ul.className="station"+station.id;

        var a = document.createElement('a');
        a.href="#!station/"+station.id;
        

        var innerHTML = station.location.distanceTo(geo.location) +' - ' +station.name;
        innerHTML += " <span class='bikes'>"+ station.bikes +"</span>";
        innerHTML += "/";
        innerHTML += "<span>"+ station.total +"</span>";

        a.innerHTML = innerHTML;
        li.appendChild(a);
        ul.appendChild(li);      
      });
      
      document.getElementById('main').innerHTML = "";
      document.getElementById('main').appendChild(ul);
    },
  '!station/:id': function(id, a, b, c){
      var station = stations[id];

      var ul = document.createElement('ul');
      ul.className="station"+station.id;

      var name = document.createElement('li');
      name.textContent = station.name;
      ul.appendChild(name);

      var distance = document.createElement('li');
      distance.textContent = "Distance: " + station.location.distanceTo(geo.location);
      ul.appendChild(distance);
      
      var bikes = document.createElement('li');
      bikes.textContent = "Bikes: ";
      var bikesSpan = document.createElement('span');
      bikesSpan.className="bikes";
      bikesSpan.textContent = station.bikes;
      bikes.appendChild(bikesSpan);
      ul.appendChild(bikes);

      var stands = document.createElement('li');
      stands.textContent = "Stands: ";
      var standsSpan = document.createElement('span');
      standsSpan.className="stands";
      standsSpan.textContent = station.stands;
      stands.appendChild(standsSpan);
      ul.appendChild(stands);

      document.getElementById('main').innerHTML = "";
      document.getElementById('main').appendChild(ul);
    }
  });
});
