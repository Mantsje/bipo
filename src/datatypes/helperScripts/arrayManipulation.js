
export function objToArray (obj) {
  let result = []
  for (let o in obj) {
    result.push(o)
  }
  return result
}

export function shuffleArray (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

export function generateRandomSubset (array, size) {
  array = shuffleArray(array)
  array = array.slice(0, size)
  return array
}

export function alternateAndShuffle (arr0, arr1) {
  arr0 = shuffleArray(arr0)
  arr1 = shuffleArray(arr1)
  let smallest = Math.min(arr0.length, arr1.length)
  let out = []
  for (let i = 0; i < smallest; i++) {
    out.push(arr0[i])
    out.push(arr1[i])
  }
  if (arr0.length > arr1.length) {
    out.push(arr0[arr0.length - 1])
  } else if (arr0.length < arr1.length) {
    out.push(arr1[arr1.length - 1])
  }
  return out
}
