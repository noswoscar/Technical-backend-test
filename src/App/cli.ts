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
                        console.log(`CLI: Error creating fleet`)
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
                        process.exit(0)
                  }
                  console.log(`CLI: Vehicle registered successfuly`)
                  process.exit(0)
            })
      program.parse(process.argv)
}
cliApp()

// // Localize Vehicle Command
// program
//       .command(
//             'localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]'
//       )
//       .description('Localize a vehicle within a fleet')
//       .action((fleetId, vehiclePlateNumber, latitude, longitude, altitude) => {
//             const fleet = parkingApp.getFleet(fleetId)
//             if (fleet) {
//                   const vehicle = fleet
//                         .getVehicles()
//                         .find(
//                               (vehicle) =>
//                                     vehicle.getVehicleNumberPlate() ===
//                                     vehiclePlateNumber
//                         )
//                   if (vehicle) {
//                         const location = new VehicleLocation(
//                               latitude,
//                               longitude,
//                               altitude || 0
//                         )
//                         vehicle.setLocation(location)
//                         console.log(
//                               `Vehicle ${vehiclePlateNumber} localized at (${latitude}, ${longitude}, ${
//                                     altitude || 0
//                               })`
//                         )
//                   } else {
//                         console.error(
//                               `Vehicle with plate number ${vehiclePlateNumber} not found in fleet ${fleetId}`
//                         )
//                   }
//             } else {
//                   console.error(`Fleet with ID ${fleetId} not found.`)
//             }
//       })
