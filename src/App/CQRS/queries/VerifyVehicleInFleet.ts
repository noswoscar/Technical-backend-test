import { Fleet } from '../../../Domain/agregates/Fleet'

export class VerifyVehicleInFleet {
      async execute(vehicleId: number, fleet: Fleet): Promise<boolean> {
            const isVehicleRegistered = fleet.verifyVehicleInFleet(vehicleId)
            return isVehicleRegistered
      }
}
