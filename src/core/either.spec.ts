import { type Either, left, right } from './either'

function doSomething(x: boolean): Either<string, number> {
  if (x) {
    return right(42)
  } else {
    return left('It failed!')
  }
}

test('Success result', () => {
  const result = doSomething(true)

  expect(result.isRight()).toBe(true)
  expect(result.isLeft()).toBe(false)
})

test('Error result', () => {
  const result = doSomething(false)

  expect(result.isLeft()).toBe(true)
  expect(result.isRight()).toBe(false)
})
