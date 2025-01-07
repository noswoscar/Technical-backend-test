import { Fleet } from '../../../Domain/agregates/Fleet'
import { FleetRepository } from '../../../Infra/Repositories/FleetRepository'

export class VerifyVehicleInFleet {
      async execute(vehicleId: number, fleet: Fleet): Promise<boolean> {
            const isVehicleRegistered = fleet.verifyVehicleInFleet(vehicleId)
            return isVehicleRegistered
      }
}
