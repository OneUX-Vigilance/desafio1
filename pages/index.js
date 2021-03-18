import CreatePoint from "@/lib/components/createPoint"
import Point from "@/lib/components/point"
import useSWR from "swr"
import axios from "axios"
export default function Home() {
  const { data } = useSWR(`/api/point`, (...args) => axios.get(...args).then(res => res.data), {
    refreshInterval: 1000 * 5
  })
  if (!data) return <h1>Loading...</h1>
  if (data.active) return <Point point={data}/> 
  else return <CreatePoint/>

}
