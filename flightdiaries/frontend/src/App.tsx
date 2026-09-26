import {useState, useEffect} from 'react'
import type { FlightSchema  } from './types'
import flightService from './services/flighService'

const App = () => {
  const [flights, setFlights] = useState<FlightSchema[]>([])
  const [newFlight, setNewFlight] = useState({
    weather: '',
    visibility: '',
    date: '',
    comment: ''
  })

  useEffect(() => {
    flightService.getAll().then(flights => setFlights(flights))
  }, [])

  const addFlight = (event: React.SyntheticEvent) => {
    event.preventDefault()
    flightService.create(newFlight).then(returnedFlight => {
      setFlights(flights.concat(returnedFlight))
      
    })
    setNewFlight({
        weather: '',
        visibility: '',
        date: '',
        comment: ''
      })
  }

  return (
    <>
      <h1>Flights</h1>
      <div> 
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