
// Map 1 - Year opened and count by state

var myStyle = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };



// Add basemap
// OSM HOT
var OpenStreetMap_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	  maxZoom: 19,
	  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
});
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
      var circleSize;      
          if (feature.properties.year_opened <= 1950) circleSize = 6;
          else if (feature.properties.year_opened <= 1960) circleSize = 6;
          else if (feature.properties.year_opened <= 1970) circleSize = 6;
          else if (feature.properties.year_opened <= 1980) circleSize = 6;
          else if (feature.properties.year_opened <= 1990) circleSize = 6;
          else if (feature.properties.year_opened > 1990) circleSize = 6;
          else circleSize = 6;
      var circleColor;
          if (feature.properties.year_opened <= 1950) circleColor = "#3288db";
          else if (feature.properties.year_opened <= 1960) circleColor = "#99d594";
          else if (feature.properties.year_opened <= 1970) circleColor = "#e6f598";
          else if (feature.properties.year_opened <= 1980) circleColor = "#fee08b";
          else if (feature.properties.year_opened <= 1990) circleColor = "#fc8d59";
          else if (feature.properties.year_opened > 1990)  circleColor = "#d53e4f";
          else circleColor = "#737373";

      var skiStatsStyle = {
          radius: circleSize,
          color: circleColor,
          weight: 1,
          opacity: 4,
          fillOpacity: 0.7,
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

// State ski resort count layer
var stateStats = L.geoJSON(states, {
  style: function (feature) {
    var fillColor;
      if (feature.properties.numResorts == null) fillColor = '#737373';
      else if (feature.properties.numResorts <= 5) fillColor = "#3288bd";
      else if (feature.properties.numResorts <= 10) fillColor = "#99d594";
      else if (feature.properties.numResorts <= 20) fillColor = "#e6f598";
      else if (feature.properties.numResorts <= 30) fillColor = "#fee08b";
      else if (feature.properties.numResorts <= 40) fillColor = "#fc8d59";
      else if (feature.properties.numResorts > 40)  fillColor = "#d53e4f";
      else fillColor = "#737373";

    return {
      color: "#000",
      weight: 0.5,
      opacity: 1,
      fillOpacity: 0.8,
      fillColor: fillColor,
    };
},
onEachFeature: function (feature, layer) {
  layer.bindPopup("<b>State: </b>" + feature.properties.NAME + "<br><b>Ski Resorts: </b>" + feature.properties.numResorts);
}
});

// Initialize map
var map = L.map('map', {
    center: [50.88629, -106.58909],
    zoom: 4,
    layers: [OSM, skiStats]
});

var layercontrol = L.control.layers({
    "OpenStreetMap_HOT": OpenStreetMap_HOT,
    "OpenStreetMap": OSM,
    "OSM Topo": OpenTopoMap,
    "Esri World Imagery": Esri_WorldImagery
    }, 
    {
    "Ski Resort Year Opened": skiStats,
    "Resorts Clustered": clusters,
    "State Ski Resort Count": stateStats    
    }, 
      
).addTo(map);

// ski resort opened legend
var Legend = L.control.Legend({
    position: "bottomleft",
    title: "Opened",
    opacity:0.50,
    symbolWidth: 30,
    symbolHeight: 25,
    collapsed: true,
    legends: [
    {
      label: "Before 1950",
      type: "circle",
      radius: 6,
      fillColor: "#3288bd",
      color: "#000",
      fill: true,
      fillOpacity: "0.8",
      weight: 1,
    },
    {
      label: "1951-1960",
      type: "circle",
      radius: 6,
      fillColor: "#99d594",
      color: "#000",
      fill: true,
      fillOpacity: "0.8",
      weight: 1,
    },
    {
      label: "1961-1970",
      type: "circle",
      radius: 6,
      fillColor: "#e6f598",
      color: "#000",
      fill: true,
      fillOpacity: "0.8",
      weight: 1,
    },
    {
      label: "1971-1980",
      type: "circle",
      radius: 6,
      fillColor: "#fee08b",
      color: "#000",
      fill: true,
      fillOpacity: "1",
      weight: 1,
    },
    {
      label: "1981-1990",
      type: "circle",
      radius: 6,
      fillColor: "#fc8d59",
      color: "#000",
      fill: true,
      fillOpacity: "0.8",
      weight: 1,
    },
    {
      label: "After 1990",
      type: "circle",
      radius: 6,
      fillColor: "#d53e4f",
      color: "#000",
      fill: true,
      fillOpacity: "0.8",
      weight: 1,
    },
    {
      label: "NA",
      type: "circle",
      radius: 6,
      fillColor: "#737373",
      color: "#000",
      fill: true,
      fillOpacity: "0.8",
      weight: 1,
    }
    
]
}).addTo(map);

// add scale bar
L.control.scale().addTo(map);


// Map 2 - Acres by resort and state

// Add basemap

// OSM HOT
var OpenStreetMap_HOT2 = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	  maxZoom: 19,
	  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
});
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
          if (feature.properties.acres <= 100) circleSize = 4;
          else if (feature.properties.acres <= 300) circleSize = 6;
          else if (feature.properties.acres <= 800) circleSize = 8;
          else if (feature.properties.acres <= 2000) circleSize = 10;
          else if (feature.properties.acres <= 3000) circleSize = 14;
          else if (feature.properties.acres <= 7500) circleSize = 18;
          else circleSize = 0;

      var circleColor;      
          if (feature.properties.acres <= 100) circleColor = '#3288bd';
          else if (feature.properties.acres <= 300) circleColor = '#99d594';
          else if (feature.properties.acres <= 800) circleColor = '#e6f598';
          else if (feature.properties.acres <= 2000) circleColor = '#fee08b';
          else if (feature.properties.acres <= 3000) circleColor = '#fc8d59';
          else if (feature.properties.acres > 3000) circleColor = '#d53e4f';
          else circleColor = '#737373';
      
      var marker = L.circleMarker(latlng, {radius: circleSize, color: circleColor, weight: 1, opacity: 4, fillOpacity: 0.7});
          marker.bindPopup("<b> Resort Name: </b>" + feature.properties.resort_name + "<br><b> Acres: </b>" + feature.properties.acres + "</p>");
          return marker;
    }
  });

// State ski acres layer
var stateStats2 = L.geoJSON(states, {
    style: function (feature) {
      var fillColor;
        if (feature.properties.skiAcres == null) fillColor = '#737373';
        else if (feature.properties.skiAcres <= 1000) fillColor = "#3288bd";
        else if (feature.properties.skiAcres <= 5000) fillColor = "#99d594";
        else if (feature.properties.skiAcres <= 10000) fillColor = "#e6f598";
        else if (feature.properties.skiAcres <= 20000) fillColor = "#fee08b";
        else if (feature.properties.skiAcres <= 30000) fillColor = "#fc8d59";
        else if (feature.properties.skiAcres > 30000)  fillColor = "#d53e4f";
        else fillColor = "#737373";

      return {
        color: "#000",
        weight: 0.5,
        opacity: 1,
        fillOpacity: 0.8,
        fillColor: fillColor,
      };
  },
  onEachFeature: function (feature, layer) {
    layer.bindPopup("<b>State: </b>" + feature.properties.NAME + "<br><b>Skiable Acres: </b>" + feature.properties.skiAcres);
  }
});

// Initialize map
var map2 = L.map('map2', {
  center: [50.88629, -106.58909],
  zoom: 4,
  layers: [OSM2, skiStats2]
});

var layerControl2 = L.control.layers({
    "OpenStreetMap HOT": OpenStreetMap_HOT2,
    "OpenStreetMap": OSM2,
    "OSM Topo": OpenTopoMap2,
    "Esri World Imagery": Esri_WorldImagery2
    }, 
    {
    "Ski Resorts": skiStats2,
    "State Ski Acres": stateStats2
    }, 
    {
  
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
      radius: 4,
      color: "#3288bd",
      fill: true,
      fillOpacity: "1",
      weight: 1,
    
    },
    {
      label: "101-300",
      type: "circle",
      radius: 6,
      fillColor: "#99d594",
      color: "000",
      fill: true,
      fillOpacity: "1",
      weight: 1
    },
    {
      label: "301-800",
      type: "circle",
      radius: 8,
      fillColor: "#e6f598",
      color: "#000",
      fill: true,
      fillOpacity: "1",
      weight: 1
    },
    {
      label: "801-2000",
      type: "circle",
      radius: 10,
      fillColor: "#fee08b",
      color: "#000",
      fill: true,
      fillOpacity: "1",
      weight: 1
    },
    {
      label: "2001-3000",
      type: "circle",
      radius: 14,
      fillColor: "#fc8d59",
      color: "#000",
      fill: true,
      fillOpacity: "0.8",
      weight: 1
    },
    {
      label: "3001-7300",
      type: "circle",
      radius: 18,
      fillColor: "#d53e4f",
      color: "#000",
      fill: true,
      fillOpacity: "0.8",
      weight: 1
    }
]
}).addTo(map2);

// add scale bar
L.control.scale().addTo(map2);


// Map 3 - Lifts by resort and state

// Add basemap
// OSM HOT
var OpenStreetMap_HOT3 = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	  maxZoom: 19,
	  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
});
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

    var circleColor;      
        if (feature.properties.lifts <= 5) circleColor = '#3288bd';
        else if (feature.properties.lifts <= 10) circleColor = '#99d594';
        else if (feature.properties.lifts <= 15) circleColor = '#e6f598';
        else if (feature.properties.lifts <= 20) circleColor = '#fee08b';
        else if (feature.properties.lifts <= 30) circleColor = '#fc8d59';
        else if (feature.properties.lifts > 30) circleColor = '#d53e4f';
        else circleColor = '#737373';
    
    var marker = L.circleMarker(latlng, {radius: circleSize, color: circleColor, weight: 1, opacity: 4, fillOpacity: 0.7});
    marker.bindPopup("<b> Resort Name: </b>" + feature.properties.resort_name + "<br><b> Lifts: </b>" + feature.properties.lifts + "</p>");
    return marker;
  }
});

// State ski resort count layer
var stateStats3 = L.geoJSON(states, {
  style: function (feature) {
    var fillColor;
        if (feature.properties.Lifts == null) fillColor = '#737373';
        else if (feature.properties.Lifts <= 10) fillColor = "#3288bd";
        else if (feature.properties.Lifts <= 20) fillColor = "#99d594";
        else if (feature.properties.Lifts <= 100) fillColor = "#e6f598";
        else if (feature.properties.Lifts <= 200) fillColor = "#fee08b";
        else if (feature.properties.Lifts <= 300) fillColor = "#fc8d59";
        else if (feature.properties.Lifts > 300)  fillColor = "#d53e4f";
        else fillColor = "#737373";

    return {
      color: "#000",
      weight: 0.5,
      opacity: 1,
      fillOpacity: 0.8,
      fillColor: fillColor,
    };
},
onEachFeature: function (feature, layer) {
  layer.bindPopup("<b>State: </b>" + feature.properties.NAME + "<br><b>Ski Lifts: </b>" + feature.properties.Lifts);
}
});

// Initialize map
var map3 = L.map('map3', {
    center: [50.88629, -106.58909],
    zoom: 4,
    layers: [OSM3, skiStats3]
});

var layerControl3 = L.control.layers({
    "OpenStreetMap HOT": OpenStreetMap_HOT3,
    "OpenStreetMap": OSM3,
    "OSM Topo": OpenTopoMap3,
    "Esri World Imagery": Esri_WorldImagery3
    }, 
    {
    "Ski Resorts": skiStats3,
    "State Ski Lift Count": stateStats3
    }, 
    
  
).addTo(map3);


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
      color: "#3288bd",
      fill: true,
      fillOpacity: "1"
    },
    {
      label: "6-10",
      type: "circle",
      radius: 6,
      fillColor: "#99d594",
      color: "#000",
      fill: true,
      fillOpacity: "1",
      weight: 1
    },
    {
      label: "11-15",
      type: "circle",
      radius: 8,
      fillColor: "#e6f598",
      color: "#000",
      fill: true,
      fillOpacity: "1",
      weight: 1
    },
    {
      label: "16-20",
      type: "circle",
      radius: 10,
      fillColor: "#fee08b",
      color: "000",
      fill: true,
      fillOpacity: "1",
      weight: 1
    },
    {
      label: "21-30",
      type: "circle",
      radius: 14,
      fillColor: "#fc8d59",
      color: "000",
      fill: true,
      fillOpacity: "1",
      weight: 1
    },
    {
      label: "Above 30",
      type: "circle",
      radius: 18,
      fillColor: "#d53e4f",
      color: "000",
      fill: true,
      fillOpacity: "1",
      weight: 1
    }    
]
}).addTo(map3);

// add scale bar
L.control.scale().addTo(map3);


// Map 4 - Vertical Drop

// Add basemap
// OSM HOT
var OpenStreetMap_HOT4 = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	  maxZoom: 19,
	  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
});
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

    var circleColor;      
        if (feature.properties.vertical <= 500) circleColor = '#3288bd';
        else if (feature.properties.vertical <= 1000) circleColor = '#99d594';
        else if (feature.properties.vertical <= 2000) circleColor = '#e6f598';
        else if (feature.properties.vertical <= 3000) circleColor = '#fee08b';
        else if (feature.properties.vertical <= 4000) circleColor = '#fc8d59';
        else if (feature.properties.vertical > 4000) circleColor = '#d53e4f';
        else circleColor = '#737373';
    
    var marker = L.circleMarker(latlng, {radius: circleSize, color: circleColor, weight: 1, opacity: 4, fillOpacity: 0.7});
        marker.bindPopup("<b> Resort Name: </b>" + feature.properties.resort_name + "<br><b> Vertical: </b>" + feature.properties.vertical + " feet");
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
    "OpenStreetMap HOT": OpenStreetMap_HOT4,
    "OpenStreetMap": OSM4,
    "OSM Topo": OpenTopoMap4,
    "Esri World Imagery": Esri_WorldImagery4
    }, 
    {
    "Ski Resorts": skiStats4
    }, 
    
  ).addTo(map4);


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
      color: "#3288bd",
      fill: true,
      fillOpacity: "1"
    },
    {
      label: "501-1000",
      type: "circle",
      radius: 6,
      fillColor: "#99d594",
      color: "000",
      fill: true,
      fillOpacity: "1",
      weight: 1
    },
    {
      label: "1001-2000",
      type: "circle",
      radius: 8,
      fillColor: "#e6f598",
      color: "000",
      fill: true,
      fillOpacity: "1",
      weight: 1
    },
    {
      label: "2001-3000",
      type: "circle",
      radius: 12,
      fillColor: "#fee08b",
      color: "000",
      fill: true,
      fillOpacity: "1",
      weight: 1
    },
    {
      label: "3001-4000",
      type: "circle",
      radius: 16,
      fillColor: "#fc8d59",
      color: "000",
      fill: true,
      fillOpacity: "1",
      weight: 1
    },
    {
      label: "Above 4000",
      type: "circle",
      radius: 20,
      fillColor: "#d53e4f",
      color: "000",
      fill: true,
      fillOpacity: "1",
      weight: 1

    }
    
]
}).addTo(map4);

// add scale bar
L.control.scale().addTo(map4);


// Map 5 - Ski visits by NSAA region

// Add basemap
// OSM HOT
var OpenStreetMap_HOT5 = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	  maxZoom: 19,
	  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
});
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

// State ski resort count layer
var stateStats5 = L.geoJSON(nsaaVisits, {
  style: function (feature) {
    var fillColor;
      if (feature.properties.Totals == null) fillColor = '#737373';
      else if (feature.properties.Totals <= 100) fillColor = '#99d594';
      else if (feature.properties.Totals <= 150) fillColor = "#e6f598";
      else if (feature.properties.Totals <= 200) fillColor = "#fee08b";
      else if (feature.properties.Totals <= 400) fillColor = "#fc8d59";
      else if (feature.properties.Totals > 400)  fillColor = "#d53e4f";
      else fillColor = "#737373";

    return {
      color: "#000",
      weight: 0.5,
      opacity: 1,
      fillOpacity: 0.8,
      fillColor: fillColor,
    };
},
onEachFeature: function (feature, layer) {
  layer.bindPopup("<b>NSAA Region: </b>" + feature.properties.NSAA_Resort_Regions + "<br><b>Skier visits: </b>" + feature.properties.Totals + " million");
}
});

// Initialize map
var map5 = L.map('map5', {
    center: [50.88629, -106.58909],
    zoom: 4,
    layers: [OSM5, stateStats5]
});

var layercontrol5 = L.control.layers({
    "OpenStreetMap_HOT": OpenStreetMap_HOT5,
    "OpenStreetMap": OSM5,
    "OSM Topo": OpenTopoMap5,
    "Esri World Imagery": Esri_WorldImagery5
    }, 
    {
    "Skier visits":  stateStats5  
    }, 
      
).addTo(map5);

// ski resort opened legend
var Legend5 = L.control.Legend({
    position: "bottomleft",
    title: "Skiers",
    opacity:0.50,
    symbolWidth: 30,
    symbolHeight: 40,
    collapsed: true,
    legends: [
      {
        label: "Below 100 million",
        type: "circle",
        radius: 6,
        fillColor: "#99d594",
        color: "#000",
        fill: true,
        fillOpacity: "0.8",
        weight: 1,
      },

      {
      label: "150-200 million",
      type: "circle",
      radius: 6,
      fillColor: "#e6f598",
      color: "#000",
      fill: true,
      fillOpacity: "0.8",
      weight: 1,
    },
    {
      label: "150-200 Million",
      type: "circle",
      radius: 6,
      fillColor: "#fee08b",
      color: "#000",
      fill: true,
      fillOpacity: "0.8",
      weight: 1,
    },
    {
      label: "200-400 Million",
      type: "circle",
      radius: 6,
      fillColor: "#fc8d59",
      color: "#000",
      fill: true,
      fillOpacity: "0.8",
      weight: 1,
    },
    {
      label: "Above 400 Million",
      type: "circle",
      radius: 6,
      fillColor: "#d53e4f",
      color: "#000",
      fill: true,
      fillOpacity: "1",
      weight: 1,
    },
    
    
]
}).addTo(map5);

// add scale bar
L.control.scale().addTo(map5);

// chart js
var years = ["21/22","20/21","19/20","18/19","17/18","16/17","15/16","14/15","13/14","12/13","11/12","10/11","09/10","08/09","07/08","06/07","06/07","04/05","03/04","02/03","01/02","00/01"
                  ];
var northEast = [12.666,12.252,11.488,12.514,11.987,11.936,9.346,13.332,13.386,13.334,11.021,13.887,13.411,13.73,14.261,11.801,12.505,13.661,12.892,13.991,12.188,13.697];
var southEast = [4.405,	5.235,	3.835,	4.262,	4.161,	4.184,	3.957,	5.673,	5.769,	5.155,	4.405,	5.789,	6.016,	5.664,	5.204,	4.888,	5.839,	5.504,	5.588,	5.833,	4.994,	5.458];   
var midWest = [6.816,	7.098,	6.396,	6.498,	6.257,	5.421,	5.516,	6.982,	7.695,	7.273,	6.382,	7.811,	7.718,	7.247,	8.099,	7.2,	7.787,	7.533,	7.773,	8.129,	6.98,	7.58];    
var rockMnts = [25.25,	22.638,	20.107,	24.408,	20.792,	21.736,	22.287,	20.768,	21.1,	19.8,	19.13,	20.9,	20.378,	19.974,	21.324,	20.849,	20.717,	19.606,	18.868,	18.728,	18.123,	19.324];
var pacSouthWest = [7.4,	7.2,	5.9,	7.5,	6.2,	7.3,	7.4,	4.8,	5.1,	7.1,	6.1,	8.1,	8.4,	7.1,	7.6,	6.5,	7.9,	8.9,	8,	7.9,	7.9,	7.8];
var pacNorthWest = [4.1,	4.5,	3.2,	4.1,	3.8,	4.1,	4.2,	2,	3.3,	4.2,	3.9,	4,	3.8,	3.6,	3.9,	3.7,	4.1,	1.6,	3.9,	3,	4.1,	3.4,
];

var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        datasets: [
        { 
          data: northEast,
          label: "North East",                
        },
        { 
          data: southEast,
          label: "South East",                
        },
        {
          data: midWest,
          label: "Mid West",
        },
        {
          data: rockMnts,
          label: "Rocky Mountains",
        },
        {
          data: pacSouthWest,
          label: "Pacific South West",
        },
        {
          data: pacNorthWest,
          label: "Pacific North West",
        },
          ]
      },
      options: {
        plugins: {
            title: {
                display: true,
                position: 'top',
                text: 'Visits in Millions',
            }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Year'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Visits in Millions'
            }
          }
        }
    }

});
