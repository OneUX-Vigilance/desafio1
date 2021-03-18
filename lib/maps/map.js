import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp'
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'
mapboxgl.workerClass = MapboxWorker
mapboxgl.accessToken = process.env.MAPBOX

export default function map(lng, lat, ref) {
    const map = new mapboxgl.Map({
        displayControlsDefault: false,
        controls: {
            polygon: true,
            trash: true
        },
        container: ref.current,
        style: 'mapbox://styles/mapbox/streets-v10',
        center: [lng, lat],
        zoom: 2
    })
    return map
}