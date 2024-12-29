import { Given, Then, When } from '@cucumber/cucumber'

import { Fleet } from '../../src/domain/entities/Fleet'
import { FleetIdentity } from '../../src/valueObjects/FleetIdentity'
import ParkingApp from '../../src/app/app'
import { Vehicle } from '../../src/domain/entities/Vehicle'
import { VehicleIdentity } from '../../src/valueObjects/VehicleIdentity'
import assert from 'assert'

let app = new ParkingApp()

let createId = () => {
      return (
            new Date().getTime().toString(36) +
            Math.random().toString(36).slice(2)
      )
}

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
      vehicle = app.createVehicle(vehicleIdentity)
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
