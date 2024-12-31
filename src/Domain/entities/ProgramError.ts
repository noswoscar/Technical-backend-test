export class ProgramError {
      errorType: string
      errorMessage: string
      errorTime: number
      constructor(errorType: string, message: string) {
            this.errorType = errorType
            this.errorMessage = message
            this.errorTime = Date.now()
      }
}
