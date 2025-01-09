import pg, { Client } from 'pg'

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
      }

      public connect = async (): Promise<void> => {
            await this.client.connect()
      }

      public disconnect = async (): Promise<void> => {
            await this.client.end()
      }

      public getClient = () => {
            return this.client
      }
}
