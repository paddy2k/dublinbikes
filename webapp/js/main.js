var stations = new Storage( 'stations',
                            function(station){
                              return new Station(station);
                            });
Util.ready(function(){
  Geo.init();

  THC.on('nearest', function(){
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
  });

  THC.on('station', function(data){
    var station = stations[data[0]];

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
  });

  THC.init();
});
