import { useState } from 'react'
import Menu from './components/Menu'
import Play from './components/Play'

function App() {
  const [routes, setRoutes] = useState("Menu")

  return (
    <>
      {routes == "Menu" && <Menu setRoutes={setRoutes} />}
      {routes == "Play" && <Play />}
    </>
  )
}

export default App
