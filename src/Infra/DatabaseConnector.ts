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
      }

      connect = async (): Promise<void> => {
            await this.client.connect()
      }

      disconnect = async (): Promise<void> => {
            await this.client.end()
      }

      getClient = () => {
            return this.client
      }
}
