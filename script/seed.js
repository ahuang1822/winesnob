

var Promise = require("bluebird");
var {
  db,
  Place, 
  User,
  Wine
} = require('./server/db/models');

var data = {
  user: [ 
    { firstName: 'Tara', lastName: 'Whirley', place: {
      address: "Union Sq & W 14th St",
      city: "New York",
      state: "NY",
      country: "USA",
      phone: "123-456-7890"
    }, email: 'whirleyt@outlook.com', password: 'Cowboys22'},
    { firstName: 'Kaci', lastName: 'Whirley', place: {
      address: "Union Sq & W 14th St",
      city: "New York",
      state: "NY",
      country: "USA",
      phone: "123-456-7890"
    }, email: 'kaciw@aol.com', password: 'dog' },
    { firstName: 'Susan', lastName: 'King', place: {
      address: "Union Sq & W 14th St",
      city: "New York",
      state: "NY",
      country: "USA",
      phone: "123-456-7890"
    }, email: 'allstart@gmail.com', password: 'dallas'},
    { firstName: 'Anne', lastName: 'Jones', place: {
      address: "Union Sq & W 14th St",
      city: "New York",
      state: "NY",
      country: "USA",
      phone: "123-456-7890"
    }, email: 'nicks23t@oaol.com', password: 'gangsta'},
    { firstName: 'Kyle', lastName: 'Wright', place: {
      address: "Union Sq & W 14th St",
      city: "New York",
      state: "NY",
      country: "USA",
      phone: "123-456-7890"
    }, email: 'wrightkyle@outlook.com', password: 'secret'},
    { firstName: 'Max', lastName: 'Allen', place: {
      address: "Union Sq & W 14th St",
      city: "New York",
      state: "NY",
      country: "USA",
      phone: "123-456-7890"
    }, email: 'max123@yahoo.com', password: 'password'},
    { firstName: 'Alex', lastName: 'Weis', place: {
      address: "Union Sq & W 14th St",
      city: "New York",
      state: "NY",
      country: "USA",
      phone: "123-456-7890"
    }, email: 'alex5mavs@outlook.com', password: 'cat' },
    { firstName: 'Micah', lastName: 'Friedman', place: {
      address: "Union Sq & W 14th St",
      city: "New York",
      state: "NY",
      country: "USA",
      phone: "123-456-7890"
    }, email: 'fried22@aol.com', password: 'diamonds' },
    { firstName: 'Joe', lastName: 'Doe', place: {
      address: "Union Sq & W 14th St",
      city: "New York",
      state: "NY",
      country: "USA",
      phone: "123-456-7890"
    }, email: 'joetgarcias@aol.com', password: 'wishes' },
    { firstName: 'Katie', lastName: 'Riley', place: {
      address: "Union Sq & W 14th St",
      city: "New York",
      state: "NY",
      country: "USA",
      phone: "123-456-7890"
    }, email: 'katieriley2@outlook.com', password: 'yes'},
    { firstName: 'Riley', lastName: 'Wilson', place: {
      address: "Union Sq & W 14th St",
      city: "New York",
      state: "NY",
      country: "USA",
      phone: "123-456-7890"
    }, email: 'wilsonriley@gmail.com', password: 'today' },
    { firstName: 'Max', lastName: 'Joyner', place: {
      address: "Union Sq & W 14th St",
      city: "New York",
      state: "NY",
      country: "USA",
      phone: "123-456-7890"
    }, email: 'max34@aol.com', password: 'passpass'},
    { firstName: 'Sally', lastName: 'Jones', place: {
      address: "Union Sq & W 14th St",
      city: "New York",
      state: "NY",
      country: "USA",
      phone: "123-456-7890"
    }, email: 'jonessally5@outlook.com', password: 'horse' },
    { firstName: 'Amy', lastName: 'Mane', place: {
      address: "Union Sq & W 14th St",
      city: "New York",
      state: "NY",
      country: "USA",
      phone: "123-456-7890"
    }, email: 'amymane2@yahoo.com', password: 'star'},
    { firstName: 'Will', lastName: 'Gilmore', place: {
      address: "Union Sq & W 14th St",
      city: "New York",
      state: "NY",
      country: "USA",
      phone: "123-456-7890"
    }, email: 'williamgilmore06@outlook.com', password: 'moon'},
    { firstName: 'Beth', lastName: 'Barnes', place: {
      address: "Union Sq & W 14th St",
      city: "New York",
      state: "NY",
      country: "USA",
      phone: "123-456-7890"
    }, email: 'bthbrn44@oaol.com', password: 'what', campusId: 1 },
    { firstName: 'Julie', lastName: 'Killarney', place: {
      address: "Union Sq & W 14th St",
      city: "New York",
      state: "NY",
      country: "USA",
      phone: "123-456-7890"
    }, email: 'juliejay88@outlook.com', password: 'sosecret' },
    { firstName: 'Sheng', lastName: 'Yang', place: {
      address: "Union Sq & W 14th St",
      city: "New York",
      state: "NY",
      country: "USA",
      phone: "123-456-7890"
    }, email: 'yizzyyang@yahoo.com', password: 'yelrihw' },
    { firstName: 'Marcus', lastName: 'Latomore', place: {
      address: "Union Sq & W 14th St",
      city: "New York",
      state: "NY",
      country: "USA",
      phone: "123-456-7890"
    }, email: 'marcusme@outlook.com', password: 'whirl2' },
    { firstName: 'Chris', lastName: 'Gun', place: {
      address: "Union Sq & W 14th St",
      city: "New York",
      state: "NY",
      country: "USA",
      phone: "123-456-7890"
    }, email: 'chrisgun33@aol.com', password: 'asacheer' }
  ],
  wine: [

{name: "Caymus", vintage: 2009, quantity: 2, description:"dsfsgdf", varietal: "Cabernet Sauvignon", price: 115.00, size: "750 ml", img:"", place:{ city: "Napa Valley", state: "California", country: "USA"}},
{name: "Flowers", vintage: 2014, quantity: 2, description:"dsfsgdf", varietal: "Pinot Noir", price: 90.00, size:"750 ml", img:"", place:{ city: "Sonoma Coast", state: "California", country: "USA"}},
{name: "Kistler", vintage: 2013, quantity: 2, description:"dsfsgdf", varietal: "Chardonnay", price: 149.99, size:"750 ml", img:"", place:{ city:"Sonoma Coast", state:"California", country:"USA"}}
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
// {name:, vintage:, varietal:, price:, size:, img:, place:{ city:, state:, country:},
  ]  
}












db
.sync({ force: true })
.then(function() {
  console.log("Dropped old data, now inserting data");
  return Promise.map(Object.keys(data), function(name) {
    return Promise.map(data[name], function(item) {
      return db.model(name).create(item, {
        include: [Place]
      });
    });
  });
})
.then(function() {
  console.log("Finished inserting data");
})
.catch(function(err) {
  console.error("There was totally a problem", err, err.stack);
})
.finally(function() {
  db.close(); // uses promises but does not return a promise. https://github.com/sequelize/sequelize/pull/5776
  console.log("connection closed"); // the connection eventually closes, we just manually do so to end the process quickly
  return null; // silences bluebird warning about using non-returned promises inside of handlers.
});





// /**
//  * Welcome to the seed file! This seed file uses a newer language feature called...
//  *
//  *                  -=-= ASYNC...AWAIT -=-=
//  *
//  * Async-await is a joy to use! Read more about it in the MDN docs:
//  *
//  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
//  *
//  * Now that you've got the main idea, check it out in practice below!
//  */
// const db = require('../server/db')
// const {User} = require('../server/db/models')

// async function seed () {
//   await db.sync({force: true})
//   console.log('db synced!')
//   // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
//   // executed until that promise resolves!

//   const users = await Promise.all([
//     User.create({email: 'cody@email.com', password: '123'}),
//     User.create({email: 'murphy@email.com', password: '123'})
//   ])
//   // Wowzers! We can even `await` on the right-hand side of the assignment operator
//   // and store the result that the promise resolves to in a variable! This is nice!
//   console.log(`seeded ${users.length} users`)
//   console.log(`seeded successfully`)
// }

// // Execute the `seed` function
// // `Async` functions always return a promise, so we can use `catch` to handle any errors
// // that might occur inside of `seed`
// seed()
//   .catch(err => {
//     console.error(err.message)
//     console.error(err.stack)
//     process.exitCode = 1
//   })
//   .then(() => {
//     console.log('closing db connection')
//     db.close()
//     console.log('db connection closed')
//   })

// /*
//  * note: everything outside of the async function is totally synchronous
//  * The console.log below will occur before any of the logs that occur inside
//  * of the async function
//  */
// console.log('seeding...')
