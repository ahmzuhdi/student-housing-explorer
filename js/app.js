const map=L.map('map').setView([-2.124,106.113],15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'©OSM'}).addTo(map);
const layer=L.layerGroup().addTo(map);
function draw(list){
 layer.clearLayers();
 document.getElementById('count').textContent=list.length;
 list.forEach(a=>L.marker([a.lat,a.lng]).addTo(layer).bindPopup(`<b>${a.name}</b><br>${a.type}<br>Rp ${a.price.toLocaleString()}`));
}
draw(accommodations);
document.getElementById('search').addEventListener('input',e=>{
 const q=e.target.value.toLowerCase();
 draw(accommodations.filter(a=>a.name.toLowerCase().includes(q)));
});