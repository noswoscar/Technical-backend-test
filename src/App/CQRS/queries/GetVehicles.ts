import { DIContainer } from '../../DIContainer'
import ParkingApp from '../../app'

export class getVehicles {
      execute() {
            const app = DIContainer.resolve<ParkingApp>('app')

            return app.getVehicles()
      }
}
