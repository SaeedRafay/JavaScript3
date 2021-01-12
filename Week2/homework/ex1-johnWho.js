// Callback syntax
/* const getAnonName = (firstName, callback) => {
  setTimeout(() => {
    if (!firstName)
      return callback(new Error("You didn't pass in a first name!"));

    const fullName = `${firstName} Doe`;

    return callback(fullName);
  }, 2000);
};

getAnonName('John', console.log); */

// Promise syntax
const getAnonName = function(firstName) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      if (firstName) {
        resolve(firstName);
      } else {
        reject("You didn't pass in a first name!");
      }
    }, 2000);
  }).then(
    function(val) {
      console.log(`${val} Doe`);
    },
    function(err) {
      console.log(new Error(err));
    },
  );
};

getAnonName('John');
