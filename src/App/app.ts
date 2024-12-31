import { CreateFleet } from './CQRS/commands/CreateFleet'
import { CreateLocation } from './CQRS/commands/CreateLocation'
import { CreateVehicle } from './CQRS/commands/CreateVehicle'
import { DIContainer } from './DIContainer'
import { ErrorLog } from '../Domain/agregates/ErrorLog'
import { Fleet } from '../Domain/entities/Fleet'
import { FleetIdentity } from '../Domain/valueObjects/FleetIdentity'
import { Location } from '../Domain/entities/Location'
import { ParkVehicleAtLocation } from './CQRS/commands/ParkVehicleAtLocation'
import { Vehicle } from '../Domain/entities/Vehicle'
import { VehicleIdentity } from '../Domain/valueObjects/VehicleIdentity'
import { VehicleType } from '../Domain/valueObjects/VehicleType'
import { VerifyVehicleAtLocation } from './CQRS/queries/VerifyVehicleAtLocation'
import { VerifyVehicleInFleet } from './CQRS/queries/VerifyVehicleInFleet'
import { registerVehicleToFleet } from './CQRS/commands/RegisterVehicleToFleet'

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

      getFleets = () => {
            return this.fleets
      }
      getFleet = (fleetName: string): Fleet | undefined => {
            return this.fleets.find(
                  (fleet) => fleet.getFleetName() === fleetName
            )
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

      getVehicles = () => {
            return this.vehicles
      }
      verifyVehicleInFleet = (vehicle: Vehicle, fleet: Fleet) => {
            const verifyVehicleInFleetHandler = new VerifyVehicleInFleet()
            return verifyVehicleInFleetHandler.execute(vehicle, fleet)
      }

      verifyVehicleAtLocation = (
            vehicle: Vehicle,
            location: Location
      ): boolean => {
            const verifyVehicleAtLocationHandler = new VerifyVehicleAtLocation()
            return verifyVehicleAtLocationHandler.execute(vehicle, location)
      }

      //location methods
      createLocation = (): Location => {
            const createLocationHandler = new CreateLocation()
            return createLocationHandler.execute()
      }

      getLocations = () => {
            return this.locations
      }

      //errorlog methods
      getErrorLog = () => {
            return this.errorLog
      }
}

export default ParkingApp
