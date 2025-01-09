import { Fleet } from '../../../Domain/agregates/Fleet'
import { FleetRepository } from '../../../Infra/Repositories/FleetRepository'

export class CreateFleet {
      async execute(fleet: Fleet): Promise<string | undefined> {
            const fleetRepository = new FleetRepository()

            const res = await fleetRepository.insert(fleet)
            return res
      }
}
