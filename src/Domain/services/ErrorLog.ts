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
            console.error(error.errorMessage)
      }
      getLastError = () => {
            return this.errors[this.errors.length - 1]
      }
      hasRecentRegistryError = (time: number) => {
            if (
                  this.errors.find((errorItem: ProgramError) => {
                        if (
                              errorItem.errorType === 'RegistryError' &&
                              diff(errorItem.errorTime, time) < 50
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
                              errorItem.errorType === 'ParkingError' &&
                              diff(errorItem.errorTime, time) < 50
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
