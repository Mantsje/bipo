
function trimWhitespace (x) {
  x = x.trim()
  while (x.indexOf('  ') !== -1) {
    x = x.replace('  ', ' ')
  }
  return x
}

function optimizePunctuation (x) {
  let arr = x.split('')
  let parsedApostrophe = false
  let parsedQuotes = false
  for (let i = 0; i < arr.length; i++) {
    switch (arr[i]) {
      case '.':
        if (checkIfWebsite(arr, i)) {
          [arr, i] = removePrecedingSpace(arr, i);
          [arr, i] = removeSucceedingSpace(arr, i)
        } else {
          [arr, i] = removePrecedingSpace(arr, i)
        }
        break
      case ',':
      case ':':
      case ';':
      case '?':
      case '!':
        [arr, i] = removePrecedingSpace(arr, i)
        break
      case '\'':
      case '`':
        if (parsedApostrophe) {
          [arr, i] = removePrecedingSpace(arr, i)
        } else {
          [arr, i] = removeSucceedingSpace(arr, i)
        }
        parsedApostrophe = !parsedApostrophe
        break
      case '"':
        if (parsedQuotes) {
          [arr, i] = removePrecedingSpace(arr, i)
        } else {
          [arr, i] = removeSucceedingSpace(arr, i)
        }
        parsedQuotes = !parsedQuotes
    }
  }
  x = arr.join('')
  return x
}

function checkIfWebsite (arr, ind) {
  let str = arr.join('')
  let words = str.split(' ')
  let newInd = 0
  let c = words[newInd]
  while (c < ind) {
    c += words[newInd].length + 1
    newInd++
  }
  let cur = words[newInd]
  return (cur.includes('www') || cur.includes('://') || cur.includes('.com') || cur.includes('.nl') || cur.includes('.org'))
}

function removePrecedingSpace (arr, ind) {
  while (ind > 0 && arr[ind - 1] === ' ') {
    arr.splice(ind - 1, 1)
    ind--
  }
  return [arr, ind]
}

function removeSucceedingSpace (arr, ind) {
  while (ind < (arr.length - 1) && arr[ind + 1] === ' ') {
    arr.splice(ind + 1, 1)
  }
  return [arr, ind]
}

function fixCapitals (str) {
  if (str === '') return str
  str = str.toLowerCase()
  let arr = str.split(' ')
  for (let k = 0; k < arr.length; k++) {
    let word = arr[k]
    let i = 0
    while ((i < word.length && (word.charCodeAt(i) < 97 || word.charCodeAt(i) > 122)) &&
          !(word[i].charCodeAt(0) >= 48 && word[i].charCodeAt(0) <= 57)) {
      i++
    }
    let letters = word.split('')
    letters.splice(i, 1, word[i].toUpperCase())
    arr[k] = letters.join('')
  }
  str = arr.join(' ')
  return str
}

export function formatString (input) {
  input = input.replace(/\s*([,.!?:;])[,.!?:;]*\s*/g, '$1 ')
  input = trimWhitespace(input)
  input = optimizePunctuation(input)
  input = fixCapitals(input)
  return input
}

export function generateKey (sentence) {
  let words = sentence.toLowerCase().split(' ')
  for (let k = 0; k < words.length; k++) {
    let i = 0
    let letters = words[k].split('')
    while (i < letters.length) {
      if ((letters[i].charCodeAt(0) < 97 || letters[i].charCodeAt(0) > 122) &&
          !(letters[i].charCodeAt(0) >= 48 && letters[i].charCodeAt(0) <= 57)) {
        letters.splice(i, 1)
        i--
      }
      i++
    }
    words[k] = letters.join('')
  }
  return words.join('_')
}
