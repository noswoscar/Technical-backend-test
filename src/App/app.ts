import { CreateFleet } from './CQRS/commands/CreateFleet'
import { CreateLocation } from './CQRS/commands/CreateLocation'
import { CreateVehicle } from './CQRS/commands/CreateVehicle'
import { DIContainer } from './DIContainer'
import { DatabaseConnector } from '../Infra/DatabaseConnector'
import { ErrorLog } from '../Domain/agregates/ErrorLog'
import { Fleet } from '../Domain/entities/Fleet'
import { FleetIdentity } from '../Domain/valueObjects/FleetIdentity'
import { ParkVehicleAtLocation } from './CQRS/commands/ParkVehicleAtLocation'
import { QueryResult } from 'pg'
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

      //commands
      //fleet methods
      createFleet = async (fleetIdentity: FleetIdentity): Promise<Fleet> => {
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
      ): Promise<Vehicle> => {
            const createVehicleHandler = new CreateVehicle()
            return await createVehicleHandler.execute(
                  vehicleIdentity,
                  vehicleType
            )
      }

      registerVehicleToFleet = (
            vehicle: Vehicle,
            fleet: Fleet
      ): Promise<QueryResult | undefined> => {
            const registerVehicleToFleetHandler = new registerVehicleToFleet()
            return registerVehicleToFleetHandler.execute(vehicle, fleet)
      }

      parkVehicleAtLocation = (vehicle: Vehicle, location: VehicleLocation) => {
            const parkVehicleAtLocationHandler = new ParkVehicleAtLocation()
            return parkVehicleAtLocationHandler.execute(vehicle, location)
      }

      getVehicles = () => {
            return this.vehicles
      }
      verifyVehicleInFleet = async (
            vehicle: Vehicle,
            fleet: Fleet
      ): Promise<QueryResult | undefined> => {
            const verifyVehicleInFleetHandler = new VerifyVehicleInFleet()
            const result = verifyVehicleInFleetHandler.execute(vehicle, fleet)
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
      ): VehicleLocation => {
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
