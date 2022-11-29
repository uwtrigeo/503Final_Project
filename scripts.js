
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
      else if (feature.properties.year_opened <= 2000) circleColor = "#00ff00";
      else if (feature.properties.year_opened > 2000)  circleColor = "#ADD8E6";
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
  opacity:0.75,
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
      color: "#00ff00",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "After 2000",
      type: "circle",
      radius: 6,
      color: "#ADD8E6",
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
      else if (feature.properties.acres <= 1000) circleSize = 14;
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

layercontrol2 = L.control.layers({
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
  opacity:0.75,
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
      label: "200-300",
      type: "circle",
      radius: 6,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "300-400",
      type: "circle",
      radius: 8,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "400-500",
      type: "circle",
      radius: 10,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "500-700",
      type: "circle",
      radius: 12,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "700-1000",
      type: "circle",
      radius: 14,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    },
    {
      label: "1000-3000",
      type: "circle",
      radius: 16,
      color: "blue",
      fill: true,
      fillOpacity: "0.4"
    }
    ,
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