import { DIContainer } from '../../DIContainer'
import { Fleet } from '../../../Domain/entities/Fleet'
import { FleetIdentity } from '../../../Domain/valueObjects/FleetIdentity'
import { FleetRepository } from '../../../Infra/Repositories/FleetRepository'
import ParkingApp from '../../app'

export class CreateFleet {
      execute(fleetIdentity: FleetIdentity): Fleet {
            const app = DIContainer.resolve<ParkingApp>('app')
            const fleetRepository = new FleetRepository()
            const fleet = new Fleet(fleetIdentity, [])
            fleetRepository.insert(fleet)
            return fleet

            // if (
            //       !app
            //             .getFleets()
            //             .find(
            //                   (fleetItem) =>
            //                         fleetItem.getFleetId() ===
            //                         fleet.getFleetId()
            //             )
            // ) {
            //       app.getFleets().push(fleet)
            // }
            // return fleet
      }
}
