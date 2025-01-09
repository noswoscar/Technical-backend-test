import { Coordinates } from '../valueObjects/Coordinates'

export class VehicleLocation {
      private coordinates: Coordinates

      constructor(latitude: string, longitude: string, altitude: string | 0) {
            this.coordinates = {
                  latitude: latitude,
                  longitude: longitude,
                  altitude: altitude,
            }
      }

      getCoordinates = () => {
            return this.coordinates
      }
}
