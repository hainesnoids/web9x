let map,
    marker;
const coords = [37.6486,-122.4296];
function initMap() {
    map = L.map('map-canvas', {
        zoomControl: false
    }).setView(coords, Number(location.hash.replace('#','')));

    const baseMarkerOptions = {
        'icon': L.icon({
            iconUrl: 'marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [0, -32],
        }),
        'keyboard': true,
        'title': 'Marker',
        'alt': 'Marker'
    }

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    marker = L.marker([37.6486,-122.4296], baseMarkerOptions).addTo(map)
        .bindPopup('<b>Title</b><br>Subtitle')

    map.invalidateSize();

    window.addEventListener('resize', () => {
        map.invalidateSize();
    });
}
document.addEventListener('DOMContentLoaded', initMap)

window.addEventListener('hashchange', (e) => {
    map.setView(coords, Number(location.hash.replace('#','')));
    if (Number(location.hash.replace('#','')) >= 19) {
        // show popup
        marker.openPopup();
    }
})

function setZoom(zoom) {
    map.setView(coords, Number(zoom));
    if (Number(location.hash.replace('#','')) >= 19) {
        // show popup
        marker.openPopup();
    }
}
document.setZoom = setZoom