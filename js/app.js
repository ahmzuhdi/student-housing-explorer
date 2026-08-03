/* =====================================================
   Student Housing Explorer
   Version 1.0
===================================================== */

// -----------------------------
// Create Map
// -----------------------------

const map = L.map("map", {
    zoomControl: true
}).setView([campus.latitude, campus.longitude], 15);

// -----------------------------
// Basemap
// -----------------------------

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {

    attribution:
        "&copy; OpenStreetMap Contributors"

}).addTo(map);

// -----------------------------
// Marker Layer
// -----------------------------

const markerLayer = L.layerGroup().addTo(map);

// -----------------------------
// Campus Marker
// -----------------------------

const campusIcon = L.icon({

    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",

    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",

    iconSize: [25,41],
    iconAnchor:[12,41],
    popupAnchor:[1,-34]

});

L.marker(

    [campus.latitude,campus.longitude],

    {icon:campusIcon}

).addTo(map)

.bindPopup(

`<h3>${campus.name}</h3>
<b>Campus Location</b>`

);

// -----------------------------
// Default Marker Icon
// -----------------------------

const houseIcon=L.icon({

iconUrl:
"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",

shadowUrl:
"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",

iconSize:[25,41],
iconAnchor:[12,41],
popupAnchor:[1,-34]

});

// -----------------------------
// Draw Accommodation
// -----------------------------

function drawAccommodation(data){

    markerLayer.clearLayers();

    document.getElementById("count").innerHTML=data.length;

    data.forEach(item=>{

        let popup=`

        <div style="width:240px; font-family:Poppins">

            <img
            src="${item.image}"
            style="
            width:100%;
            border-radius:10px;
            margin-bottom:10px;">

            <h3>${item.name}</h3>

            <b>${item.type}</b>

            <br><br>

            💰 Rp ${item.price.toLocaleString()}/month

            <br>

            🚶 ${item.distance} m

            <br>

            ⭐ ${item.rating}

            <br>

            🚪 ${item.availableRooms} Rooms Available

            <br><br>

            📍 ${item.address}

            <br>

            ☎ ${item.phone}

        </div>

        `;

        L.marker(

            [item.latitude,item.longitude],

            {icon:houseIcon}

        )

        .bindPopup(popup)

        .addTo(markerLayer);

    });

}

drawAccommodation(accommodations);

// -----------------------------
// Search
// -----------------------------

const search1=document.getElementById("search");
const search2=document.getElementById("search2");

function performSearch(keyword){

    keyword=keyword.toLowerCase();

    const result=accommodations.filter(item=>{

        return(

            item.name.toLowerCase().includes(keyword) ||

            item.type.toLowerCase().includes(keyword) ||

            item.address.toLowerCase().includes(keyword)

        );

    });

    drawAccommodation(result);

}

search1.addEventListener("keyup",(e)=>{

    performSearch(e.target.value);

});

search2.addEventListener("keyup",(e)=>{

    performSearch(e.target.value);

});

// -----------------------------
// Statistics
// -----------------------------

const cards=document.querySelectorAll(".card h2");

cards[0].innerHTML=statistics.totalAccommodation;

cards[1].innerHTML=
"Rp"+
Math.round(statistics.averageRent/1000)+"K";

cards[2].innerHTML=
statistics.averageDistance+" m";

cards[3].innerHTML=
statistics.averageOccupancy+"%";

// -----------------------------
// Fit Bounds
// -----------------------------

const bounds=[];

accommodations.forEach(item=>{

    bounds.push([item.latitude,item.longitude]);

});

bounds.push([campus.latitude,campus.longitude]);

map.fitBounds(bounds,{padding:[40,40]});

// -----------------------------
// Console
// -----------------------------

console.log("Student Housing Explorer Loaded");

console.log(accommodations);
