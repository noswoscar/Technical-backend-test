import { DIContainer } from '../../../app/DIContainer'
import { Fleet } from '../../entities/Fleet'
import ParkingApp from '../../../app/app'
import { ProgramError } from '../../entities/ProgramError'
import { RegistryRequest } from '../../agregates/RegistryRequest'
import { Vehicle } from '../../entities/Vehicle'

export class registerVehicleToFleet {
      execute(vehicle: Vehicle, fleet: Fleet) {
            const app = DIContainer.resolve<ParkingApp>('app')

            let registryRequest: RegistryRequest = new RegistryRequest(
                  vehicle,
                  fleet
            )
            try {
                  registryRequest.registerVehicleToFleet()
            } catch (error: any) {
                  let myerror = new ProgramError('RegistryError', error.message)
                  app.getErrorLog().setError(myerror)
                  app.getErrorLog().logError(myerror)
            } finally {
                  return
            }
      }
}
