import { VehicleLocation } from '../../../Domain/entities/VehicleLocation'

export interface ILocationRepository {
      insert: (location: VehicleLocation) => Promise<string | undefined>
      addVehicleToLocation: (
            vehicleId: number,
            locationId: string
      ) => Promise<boolean>
      vehicleIsAtLocation: (locationId: string) => Promise<boolean>
      getVehicleAtLocation: (locationId: string) => Promise<string | undefined>
}
