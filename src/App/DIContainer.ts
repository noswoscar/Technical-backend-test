export class DIContainer {
      private static instances = new Map()

      static register<T>(name: string, instance: T): void {
            this.instances.set(name, instance)
      }

      static resolve<T>(name: string): T {
            const instance = this.instances.get(name)
            if (!instance) {
                  throw new Error(`Instance not found : ${name}`)
            }
            return instance
      }
}
