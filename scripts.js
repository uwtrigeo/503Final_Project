
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
      if (feature.properties.year_opened <= 1950) circleColor = "#ff0000";
      else if (feature.properties.year_opened <= 1960) circleColor = "#ff7800";
      else if (feature.properties.year_opened <= 1970) circleColor = "#ffbf00";
      else if (feature.properties.year_opened <= 1980) circleColor = "#ffff00";
      else if (feature.properties.year_opened <= 1990) circleColor = "#bfff00";
      else if (feature.properties.year_opened <= 2000) circleColor = "#5DC669";
      else if (feature.properties.year_opened > 2000)  circleColor = "#08F221";
      else circleColor = "#000000";

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
      layer.bindPopup("<b>Resort Name: </b>" + feature.properties.resort_name + "<br><b>Year Opened: </b>" + feature.properties.year_opened);
   }

});



// cluster resorts
var clusters = L.markerClusterGroup();
clusters.addLayer(skiStats);



// Initialize map
var map = L.map('map', {
  center: [50.10138520851064, -101.461714911189],
  zoom: 3,
  layers: [OSM, skiStats]
});

var layercontrol = L.control.layers({
  "OpenStreetMap": OSM,
  "OSM Topo": OpenTopoMap,
  "Esri World Imagery": Esri_WorldImagery
}, {
  "Ski Resorts": skiStats,
  "Resorts Clustered": clusters,
  // "Heat Map": heat
}, {
  
}).addTo(map);

// ski resort opened legend
var Legend = L.control.Legend({
  position: "bottomleft",
  title: "Opened",
  opacity:0.50,
  symbolWidth: 30,
  collapsed: true,
  legends: [
    {
      label: "Before 1950",
      type: "circle",
      radius: 6,
      color: "#ff0000",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "1950-1960",
      type: "circle",
      radius: 6,
      color: "#ff7800",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "1960-1970",
      type: "circle",
      radius: 6,
      color: "#ffbf00",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "1970-1980",
      type: "circle",
      radius: 6,
      color: "#ffff00",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "1980-1990",
      type: "circle",
      radius: 6,
      color: "#bfff00",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "1990-2000",
      type: "circle",
      radius: 6,
      color: "#5DC669",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "After 2000",
      type: "circle",
      radius: 6,
      color: "#08F221",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "NA",
      type: "circle",
      radius: 6,
      color: "black",
      fill: true,
      fillOpacity: "0.4"
    }
    
]
}).addTo(map);

// add scale bar
L.control.scale().addTo(map);

/*Legend specific*/
var legend = L.control({ position: "bottomright" });

// legend.onAdd = function(map) {
//   var div = L.DomUtil.create("div", "legend");
//   div.innerHTML += "<h4>Tegnforklaring</h4>";
//   div.innerHTML += '<i style="background: #477AC2"></i><span>Water</span><br>';
//   div.innerHTML += '<i style="background: #448D40"></i><span>Forest</span><br>';
//   div.innerHTML += '<i style="background: #E6E696"></i><span>Land</span><br>';
//   div.innerHTML += '<i style="background: #E8E6E0"></i><span>Residential</span><br>';
//   div.innerHTML += '<i style="background: #FFFFFF"></i><span>Ice</span><br>';
//   div.innerHTML += '<i class="icon" style="background-image: url(https://d30y9cdsu7xlg0.cloudfront.net/png/194515-200.png);background-repeat: no-repeat;"></i><span>Grænse</span><br>';
  
  

//   return div;
// };

// legend.addTo(map);



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
      var circleSize;      
      if (feature.properties.acres <= 100) circleSize = 2;
      else if (feature.properties.acres <= 200) circleSize = 4;
      else if (feature.properties.acres <= 300) circleSize = 6;
      else if (feature.properties.acres <= 400) circleSize = 8;
      else if (feature.properties.acres <= 500) circleSize = 10;
      else if (feature.properties.acres <= 700) circleSize = 12;
      else if (feature.properties.acres <= 1500) circleSize = 14;
      else if (feature.properties.acres <= 3000) circleSize = 16;
      else if (feature.properties.acres <= 8000) circleSize = 18;
      else circleSize = 0;
      
      var marker = L.circleMarker(latlng, {radius: circleSize, color: 'blue', weight: 1, opacity: 4, fillOpacity: 0.3});
      marker.bindPopup("<b> Resort Name: </b>" + feature.properties.resort_name + "<br><b> Acres: </b>" + feature.properties.acres + "</p>");
      return marker;
    }
  });


// Initialize map
var map2 = L.map('map2', {
  center: [50.10138520851064, -101.461714911189],
  zoom: 3,
  layers: [OSM2, skiStats2]
});

var layerControl2 = L.control.layers({
  "OpenStreetMap": OSM2,
  "OSM Topo": OpenTopoMap2,
  "Esri World Imagery": Esri_WorldImagery2
}, {
  "Ski Resorts": skiStats2
}, {
  
}).addTo(map2);


// ski resort acres circle size legend
var Legend2 = L.control.Legend({
  position: "bottomleft",
  title: "Acres",
  opacity:0.50,
  symbolWidth: 50,
  symbolHeight: 40,
  collapsed: true,
  legends: [
    {
      label: "Below 100",
      type: "circle",
      radius: 2,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "100-200",
      type: "circle",
      radius: 4,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "201-300",
      type: "circle",
      radius: 6,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "301-400",
      type: "circle",
      radius: 8,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "401-500",
      type: "circle",
      radius: 10,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "501-700",
      type: "circle",
      radius: 12,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "701-1500",
      type: "circle",
      radius: 14,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "1501-3000",
      type: "circle",
      radius: 16,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    }    ,
    {
      label: "Above 3000",
      type: "circle",
      radius: 18,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    }
]
}).addTo(map2);

// add scale bar
L.control.scale().addTo(map2);


// map 3

// Add basemap
 // OpenStreetMap layer
 var OSM3 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
// OpenTopoMap layer
var OpenTopoMap3 = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	  maxZoom: 17,
	  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
// Esri Satellite
var Esri_WorldImagery3 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
 });


// stats layers added
var skiStats3 = L.geoJSON(resorts, {
  pointToLayer: function (feature, latlng) {
    var circleSize;      
    if (feature.properties.lifts <= 5) circleSize = 4;
    else if (feature.properties.lifts <= 8) circleSize = 6;
    else if (feature.properties.lifts <= 10) circleSize = 8;
    else if (feature.properties.lifts <= 15) circleSize = 10;
    else if (feature.properties.lifts <= 20) circleSize = 12;
    else if (feature.properties.lifts <= 30) circleSize = 14;
    else circleSize = 0;
    
    var marker = L.circleMarker(latlng, {radius: circleSize, color: 'blue', weight: 1, opacity: 4, fillOpacity: 0.3});
    marker.bindPopup("<b> Resort Name: </b>" + feature.properties.resort_name + "<br><b> Lifts: </b>" + feature.properties.lifts + "</p>");
    return marker;
  }
});


// Initialize map
var map3 = L.map('map3', {
  center: [50.10138520851064, -101.461714911189],
  zoom: 3,
  layers: [OSM3, skiStats3]
});

var layerControl3 = L.control.layers({
  "OpenStreetMap": OSM3,
  "OSM Topo": OpenTopoMap3,
  "Esri World Imagery": Esri_WorldImagery3
}, {
  "Ski Resorts": skiStats3
}, {
  
}).addTo(map3);


// ski resort acres circle size legend
var Legend3 = L.control.Legend({
  position: "bottomleft",
  title: "Lifts",
  opacity:0.50,
  symbolWidth: 50,
  symbolHeight: 40,
  collapsed: true,
  legends: [
    {
      label: "Below 5",
      type: "circle",
      radius: 4,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "6-8",
      type: "circle",
      radius: 6,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "9-10",
      type: "circle",
      radius: 8,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "11-15",
      type: "circle",
      radius: 10,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "16-20",
      type: "circle",
      radius: 12,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "21-30",
      type: "circle",
      radius: 14,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "Above 30",
      type: "circle",
      radius: 16,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    }
    
]
}).addTo(map3);

// add scale bar
L.control.scale().addTo(map3);


// map 4

// Add basemap
 // OpenStreetMap layer
 var OSM4 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
// OpenTopoMap layer
var OpenTopoMap4 = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	  maxZoom: 17,
	  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
// Esri Satellite
var Esri_WorldImagery4 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
 });


// stats layers added
var skiStats4 = L.geoJSON(resorts, {
  pointToLayer: function (feature, latlng) {
    var circleSize;      
    if (feature.properties.vertical <= 1000) circleSize = 4;
    else if (feature.properties.vertical <= 1500) circleSize = 6;
    else if (feature.properties.vertical <= 2000) circleSize = 8;
    else if (feature.properties.vertical <= 2500) circleSize = 10;
    else if (feature.properties.vertical <= 3000) circleSize = 12;
    else if (feature.properties.vertical <= 3500) circleSize = 14;
    else if (feature.properties.vertical <= 4000) circleSize = 16;
    else if (feature.properties.vertical > 4000) circleSize = 20;
    else circleSize = 0;
    
    var marker = L.circleMarker(latlng, {radius: circleSize, color: 'blue', weight: 1, opacity: 4, fillOpacity: 0.3});
    marker.bindPopup("<b> Resort Name: </b>" + feature.properties.resort_name + "<br><b> Vertical: </b>" + feature.properties.vertical + "</p>");
    return marker;
  }
});


// Initialize map
var map4 = L.map('map4', {
  center: [50.10138520851064, -101.461714911189],
  zoom: 3,
  layers: [OSM4, skiStats4]
});

var layerControl4 = L.control.layers({
  "OpenStreetMap": OSM4,
  "OSM Topo": OpenTopoMap4,
  "Esri World Imagery": Esri_WorldImagery4
}, {
  "Ski Resorts": skiStats4
}, {
  
}).addTo(map4);


// ski resort acres circle size legend
var Legend4 = L.control.Legend({
  position: "bottomleft",
  title: "Vertical",
  opacity:0.50,
  symbolWidth: 50,
  symbolHeight: 40,
  collapsed: true,
  legends: [
    {
      label: "Below 1000",
      type: "circle",
      radius: 4,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "1001-1500",
      type: "circle",
      radius: 6,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "1501-2000",
      type: "circle",
      radius: 8,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "2001-2500",
      type: "circle",
      radius: 10,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "2501-3000",
      type: "circle",
      radius: 12,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "3001-3500",
      type: "circle",
      radius: 14,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "3501-4000",
      type: "circle",
      radius: 16,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "Above 4000",
      type: "circle",
      radius: 20,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    }
    
]
}).addTo(map4);

// add scale bar
L.control.scale().addTo(map4);

// map 5

// Add basemap
 // OpenStreetMap layer
 var OSM5 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
// OpenTopoMap layer
var OpenTopoMap5 = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	  maxZoom: 17,
	  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
// Esri Satellite
var Esri_WorldImagery5 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
 });

// ski resorts layers added
var skiResorts5 = L.geoJSON(resorts, {
  pointToLayer: function (feature, latlng) {
  }
});

// leaflet-heat
var cfg = {
  // radius should be small ONLY if scaleRadius is true (or small radius is intended)
  // if scaleRadius is false it will be the constant radius used in pixels
  "radius": 5,
  "maxOpacity": .8,
  // scales the radius based on map zoom
  "scaleRadius": true,
  // if set to false the heatmap uses the global maximum for colorization
  // if activated: uses the data maximum within the current map boundaries
  //   (there will always be a red spot with useLocalExtremas true)
  "useLocalExtrema": true,
  // which field name in your data represents the latitude - default "lat"
  latField: 'lat',
  // which field name in your data represents the longitude - default "lng"
  lngField: 'lon',
  // which field name in your data represents the data value - default "value"
  valueField: 'acres'
};


var heatmapLayer = new HeatmapOverlay(cfg);

// Initialize map
var map5 = L.map('map5', {
  center: [50.10138520851064, -101.461714911189],
  zoom: 3,
  layers: [OSM5, heatmapLayer]


});

heatmapLayer.setData(skiResorts5);