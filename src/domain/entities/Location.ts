import { Coordinates } from '../../valueObjects/Coordinates'
import { Vehicle } from './Vehicle'

export class Location {
      private id: string
      private coordinates: Coordinates
      private free: boolean
      private parkedVehicle: Vehicle | undefined
      constructor() {
            this.id =
                  new Date().getTime().toString(36) +
                  Math.random().toString(36).slice(2)
            this.coordinates = {
                  latitude: Math.random() * (60 - 0) + 0,
                  longitude: Math.random() * (60 - 0) + 0,
            }
            this.free = true
            this.parkedVehicle = undefined
      }

      setParkedVehicle = (vehicle: Vehicle) => {
            this.parkedVehicle = vehicle
      }

      getId = () => {
            return this.id
      }

      isFree = () => {
            return this.free
      }
}
