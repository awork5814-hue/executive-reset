import { NavLink } from "react-router-dom"
import { CircleDot } from "lucide-react"

export default function AppHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      
      {/* Navigation */}
      <nav className="flex gap-6 text-sm font-medium">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/checkin"
          className={({ isActive }) =>
            isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
          }
        >
          Check-In
        </NavLink>

        <NavLink
          to="/practice"
          className={({ isActive }) =>
            isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
          }
        >
          Practice
        </NavLink>
      </nav>

      {/* Breathing Icon */}
      <div className="relative">
        <div
          className="w-9 h-9 rounded-full
                     bg-gradient-to-br from-blue-500 to-cyan-400
                     flex items-center justify-center
                     shadow-md
                     animate-breathe"
        >
          <CircleDot size={18} className="text-white" />
        </div>
      </div>
    </header>
  )
}
