import { DIContainer } from '../../DIContainer'
import { Fleet } from '../../../Domain/entities/Fleet'
import { FleetIdentity } from '../../../Domain/valueObjects/FleetIdentity'
import ParkingApp from '../../app'

export class CreateFleet {
      execute(fleetIdentity: FleetIdentity): Fleet {
            const app = DIContainer.resolve<ParkingApp>('app')
            const fleet = new Fleet(fleetIdentity, [])
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
            return fleet
      }
}
