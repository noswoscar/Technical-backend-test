# Parking Application

#### About the app:

- The purpose of this app is to orchestrate a fleets of vehicles and be able to park them at locations following strict business rules
- This app implements **[Domain Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)** and **[CQRS](https://martinfowler.com/bliki/CQRS.html)**
- It also uses **[Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)** and **[CucumberJs](https://cucumber.io)**
- The database is a **[Postgresql](https://www.postgresql.org/)** database and can be accessed by providing localhost address and port in the **_DatabaseConnector_** class

- Adjacent to this app is a **Command Line Interface** that can be activated by building the project from the root directory with **npm run build** and then using the **npm link** command. The fleet command line should then be available.
- It has 3 commands which use the following syntax:
     - fleet create `<userId>` # returns fleetId on the standard output
     - fleet register-vehicle `<fleetId>` `<vehiclePlateNumber>`
     - fleet localize-vehicle `<fleetId>` `<vehiclePlateNumber>` lat lng [alt]

###### This app was made by [Oscar Nosworthy](https://www.linkedin.com/in/oscar-nosworthy-84190424242/) in 2025

###### All rights reserved to [Oscar Nosworthy](https://www.linkedin.com/in/oscar-nosworthy-84190424242/)
