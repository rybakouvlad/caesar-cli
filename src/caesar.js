const regExp = /[a-zA-Z]/;

const encode = (value, secretKey) => {
  const secret = checkSecret(secretKey);
  const arr = value.split("");
  for (let i = 0; i < arr.length; i++) {
    if (regExp.test(arr[i])) {
      const asci = arr[i].charCodeAt(0);
      if (asci >= 65 && asci <= 90) {
        if (asci + secret > 90) {
          arr[i] = String.fromCharCode(asci + secret - 91 + 65);
        } else {
          arr[i] = String.fromCharCode(asci + secret);
        }
      }
      if (asci >= 97 && asci <= 122) {
        if (asci + secret > 122) {
          arr[i] = String.fromCharCode(asci + secret - 123 + 97);
        } else {
          arr[i] = String.fromCharCode(asci + secret);
        }
      }
    }
  }
  return arr.join("");
};

const decode = (value, secretKey) => {
  const secret = checkSecret(secretKey);
  const arr = value.split("");
  for (let i = 0; i < arr.length; i++) {
    if (regExp.test(arr[i])) {
      const asci = arr[i].charCodeAt(0);
      if (asci >= 65 && asci <= 90) {
        if (asci - secret < 65) {
          arr[i] = String.fromCharCode(91 + (asci - secret - 65));
        } else {
          arr[i] = String.fromCharCode(asci - secret);
        }
      }
      if (asci >= 97 && asci <= 122) {
        if (asci - secret < 97) {
          arr[i] = String.fromCharCode(123 + (asci - secret - 97));
        } else {
          arr[i] = String.fromCharCode(asci - secret);
        }
      }
    }
  }
  return arr.join("");
};

const checkSecret = (secret) => {
  if (secret < 0) {
    if (secret % 26 === 0) {
      return 26 + secret;
    } else return 26 + (secret % 26);
  }
  if (secret > 26) {
    return Number(secret % 26);
  } else {
    return Number(secret);
  }
};

module.exports = {
  encode,
  decode,
};
