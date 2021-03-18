import pointActive from "./pointActive.json"
import { writeFileSync } from "fs"

export const getLocation = () => pointActive.point
export const isActive = () => pointActive.isActive
export const setActive = (active, { latitude, longitude }) => {
    pointActive.isActive = Boolean(active)
    if (pointActive.isActive) {
        pointActive.point = {
            latitude, longitude,
            date: Date.now()
        }
    }
    writeFileSync(`./lib/point/pointActive.json`, JSON.stringify(pointActive))
}