export class ProgramError {
      private errorType: string
      private errorMessage: string
      private errorTime: number

      constructor(errorType: string, message: string) {
            this.errorType = errorType
            this.errorMessage = message
            this.errorTime = Date.now()
      }

      public getErrorType = () => {
            return this.errorType
      }

      public getErrorMessage = () => {
            return this.errorMessage
      }

      public getErrorTime = () => {
            return this.errorTime
      }
}
