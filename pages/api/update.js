import client from "@/lib/database/client"
export default async (req, res) => {
  if (req.method === "POST") {
    const { name, latitude, longitude } = req.body
    if (!name) res.status(400).end()
    await client.query("UPDATE Users SET latitude=$2, longitude = $3 where name ilike $1", [name, latitude,longitude])
    res.status(200).end()
  }
}
