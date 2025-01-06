import {
      After,
      Before,
      Given,
      Then,
      When,
      setWorldConstructor,
} from '@cucumber/cucumber'

import { FleetIdentity } from '../../src/Domain/valueObjects/FleetIdentity'
import ParkingApp from '../../src/App/app'
import { VehicleIdentity } from '../../src/Domain/valueObjects/VehicleIdentity'
import { VehicleType } from '../../src/Domain/valueObjects/VehicleType'
import assert from 'assert'

interface SharedData {
      app: ParkingApp
      myFleetId: string | undefined
      worldVehicleId: number | undefined
      hectorsFleetId: string | undefined
      worldLocationId: string | undefined
}
class CustomWorld {
      sharedData: SharedData
      constructor() {
            const app = new ParkingApp()
            this.sharedData = {
                  app: app,
                  myFleetId: '',
                  worldVehicleId: 0,
                  hectorsFleetId: '',
                  worldLocationId: '',
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
      this.sharedData.myFleetId = await this.sharedData.app.createFleet(
            fleetIdentity
      )
      if (!this.sharedData.myFleetId) {
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
            if (!this.sharedData.myFleetId) {
                  throw new Error('my fleet not in the database.')
            }
            if (!this.sharedData.worldVehicleId) {
                  throw new Error('vehicle not in the database.')
            }
            const result: boolean | undefined =
                  await this.sharedData.app.registerVehicleToFleet(
                        this.sharedData.worldVehicleId,
                        this.sharedData.myFleetId
                  )
            if (!result) {
                  throw new Error('Failed to register vehicle in fleet.')
            }
      }
)

Then(
      'this vehicle should be part of my vehicle fleet',
      async function (this: CustomWorld) {
            if (!this.sharedData.myFleetId) {
                  throw new Error('my fleet not in the database.')
            }
            if (!this.sharedData.worldVehicleId) {
                  throw new Error('vehicle not in the database.')
            }
            let result: boolean =
                  await this.sharedData.app.verifyVehicleInFleet(
                        this.sharedData.worldVehicleId,
                        this.sharedData.myFleetId
                  )
            assert.strictEqual(result, true)
      }
)

Given(
      'I have registered this vehicle into my fleet',
      async function (this: CustomWorld) {
            if (!this.sharedData.myFleetId) {
                  throw new Error('my fleet not in the database.')
            }
            if (!this.sharedData.worldVehicleId) {
                  throw new Error('vehicle not in the database.')
            }
            const result: boolean =
                  await this.sharedData.app.registerVehicleToFleet(
                        this.sharedData.worldVehicleId,
                        this.sharedData.myFleetId
                  )
            if (!result) {
                  throw new Error('Failed to register vehicle in fleet.')
            }
            assert.strictEqual(result, true)
      }
)

When(
      'I try to register this vehicle into my fleet',
      async function (this: CustomWorld) {
            if (!this.sharedData.myFleetId) {
                  throw new Error('my fleet not in the database.')
            }
            if (!this.sharedData.worldVehicleId) {
                  throw new Error('vehicle not in the database.')
            }
            const result: boolean =
                  await this.sharedData.app.registerVehicleToFleet(
                        this.sharedData.worldVehicleId,
                        this.sharedData.myFleetId
                  )
            assert.strictEqual(result, false)
      }
)

Then(
      'I should be informed this this vehicle has already been registered into my fleet',
      async function (this: CustomWorld) {
            assert.strictEqual(
                  this.sharedData.app
                        .getErrorLog()
                        .hasRecentRegistryError(Date.now()),
                  true
            )
      }
)

Given('the fleet of another user', async function (this: CustomWorld) {
      let fleetIdentity: FleetIdentity = new FleetIdentity('Hector')
      this.sharedData.hectorsFleetId = await this.sharedData.app.createFleet(
            fleetIdentity
      )
      if (!this.sharedData.myFleetId) {
            throw new Error(
                  "Failed to initialize Hector's fleet in the database."
            )
      }
})

Given(
      "this vehicle has been registered into the other user's fleet",
      async function (this: CustomWorld) {
            if (!this.sharedData.hectorsFleetId) {
                  throw new Error('Hectors fleet not in the database.')
            }
            if (!this.sharedData.worldVehicleId) {
                  throw new Error('vehicle not in the database.')
            }
            const result: boolean | undefined =
                  await this.sharedData.app.registerVehicleToFleet(
                        this.sharedData.worldVehicleId,
                        this.sharedData.hectorsFleetId
                  )
            if (!result) {
                  throw new Error(
                        "Failed to register vehicle into hector's fleet."
                  )
            }
      }
)

Given('a location', async function (this: CustomWorld) {
      this.sharedData.worldLocationId =
            await this.sharedData.app.createLocation('12', '-60', '1000')
      if (!this.sharedData.worldLocationId) {
            throw new Error('Failed to initialize a Location in the database.')
      }
})

When('I park my vehicle at this location', async function (this: CustomWorld) {
      if (!this.sharedData.worldLocationId) {
            throw new Error('location not in the database.')
      }
      if (!this.sharedData.worldVehicleId) {
            throw new Error('vehicle not in the database.')
      }
      const result = await this.sharedData.app.parkVehicleAtLocation(
            this.sharedData.worldVehicleId,
            this.sharedData.worldLocationId
      )
      assert.strictEqual(result, true)
})

Then(
      'the known location of my vehicle should verify this location',
      async function async(this: CustomWorld) {
            if (!this.sharedData.worldLocationId) {
                  throw new Error('location not in the database.')
            }
            if (!this.sharedData.worldVehicleId) {
                  throw new Error('vehicle not in the database.')
            }
            const result: boolean =
                  await this.sharedData.app.verifyVehicleAtLocation(
                        this.sharedData.worldVehicleId,
                        this.sharedData.worldLocationId
                  )
            assert.strictEqual(result, true)
      }
)

Given(
      'my vehicle has been parked into this location',
      async function (this: CustomWorld) {
            if (!this.sharedData.worldLocationId) {
                  throw new Error('location not in the database.')
            }
            if (!this.sharedData.worldVehicleId) {
                  throw new Error('vehicle not in the database.')
            }
            const result = await this.sharedData.app.parkVehicleAtLocation(
                  this.sharedData.worldVehicleId,
                  this.sharedData.worldLocationId
            )
            assert.strictEqual(result, true)
      }
)

When(
      'I try to park my vehicle at this location',
      async function (this: CustomWorld) {
            if (!this.sharedData.worldLocationId) {
                  throw new Error('location not in the database.')
            }
            if (!this.sharedData.worldVehicleId) {
                  throw new Error('vehicle not in the database.')
            }
            const result = await this.sharedData.app.parkVehicleAtLocation(
                  this.sharedData.worldVehicleId,
                  this.sharedData.worldLocationId
            )
            assert.strictEqual(result, false)
      }
)

Then(
      'I should be informed that my vehicle is already parked at this location',
      async function (this: CustomWorld) {
            const hasError = await this.sharedData.app
                  .getErrorLog()
                  .hasRecentParkingError(Date.now())
            assert.strictEqual(hasError, true)
      }
)

After(async function (this: CustomWorld) {
      try {
            await this.sharedData.app.close()
      } catch (err: unknown) {
            console.log('An error occured when closing the database')
      }
})
