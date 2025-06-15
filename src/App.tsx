import './App.css'
import { Home } from '@/components/ui/pages/Home'
import { NavigationMenu } from './components/ui/molecules/NavigationMenu'
import { BrowserRouter, Route, Routes } from 'react-router'
import { MyAcount } from './components/ui/pages/MyAccount'
import { NetworkSupport } from './components/ui/pages/NetworkSupport'


function App() {
  return (
    <BrowserRouter>
      <NavigationMenu></NavigationMenu>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mon-compte" element={<MyAcount />} />
          <Route path="/support-reseau" element={<NetworkSupport />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
