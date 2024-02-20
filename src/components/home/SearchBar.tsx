import { Input } from "@/components/ui/input"

export function SearchBar() {
  const searchParam = ""
  const handleChange = (e: any) => {

  }
    return (
      <Input placeholder="Filter for an event" className="w-96" onChange={handleChange}/>
    )
}