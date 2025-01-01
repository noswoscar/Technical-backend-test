export class FleetIdentity {
      private id: string
      private userName: string
      private owner: string
      constructor(userName: string) {
            this.id =
                  new Date().getTime().toString(36) +
                  Math.random().toString(36).slice(2)
            this.userName = userName
            this.owner = userName
      }
      getId = () => {
            return this.id
      }

      getUserName = () => {
            return this.userName
      }
}
