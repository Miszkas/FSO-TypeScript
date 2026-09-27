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

  const weatherOptions = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy']
  const visibilityOptions = ['great', 'good', 'ok', 'poor']

  return (
    <>
      <h1>Flights</h1>
      <div> 
        {errorMessage && <div style={{color: 'red', marginBottom: '5px'}}>{errorMessage}</div>}
        <form onSubmit={addFlight}>
          <div>
            <label>Date: {'  '}
              <input type='date' value={newFlight.date} onChange={(e) => setNewFlight({...newFlight, date: e.target.value})} />
            </label>
          </div>
          <div>
            <span>Weather: </span>
            {weatherOptions.map((option) => (
              <label key={option} style={{marginLeft: '15px'}}>{option.charAt(0).toUpperCase() + option.slice(1)}
                <input type='radio' value={option} name='weather' checked={newFlight.weather === option} onChange={(e) => setNewFlight({...newFlight, weather: e.target.value})}/>
              </label>
            ))}
          </div>
          <div>
            <span>Visibility: </span>
            {visibilityOptions.map((option) => (
              <label key={option} style={{marginLeft: '15px'}}>{option.charAt(0).toUpperCase() + option.slice(1)}
                <input type='radio' value={option} name='visibility' checked={newFlight.visibility === option} onChange={(e) => setNewFlight({...newFlight, visibility: e.target.value})}/>
              </label>
            ))}
          </div>
          <div>
            <label>Comment: {'  '} 
              <input value={newFlight.comment} onChange={(e) => setNewFlight({...newFlight, comment: e.target.value})} placeholder='Comment' />
            </label>
          </div>
          <button type='submit'>add</button>
        </form>
        <h3>Flights</h3>
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