import { Outlet } from "react-router-dom"
import BottomNav from "./AppHeader"

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#0B1220] text-gray-200">
      <main className="pb-20">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  )
}
