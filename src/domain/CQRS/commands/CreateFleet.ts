import { DIContainer } from '../../../app/DIContainer'
import { Fleet } from '../../entities/Fleet'
import { FleetIdentity } from '../../../valueObjects/FleetIdentity'
import ParkingApp from '../../../app/app'

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
