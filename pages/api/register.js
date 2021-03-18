import client from "@/lib/database/client"
export default async (req, res) => {
  if (req.method === "POST") {
    const { name, latitude, longitude } = req.body
    if (!name) res.status(400).end()
    const userResult = await client.query("SELECT * FROM Users where name ilike $1", [name])
    if (userResult.rows[0]) {
      return res.json(userResult.rows[0])
    }
    try {
      await client.query("INSERT INTO Users (name, latitude, longitude) VALUES ($1, $2, $3)", [name, latitude, longitude])
      res.json({ name, latitude, longitude })
    } catch (_) {
      res.status(400).end()
    }
  }
}
