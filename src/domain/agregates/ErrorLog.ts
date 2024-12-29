import { Error } from '../entities/Error'
import { Fleet } from '../entities/Fleet'
import { Vehicle } from '../entities/Vehicle'

export class ErrorLog {
      private errors: Array<Error>
      constructor() {
            this.errors = []
      }
      setError = (error: Error) => {
            this.errors.push(error)
      }
      logError = (error: Error) => {
            console.error(error.errorMessage)
      }
      getLastError = () => {
            return this.errors[this.errors.length - 1]
      }
      hasRegistryError = (
            errorType: string,
            vehicle: Vehicle,
            fleet: Fleet,
            time: string
      ) => {
            if (
                  this.errors.find((errorItem: Error) => {
                        return errorItem.errorType === errorType
                  })
            ) {
                  return true
            }
            return false
      }
}
