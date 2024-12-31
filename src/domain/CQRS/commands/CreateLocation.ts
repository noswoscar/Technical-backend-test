import { DIContainer } from '../../../app/DIContainer'
import { Location } from '../../entities/Location'
import ParkingApp from '../../../app/app'

export class CreateLocation {
      execute(): Location {
            const app = DIContainer.resolve<ParkingApp>('app')
            let location = new Location()
            app.getLocations().push(location)
            return location
      }
}
