import { DIContainer } from '../../DIContainer'
import { Fleet } from '../../../Domain/entities/Fleet'
import { FleetRepository } from '../../../Infra/Repositories/FleetRepository'
import ParkingApp from '../../app'
import { QueryResult } from 'pg'
import { Vehicle } from '../../../Domain/entities/Vehicle'

export class VerifyVehicleInFleet {
      execute(
            vehicle: Vehicle,
            fleet: Fleet
      ): Promise<QueryResult> | undefined {
            const app = DIContainer.resolve<ParkingApp>('app')
            let conditionsMet = 0
            if (
                  fleet
                        .getVehicles()
                        .find(
                              (vehicleItem) =>
                                    vehicleItem.getVehicleNumberPlate() ===
                                    vehicle.getVehicleNumberPlate()
                        )
            ) {
                  conditionsMet++
            }
            const fleetRepository = new FleetRepository()
            let result = fleetRepository.findVehicleInFleet(vehicle, fleet)
            return result
      }
}
