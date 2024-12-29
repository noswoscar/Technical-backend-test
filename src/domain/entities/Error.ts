export class Error {
      errorType: string
      errorMessage: string
      errorTime: string
      constructor(errorType: string, message: string) {
            this.errorType = errorType
            this.errorMessage = message
            this.errorTime = 'now'
      }
}
