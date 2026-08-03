/* ==========================================================
   Student Housing Explorer
   Version 2.0
   GeoJSON Edition
==========================================================*/

// ----------------------------------------------------
// Create Map
// ----------------------------------------------------

const map = L.map("map").setView([-2.124, 106.114], 15);

// ----------------------------------------------------
// Basemap
// ----------------------------------------------------

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap"
    }
).addTo(map);

// ----------------------------------------------------
// Layers
// ----------------------------------------------------

const accommodationLayer = L.layerGroup().addTo(map);

// ----------------------------------------------------
// Global Variables
// ----------------------------------------------------

let geojsonData = [];
let currentMarkers = [];

// ----------------------------------------------------
// Load GeoJSON
// ----------------------------------------------------

fetch("data/accommodation.geojson")

.then(response => {

    if(!response.ok){

        throw new Error("Cannot load GeoJSON");

    }

    return response.json();

})

.then(data=>{

    geojsonData=data.features;

    buildStatistics();

    buildTypeFilter();

    drawFeatures(geojsonData);

})

.catch(error=>{

    console.error(error);

    alert("GeoJSON could not be loaded.");

});

// ----------------------------------------------------
// Draw Features
// ----------------------------------------------------

function drawFeatures(features){

    accommodationLayer.clearLayers();

    currentMarkers=[];

    const bounds=[];

    features.forEach(feature=>{

        const p=feature.properties;

        const coord=feature.geometry.coordinates;

        const lat=coord[1];

        const lng=coord[0];

        const marker=L.marker([lat,lng]);

        marker.bindPopup(createPopup(p));

        marker.addTo(accommodationLayer);

        currentMarkers.push(marker);

        bounds.push([lat,lng]);

    });

    if(bounds.length>0){

        map.fitBounds(bounds,{padding:[40,40]});

    }

}

// ----------------------------------------------------
// Popup
// ----------------------------------------------------

function createPopup(p){

    return `

<div style="min-width:220px">

<h5 class="popup-title">${p.NAME ?? "-"}</h5>

<hr>

<b>Type</b><br>

${p.Jenis ?? "-"}

<br><br>

<b>Estimated Rent</b><br>

Rp ${Number(p.Estimasi_T || 0).toLocaleString()}

<br><br>

<b>Category</b><br>

${p.Berdasarka ?? "-"}

<br><br>

<b>Phone</b><br>

${p.phoneNumbe ?? "-"}

</div>

`;

}

// ----------------------------------------------------
// Statistics
// ----------------------------------------------------

function buildStatistics(){

    document.getElementById("totalAccommodation").innerHTML=

        geojsonData.length;

    let totalPrice=0;

    const typeSet=new Set();

    geojsonData.forEach(f=>{

        const p=f.properties;

        totalPrice+=Number(p.Estimasi_T || 0);

        typeSet.add(p.Jenis);

    });

    const avg=Math.round(totalPrice/geojsonData.length);

    document.getElementById("averageRent").innerHTML=

        "Rp "+avg.toLocaleString();

    document.getElementById("averagePrice").innerHTML=

        avg.toLocaleString();

    document.getElementById("totalTypes").innerHTML=

        typeSet.size;

}

// ----------------------------------------------------
// Search
// ----------------------------------------------------

const search=document.getElementById("search");

const searchSidebar=document.getElementById("searchSidebar");

search.addEventListener("keyup",searchData);

searchSidebar.addEventListener("keyup",searchData);

function searchData(e){

    const keyword=e.target.value.toLowerCase();

    const filtered=geojsonData.filter(f=>{

        return(

            String(f.properties.NAME)

            .toLowerCase()

            .includes(keyword)

        );

    });

    drawFeatures(filtered);

}

// ----------------------------------------------------
// Type Filter
// ----------------------------------------------------

function buildTypeFilter(){

    const container=

    document.getElementById("typeContainer");

    const types=[

        ...new Set(

            geojsonData.map(

                x=>x.properties.Jenis

            )

        )

    ];

    types.sort();

    types.forEach(type=>{

        const id=

        "type_"+

        type.replace(/\s/g,"_");

        container.innerHTML+=`

<label>

<input

type="checkbox"

checked

value="${type}"

id="${id}"

onchange="filterType()">

${type}

</label>

`;

    });

}

// ----------------------------------------------------
// Filter
// ----------------------------------------------------

function filterType(){

    const checked=[

        ...document.querySelectorAll(

        "#typeContainer input:checked"

        )

    ].map(

        x=>x.value

    );

    const filtered=geojsonData.filter(f=>

        checked.includes(

            f.properties.Jenis

        )

    );

    drawFeatures(filtered);

}

console.log("Student Housing Explorer Loaded");
