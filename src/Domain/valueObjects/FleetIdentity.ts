import { createId } from './createId'
export class FleetIdentity {
      private id: string
      private userName: string
      private owner: string
      constructor(userName: string) {
            this.id = createId()
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
