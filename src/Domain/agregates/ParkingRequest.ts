import { Vehicle } from '../entities/Vehicle'
import { VehicleLocation } from '../entities/VehicleLocation'

export class ParkingRequest {
      private vehicle: Vehicle
      private location: VehicleLocation
      constructor(vehicle: Vehicle, location: VehicleLocation) {
            this.vehicle = vehicle
            this.location = location
      }

      parkVehicle = () => {
            if (this.vehicle.getLocation() === this.location) {
                  //replae with thourough verify {
                  let errorMessage =
                        'the vehicle number ' +
                        this.vehicle.getVehicleNumberPlate() +
                        ' is already parked at the location (' +
                        this.location.getCoordinates().latitude +
                        ' , ' +
                        this.location.getCoordinates().longitude +
                        ' , ' +
                        this.location.getCoordinates().altitude +
                        ')'

                  throw new Error(errorMessage)
            }
            // this.location.setParkedVehicle(this.vehicle)
            this.vehicle.setLocation(this.location)
      }
}
