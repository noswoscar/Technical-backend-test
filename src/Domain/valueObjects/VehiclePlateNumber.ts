export class VehiclePlateNumber {
      private numberPlate: string

      constructor() {
            this.numberPlate = this.generateNumberPlate()
      }

      getNumberPlate = () => {
            return this.numberPlate
      }

      generateNumberPlate = () => {
            const numberPlate =
                  this.getRandomLetters(2) +
                  ' ' +
                  this.getRandomNumbers(3) +
                  ' ' +
                  this.getRandomLetters(2)
            return numberPlate
      }

      getRandomLetters = (count: number) => {
            let acc = ''
            for (let i = 0; i < count; i++) {
                  const randomCharCode =
                        Math.floor(Math.random() * (91 - 65)) + 65
                  acc += String.fromCharCode(randomCharCode)
            }
            return acc
      }

      getRandomNumbers = (count: number) => {
            let acc = Math.floor(Math.random() * (999 - 100 + 1) + 100)
            return acc
      }
}
