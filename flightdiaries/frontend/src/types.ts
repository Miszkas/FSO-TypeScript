export interface FlightSchema {
    id: number
    weather: string,
    visibility: string,
    date: string,
}

export type NewFlight = Omit<FlightSchema, 'id'>

