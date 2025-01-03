import { Fleet } from '../../../Domain/entities/Fleet'
import { Vehicle } from '../../../Domain/entities/Vehicle'

export interface IFleetRepository {
      find: () => void
      findVehicleInFleet: (vehicle: Vehicle, fleet: Fleet) => Promise<any>
      insert: (fleet: Fleet) => void
      update: (fleet: Fleet) => void
      // updateVehicles: (fleet: Fleet) => void
      delete: () => void
}
