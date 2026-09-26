import {useState, useEffect} from 'react'
import type { FlightSchema  } from './types'
import flightService from './services/flighService'
import axios from 'axios'

const App = () => {
  const [flights, setFlights] = useState<FlightSchema[]>([])
  const [newFlight, setNewFlight] = useState({
    weather: '',
    visibility: '',
    date: '',
    comment: ''
  })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    flightService.getAll().then(flights => setFlights(flights))
  }, [])

  const addFlight = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    try {
      const response = await flightService.create(newFlight)
      setFlights(flights.concat(response))
      setNewFlight({
        weather: '',
        visibility: '',
        date: '',
        comment: ''
      })
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.error[0])
        setErrorMessage("Incorrect " + error.response?.data.error[0].path[0] + " input. " + error.response?.data.error[0].message)
        setTimeout(() => setErrorMessage(null), 5000)
      } else {
        console.log('Unexpected error', error)
      }
    }
  }

  return (
    <>
      <h1>Flights</h1>
      <div> 
        {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
        <form onSubmit={addFlight}>
          <input value={newFlight.weather} onChange={(e) => setNewFlight({...newFlight, weather: e.target.value})} placeholder='Weather' />
          <input value={newFlight.visibility} onChange={(e) => setNewFlight({...newFlight, visibility: e.target.value})} placeholder='Visibility' />
          <input value={newFlight.date} onChange={(e) => setNewFlight({...newFlight, date: e.target.value})} placeholder='Date' />
          <input value={newFlight.comment} onChange={(e) => setNewFlight({...newFlight, comment: e.target.value})} placeholder='Comment' />
          <button type='submit'>add</button>
        </form>
        <ul>
          {flights.map((flight) =>
            <li key={flight.id}>
              <strong>{flight.date}</strong> - {flight.weather} - {flight.visibility}
            </li>
          )}
        </ul>
      </div>
    </>
  )
}

export default App