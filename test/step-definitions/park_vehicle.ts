import { Location } from '../../src/domain/entities/Location'
import app from '../../src/app/app'

const assert = require('assert')
const { Given, When, Then } = require('@cucumber/cucumber')

let location: Location

Given('a location', function () {
      location = app.createLocation()
})

// When('I park my vehicle at this location', function () {
//       app.parkVehicleAtLocation(app.vehicle, location)
// })

// Then(
//       'the known location of my vehicle should verify this location',
//       function () {
//             assert.equal(app.verifyLocation(app.vehicle, location), true)
//       }
// )

// Given('my vehicle has been parked into this location', function () {
//       assert.equal(app.vehicleAtLocation(app.vehicle, location), true)
// })

// When('I try to park my vehicle at this location', function () {
//       app.parkVehicleAtLocation(app.vehicle, location)
// })

// Then(
//       'I should be informed that my vehicle is already parked at this location',
//       function () {
//             assert(app.informedUserVehicleAllreadyParked, true)
//       }
// )
