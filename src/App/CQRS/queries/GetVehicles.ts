import { VehicleRepository } from '../../../Infra/Repositories/VehicleRepository'

export class getVehicle {
      async execute(vehicleId: number) {
            const vehicleRepository = new VehicleRepository()
            const vehicle = await vehicleRepository.find(vehicleId)
            return
      }
}
