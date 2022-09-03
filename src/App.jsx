import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import WeatherBox from "./Components/WeatherBox"
import { FadeLoader } from 'react-spinners'
function App() {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    document.body.style.background = "#fff"
    setTimeout(() => {
      setLoading(false)
      document.body.style.background = "url(https://images.unsplash.com/23/pink-sky.JPG?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80)"
      document.body.style.backgroundRepeat = "no-repeat"
      document.body.style.backgroundPosition = "center"
      document.body.style.backgroundSize = "cover"
    }, 2100);
  }, [])
  return (
    <div className="App">
      <WeatherBox />
    </div>
  )
}

export default App
