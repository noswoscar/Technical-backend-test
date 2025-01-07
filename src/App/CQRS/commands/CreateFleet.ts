import { DIContainer } from '../../DIContainer'
import { Fleet } from '../../../Domain/agregates/Fleet'
import { FleetIdentity } from '../../../Domain/valueObjects/FleetIdentity'
import { FleetRepository } from '../../../Infra/Repositories/FleetRepository'
import ParkingApp from '../../app'

export class CreateFleet {
      async execute(fleetIdentity: FleetIdentity): Promise<string | undefined> {
            const app = DIContainer.resolve<ParkingApp>('app')
            const fleet = new Fleet(fleetIdentity, [])
            const fleetRepository = new FleetRepository()

            const res = await fleetRepository.insert(fleet)
            return res
      }
}
