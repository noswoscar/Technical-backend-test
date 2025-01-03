import pg, { Client, Connection } from 'pg'

export class DatabaseConnector {
      private client: Client
      constructor() {
            this.client = new pg.Client({
                  user: 'oscar',
                  host: 'localhost',
                  database: 'ParkingApp',
                  password: 'password',
                  port: 5433,
            })
            // this.client.on('error', (err) => {
            //       console.error('Unexpected error on idle client', err)
            //       process.exit(-1)
            // })
      }

      connect = async () => {
            let promise = await this.client.connect()
            return promise
      }

      disconnect = async () => {
            await this.client.end()
      }

      getClient = () => {
            return this.client
      }
}
