
// Map 1
// Initialize map
// var map = L.map('map').setView([50.10138520851064, -101.461714911189], 3);

var myStyle = {
  radius: 8,
      fillColor: "#ff7800",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
  };

// Add basemap
 // OpenStreetMap layer
var OSM = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
     maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
// OpenTopoMap layer
var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	  maxZoom: 17,
	  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
// Esri Satellite
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
 });

// stats layers added
var skiStats = L.geoJSON(resorts, {
  pointToLayer: function (feature, latlng) {
      var circleColor;
      if (feature.properties.year_opened <= 1950) {
          circleColor = "#ff0000";
      } else if (feature.properties.year_opened <= 1960) {
          circleColor = "#ff7800";
      } else if (feature.properties.year_opened <= 1970) {
          circleColor = "#ffbf00";
      } else if (feature.properties.year_opened <= 1980) {
          circleColor = "#ffff00";
      } else if (feature.properties.year_opened <= 1990) {
          circleColor = "#bfff00";
      } else if (feature.properties.year_opened <= 2000) {
          circleColor = "#00ff00";
      } else if (feature.properties.year_opened > 2000) {
          circleColor = "#ADD8E6";
      } else if (feature.properties.year_opened == "#N/A") {
          circleColor = "#000000";

      }
      var skiStatsStyle = {
          radius: 8,
          fillColor: circleColor,
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
      };
      return L.circleMarker(latlng, skiStatsStyle);
  },
  onEachFeature: function (feature, layer) {
      layer.bindPopup("<p> Resort Name: " + feature.properties.resort_name + "<br> Year Opened: " + feature.properties.year_opened + "</p>");
  }
});



// Initialize map
var map = L.map('map', {
  center: [50.10138520851064, -101.461714911189],
  zoom: 3,
  layers: [Esri_WorldImagery, skiStats]
});

var layercontrol = L.control.layers({
  "OpenStreetMap": OSM,
  "OSM Topo": OpenTopoMap,
  "Esri World Imagery": Esri_WorldImagery
}, {
  "Ski Resorts": skiStats
}, {
  
}).addTo(map);

// ski resort opened legend

// ski resort opened legend with map
// var legend = L.control({ position: "bottomleft" });

// legend.onAdd = function(map) {
//   var div = L.DomUtil.create("div", "legend");
//   div.innerHTML += "<h4>Year Opened</h4>";
//   div.innerHTML += '<i style="background: #ff0000"></i><span>Before 1950</span><br>';
//   div.innerHTML += '<i style="background: #ff7800"></i><span>1950-1960</span><br>';
//   div.innerHTML += '<i style="background: #ffbf00"></i><span>1960-1970</span><br>';
//   div.innerHTML += '<i style="background: #ffff00"></i><span>1970-1980</span><br>';
//   div.innerHTML += '<i style="background: #bfff00"></i><span>1980-1990</span><br>';
//   div.innerHTML += '<i style="background: #00ff00"></i><span>1990-2000</span><br>';
//   div.innerHTML += '<i style="background: #ADD8E6"></i><span>After 2000</span><br>';
//   div.innerHTML += '<i style="background: #000000"></i><span>N/A</span><br>';

//   return div;
// };

// legend.addTo(map);

var legend = L.control({position: 'bottomleft'});
    legend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend');
      var labels = ["<h4>Year Opened</h4>"];
      var categories = ['Before 1950', '1950-1960', '1960-1970', '1970-1980', '1980-1990', '1990-2000', 'After 2000', 'N/A'];
      var colors = ['#ff0000', '#ff7800', '#ffbf00', '#ffff00', '#bfff00', '#00ff00', '#ADD8E6', '#000000'];
      div.innerHTML += labels;
      for (var i = 0; i < categories.length; i++) {
        div.innerHTML += '<i style="background:' + colors[i] + '"></i> ' + categories[i] + '<br>';
      }
      return div;
    };
legend.addTo(map);

// add scale bar
L.control.scale().addTo(map);



// map 2

// Add basemap
 // OpenStreetMap layer
 var OSM2 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
// OpenTopoMap layer
var OpenTopoMap2 = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	  maxZoom: 17,
	  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
// Esri Satellite
var Esri_WorldImagery2 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
 });


// stats layers added
var skiStats2 = L.geoJSON(resorts, {
    pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
    style: myStyle,
    });
  },
  onEachFeature: function (feature, layer) {
    layer.bindPopup("<p> Resort Name: " + feature.properties.resort_name + "<br> Total acres: " + feature.properties.acres + "</p>");
  }
});

// Initialize map
var map2 = L.map('map2', {
  center: [50.10138520851064, -101.461714911189],
  zoom: 3,
  layers: [Esri_WorldImagery2, skiStats2]
});

layercontrol2 = L.control.layers({
  "OpenStreetMap": OSM2,
  "OSM Topo": OpenTopoMap2,
  "Esri World Imagery": Esri_WorldImagery2
}, {
  "Ski Resorts": skiStats2
}, {
  
}).addTo(map2);



