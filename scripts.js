
// Map 1

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
  center: [50.88629, -106.58909],
  zoom: 4,
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



// Map 2

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
      else if (feature.properties.acres <= 300) circleSize = 4;
      else if (feature.properties.acres <= 800) circleSize = 6;
      else if (feature.properties.acres <= 2000) circleSize = 10;
      else if (feature.properties.acres <= 3000) circleSize = 14;
      else if (feature.properties.acres <= 7500) circleSize = 18;
      else circleSize = 0;
      
      var marker = L.circleMarker(latlng, {radius: circleSize, color: 'blue', weight: 1, opacity: 4, fillOpacity: 0.3});
      marker.bindPopup("<b> Resort Name: </b>" + feature.properties.resort_name + "<br><b> Acres: </b>" + feature.properties.acres + "</p>");
      return marker;
    }
  });


// Initialize map
var map2 = L.map('map2', {
  center: [50.88629, -106.58909],
  zoom: 4,
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
  symbolWidth: 55,
  symbolHeight: 40,
  collapsed: true,
  legends: [
    {
      label: "0-100",
      type: "circle",
      radius: 2,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "101-300",
      type: "circle",
      radius: 4,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "301-800",
      type: "circle",
      radius: 6,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "801-2000",
      type: "circle",
      radius: 10,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "2001-3000",
      type: "circle",
      radius: 14,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "3001-7300",
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
    else if (feature.properties.lifts <= 10) circleSize = 6;
    else if (feature.properties.lifts <= 15) circleSize = 8;
    else if (feature.properties.lifts <= 20) circleSize = 10;
    else if (feature.properties.lifts <= 30) circleSize = 14;
    else if (feature.properties.lifts > 30) circleSize = 18;
    else circleSize = 0;
    
    var marker = L.circleMarker(latlng, {radius: circleSize, color: 'blue', weight: 1, opacity: 4, fillOpacity: 0.3});
    marker.bindPopup("<b> Resort Name: </b>" + feature.properties.resort_name + "<br><b> Lifts: </b>" + feature.properties.lifts + "</p>");
    return marker;
  }
});


// Initialize map
var map3 = L.map('map3', {
  center: [50.88629, -106.58909],
  zoom: 4,
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
      label: "0-5",
      type: "circle",
      radius: 4,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "6-10",
      type: "circle",
      radius: 6,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "11-15",
      type: "circle",
      radius: 8,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "16-20",
      type: "circle",
      radius: 10,
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
      radius: 18,
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
    if (feature.properties.vertical <= 500) circleSize = 4;
    else if (feature.properties.vertical <= 1000) circleSize = 6;
    else if (feature.properties.vertical <= 2000) circleSize = 8;
    else if (feature.properties.vertical <= 3000) circleSize = 12;
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
  center: [50.88629, -106.58909],
  zoom: 4,
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
      label: "0-500",
      type: "circle",
      radius: 4,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "501-1000",
      type: "circle",
      radius: 6,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "1001-2000",
      type: "circle",
      radius: 8,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "2001-3000",
      type: "circle",
      radius: 12,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "3001-4000",
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

var map5 = L.map('map5', {
    center: [50.88629, -106.58909], // Initial map center
    zoom: 4, // Initial zoom level
    attributionControl: false, // Instead of default attribution, we add custom at the bottom of script
  
})



// Add baselayer
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map5)

// Add geographical labels only layer on top of baselayer
var labels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19,
  pane: 'shadowPane'  // always display on top
}).addTo(map5)

// Read data from CSV file
$.get('data/skiLatLong.csv', function(csvString) {

  // Use PapaParse to transform file into arrays
  var data = Papa.parse(csvString.trim()).data.filter(
    function(row) { return row.length === 2 }
  ).map(function(a) {
    return [ parseFloat(a[0]), parseFloat(a[1]) ]
  })

  // Add all points into a heat layer
  var heat = L.heatLayer(data, {
    radius: 10,
    blur: 5,
    maxOpacity: 5.5,
    scalRadius: true,
    useLocalExtrema: true,

  })

  // Add the heatlayer to the map
  heat.addTo(map5)
})

// Add custom attribution
L.control.attribution({
  prefix: '<a href="https://github.com/HandsOnDataViz/leaflet-heatmap">View data and code</a> \
    by <a href="https://handsondataviz.org" target="_blank">HandsOnDataViz</a>'
}).addTo(map5)