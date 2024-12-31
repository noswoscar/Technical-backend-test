import { Coordinates } from '../valueObjects/Coordinates'
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
                  latitude: Math.floor(Math.random() * (90 - (-90 + 1))) - 90,
                  longitude:
                        Math.floor(Math.random() * (180 - (-180 + 1))) - 180,
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
