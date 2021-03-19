import { useRef, useEffect, useState } from "react"
import map from "@/lib/maps/map"
import 'mapbox-gl/dist/mapbox-gl.css'
import axios from "axios"
export default function logged({ user, point }) {
    const mapRef = useRef(null)
    const [need, setNeed] = useState((Date.now() - point.date) / 1000)
    const [duration, setDuration] = useState(0)
    setInterval(() => {
        setNeed(need + 5)
    }, 5000)
    useEffect(async () => {
        const mp = map(user.longitude, user.latitude, mapRef)
        mp.on("load", async () => {
            var geojson = {
                'type': 'FeatureCollection',
                'features': [
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'LineString',
                            'coordinates': [[user.longitude, user.latitude], [point.longitude, point.latitude]]
                        }
                    }
                ]
            };
            mp.addSource('line', {
                'type': 'geojson',
                'data': geojson
            })
            mp.addLayer({
                'id': 'line-animation',
                'type': 'line',
                'source': 'line',
                'layout': {
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                'paint': {
                    'line-color': '#ed6498',
                    'line-width': 5,
                    'line-opacity': 0.8
                }
            })
            mp.addLayer({
                id: 'point',
                type: 'circle',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [{
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'Point',
                                coordinates: [user.longitude, user.latitude]
                            }
                        }
                        ]
                    }
                },
                paint: {
                    'circle-radius': 10,
                    'circle-color': '#3887be'
                }
            })
            mp.addLayer({
                id: 'end',
                type: 'circle',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [{
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'Point',
                                coordinates: [point.longitude, point.latitude]
                            }
                        }]
                    }
                },
                paint: {
                    'circle-radius': 10,
                    'circle-color': '#f30'
                }
            })

            const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${user.longitude},${user.latitude};${point.longitude},${point.latitude}?geometries=geojson&access_token=${process.env.MAPBOX}`
            const { data } = await axios.get(url)
            setDuration(data.routes[0] ? data.routes[0].duration : -1)
        })
        return () => mp.remove()
    }, [])
    return (
        <section className="center" style={{ width: "80vw", textAlign: "center" }}>
            <h1> <span style={{"fontSize": "30px", fontWeight: "600"}}>Ola {user.name}</span> <br/>Voce tem  {parseInt(2 - need / 60 / 60 / 24)} Dia, {parseInt(24 - need / 60 / 60 % 24)} Horas, {parseInt(60 - need / 60 % 60)} Minutos e {parseInt(60 - need % 60)} Segundos</h1>
            <h1>Falta {duration === -1 ? "Muito tempo para voce chegar" : `${parseInt(duration / 60)} Minutos para voce chegar até la`}</h1>
            <div className="map-container" ref={mapRef} style={{ height: "60vh" }}></div>
        </section>
    )
}