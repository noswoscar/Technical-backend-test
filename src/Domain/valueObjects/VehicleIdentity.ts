export class VehicleIdentity {
      private vehicleBrand: string
      private vehicleNumberPlate: string
      constructor(vehicleNumberPlate: string) {
            this.vehicleNumberPlate = vehicleNumberPlate
            this.vehicleBrand = 'Os cars'
      }

      getVehicleNumberPlate = () => {
            return this.vehicleNumberPlate
      }
}
