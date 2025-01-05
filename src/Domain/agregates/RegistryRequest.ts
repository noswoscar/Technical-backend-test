// import { Error } from '../entities/Error'
import { ErrorLog } from './ErrorLog'
import { Fleet } from '../entities/Fleet'
import { FleetRepository } from '../../Infra/Repositories/FleetRepository'
import { QueryResult } from 'pg'
import { Vehicle } from '../entities/Vehicle'

export class RegistryRequest {
      private vehicleId: number
      private fleetId: string
      constructor(vehicleId: number, fleetId: string) {
            this.vehicleId = vehicleId
            this.fleetId = fleetId
      }
      registerVehicleToFleet = async (): Promise<boolean | undefined> => {
            let fleetRepositiory = new FleetRepository()

            return await fleetRepositiory.registerVehicle(
                  this.vehicleId,
                  this.fleetId
            )
      }
}
