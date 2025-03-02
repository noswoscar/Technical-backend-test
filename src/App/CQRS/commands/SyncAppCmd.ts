import { Fleet } from '../../../Domain/agregates/Fleet'
import { FleetRepository } from '../../../Infra/Repositories/FleetRepository'

export class SyncAppCmd {
      async execute(): Promise<Array<Fleet> | undefined> {
            const fleetRepositiory = new FleetRepository()
            const res = await fleetRepositiory.findFleets()
            if (!res) return undefined
            return res
      }
}
