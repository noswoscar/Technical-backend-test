import { FleetRepository } from '../../Infra/Repositories/FleetRepository'

export class RegistryRequest {
      private vehicleId: number
      private fleetId: string
      private fleetRepository: FleetRepository

      constructor(
            vehicleId: number,
            fleetId: string,
            fleetRepository: FleetRepository
      ) {
            this.vehicleId = vehicleId
            this.fleetId = fleetId
            this.fleetRepository = fleetRepository
      }

      registerVehicleToFleet = async (): Promise<boolean> => {
            const res = await this.isVehicleRegistered()

            if (res) {
                  throw new Error('Vehicle is already registered in the fleet.')
            }
            return await this.fleetRepository.registerVehicle(
                  this.vehicleId,
                  this.fleetId
            )
      }

      isVehicleRegistered = async (): Promise<boolean> => {
            const res = await this.fleetRepository.verifyVehicleInFleet(
                  this.vehicleId,
                  this.fleetId
            )
            return res
      }
}
