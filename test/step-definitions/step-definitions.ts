import { Given, Then, When } from '@cucumber/cucumber'

import { DIContainer } from '../../src/app/DIContainer'
import { ErrorLog } from '../../src/domain/agregates/ErrorLog'
import { Fleet } from '../../src/domain/entities/Fleet'
import { FleetIdentity } from '../../src/valueObjects/FleetIdentity'
import { Location } from '../../src/domain/entities/Location'
import ParkingApp from '../../src/app/app'
import { Vehicle } from '../../src/domain/entities/Vehicle'
import { VehicleIdentity } from '../../src/valueObjects/VehicleIdentity'
import { VehicleType } from '../../src/valueObjects/VehicleType'
import assert from 'assert'

let createId = () => {
      return (
            new Date().getTime().toString(36) +
            Math.random().toString(36).slice(2)
      )
}

//i need to init fleet and vehicle variables for park vehicle to be run first but I am creating them in register vehicle
//Solution: use the app to follow the story of the first vehicle, my_vehicle my_fleet, other_fleet, the location
const parkingApp = new ParkingApp()
const app = DIContainer.resolve<ParkingApp>('app')
let location: Location
let fleet: Fleet
let otherfleet: Fleet
let vehicle: Vehicle

Given('my fleet', function () {
      let fleetIdentity: FleetIdentity = {
            id: createId(),
            name: 'Oscars',
            owner: 'Oscar',
      }
      fleet = app.createFleet(fleetIdentity)
})

Given('a vehicle', function () {
      let vehicleIdentity: VehicleIdentity = {
            vehicleName: 'peugeot',
            vehicleId: createId(),
      }
      vehicle = app.createVehicle(vehicleIdentity, VehicleType.Car)
})

When('I register this vehicle into my fleet', function () {
      app.registerVehicleToFleet(vehicle, fleet)
})

Then('this vehicle should be part of my vehicle fleet', function () {
      assert.strictEqual(app.verifyVehicleInFleet(vehicle, fleet), true)
})

Given('I have registered this vehicle into my fleet', function () {
      let vehicleInFleet = app.verifyVehicleInFleet(vehicle, fleet)
      if (!vehicleInFleet) {
            app.registerVehicleToFleet(vehicle, fleet)
      }
      assert.strictEqual(app.verifyVehicleInFleet(vehicle, fleet), true)
})

When('I try to register this vehicle into my fleet', function () {
      app.registerVehicleToFleet(vehicle, fleet)
})

Then(
      'I should be informed this this vehicle has already been registered into my fleet',
      function () {
            assert.strictEqual(
                  app.getErrorLog().hasRecentRegistryError(Date.now()),
                  true
            )
      }
)

Given('the fleet of another user', function () {
      let fleetIdentity: FleetIdentity = {
            id: createId(),
            name: 'Hectors',
            owner: 'Hector',
      }
      otherfleet = app.createFleet(fleetIdentity)
})

Given(
      "this vehicle has been registered into the other user's fleet",
      function () {
            app.registerVehicleToFleet(vehicle, otherfleet)
            assert.strictEqual(
                  app.verifyVehicleInFleet(vehicle, otherfleet),
                  true
            )
      }
)

Given('a location', function () {
      location = app.createLocation()
})

When('I park my vehicle at this location', function () {
      app.parkVehicleAtLocation(vehicle, location)
})

Then(
      'the known location of my vehicle should verify this location',
      function () {
            assert.strictEqual(
                  app.verifyVehicleAtLocation(vehicle, location),
                  true
            )
      }
)

Given('my vehicle has been parked into this location', function () {
      app.parkVehicleAtLocation(vehicle, location)
      assert.strictEqual(app.verifyVehicleAtLocation(vehicle, location), true)
})

When('I try to park my vehicle at this location', function () {
      app.parkVehicleAtLocation(vehicle, location)
})

Then(
      'I should be informed that my vehicle is already parked at this location',
      function () {
            assert.strictEqual(
                  app.getErrorLog().hasRecentParkingError(Date.now()),
                  true
            )
      }
)
