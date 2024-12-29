import { Coordinates } from '../../valueObjects/Coordinates'
import { Vehicle } from './Vehicle'

export class Location {
      private uniqueId: number
      private coordinates: Coordinates
      private free: boolean
      private parkedVehicle: boolean
      constructor() {
            this.uniqueId = 1
            this.coordinates = { latitude: 12, longitude: 44 }
            this.free = true
            this.parkedVehicle = false
      }
}
