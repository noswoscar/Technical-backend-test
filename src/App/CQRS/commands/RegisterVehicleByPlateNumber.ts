import { ErrorLog } from '../../../Domain/services/ErrorLog'
import { Fleet } from '../../../Domain/agregates/Fleet'
import { FleetRepository } from '../../../Infra/Repositories/FleetRepository'
import { VehicleRepository } from '../../../Infra/Repositories/VehicleRepository'

export class registerVehicleByPlateNumberToFleet {
      async execute(
            vehiclePlateNumber: number,
            fleet: Fleet,
            errorLog: ErrorLog
      ): Promise<boolean> {
            const fleetRepositiory = new FleetRepository()
            const vehicleRepositiory = new VehicleRepository()

            const vehicleId = await vehicleRepositiory.findByPlate(
                  vehiclePlateNumber
            )
            if (!vehicleId) {
                  return false
            }
            const result = await fleet.registerVehicle(vehicleId, errorLog)
            if (result) {
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
