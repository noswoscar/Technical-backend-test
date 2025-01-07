import { ErrorLog } from '../../../Domain/services/ErrorLog'
import { Fleet } from '../../../Domain/agregates/Fleet'
import { FleetRepository } from '../../../Infra/Repositories/FleetRepository'

export class registerVehicleToFleet {
      async execute(
            vehicleId: number,
            fleet: Fleet,
            errorLog: ErrorLog
      ): Promise<boolean> {
            const fleetRepositiory = new FleetRepository()

            const vehicleRegistered = fleet.registerVehicle(vehicleId, errorLog)
            if (vehicleRegistered) {
                  const registryResult = await fleetRepositiory.insert(fleet)
                  if (registryResult) {
                        return true
                  }
                  return false
            }
            return false
      }
}
