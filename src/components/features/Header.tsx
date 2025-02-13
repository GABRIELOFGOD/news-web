"use client"

import Link from "next/link"
import Input from "../common/inputs/Input"
import { useState } from "react"

const Header = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  
  return (
    <div className="flex justify-between py-3 px-3 text-black shadow-sm">
      <Link href="/">
        <p className="font-bold text-2xl">Logo</p>
      </Link>
      <div className="flex gap-3 my-auto">
        <Input
          value={searchValue}
          onChange={() => setSearchValue(searchValue)}
          type="text"
          placeholder="Search ..."
          className="rounded-full h-8 my-auto"
        />
      </div>
    </div>
  )
}
export default Header