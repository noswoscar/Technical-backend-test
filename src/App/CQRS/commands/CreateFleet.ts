import { DIContainer } from '../../DIContainer'
import { Fleet } from '../../../Domain/entities/Fleet'
import { FleetIdentity } from '../../../Domain/valueObjects/FleetIdentity'
import { FleetRepository } from '../../../Infra/Repositories/FleetRepository'
import ParkingApp from '../../app'

export class CreateFleet {
      async execute(fleetIdentity: FleetIdentity): Promise<Fleet> {
            const app = DIContainer.resolve<ParkingApp>('app')
            const fleet = new Fleet(fleetIdentity, [])

            //old memory code
            if (
                  !app
                        .getFleets()
                        .find(
                              (fleetItem) =>
                                    fleetItem.getFleetId() ===
                                    fleet.getFleetId()
                        )
            ) {
                  app.getFleets().push(fleet)
            }

            const fleetRepository = new FleetRepository()
            const res = await fleetRepository.insert(fleet)
            return fleet
      }
}
