# Parking Application

#### About the app:

- The purpose of this app is to orchestrate a fleets of vehicles and be able to park them at locations following strict business rules
- This app implements **[Domain Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)** and **[CQRS](https://martinfowler.com/bliki/CQRS.html)**
- It also uses **[Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)** and **[CucumberJs](https://cucumber.io)**

- Adjacent to this app is a command line interface that can be activated by using the **npm link** command and uses the following syntax: 
    - fleet create `<userId>` # returns fleetId on the standard output 
    - fleet register-vehicle `<fleetId>` `<vehiclePlateNumber>`
- The database is a **[Postgresql](https://www.postgresql.org/)** database and can be accessed by providing localhost address and port in the **_DatabaseConnector_** class

###### This app was made by [Oscar Nosworthy](https://www.linkedin.com/in/oscar-nosworthy-84190424242/) in 2025

###### All rights reserved to [Oscar Nosworthy](https://www.linkedin.com/in/oscar-nosworthy-84190424242/)
