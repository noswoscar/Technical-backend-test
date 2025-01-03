import { AfterAll, BeforeAll, Given, Then, When } from '@cucumber/cucumber'

import { Fleet } from '../../src/Domain/entities/Fleet'
import { FleetIdentity } from '../../src/Domain/valueObjects/FleetIdentity'
import ParkingApp from '../../src/App/app'
import { QueryResult } from 'pg'
import { Vehicle } from '../../src/Domain/entities/Vehicle'
import { VehicleIdentity } from '../../src/Domain/valueObjects/VehicleIdentity'
import { VehicleLocation } from '../../src/Domain/entities/VehicleLocation'
import { VehicleType } from '../../src/Domain/valueObjects/VehicleType'
import assert from 'assert'

let app: ParkingApp
let location: VehicleLocation
let fleet: Fleet
let otherfleet: Fleet
let vehicle: Vehicle

// Initialize the app asynchronously
BeforeAll(async () => {
      app = new ParkingApp()
      await app.init()
})

Given('my fleet', async function () {
      let fleetIdentity: FleetIdentity = new FleetIdentity('Oscar')
      fleet = await app.createFleet(fleetIdentity)
})

Given('a vehicle', async function () {
      let vehicleIdentity: VehicleIdentity = new VehicleIdentity('XQ-672-81')
      vehicle = await app.createVehicle(vehicleIdentity, VehicleType.Car)
})

When('I register this vehicle into my fleet', async function () {
      await app.registerVehicleToFleet(vehicle, fleet)
})

// Then('this vehicle should be part of my vehicle fleet', async function () {
//       let result: QueryResult | undefined = await app.verifyVehicleInFleet(
//             vehicle,
//             fleet
//       )
//       assert.strictEqual(result, true)
// })

// Given('I have registered this vehicle into my fleet', function () {
//       let vehicleInFleet = app.verifyVehicleInFleet(vehicle, fleet)
//       if (!vehicleInFleet) {
//             app.registerVehicleToFleet(vehicle, fleet)
//       }
//       assert.strictEqual(app.verifyVehicleInFleet(vehicle, fleet), true)
// })

// When('I try to register this vehicle into my fleet', function () {
//       app.registerVehicleToFleet(vehicle, fleet)
// })

// Then(
//       'I should be informed this this vehicle has already been registered into my fleet',
//       function () {
//             assert.strictEqual(
//                   app.getErrorLog().hasRecentRegistryError(Date.now()),
//                   true
//             )
//       }
// )

// Given('the fleet of another user', function () {
//       let fleetIdentity: FleetIdentity = new FleetIdentity('Oscar')
//       otherfleet = app.createFleet(fleetIdentity)
// })

// Given(
//       "this vehicle has been registered into the other user's fleet",
//       function () {
//             app.registerVehicleToFleet(vehicle, otherfleet)
//             assert.strictEqual(
//                   app.verifyVehicleInFleet(vehicle, otherfleet),
//                   true
//             )
//       }
// )

// Given('a location', function () {
//       location = app.createLocation('12', '-60', '1000')
// })

// When('I park my vehicle at this location', function () {
//       app.parkVehicleAtLocation(vehicle, location)
// })

// Then(
//       'the known location of my vehicle should verify this location',
//       function () {
//             assert.strictEqual(
//                   app.verifyVehicleAtLocation(vehicle, location),
//                   true
//             )
//       }
// )

// Given('my vehicle has been parked into this location', function () {
//       app.parkVehicleAtLocation(vehicle, location)
//       assert.strictEqual(app.verifyVehicleAtLocation(vehicle, location), true)
// })

// When('I try to park my vehicle at this location', function () {
//       app.parkVehicleAtLocation(vehicle, location)
// })

// Then(
//       'I should be informed that my vehicle is already parked at this location',
//       function () {
//             assert.strictEqual(
//                   app.getErrorLog().hasRecentParkingError(Date.now()),
//                   true
//             )
//       }
// )

AfterAll(async () => {
      console.log('after all')
      if (app) {
            await app.close() // Assuming your app has a close method
      }
})
