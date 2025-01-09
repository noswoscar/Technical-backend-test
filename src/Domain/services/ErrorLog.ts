import { ProgramError } from '../entities/ProgramError'
export class ErrorLog {
      private errors: Array<ProgramError>
      constructor() {
            this.errors = []
      }

      setError = (error: ProgramError) => {
            this.errors.push(error)
      }

      logError = (error: ProgramError) => {
            console.error(
                  'App',
                  error.getErrorType(),
                  'error :',
                  error.getErrorMessage()
            )
      }

      getLastError = () => {
            return this.errors[this.errors.length - 1]
      }

      hasRecentRegistryError = (time: number) => {
            const found = this.errors.find((errorItem: ProgramError) => {
                  if (
                        errorItem.getErrorType() === 'RegistryError' &&
                        this.checkTimeDiff(errorItem.getErrorTime(), time) < 50
                  ) {
                        return true
                  }
                  return false
            })
            if (found) return true
            return false
      }

      hasRecentParkingError = (time: number): boolean => {
            const found = this.errors.find((errorItem: ProgramError) => {
                  if (
                        errorItem.getErrorType() === 'ParkingError' &&
                        this.checkTimeDiff(errorItem.getErrorTime(), time) < 50
                  ) {
                        return true
                  }
                  return false
            })
            if (found) return true
            return false
      }

      private checkTimeDiff = (a: number, b: number) => {
            return Math.abs(a - b)
      }
}
