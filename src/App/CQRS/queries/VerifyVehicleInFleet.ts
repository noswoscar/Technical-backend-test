import { Fleet } from '../../../Domain/agregates/Fleet'

export class VerifyVehicleInFleet {
      async execute(vehicleId: number, fleet: Fleet): Promise<boolean> {
            const isVehicleRegistered = fleet.verifyAlreadyRegistered(vehicleId)
            return isVehicleRegistered
      }
}
