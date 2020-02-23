var data_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

d3.json(data_url, function(info) {

    createFeatures(info.features);
});

function createFeatures(earthquake_data) {

    var earthquakes = L.geoJSON(earthquake_data, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>Magnitude: " + feature.properties.mag + "</h3><h3>Location: " + feature.properties.place +
                "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
        },

        pointToLayer: function(feature, latlng) {
            return new L.circle(latlng, {
                radius: dotSize(feature.properties.mag),
                fillColor: dotColors(feature.properties.mag),
                fillOpacity: 0.70,
                color: "#000",
                stroke: true,
                weight: .10
            })
        }
    });
   
    createMap(earthquakes);
}


function createMap(earthquakes) {
    
    var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
        "access_token=pk.eyJ1IjoiYXJpYW5zYWRyaSIsImEiOiJjazM4ODk2MjEwMzJlM290ZWJ0bTNhanBsIn0.z_gB-zOqWo0Ln-HAxxUfYQ." +
        "T6YbdDixkOBWH_k9GbS8JQ");

    var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?" +
        "access_token=pk.eyJ1IjoiYXJpYW5zYWRyaSIsImEiOiJjazM4ODk2MjEwMzJlM290ZWJ0bTNhanBsIn0.z_gB-zOqWo0Ln-HAxxUfYQ." +
        "T6YbdDixkOBWH_k9GbS8JQ");

    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
        "access_token=pk.eyJ1IjoiYXJpYW5zYWRyaSIsImEiOiJjazM4ODk2MjEwMzJlM290ZWJ0bTNhanBsIn0.z_gB-zOqWo0Ln-HAxxUfYQ." +
        "T6YbdDixkOBWH_k9GbS8JQ");
   
    var baseMaps = {
        "Satellite": satellite,
        "GrayScale": darkmap,
        "OutDoors": outdoors,
    };

    var overlayMaps = {
        "Earthquakes": earthquakes
    };

    var myMap = L.map("map", {
        center: [
            39.0119, -98.4842
        ],
        zoom: 4.50,
        layers: [outdoors, earthquakes]
    });
 
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: true
    }).addTo(myMap);
}

function dotSize(size) {
    return size * 38000
}

 
function dotColors(dots) {
    return dots > 5 ? "#E52D17" :
        dots > 4 ? "#DE7B28":
        dots > 3 ? "#E2A14D":
        dots > 2 ? "#DDC46E":
        dots > 1 ? "#E8E51E":
        "#98E81E";
}
 