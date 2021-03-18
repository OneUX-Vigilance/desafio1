import { isActive, setActive, getLocation } from "@/lib/point/point"
export default async (req, res) => {
    if (req.method === "POST") {
        const { password, latitude, longitude } = req.body
        if (password !== process.env.PRESIDENT_PASSWORD) return res.status(401).end()
        setActive(!isActive(), { latitude, longitude })
        res.send(res.json({ active: isActive(), latitude, longitude }))
    } else if (req.method === "GET") {
        res.send(res.json({ active: isActive(), ...getLocation() }))
    }
}
