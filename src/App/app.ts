import { CreateFleet } from './CQRS/commands/CreateFleet'
import { CreateLocation } from './CQRS/commands/CreateLocation'
import { CreateVehicle } from './CQRS/commands/CreateVehicle'
import { DIContainer } from './DIContainer'
import { DatabaseConnector } from '../Infra/DatabaseConnector'
import { ErrorLog } from '../Domain/services/ErrorLog'
import { Fleet } from '../Domain/agregates/Fleet'
import { FleetIdentity } from '../Domain/valueObjects/FleetIdentity'
import { ParkVehicleAtLocation } from './CQRS/commands/ParkVehicleAtLocation'
import { Vehicle } from '../Domain/entities/Vehicle'
import { VehicleIdentity } from '../Domain/valueObjects/VehicleIdentity'
import { VehicleLocation } from '../Domain/entities/VehicleLocation'
import { VerifyVehicleAtLocation } from './CQRS/queries/VerifyVehicleAtLocation'
import { VerifyVehicleInFleet } from './CQRS/queries/VerifyVehicleInFleet'
import { registerVehicleToFleet } from './CQRS/commands/RegisterVehicleToFleet'

class ParkingApp {
      private vehicleIds: Array<number>
      private fleets: Array<Fleet>
      private locations: Array<VehicleLocation>
      private errorLog: ErrorLog

      constructor() {
            console.log('Welcome to my parking app')
            this.vehicleIds = []
            this.fleets = []
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
      createMyFleet = async (): Promise<string | undefined> => {
            let fleetIdentity: FleetIdentity = new FleetIdentity('Oscar')
            const createFleetHandler = new CreateFleet()

            const fleet = new Fleet(fleetIdentity, [])
            let fleetId = await createFleetHandler.execute(fleet)
            if (fleetId) {
                  this.fleets.push(fleet)
                  return fleetId
            }
            return undefined
      }

      createOtherFleet = async (): Promise<string | undefined> => {
            let fleetIdentity: FleetIdentity = new FleetIdentity('Hector')
            const createFleetHandler = new CreateFleet()

            const fleet = new Fleet(fleetIdentity, [])
            let fleetId = await createFleetHandler.execute(fleet)
            if (fleetId) {
                  this.fleets.push(fleet)
                  return fleetId
            }
            return undefined
      }

      createFleet = async (fleetIdentity: FleetIdentity) => {
            const createFleetHandler = new CreateFleet()

            const fleet = new Fleet(fleetIdentity, [])
            let fleetId = await createFleetHandler.execute(fleet)
            if (fleetId) {
                  this.fleets.push(fleet)
                  return fleetId
            }
            return undefined
      }

      getFleets = (): Array<Fleet> => {
            return this.fleets
      }

      getFleet = (fleetId: string): Fleet | undefined => {
            return this.fleets.find(
                  (appFleet) => appFleet.getIdentity().getId() === fleetId
            )
      }

      //vehicle methods
      createVehicle = async (): Promise<number | undefined> => {
            const vehicleIdentity: VehicleIdentity = new VehicleIdentity()
            const createVehicleHandler = new CreateVehicle()
            const createLocationHandler = new CreateLocation()
            const createdLocationId = await createLocationHandler.execute(
                  '0',
                  '0',
                  '300'
            )
            if (!createdLocationId) {
                  return undefined
            }
            const vehicle = new Vehicle(vehicleIdentity, createdLocationId)
            const vehicleId: number | undefined =
                  await createVehicleHandler.execute(vehicle)
            if (vehicleId) {
                  this.vehicleIds.push(vehicleId)
                  return vehicleId
            }
            return undefined
      }

      registerVehicleToFleet = async (
            vehicleId: number,
            fleetId: string
      ): Promise<boolean> => {
            const fleet = this.getFleet(fleetId)
            if (!fleet) {
                  return false
            }
            const registerVehicleToFleetHandler = new registerVehicleToFleet()

            const res = await registerVehicleToFleetHandler.execute(
                  vehicleId,
                  fleet,
                  this.errorLog
            )
            return res
      }

      parkVehicleAtLocation = (vehicleId: number, locationId: string) => {
            const parkVehicleAtLocationHandler = new ParkVehicleAtLocation()
            return parkVehicleAtLocationHandler.execute(
                  vehicleId,
                  locationId,
                  this.errorLog
            )
      }

      verifyVehicleInFleet = async (
            vehicleId: number,
            fleetId: string
      ): Promise<boolean> => {
            const fleet = this.fleets.find(
                  (fleet) => fleet.getIdentity().getId() === fleetId
            )
            if (!fleet) {
                  return false
            }
            const verifyVehicleInFleetHandler = new VerifyVehicleInFleet()
            const result = await verifyVehicleInFleetHandler.execute(
                  vehicleId,
                  fleet
            )
            return result
      }

      verifyVehicleAtLocation = (
            vehicleId: number,
            locationId: string
      ): Promise<boolean> => {
            const verifyVehicleAtLocationHandler = new VerifyVehicleAtLocation()
            return verifyVehicleAtLocationHandler.execute(vehicleId, locationId)
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
