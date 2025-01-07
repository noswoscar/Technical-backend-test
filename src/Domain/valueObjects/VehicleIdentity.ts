import { VehiclePlateNumber } from './VehiclePlateNumber'
import { VehicleType } from './VehicleType'

export class VehicleIdentity {
      private vehicleBrand: string
      private vehiclePlateNumber: string
      private vehicleType: VehicleType

      constructor() {
            this.vehiclePlateNumber = this.generatePlateNumber()
            this.vehicleBrand = 'Os cars'
            this.vehicleType = VehicleType.Car
      }

      private generatePlateNumber = () => {
            const vehiclePlateNumber = new VehiclePlateNumber()
            return vehiclePlateNumber.generateNumberPlate()
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
