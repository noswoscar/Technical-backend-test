import { Fleet } from '../../../Domain/entities/Fleet'

export interface IRepository {
      find: () => void
      insert: (fleet: Fleet) => void
      update: () => void
      delete: () => void
}
