import { ProgramError } from '../entities/ProgramError'

const diff = (a: number, b: number) => {
      return Math.abs(a - b)
}
export class ErrorLog {
      private errors: Array<ProgramError>
      constructor() {
            this.errors = []
      }
      setError = (error: ProgramError) => {
            this.errors.push(error)
      }
      logError = (error: ProgramError) => {
            console.error(error.getErrorMessage())
      }
      getLastError = () => {
            return this.errors[this.errors.length - 1]
      }
      hasRecentRegistryError = (time: number) => {
            if (
                  this.errors.find((errorItem: ProgramError) => {
                        if (
                              errorItem.getErrorType() === 'RegistryError' &&
                              diff(errorItem.getErrorTime(), time) < 50
                        ) {
                              return true
                        }
                        return false
                  })
            ) {
                  return true
            }
            return false
      }
      hasRecentParkingError = (time: number): boolean => {
            if (
                  this.errors.find((errorItem: ProgramError) => {
                        if (
                              errorItem.getErrorType() === 'ParkingError' &&
                              diff(errorItem.getErrorTime(), time) < 50
                        ) {
                              return true
                        }
                        return false
                  })
            ) {
                  return true
            }
            return false
      }
}
