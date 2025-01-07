import { VehiclePlateNumber } from './VehiclePlateNumber'
import { VehicleType } from './VehicleType'

export class VehicleIdentity {
      private id: number
      private vehicleBrand: string
      private vehiclePlateNumber: string
      private vehicleType: VehicleType

      constructor() {
            this.id = 0
            this.vehiclePlateNumber = this.generatePlateNumber()
            this.vehicleBrand = 'Os cars'
            this.vehicleType = VehicleType.Car
      }

      private generatePlateNumber = () => {
            const vehiclePlateNumber = new VehiclePlateNumber()
            return vehiclePlateNumber.generateNumberPlate()
      }

      getVehicleId = () => {
            return this.id
      }

      getVehiclePlateNumber = () => {
            return this.vehiclePlateNumber
      }

      getVehicleBrand = () => {
            return this.vehicleBrand
      }

      getVehicleType = () => {
            return this.vehicleType
      }
}
