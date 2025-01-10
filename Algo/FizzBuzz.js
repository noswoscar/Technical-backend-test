const Fizzbuzz = (N) => {
      for (let i = 1; i <= N; i++) {
            let str = ''
            if (i % 3 === 0) {
                  str += 'Fizz'
            }
            if (i % 5 === 0) {
                  str += 'Buzz'
            }
            console.log(str || i)
      }
}

Fizzbuzz(100)
