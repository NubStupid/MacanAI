import { useState } from 'react'
import Arena from './components/Arena'
import PlayButton from './components/PlayButton'
import Menu from './components/Menu'

function App() {
  const [router, setRouter] = useState("Menu")

  return (
    <>
      {router == "Menu" &&
        <>
          <Menu />
        </>
      }
      {router == "Play" &&
        <>
          <div id="messageContainer" className="fixed bottom-0 w-[100vw] py-10">
              <div className="flex justify-center">
                  <div className="bg-blue-300 p-5 rounded-lg" id="messageText">

                  </div>
              </div>
          </div>
          <div id="arena" className="fixed top-52 left-96 ">
            <Arena />
            <PlayButton />
          </div>
        </>
      }
    </>
  )
}

export default App
