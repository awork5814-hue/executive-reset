import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import CheckIn from "./pages/CheckIn"
import Practice from "./pages/Practice"
import BalancePage from "./BalancePage.tsx"
import AppHeader from "./components/AppHeader"

export default function App() {
  return (
    <BrowserRouter>
      {/* Top navigation */}
      <AppHeader />

      {/* Page content */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkin" element={<CheckIn />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/balance" element={<BalancePage />} />
      </Routes>
    </BrowserRouter>
  )
}
