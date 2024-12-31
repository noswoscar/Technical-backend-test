import { DIContainer } from '../../DIContainer'
import { Location } from '../../../Domain/entities/Location'
import ParkingApp from '../../app'

export class CreateLocation {
      execute(): Location {
            const app = DIContainer.resolve<ParkingApp>('app')
            let location = new Location()
            app.getLocations().push(location)
            return location
      }
}
