const checkDoubleDigits = (num) => {
    return new Promise(function(resolve, reject) {
        if (num > 10) {
            resolve("The number is bigger than 10!");
        } else {
            reject("Error! The number is smaller than 10...");
        }
    })
    .then(
        (val) => { console.log( val ) },
        (err) => { console.log( err ) }
    );
};

checkDoubleDigits(55); // should resolve
checkDoubleDigits(10); // should reject
