import { DIContainer } from '../../DIContainer'
import ParkingApp from '../../app'

class getVehicles {
      execute() {
            const app = DIContainer.resolve<ParkingApp>('app')

            // return app.getVehicles()
      }
}
