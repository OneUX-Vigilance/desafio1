import { Input } from 'react-bulma-components/src/components/form'
import Button from 'react-bulma-components/src/components/button'
import { useState, useEffect, useRef } from "react"
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp'
import map from "@/lib/maps/map"
import 'mapbox-gl/dist/mapbox-gl.css'
import axios from "axios"

export default function createPoint() {
  const [password, setPassword] = useState("")
  const mapRef = useRef(null)
  const [marker, setMarker] = useState(null)
  useEffect(() => {
    const mp = map(0, 0, mapRef)
    mp.on("click", (e) => {
      if(marker) marker.remove()
      setMarker(new mapboxgl.Marker()
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .addTo(mp))
    })
    return () => mp.remove();
  }, [])
  const startPoint = () => {
    if (marker)
      axios.post("/api/point", {
        password,
        longitude: marker.getLngLat().lng,
        latitude: marker.getLngLat().lat
      }).then(console.log)
  }
  return (
    <section className="center" style={{ width: "80vw", textAlign: "center" }}>
      <Input onChange={(e) => setPassword(e.target.value)} value={password} style={{ width: "80%", marginBottom: "10px", height: "50px", textAlign: "center" }} color="primary" placeholder="Senha presidencial" />
      <Button onClick={startPoint} color="primary" style={{ width: "80%", height: "50px", marginBottom: "10px" }}>Ativar ponto de encontro</Button>
      <div className="map-container" ref={mapRef} style={{ height: "60vh" }}></div>
    </section>
  )
}