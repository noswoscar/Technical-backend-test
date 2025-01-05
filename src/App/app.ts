import { CreateFleet } from './CQRS/commands/CreateFleet'
import { CreateLocation } from './CQRS/commands/CreateLocation'
import { CreateVehicle } from './CQRS/commands/CreateVehicle'
import { DIContainer } from './DIContainer'
import { DatabaseConnector } from '../Infra/DatabaseConnector'
import { ErrorLog } from '../Domain/agregates/ErrorLog'
import { Fleet } from '../Domain/entities/Fleet'
import { FleetIdentity } from '../Domain/valueObjects/FleetIdentity'
import { ParkVehicleAtLocation } from './CQRS/commands/ParkVehicleAtLocation'
import { Vehicle } from '../Domain/entities/Vehicle'
import { VehicleIdentity } from '../Domain/valueObjects/VehicleIdentity'
import { VehicleLocation } from '../Domain/entities/VehicleLocation'
import { VehicleType } from '../Domain/valueObjects/VehicleType'
import { VerifyVehicleAtLocation } from './CQRS/queries/VerifyVehicleAtLocation'
import { VerifyVehicleInFleet } from './CQRS/queries/VerifyVehicleInFleet'
import { registerVehicleToFleet } from './CQRS/commands/RegisterVehicleToFleet'

class ParkingApp {
      private fleets: Array<Fleet>
      private locations: Array<VehicleLocation>
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

      //Init App methods
      init = async (): Promise<void> => {
            let connector = new DatabaseConnector()
            DIContainer.register('dbConnector', connector)
            let promise = await connector.connect()
            return promise
      }

      close = async () => {
            const connector: DatabaseConnector =
                  DIContainer.resolve<DatabaseConnector>('dbConnector')
            connector.disconnect()
      }

      //fleet methods
      createFleet = async (
            fleetIdentity: FleetIdentity
      ): Promise<string | undefined> => {
            const createFleetHandler = new CreateFleet()
            return await createFleetHandler.execute(fleetIdentity)
      }

      getFleets = () => {
            return this.fleets
      }
      getFleet = (fleetId: string): Fleet | undefined => {
            return this.fleets.find((fleet) => fleet.getFleetId() === fleetId)
      }

      //vehicle methods
      createVehicle = async (
            vehicleIdentity: VehicleIdentity,
            vehicleType: VehicleType
      ): Promise<number | undefined> => {
            const createVehicleHandler = new CreateVehicle()
            return await createVehicleHandler.execute(
                  vehicleIdentity,
                  vehicleType
            )
      }

      registerVehicleToFleet = async (
            vehicleId: number,
            fleetId: string
      ): Promise<boolean> => {
            const registerVehicleToFleetHandler = new registerVehicleToFleet()
            const res = await registerVehicleToFleetHandler.execute(
                  vehicleId,
                  fleetId,
                  this.errorLog
            )
            return res
      }

      parkVehicleAtLocation = (vehicleId: number, locationId: string) => {
            const parkVehicleAtLocationHandler = new ParkVehicleAtLocation()
            return parkVehicleAtLocationHandler.execute(vehicleId, locationId)
      }

      getVehicles = () => {
            return this.vehicles
      }
      verifyVehicleInFleet = async (
            vehicleId: number,
            fleetId: string
      ): Promise<boolean> => {
            const verifyVehicleInFleetHandler = new VerifyVehicleInFleet()
            const result = await verifyVehicleInFleetHandler.execute(
                  vehicleId,
                  fleetId
            )
            return result
      }

      verifyVehicleAtLocation = (
            vehicle: Vehicle,
            location: VehicleLocation
      ): boolean => {
            const verifyVehicleAtLocationHandler = new VerifyVehicleAtLocation()
            return verifyVehicleAtLocationHandler.execute(vehicle, location)
      }

      //location methods
      createLocation = (
            latitude: string,
            longitude: string,
            altitude: string | 0
      ): Promise<string | undefined> => {
            const createLocationHandler = new CreateLocation()
            return createLocationHandler.execute(latitude, longitude, altitude)
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
