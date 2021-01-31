const checkDoubleDigits = num => {
  return new Promise(function(resolve, reject) {
    if (num > 10) {
      resolve('The number is bigger than 10!');
    } else {
      reject(new Error('Error! The number is smaller than 10...'));
    }
  });
};

// should resolve
checkDoubleDigits(55)
  .then(val => {
    console.log(val);
  })
  .catch(err => {
    console.log(err);
  });

// should reject
checkDoubleDigits(10)
  .then(val => {
    console.log(val);
  })
  .catch(err => {
    console.log(err);
  });
