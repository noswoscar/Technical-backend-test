import { DIContainer } from '../../DIContainer'
import { Fleet } from '../../../Domain/entities/Fleet'
import { FleetRepository } from '../../../Infra/Repositories/FleetRepository'
import ParkingApp from '../../app'
import { QueryResult } from 'pg'
import { Vehicle } from '../../../Domain/entities/Vehicle'

export class VerifyVehicleInFleet {
      async execute(vehicleId: number, fleetId: string): Promise<boolean> {
            const app = DIContainer.resolve<ParkingApp>('app')

            //new repo code
            const fleetRepository = new FleetRepository()
            let result = await fleetRepository.findVehicleInFleet(
                  vehicleId,
                  fleetId
            )
            return result
      }
}
