import { DIContainer } from '../../DIContainer'
import { FleetRepository } from '../../../Infra/Repositories/FleetRepository'
import ParkingApp from '../../app'

export class VerifyVehicleInFleet {
      async execute(vehicleId: number, fleetId: string): Promise<boolean> {
            const app = DIContainer.resolve<ParkingApp>('app')

            const fleetRepository = new FleetRepository()
            let result = await fleetRepository.verifyVehicleInFleet(
                  vehicleId,
                  fleetId
            )
            return result
      }
}
