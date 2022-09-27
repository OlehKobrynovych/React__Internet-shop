/*
 I have selected the functions that I often use on projects &
 I think they will also help you in your work :)
*/

const _MS_PER_DAY = 1000 * 60 * 60 * 24

const dateDiffInDays = (a, b) => {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())

  return Math.floor((utc2 - utc1) / _MS_PER_DAY)
}

const addTwoVeryLargeNumbers = (first, second) => {
    if (first.length >= second.length) {
        findSum(first, second)
    } else {
        findSum(second, first)
    }
    
    function findSum(first, second) {
        let sum = ''
        let carry = 0
        let diff = second.length - first.length

        for (i = first.length - 1; i >= 0; i--) {

            let temp =
                (Number(first.charAt(i)) % 10) +
                (Number(second.charAt(i + diff)) % 10) +
                carry

            if (temp >= 10) {
                sum = (temp % 10) + sum
                carry = Math.floor(temp / 10)
            } else {
                sum = temp + sum
                carry = 0
            }
        }

        if (carry) {
            sum = carry + sum
        }

        return sum
    }
}
    
// Returns true if str1 is smaller
// than str2, else false.
const isSmaller = (str1, str2) => {
    // Calculate lengths of both string
    let n1 = str1.length, n2 = str2.length

    if (n1 < n2)
        return true
    if (n2 < n1)
        return false

    for (let i = 0; i < n1; i++) {
        if (str1[i].charCodeAt() < str2[i].charCodeAt())
            return true
        else if (str1[i].charCodeAt() > str2[i].charCodeAt())
            return false
    }

    return false
}

// Function for finding difference of
// larger numbers
const findDiff = (str1, str2) => {
    // Before proceeding further,
    // make sure str1 is not smaller
    if (isSmaller(str1, str2)) {
        let t = str1
        str1 = str2
        str2 = t
    }

    // Take an empty string for
    // storing result
    let str = ""

    // Calculate lengths of both string
    let n1 = str1.length, n2 = str2.length
    let diff = n1 - n2

    // Initially take carry zero
    let carry = 0

    // Traverse from end of both strings
    for (let i = n2 - 1; i >= 0; i--) {
        // Do school mathematics, compute
        // difference of current digits and carry
        let sub = ((str1[i + diff].charCodeAt() -
                    '0'.charCodeAt())
                - (str2[i].charCodeAt() -
                    '0'.charCodeAt()) - carry)
        if (sub < 0) {
            sub = sub + 10
            carry = 1
        }
        else
            carry = 0

        str += sub.toString()
    }

    // subtract remaining digits of str1[]
    for (let i = n1 - n2 - 1; i >= 0; i--) {
        if (str1[i] == '0' && carry > 0) {
            str += "9"
            continue
        }
        let sub = ((str1[i].charCodeAt() -
                    '0'.charCodeAt()) - carry)
        if (i > 0 || sub > 0) // remove preceding 0's
            str += sub.toString()
        carry = 0
    }

    // reverse resultant string
    let aa = str.split('')
    aa.reverse()
    return aa.join("")
}

const validateEmail = (possible_email) => {
    return String(possible_email)
      .toLowerCase()
      .match(
        /^(([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/
      )
}

const stringIsEmpty = (possible_string) => {
    return possible_string === null || possible_string.trim() === ""
}

const isNumber = (possible_number) => {
    return isNaN(possible_number)
}

const multiply = (a, b) => {
    let isASingleDigit = 0, isBSingleDigit = 0
    if (a < 9) { a *= 10; isASingleDigit = 1 }
    if (b < 9) { b *= 10; isBSingleDigit = 1 }
    //First step is to seperate a & b into arrays so that we are only dealing with 7 digits at a time 

    let lengthOfA = a.length,
        lengthOfB = b.length,
        aInArry = [],
        bInArry = [];

    while (a.length > 7) {
        aInArry.push(a.substring(a.length - 7, a.length))
        a = a.substring(0, a.length - 7)
    }
    aInArry.push(a)

    while (b.length > 7) {
        bInArry.push(b.substring(b.length - 7, b.length))
        b = b.substring(0, b.length - 7)
    }
    bInArry.push(b)

    aInArry = aInArry.reverse()
    bInArry = bInArry.reverse()

    //Second step is to multiply the 2 arrays with each other

    let answerLines = []

    for (var i = aInArry.length - 1, j = 0; i >= 0; i-- , j++) {
        answerLines[j] = bInArry.map((n) => n * aInArry[i] === NaN ? '0000000' : n * aInArry[i])
        //this is to ensure the array takes into account that the second row of the matrix should be followed by 7 x "o's" and the third by 14, and so on.
        var k = 0;
        while (k < j) {
            answerLines[j].push(0)
            k += 1
        }
    }

    //Third step is to add the columns of the answer lines into an new array
    var answerInArray = answerLines[answerLines.length - 1];

    for (var j = 1; j < answerInArray.length; j++) {
        for (var i = 0; i < answerLines.length - 1; i++) {
            if (answerLines[i].length >= j) {
                answerInArray[answerInArray.length - j] += answerLines[i][answerLines[i].length - j]
            }
        }
    }

    //Fourth step is to make sure each element is only 7 digits long and the additional digits are added to the prevoius element

    let answerIn7DigitBlocksArray = []

    for (var i = 0; i < answerInArray.length; i++) {
        answerIn7DigitBlocksArray.push('')
    }

    for (var i = 1; i <= answerInArray.length; i++)
        if (i !== answerInArray.length) {
            answerIn7DigitBlocksArray[answerIn7DigitBlocksArray.length - i] = answerInArray[answerInArray.length - i].toString().substring(answerInArray[answerInArray.length - i].toString().length - 7, answerInArray[answerInArray.length - i].toString().length);
            answerInArray[answerInArray.length - i - 1] += parseInt(answerInArray[answerInArray.length - i].toString().substring(0, answerInArray[answerInArray.length - i].toString().length - 7))
        } else
            answerIn7DigitBlocksArray[0] = answerInArray[0]

    //Lastly join the array into a string
    if (isASingleDigit) { answerIn7DigitBlocksArray[answerIn7DigitBlocksArray.length - 1] /= 10 }
    if (isBSingleDigit) { answerIn7DigitBlocksArray[answerIn7DigitBlocksArray.length - 1] /= 10 }


    return answerIn7DigitBlocksArray.join('')
}

const arrayContainsObject = (obj, list) => {
    var i
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true
        }
    }

    return false
}

const valueExistIntoTheObject = (obj, value) => {
    return Object.values(obj).includes(value)
}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const removeDuplicatesFromAnArrayOfObjects = (array, uniqueKey) => {
    const uniqueItems = []

    const unique = array.filter(element => {
      const isDuplicate = uniqueItems.includes(element[uniqueKey])
    
      if (!isDuplicate) {
        uniqueItems.push(element[uniqueKey])
    
        return true
      }
    
      return false
    });

    return uniqueItems
}

module.exports = {
    validateEmail,
    stringIsEmpty,
    isNumber,
    dateDiffInDays,
    addTwoVeryLargeNumbers,
    findDiff,
    isSmaller,
    multiply,
    arrayContainsObject,
    valueExistIntoTheObject,
    capitalizeFirstLetter,
    removeDuplicatesFromAnArrayOfObjects
}