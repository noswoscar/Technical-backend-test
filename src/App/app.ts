import { CreateFleet } from './CQRS/commands/CreateFleet'
import { CreateLocation } from './CQRS/commands/CreateLocation'
import { CreateVehicle } from './CQRS/commands/CreateVehicle'
import { DIContainer } from './DIContainer'
import { DatabaseConnector } from '../Infra/DatabaseConnector'
import { ErrorLog } from '../Domain/services/ErrorLog'
import { Fleet } from '../Domain/agregates/Fleet'
import { FleetIdentity } from '../Domain/valueObjects/FleetIdentity'
import { ParkVehicleAtLocation } from './CQRS/commands/ParkVehicleAtLocation'
import { SyncAppCmd } from './CQRS/commands/SyncAppCmd'
import { Vehicle } from '../Domain/entities/Vehicle'
import { VehicleIdentity } from '../Domain/valueObjects/VehicleIdentity'
import { VerifyVehicleAtLocation } from './CQRS/queries/VerifyVehicleAtLocation'
import { VerifyVehicleInFleet } from './CQRS/queries/VerifyVehicleInFleet'
import { registerVehicleByPlateNumberToFleet } from './CQRS/commands/RegisterVehicleByPlateNumber'
import { registerVehicleToFleet } from './CQRS/commands/RegisterVehicleToFleet'

class ParkingApp {
      private vehicleIds: Array<number>
      private fleets: Array<Fleet>
      private errorLog: ErrorLog

      constructor() {
            this.vehicleIds = []
            this.fleets = []
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

      syncAppState = async () => {
            const syncAppState = new SyncAppCmd()
            const fleets: Array<Fleet> | undefined =
                  await syncAppState.execute()
            if (!fleets) {
                  console.error(
                        'Error when syncing the exiting fleets between DB and application'
                  )
            }
            if (fleets) this.fleets = fleets
            return fleets
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

      private getFleet = (fleetId: string): Fleet | undefined => {
            return this.fleets.find(
                  (appFleet) => appFleet.getFleetIdentity().getId() === fleetId
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

      registerVehicleToFleetFromPlateNumber = async (
            vehiclePlateNumber: number,
            fleetId: string
      ): Promise<boolean> => {
            const fleet = this.getFleet(fleetId)
            if (!fleet) {
                  console.error('Unable to find fleet with id : ', fleetId)
                  return false
            }
            const registerVehicleToFleetByPlateNumberHandler =
                  new registerVehicleByPlateNumberToFleet()

            const res: boolean =
                  await registerVehicleToFleetByPlateNumberHandler.execute(
                        vehiclePlateNumber,
                        fleet,
                        this.errorLog
                  )
            if (!res) {
                  return false
            }
            return res
      }

      parkVehicleAtLocation = async (vehicleId: number, locationId: string) => {
            const parkVehicleAtLocationHandler = new ParkVehicleAtLocation()
            return await parkVehicleAtLocationHandler.execute(
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
                  (fleet) => fleet.getFleetIdentity().getId() === fleetId
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
      createLocation = async (
            latitude: string,
            longitude: string,
            altitude: string | 0
      ): Promise<string | undefined> => {
            const createLocationHandler = new CreateLocation()
            const newLocationId = await createLocationHandler.execute(
                  latitude,
                  longitude,
                  altitude
            )
            if (!newLocationId) return undefined
            return newLocationId
      }

      //errorlog methods
      getErrorLog = () => {
            return this.errorLog
      }
}

export default ParkingApp
