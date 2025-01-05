import { DIContainer } from '../../DIContainer'
import { Fleet } from '../../../Domain/entities/Fleet'
import ParkingApp from '../../app'
import { ProgramError } from '../../../Domain/entities/ProgramError'
import { QueryResult } from 'pg'
import { RegistryRequest } from '../../../Domain/agregates/RegistryRequest'
import { Vehicle } from '../../../Domain/entities/Vehicle'

export class registerVehicleToFleet {
      async execute(
            vehicleId: number,
            fleetId: string
      ): Promise<boolean | undefined> {
            const app = DIContainer.resolve<ParkingApp>('app')
            let registryRequest: RegistryRequest = new RegistryRequest(
                  vehicleId,
                  fleetId
            )
            let res: boolean | undefined
            try {
                  res = await registryRequest.registerVehicleToFleet()
                  return res
            } catch (error: any) {
                  let myerror = new ProgramError('RegistryError', error.message)
                  app.getErrorLog().setError(myerror)
                  app.getErrorLog().logError(myerror)
                  return undefined
            }
      }
}
