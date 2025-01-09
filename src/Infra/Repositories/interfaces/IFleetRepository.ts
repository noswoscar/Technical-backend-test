import { Fleet } from '../../../Domain/agregates/Fleet'
export interface IFleetRepository {
      find: (fleet: Fleet) => Promise<{ fleet_id: string } | undefined>
      insert: (fleet: Fleet) => Promise<string | undefined>
      registerVehicle: (vehicleId: number, fleetId: string) => Promise<boolean>
      verifyVehicleInFleet: (
            vehicleId: number,
            fleetId: string
      ) => Promise<boolean>
      findFleets: () => Promise<Array<Fleet> | undefined>
}
