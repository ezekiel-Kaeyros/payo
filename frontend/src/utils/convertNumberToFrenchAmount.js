// const convertNumberToFrenchAmount = (amount: number) => {
    
//     let formattedNumber = amount.toLocaleString('cm-CM', {
//         style: 'currency',
//         currency: 'XAF',
//     });
//     const formattedAmount: string = formattedNumber.replace("FCFA", "").replace(",", " ").trim() + " FCFA";
// }

// export default convertNumberToFrenchAmount; 



const numbersToWords = {
    0: "zero",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    10: "ten",
    11: "eleven",
    12: "twelve",
    13: "thirteen",
    14: "fourteen",
    15: "fifteen",
    16: "sixteen",
    17: "seventeen",
    18: "eighteen",
    19: "nineteen",
    20: "twenty",
    30: "thirty",
    40: "forty",
    50: "fifty",
    60: "sixty",
    70: "seventy",
    80: "eighty",
    90: "ninety",
  };

// const numbersToWordsFrench = {
//     0: "zero",
//     1: "un",
//     2: "deux",
//     3: "trois",
//     4: "quatre",
//     5: "cinq",
//     6: "six",
//     7: "sept",
//     8: "huit",
//     9: "neuf",
//     10: "dix",
//     11: "onze",
//     12: "douze",
//     13: "treize",
//     14: "quatorze",
//     15: "quinze",
//     16: "seize",
//     17: "dix-sept",
//     18: "dix-huit",
//     19: "dix-neuf",
//     20: "vingt",
//     30: "trente",
//     40: "quarante",
//     50: "cinquante",
//     60: "soixante",
//     70: "soixante-dix",
//     80: "quatre-vingts",
//     90: "quatre-vingt-dix",
//   };

export function convertNumberToFrench (number) {
    const units = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
    const tens = ['', 'dix', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt', 'quatre-vingt-dix'];
    const exceptions = {
        // 1: 'un',
        2: 'deux',
        4: 'quatre', 
        11: 'onze',
      12: 'douze',
      13: 'treize', 
      14: 'quatorze', 
      15: 'quinze', 
      16: 'seize',
      17: 'dix-sept',
      18: 'dix-huit', 
      19: 'dix-neuf', 
      10: 'dix',
      100: 'cent',
      1000: 'mille',
      1000000: 'un million',
      1000000000: 'un milliard'
    };
  
    if (exceptions[number]) {
      return exceptions[number];
    }
  
    if (number < 0) {
      return 'moins ' + convertNumberToFrench(Math.abs(number));
    }
  
    if (number < 10) {
      return units[number];
    }
  
    if (number < 20) {
      return units[number % 10] + 'ze';
    }
  
    if (number < 100) {
      const ten = Math.floor(number / 10);
      const unit = number % 10;
  
      if (unit === 0) {
        return tens[ten];
      }
  
      if (ten === 7 || ten === 9) {
        return tens[ten - 1] + '-' + convertNumberToFrench(10 + unit);
      }
  
      return tens[ten] + '-' + convertNumberToFrench(unit);
    }
  
    if (number < 1000) {
      const hundred = Math.floor(number / 100);
      const rest = number % 100;

      let cenLabel = "cents"

      if (units[hundred] === 'un') {
        cenLabel = "cent"
      }
  
      if (rest === 0) {
        // return units[hundred] + ' cents';
        return units[hundred] === 'un' ? cenLabel : ` ${ units[hundred] } cents`;
      }
  
      if (rest < 10) {
        // return units[hundred] + ' cents ' + convertNumberToFrench(rest);
        return units[hundred] === 'un' ? `${cenLabel} ${convertNumberToFrench(rest)}` : `${units[hundred]} cents ${convertNumberToFrench(rest)}`;
      }
  
      return units[hundred] === 'un' ? `${cenLabel} ${convertNumberToFrench(rest)}` : `${units[hundred]} cents ${convertNumberToFrench(rest)}`;
    }
  
    if (number < 2000) {
      const thousand = Math.floor(number / 1000);
      const rest = number % 1000;
  
      if (rest === 0) {
        return 'mille';
      }
  
      if (rest < 100) {
        return 'mille ' + convertNumberToFrench(rest);
      }
  
      return 'mille ' + convertNumberToFrench(rest);
    }
  
    if (number < 1000000) {
      const thousands = Math.floor(number / 1000);
      const rest = number % 1000;
  
      if (rest === 0) {
        return convertNumberToFrench(thousands) + ' mille';
      }
  
      if (rest < 100) {
        return convertNumberToFrench(thousands) + ' mille ' + convertNumberToFrench(rest);
      }
  
      return convertNumberToFrench(thousands) + ' mille ' + convertNumberToFrench(rest);
    }
  
    if (number < 1000000000) {
      const millions = Math.floor(number / 1000000);
      const rest = number % 1000000;
  
      if (rest === 0) {
        return convertNumberToFrench(millions) + ' million';
      }
  
      if (rest < 1000) {
        return convertNumberToFrench(millions) + ' million ' + convertNumberToFrench(rest);
      }
  
      return convertNumberToFrench(millions) + ' million ' + convertNumberToFrench(rest);
    }
  
    if (number < 1000000000000) {
      const billions = Math.floor(number / 1000000000);
      const rest = number % 1000000000;
  
      if (rest === 0) {
        return convertNumberToFrench(billions) + ' milliard';
      }
  
      if (rest < 1000000) {
        return convertNumberToFrench(billions) + ' milliard ' + convertNumberToFrench(rest);
      }
  
      return convertNumberToFrench(billions) + ' milliard ' + convertNumberToFrench(rest);
    }
  
    return 'Number out of range';
  }

// Define the convertNumberToWords function
function convertNumberToWords(number) {
    // if number present in object no need to go further
    if (number in numbersToWords) return numbersToWords[number];
  
    // Initialize the words variable to an empty string
    let words = "";
  
    // If the number is greater than or equal to 100, handle the hundreds place (ie, get the number of hundres)
    if (number >= 100) {
      // Add the word form of the number of hundreds to the words string
      words += convertNumberToWords(Math.floor(number / 100)) + " hundred";
  
      // Remove the hundreds place from the number
      number %= 100;
    }

    // If the number is greater than zero, handle the remaining digits
    if (number > 0) {
      // If the words string is not empty, add "and"
      if (words !== "") words += " and ";
  
      // If the number is less than 20, look up the word form in the numbersToWords object
      if (number < 20) words += numbersToWords[number];
      else {
        // Otherwise, add the word form of the tens place to the words string
        //if number = 37, Math.floor(number /10) will give you 3 and 3 * 10 will give you 30
        words += numbersToWords[Math.floor(number / 10) * 10];
  
        // If the ones place is not zero, add the word form of the ones place
        if (number % 10 > 0) {
          words += "-" + numbersToWords[number % 10];
        }
      }
    }
  
    // Return the word form of the number
    return words;
}
  
console.log(convertNumberToWords(123)); 

export function countDigits(number) {
  const numberString = String(number);
  return numberString.length;
}



export default convertNumberToWords; 


// // Convert numbers to words
// // copyright 25th July 2006, by Stephen Chapman http://javascript.about.com
// // permission to use this Javascript on your web page is granted
// // provided that all of the code (including this copyright notice) is
// // used exactly as shown (you can change the numbering system if you wish)

// // American Numbering System
// const th = ['','thousand','million', 'billion','trillion'];
// // uncomment this line for English Number System
// // var th = ['','thousand','million', 'milliard','billion'];

// const dg = ['zero','one','two','three','four', 'five','six','seven','eight','nine']; 

// const tn = ['ten','eleven','twelve','thirteen', 'fourteen','fifteen','sixteen', 'seventeen','eighteen','nineteen']; 

// var tw = ['twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety']; 

// const toWords = (s) => {
//     s = s.toString(); 
//     s =
//     s.replace(/[\, ]/g,''); 
//     if (s != parseFloat(s)) 
//     return 'not a number'; 
//     var x = s.indexOf('.'); 
//     if (x == -1) x = s.length; if (x > 15) return 'too big'; var n =
// s.split(''); var str = ''; var sk = 0; for (var i=0; i < x; i++) {if
// ((x-i)%3==2) {if (n[i] == '1') {str += tn[Number(n[i+1])] + ' '; i++; sk=1;}
// else if (n[i]!=0) {str += tw[n[i]-2] + ' ';sk=1;}} else if (n[i]!=0) {str +=
// dg[n[i]] +' '; if ((x-i)%3==0) str += 'hundred ';sk=1;} if ((x-i)%3==1) {if (sk)
// str += th[(x-i-1)/3] + ' ';sk=0;}} if (x != s.length) {var y = s.length; 
//     str +=
// 'point '; for (var i=x+1; istr.replace(/\s+/g,' ');
// }