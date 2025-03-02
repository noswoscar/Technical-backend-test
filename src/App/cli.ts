#!/usr/bin/env node

import { Command } from 'commander'
import { FleetIdentity } from '../Domain/valueObjects/FleetIdentity'
import ParkingApp from './app'

const cliApp = async () => {
      const parkingApp = new ParkingApp()
      await parkingApp.init()
      await parkingApp.syncAppState()

      const program = new Command()

      // Create Fleet Command
      program
            .command('create <userId>')
            .description('Create a new fleet for the user')
            .action(async (userId) => {
                  const fleetIdentity = new FleetIdentity(userId)
                  const fleetId: string | undefined =
                        await parkingApp.createFleet(fleetIdentity)

                  if (fleetId === undefined) {
                        console.error(`CLI: Error creating fleet`)
                        return
                  }
                  console.log(`CLI: Fleet created with ID: ${fleetId}`)
                  process.exit(0)
            })
      // Register Vehicle Command
      program
            .command('register-vehicle <fleetId> <vehiclePlateNumber>')
            .description('Register a vehicle to the fleet')
            .action(async (fleetId, vehiclePlateNumber) => {
                  const result =
                        await parkingApp.registerVehicleToFleetFromPlateNumber(
                              vehiclePlateNumber,
                              fleetId
                        )
                  if (!result) {
                        console.error(
                              `CLI: Error registering vehicle to a fleet`
                        )
                        process.exit(0)
                  }
                  console.log(`CLI: Vehicle registered successfuly`)
                  process.exit(0)
            })
      // Localize Vehicle Command
      program
            .command(
                  'localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]'
            )
            .description('Localize a vehicle within a fleet')
            .action(
                  async (
                        fleetId,
                        vehiclePlateNumber,
                        latitude,
                        longitude,
                        altitude = '-1'
                  ) => {
                        const result = await parkingApp.localizeVehicle(
                              fleetId,
                              vehiclePlateNumber,
                              latitude,
                              longitude,
                              altitude
                        )
                        if (!result) {
                              console.error(
                                    `CLI: Vehicle could not be localized, make sure you specify correct <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]`
                              )
                              process.exit(0)
                        }
                        console.log(`CLI: Vehicle localized successfully`)
                        process.exit(0)
                  }
            )
      program.parse(process.argv)
}

cliApp()
