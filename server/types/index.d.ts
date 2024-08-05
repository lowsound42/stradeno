type CoordinateObject = {
    id: number,
    latitude: number,
    longitude: number,
    elevation: number,
    ride_id: number,
    time: Date,
    point: string
}

type CoordinateTuple = [number, number]


type PolyLine = {
    color: string,
    latlngs: CoordinateTuple
  }
  
  type CacheRow = {
    id: number,
    key: string,
    value: PolyLine[],
    inserted_at: Date
  }