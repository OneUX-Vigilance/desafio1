import { Input } from 'react-bulma-components/src/components/form'
import Button from 'react-bulma-components/src/components/button'
import { useState } from "react"
import Logged from "./logged"
import 'mapbox-gl/dist/mapbox-gl.css'
import axios from "axios"
export default function Point({point}) {
    const [name, setName] = useState("")
    const [isRegister, setRegister] = useState(true)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || {}))
    const callback = ({data}) => {
        localStorage.setItem("user", JSON.stringify(data))
        setUser(data)
    }
    const login = () => {
        if (isRegister){
            navigator.geolocation.getCurrentPosition((pos) => {
                const {latitude, longitude} = pos.coords
                axios.post("/api/register", {name, latitude,longitude}).then(callback)
            })
        }else{
            axios.post("/api/register", {name}).then(callback)
        }
    }
    if (user.name) {
        const update = () => navigator.geolocation.getCurrentPosition((pos) => {
            const {latitude, longitude} = pos.coords
            axios.post("/api/update", {name: user.name, latitude,longitude})
        })
        update()
        setInterval(update, 10000)
        return <Logged user={user} point={point}/>
    }
    else {
        return (
            <section className="center" style={{ width: "80vw", textAlign: "center" }}>
                <Input onChange={(e) => setName(e.target.value)} value={name} style={{ width: "80%", marginBottom: "10px", height: "50px", textAlign: "center" }} color="primary" placeholder="Nome" />
                <Button onClick={login} color="primary" style={{ width: "80%", height: "50px", marginBottom: "10px" }}>{isRegister ? "Cadastrar" : "Logar"}</Button>
                <p onClick={() => setRegister(false)} style={{cursor: "pointer"}}>Ja tem uma conta? clique aqui para fazer login</p>
            </section>
        )
    }
}