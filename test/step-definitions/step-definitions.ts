import {
      After,
      AfterAll,
      Before,
      BeforeAll,
      Given,
      Then,
      When,
      setWorldConstructor,
} from '@cucumber/cucumber'

import { Fleet } from '../../src/Domain/entities/Fleet'
import { FleetIdentity } from '../../src/Domain/valueObjects/FleetIdentity'
import ParkingApp from '../../src/App/app'
import { QueryResult } from 'pg'
import { Vehicle } from '../../src/Domain/entities/Vehicle'
import { VehicleIdentity } from '../../src/Domain/valueObjects/VehicleIdentity'
import { VehicleLocation } from '../../src/Domain/entities/VehicleLocation'
import { VehicleType } from '../../src/Domain/valueObjects/VehicleType'
import assert from 'assert'

// let app: ParkingApp
// let location: VehicleLocation
// let otherfleet: Fleet

interface SharedData {
      app: ParkingApp
      worldFleetId: string | undefined
      worldVehicleId: number | undefined
}
class CustomWorld {
      sharedData: SharedData
      constructor() {
            let app = new ParkingApp()
            this.sharedData = {
                  app: app,
                  worldFleetId: '',
                  worldVehicleId: 0,
            }
      }

      async initialize() {
            try {
                  await this.sharedData.app.init()
            } catch (err: unknown) {
                  console.log(
                        'An error occured when connecting to the database'
                  )
            }
      }
}

setWorldConstructor(CustomWorld)

Before(async function (this: CustomWorld) {
      try {
            await this.initialize() // Ensure the app is initialized before each scenario
      } catch (err: unknown) {
            console.log(err)
      }
})

Given('my fleet', async function (this: CustomWorld) {
      let fleetIdentity: FleetIdentity = new FleetIdentity('Oscar')
      this.sharedData.worldFleetId = await this.sharedData.app.createFleet(
            fleetIdentity
      )
      if (!this.sharedData.worldFleetId) {
            throw new Error('Failed to initialize my fleet in the database.')
      }
})

Given('a vehicle', async function (this: CustomWorld) {
      let vehicleIdentity: VehicleIdentity = new VehicleIdentity('XQ-672-81')
      this.sharedData.worldVehicleId = await this.sharedData.app.createVehicle(
            vehicleIdentity,
            VehicleType.Car
      )
      if (!this.sharedData.worldVehicleId) {
            throw new Error('Failed to initialize a vehicle in the database.')
      }
})

When(
      'I register this vehicle into my fleet',
      async function (this: CustomWorld) {
            if (!this.sharedData.worldFleetId) {
                  throw new Error('vehicle not in the database.')
            }
            if (!this.sharedData.worldVehicleId) {
                  throw new Error('my fleet not in the database.')
            }
            const result: boolean | undefined =
                  await this.sharedData.app.registerVehicleToFleet(
                        this.sharedData.worldVehicleId,
                        this.sharedData.worldFleetId
                  )
            if (!result) {
                  throw new Error('Failed to register vehicle in fleet.')
            }
      }
)

Then(
      'this vehicle should be part of my vehicle fleet',
      async function (this: CustomWorld) {
            if (!this.sharedData.worldFleetId) {
                  throw new Error('vehicle not in the database.')
            }
            if (!this.sharedData.worldVehicleId) {
                  throw new Error('my fleet not in the database.')
            }
            let result: boolean =
                  await this.sharedData.app.verifyVehicleInFleet(
                        this.sharedData.worldVehicleId,
                        this.sharedData.worldFleetId
                  )
            assert.strictEqual(result, true)
      }
)

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

After(async function (this: CustomWorld) {
      try {
            await this.sharedData.app.close()
      } catch (err: unknown) {
            console.log('An error occured when closing the database')
      }
})
