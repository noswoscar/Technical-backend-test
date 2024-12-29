import { Fleet } from '../domain/entities/Fleet'
import { FleetIdentity } from '../valueObjects/FleetIdentity'
import { Location } from '../domain/entities/Location'
import { RegistryRequest } from '../domain/agregates/RegistryRequest'
import { Vehicle } from '../domain/entities/Vehicle'
import { VehicleIdentity } from '../valueObjects/VehicleIdentity'

class ParkingApp {
      private fleets: Array<Fleet>
      private vehicles: Array<Vehicle>
      //   private fleets: Array<Fleet> = []
      constructor() {
            console.log('Started app')
            this.fleets = []
            this.vehicles = []
            // this.createVehicle()
            // let vehicles: Array<Vehicle> = []
            // let flettIdentity: FleetIdentity = {
            //       name: 'Oscars',
            //       owner: 'oscar',
            // }
            // let fleet = new Fleet(flettIdentity, vehicles)
            // console.log('I have a fleet :', fleet)
      }

      createFleet = (fleetIdentity: FleetIdentity) => {
            let fleet = new Fleet(fleetIdentity, [])
            this.fleets.push(fleet)
            return fleet
      }
      getFleets = () => {
            return this.fleets
      }
      getFleet = (fleetName: string) => {
            return this.fleets.find(
                  (fleet) => fleet.getFleetIdentity.name === fleetName
            )
      }

      createVehicle = (vehicleIdentity: VehicleIdentity) => {
            let location = new Location()
            let vehicle = new Vehicle(vehicleIdentity, location)
            this.vehicles.push(vehicle)
            return vehicle
      }

      registerVehicleToFleet = (vehicle: Vehicle, fleet: Fleet) => {
            let registryRequest: RegistryRequest = new RegistryRequest(
                  vehicle,
                  fleet
            )
            registryRequest.registerVehicleToFleet()
      }

      verifyVehicleInFleet = (vehicle: Vehicle, fleet: Fleet) => {
            if (fleet.getVehicles().includes(vehicle)) {
                  return true
            }
            return false
      }
}

export default ParkingApp
