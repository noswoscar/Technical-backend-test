import { Vehicle } from '../../../Domain/entities/Vehicle'

export interface IVehicleRepository {
      findByPlate: (vehicleNumberPlate: number) => Promise<number | undefined>
      insert: (vehicle: Vehicle) => Promise<number | undefined>
      getVehicleLocation: (vehicleId: number) => Promise<string | undefined>
      addLocationToVehicle: (
            locationId: string,
            vehicleId: number
      ) => Promise<boolean>
}
