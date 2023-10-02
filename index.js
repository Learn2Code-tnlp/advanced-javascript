// js is single-threaded synchronous language which execute code line by line - will run line by line and executes them in the order thy are written

//example we have 3tasks which is asynchronous code becoz in real time we dont really wait for 30mins for cake to be baked to prepare cold coffee
//task a - mix all ingredients for making cake
//task b- put the cake in microwav
//task c - prepare cold coffee

//we can write async code in javascript
//Async JS code - code which allows long running to run in background and other taks can run meanwhile without blocking
//console.log("I have finised TASK A to mix all ingredients of the cake.");
setTimeout(() => {
  //   console.log(
  //     "I have finished TASK B to bake the cake in microwave for half hour"
  //   );
}, 5000);
//console.log("i have finished TASK C to prepare cold coffee");

//output  will be -> 74, 80, 77

//promises -> special js object which links between producer and consumer
// role of promise object is to get the result rom producing code andsupply it to consuming code

//producer - piece of code which produces some result
// consumer - piece of code which waits for the p to produce the result so that it can onsume it

//promise object
//contains procuding code(inside a callback funtion) which is invoked immediately when promise is created

let promiseObj = new Promise((resolve, reject) => {});

//invoking a promise

let promiseObj1 = new Promise((resolve, reject) => {
  //  // console.log(
  //    // "procuding code(which itself is cllback function) is executed automatically as sson as promise obj is crteated"
  //   );
});

//console.log(promiseObj);

//promise has 2 internal props -> status and value , which cannot be internally accessed
// status is initialized to "pending" and value is undefined
// the result produced by the producer code may be a success or a failure:

// Success: When the result of the producer code is a success, we invoke the resolve() callback to resolve the promise object.- make status to be set to "reolved" and sets value to values being passed to resolve callback function

// Failure: When the result of the producer code is a failure, we invoke the reject() callback to reject the promise object. -> make status to be set to "reject" and sets value to values being passed to reject callback function

// 1. Suppose the promise is resolved and this method is invoked inside the producer code.

// resolve(val); // resolving a promise with some value

// In this case, the properties of the promise object change as:

// Status = ‘resolved’

// Value = val

// The property Status changes from ‘pending’ to ‘resolved’, and the property Value changes from undefined to val, passed as an argument while invoking the resolve(val) callback.

// 2. Suppose the promise is rejected and this method is invoked inside the producer code.

// reject(err); // rejecting a promise with some error

// In this case, the properties of the promise object change as:

// Status = ‘rejected’

// Value = err

// The property Status changes from ‘pending’ to ‘rejected’, and the property Value changes from 'undefined' to 'err', passed as an argument while invoking the reject(err) callback.

//impact of resolve() callback function on properties of promise object
let promiseObj2 = new Promise((resolve, reject) => {
  console.log("procuding code getting name from db ");
  //to mock db we use settimeout
  setTimeout(() => {
    resolve("Srishti");
  }, 3000);
});

console.log(promiseObj2);

//impact of reject() callback function on properties of promise object
let promiseObj3 = new Promise((resolve, reject) => {
  console.log("procuding code getting name from db ");
  //to mock db we use settimeout
  setTimeout(() => {
    reject(new Error("error getting name"));
  }, 3000);
});

console.log(promiseObj3);

// we can either resolve a promise or reject a promise but cannot do both
// if we do both, what we write gets called first, in below case resolve gets called first

let promiseObj4 = new Promise((resolve, reject) => {
  console.log("procuding code getting name from db ");
  //to mock db we use settimeout
  setTimeout(() => {
    resolve("Srishti");
    reject(new Error("error getting name"));
  }, 3000);
});

console.log(promiseObj4);

// there are two types of consumer code:

// 1. then() method

// then methods expects 2 callback functions as arguments
// one callback called when the promise is resolved and the arg for this callback function wil e the value passed to resolve((val))
// second callback called when the promise is rejected and the arg for this callback function wil e the value passed to reject((err))

// promiseObj3.then((paramstoholdwhenpromiseisresolved) => {//code to be executed when promise is reolved},
//     (paramstoholdwhenpromiseisrejectd) => {//code to be executed when promise is rejected}));

//example with then
let promiseObject = new Promise((resolve, reject) => {
  //producer code
  console.log("procuding code getting name from db ");
  //invoking the promise ie.resolve or rejct the promise so that consumer gets the result
  setTimeout(() => {
    resolve("srishti");
  }, 3000);
});

//define consumer
promiseObject.then(
  (val) => {
    //success callback handler will be executed when resolve is called from promise and "srishtii" will received as param to this
    console.log(`Name received from db = ${val}`);
  },
  (err) => {
    //error callback handler
    console.log(`rror occurred = ${err}`);
  }
);

// 2. catch() method - contains of a callback function which is called when a promise is rejected
// promiseObject.catch((paramstoholdwhenpromiseisrejectd) => {
//     //code to be executed when proimse is rejected
// };

//example
let promiseOjbect1 = new Promise((resolve, reject) => {
  console.log(" getting name from db ");
  setTimeout(() => {
    reject(new Error("Could not get name from DB"));
  }, 3000);
});

//defining a consumer
promiseOjbect1.catch((err) => {
  console.log(`rror occurred = ${err}`);
});

//--------------------------2 ways for deifning consumers
// 1. using then method
// 2. using catch

//1.
//example with then
let promiseObject1 = new Promise((resolve, reject) => {
  //producer code
  console.log("procuding code getting name from db ");
  //invoking the promise ie.resolve or rejct the promise so that consumer gets the result
  setTimeout(() => {
    resolve("srishti");
    // reject(new Error("Could not get name from DB"));
  }, 3000);
});

//define consumer
promiseObject1.then(
  (val) => {
    //success callback handler will be executed when resolve is called from promise and "srishtii" will received as param to this
    console.log(`Name received from db = ${val}`);
  },
  (err) => {
    //error callback handler
    console.log(`rror occurred = ${err}`);
  }
);

//2.
let promiseObject2 = new Promise((resolve, reject) => {
  //producer code
  console.log("procuding code getting name from db ");
  //invoking the promise ie.resolve or rejct the promise so that consumer gets the result
  setTimeout(() => {
    //resolve("srishsssti");
    reject(new Error("Could not get name from DB"));
  }, 3000);
});

//define then for resolve
promiseObject2.then((val) => {
  //success callback handler will be executed when resolve is called from promise and "srishtii" will received as param to this
  console.log(`Name received from db = ${val}`);
});

//define catch consumer for error
promiseObject2.catch((err) => {
  console.log(`error occured ${err}`);
});

//3. what if we have then having failure callback handler andf having catch too
let promiseObject3 = new Promise((resolve, reject) => {
  //producer code
  console.log("procuding code getting name from db ");
  //invoking the promise ie.resolve or rejct the promise so that consumer gets the result
  setTimeout(() => {
    //resolve("srishsssti");
    reject(new Error("Could not get name from DB"));
  }, 3000);
});

//define then for resolve
promiseObject2.then(
  (val) => {
    //success callback handler will be executed when resolve is called from promise and "srishtii" will received as param to this
    console.log(`Name received from db = ${val}`);
  },
  (err) => {
    //error callback handler
    console.log(`rror occurred = ${err}`);
  }
);

//define catch consumer for error
promiseObject2.catch((err) => {
  console.log(`error occured ${err}`);
});

// defining callback
let add = (callback) => {
  let x = 2;
  y = 3;
  console.log("sum :", x + y);
  callback(); //calling the callback function
};

//defining callback as inline
add(() => {
  console.log("finished his operation");
});

// defining callback as an individual function
let sub = (callback) => {
  let x = 2;
  y = 3;
  console.log("sum :", x - y);
  callback(); //calling the callback function
};
//defining callback as inline
sub(() => {
  console.log("finished his operation");
});

//for both add and sub, callback has same code which leads to code redundancy
// thats why we define callback fn as individual fn and then pass this an arg to primary function nside which oits called

//exmpla
let displayCompletion = () => {
  console.log("finished this operation");
};

add(displayCompletion);
sub(displayCompletion);

//callbacks are mainly used in async prog

//example
let name;
let getName = (callback) => {
  //get name from DB
  setTimeout(() => {
    name = "Swahi";
    callback();
  }, 2000);
};

let greet = () => {
  console.log(`Hello ${name}`);
};

getName(greet);

//callback hell due to nested callbacks

//using promises as a solution to callback hell

//es8 keywords - async and await based on promises but make it more easy

// prepend a function with async to make it asynchronous
let feoo = () => Promise.resolve("Prasanna");

let foo = async () => Promise.resolve("Prasanna");

//adding consumer
foo().then((val) => {
  alert(val);
});

let foo2 = async () => "Prasanna";
//adding consumer to a function which doesnt return a promise
foo2().then((val) => {
  alert(val);
});

// above proves prepending async to any function makes it return a promise even thpugh we didnt write it

//await makes the js wait till the promise is settled(resolved or rejected)

//example using async and await

//defining the promise object with the producer

let namePromise = new Promise((resolve, reject) => {
  console.log("getting name from DB");
  setTimeout(() => {
    resolve("Prassu");
    //reject(new Error("could not get the name from DB"));
  }, 3000);
});

let getname = async () => {
  try {
    let name = await namePromise; // this line - control will wait till the promise is settled
    console.log(`Name received = ${name}`);
  } catch (err) {
    console.log(err);
  }
};
getName();

// JavaScript is a single-threaded language, yet it exhibits asynchronous behavior.
// Callbacks are the functions that are to be called when some predefined action is completed. When there are multiple levels of callbacks inside callbacks, they form a triangular shape known as callback hell. This makes it difficult to read, maintain and debug the code.
// Promises are a new way of writing asynchronous functions, and they are useful for converting callback hell into much more readable and manageable code.
// async and await are the keywords introduced in ES8 to write asynchronous functions in JavaScript.
