import { Given, Then, When } from '@cucumber/cucumber'

import { Fleet } from '../../src/domain/entities/Fleet'
import { FleetIdentity } from '../../src/valueObjects/FleetIdentity'
import ParkingApp from '../../src/app/app'
import { Vehicle } from '../../src/domain/entities/Vehicle'
import { VehicleIdentity } from '../../src/valueObjects/VehicleIdentity'
import assert from 'assert'

let app = new ParkingApp()

let fleet: Fleet
let vehicle: Vehicle

Given('my fleet', function () {
      let fleetIdentity: FleetIdentity = {
            name: 'Oscars',
            owner: 'Oscar',
      }
      fleet = app.createFleet(fleetIdentity)
})

Given('a vehicle', function () {
      let vehicleIdentity: VehicleIdentity = {
            vehicleName: 'peugeot',
            vehicleId: 1,
      }
      vehicle = app.createVehicle(vehicleIdentity)
})

When('I register this vehicle into my fleet', function () {
      app.registerVehicleToFleet(vehicle, fleet)
})

Then('this vehicle should be part of my vehicle fleet', function () {
      assert.strictEqual(app.verifyVehicleInFleet(vehicle, fleet), true)
})

// Given('the fleet of another user', function () {
//       // const hectorFleet = app.findFleetByName('Hectors')
// })

// Given(
//       "this vehicle has been registered into the other user's fleet",
//       function () {
//             // app.registerVehicleToFleet(vehicle, 'Hectors')
//       }
// )

// Given('I have registered this vehicle into my fleet', function () {
//       // // console.log('my fleet', app.findFleetByName('Oscars'))
//       // // assert.equal(app.vehicleInFleet(vehicle, 'Oscars'), true)
//       // const myFleet = app.findFleetByName('Oscars')
//       // myFleet.vehicles.push(vehicle)
//       // assert.equal(myFleet.vehicles.includes(vehicle), true)
// })

// When('I try to register this vehicle into my fleet', function () {
//       // app.registerVehicleToFleet(vehicle, 'Oscars')
// })

// Then(
//       'I should be informed this this vehicle has already been registered into my fleet',
//       function () {
//             // assert.equal(app.informedUserVehicleAllreadyRegistered, true)
//       }
// )
