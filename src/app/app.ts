import { CreateFleet } from '../domain/CQRS/commands/CreateFleet'
import { CreateLocation } from '../domain/CQRS/commands/CreateLocation'
import { CreateVehicle } from '../domain/CQRS/commands/CreateVehicle'
import { DIContainer } from './DIContainer'
import { ErrorLog } from '../domain/agregates/ErrorLog'
import { Fleet } from '../domain/entities/Fleet'
import { FleetIdentity } from '../valueObjects/FleetIdentity'
import { Location } from '../domain/entities/Location'
import { ParkVehicleAtLocation } from '../domain/CQRS/commands/ParkVehicleAtLocation'
import { Vehicle } from '../domain/entities/Vehicle'
import { VehicleIdentity } from '../valueObjects/VehicleIdentity'
import { VehicleType } from '../valueObjects/VehicleType'
import { registerVehicleToFleet } from '../domain/CQRS/commands/RegisterVehicleToFleet'

class ParkingApp {
      private fleets: Array<Fleet>
      private locations: Array<Location>
      private vehicles: Array<Vehicle>
      private errorLog: ErrorLog
      constructor() {
            console.log('Welcome to my parking app')
            this.fleets = []
            this.vehicles = []
            this.locations = []
            this.errorLog = new ErrorLog()
            DIContainer.register('app', this)
      }

      //commands
      //fleet methods
      createFleet = (fleetIdentity: FleetIdentity) => {
            const createFleetHandler = new CreateFleet()
            return createFleetHandler.execute(fleetIdentity) // no need to pass the app explicitly
      }

      //vehicle methods
      createVehicle = (
            vehicleIdentity: VehicleIdentity,
            vehicleType: VehicleType
      ) => {
            const createVehicleHandler = new CreateVehicle()
            return createVehicleHandler.execute(vehicleIdentity, vehicleType)
      }

      registerVehicleToFleet = (vehicle: Vehicle, fleet: Fleet) => {
            const registerVehicleToFleetHandler = new registerVehicleToFleet()
            return registerVehicleToFleetHandler.execute(vehicle, fleet)
      }

      parkVehicleAtLocation = (vehicle: Vehicle, location: Location) => {
            const parkVehicleAtLocationHandler = new ParkVehicleAtLocation()
            return parkVehicleAtLocationHandler.execute(vehicle, location)
      }

      //location methods
      createLocation = (): Location => {
            const createLocationHandler = new CreateLocation()
            return createLocationHandler.execute()
      }

      //queries
      //fleet queries
      getFleets = () => {
            return this.fleets
      }
      getFleet = (fleetName: string): Fleet | undefined => {
            return this.fleets.find(
                  (fleet) => fleet.getFleetName() === fleetName
            )
      }

      //vehicle queries
      getVehicles = () => {
            return this.vehicles
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
      verifyVehicleAtLocation = (
            vehicle: Vehicle,
            location: Location
      ): boolean => {
            if (vehicle.getLocation().getId() === location.getId()) {
                  return true
            }
            return false
      }

      //location queries
      getLocations = () => {
            return this.locations
      }

      //errorlog queries
      getErrorLog = () => {
            return this.errorLog
      }
}

export default ParkingApp
