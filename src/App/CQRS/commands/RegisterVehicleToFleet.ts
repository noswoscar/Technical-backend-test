import { DIContainer } from '../../DIContainer'
import { ErrorLog } from '../../../Domain/services/ErrorLog'
import { FleetRepository } from '../../../Infra/Repositories/FleetRepository'
import ParkingApp from '../../app'
import { ProgramError } from '../../../Domain/entities/ProgramError'
import { RegistryRequest } from '../../../Domain/services/RegistryRequest'

export class registerVehicleToFleet {
      async execute(
            vehicleId: number,
            fleetId: string,
            errorLog: ErrorLog
      ): Promise<boolean> {
            const app = DIContainer.resolve<ParkingApp>('app')
            const fleetRepositiory = new FleetRepository()

            let registryRequest: RegistryRequest = new RegistryRequest(
                  vehicleId,
                  fleetId,
                  fleetRepositiory
            )
            let res: boolean | undefined
            try {
                  res = await registryRequest.registerVehicleToFleet()
                  return res
            } catch (error: unknown) {
                  //save program error here
                  let registryError = new ProgramError(
                        'RegistryError',
                        'Error registring a vehicle into the fleet'
                  )
                  errorLog.setError(registryError)
                  errorLog.logError(registryError)
                  return false
            }
      }
}
