import { ErrorLog } from '../domain/agregates/ErrorLog'
import { Fleet } from '../domain/entities/Fleet'
import { FleetIdentity } from '../valueObjects/FleetIdentity'
import { Location } from '../domain/entities/Location'
import { ProgramError } from '../domain/entities/ProgramError'
import { RegistryRequest } from '../domain/agregates/RegistryRequest'
import { Vehicle } from '../domain/entities/Vehicle'
import { VehicleIdentity } from '../valueObjects/VehicleIdentity'

class ParkingApp {
      private fleets: Array<Fleet>
      private locations: Array<Location>
      private vehicles: Array<Vehicle>
      private errorLog: ErrorLog
      //   private fleets: Array<Fleet> = []
      constructor() {
            console.log('Welcome to my parking app')
            this.fleets = []
            this.vehicles = []
            this.locations = []
            this.errorLog = new ErrorLog()
            // this.createVehicle()
            // let vehicles: Array<Vehicle> = []
            // let flettIdentity: FleetIdentity = {
            //       name: 'Oscars',
            //       owner: 'oscar',
            // }
            // let fleet = new Fleet(flettIdentity, vehicles)
            // console.log('I have a fleet :', fleet)
      }

      createFleet = (fleetIdentity: FleetIdentity) => {
            let fleet = new Fleet(fleetIdentity, [])
            if (
                  !this.fleets.find(
                        (fleetItem) =>
                              fleetItem.getFleetId() === fleet.getFleetId()
                  )
            ) {
                  this.fleets.push(fleet)
            }
            return fleet
      }
      getFleets = () => {
            return this.fleets
      }
      getFleet = (fleetName: string) => {
            return this.fleets.find(
                  (fleet) => fleet.getFleetName() === fleetName
            )
      }

      createVehicle = (vehicleIdentity: VehicleIdentity) => {
            let location = new Location()
            let vehicle = new Vehicle(vehicleIdentity, location)
            this.vehicles.push(vehicle)
            return vehicle
      }

      registerVehicleToFleet = (vehicle: Vehicle, fleet: Fleet) => {
            let registryRequest: RegistryRequest = new RegistryRequest(
                  vehicle,
                  fleet,
                  this.errorLog
            )
            try {
                  registryRequest.registerVehicleToFleet()
            } catch (error: any) {
                  let myerror = new ProgramError('RegistryError', error.message)
                  this.errorLog.setError(myerror)
                  this.errorLog.logError(myerror)
            } finally {
                  return
            }
      }

      verifyVehicleInFleet = (vehicle: Vehicle, fleet: Fleet) => {
            if (
                  fleet
                        .getVehicles()
                        .find(
                              (vehicleItem) =>
                                    vehicleItem.getVehicleId() ===
                                    vehicle.getVehicleId()
                        )
            ) {
                  return true
            }
            return false
      }

      createLocation = (): Location => {
            let location = new Location()
            this.locations.push(location)
            return location
      }

      getErrorLog = () => {
            return this.errorLog
      }
}

const app = new ParkingApp()

export default app
