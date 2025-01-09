import { Fleet } from '../../../Domain/agregates/Fleet'
import { ErrorLog } from '../../../Domain/services/ErrorLog'
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
                  const registryResult = await fleetRepositiory.registerVehicle(
                        vehicleId,
                        fleet.getFleetIdentity().getId()
                  )
                  if (registryResult) {
                        return true
                  }
                  return false
            }
            return false
      }
}
