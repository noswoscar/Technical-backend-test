import { Fleet } from '../../../Domain/agregates/Fleet'
export interface IFleetRepository {
      find: (fleet: Fleet) => Promise<{ fleet_id: string } | undefined>
      verifyVehicleInFleet: (vehicleId: number, fleetId: string) => Promise<any>
      insert: (fleet: Fleet) => void
      update: (fleet: Fleet) => void
      registerVehicle: (vehicleId: number, fleetId: string) => void
      delete: () => void
}
