#!/usr/bin/env node

import { Command } from 'commander'
import { FleetIdentity } from '../Domain/valueObjects/FleetIdentity'
import ParkingApp from './app'
import { VehicleIdentity } from '../Domain/valueObjects/VehicleIdentity'
import { VehicleLocation } from '../Domain/entities/VehicleLocation'
import { VehicleType } from '../Domain/valueObjects/VehicleType'

// const cliApp = async () => {
//       const parkingApp = new ParkingApp()
//       await parkingApp.init()

//       const program = new Command()

//       // Create Fleet Command
//       program
//             .command('create <userId>')
//             .description('Create a new fleet for the user')
//             .action(async (userId) => {
//                   const fleetIdentity = new FleetIdentity(userId)
//                   const fleet = await parkingApp.createFleet(fleetIdentity)
//                   if (fleet === undefined) {
//                         console.log(`Error creating fleet`)
//                         return
//                   }
//                   console.log(`Fleet created with ID: ${fleet.getFleetId()}`)
//                   process.exit(0)
//             })
//       program.parse(process.argv)
// }

// cliApp()

// // Register Vehicle Command
// program
//       .command('register-vehicle <fleetId> <vehiclePlateNumber>')
//       .description('Register a vehicle to the fleet')
//       .action((fleetId, vehiclePlateNumber) => {
//             const fleet = parkingApp.getFleet(fleetId)
//             if (fleet) {
//                   const vehicleIdentity = new VehicleIdentity(
//                         vehiclePlateNumber
//                   )
//                   const vehicleType = VehicleType.Car
//                   const vehicle = parkingApp.createVehicle(
//                         vehicleIdentity,
//                         vehicleType
//                   )
//                   parkingApp.registerVehicleToFleet(vehicle, fleet)
//                   console.log(
//                         `Vehicle ${vehiclePlateNumber} registered to fleet ${fleetId}`
//                   )
//             } else {
//                   console.error(`Fleet with ID ${fleetId} not found.`)
//             }
//       })

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
