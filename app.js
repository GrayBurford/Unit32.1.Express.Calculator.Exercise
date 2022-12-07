
// Build an Express.js app that performs 3 statistical operations given an arbitrary amount of numbers:

// mean (average)
// median (midpoint)
// mode (most frequent)

// The operations are invoked via one route per operation.

const express = require('express');
const app = express();
const ExpressError = require('./error.js')

app.use(express.json())

app.get('/mean', function calcMean (request, response, next) {
    const query = request.query.nums;
    // console.log("Query:", query);
    if (!query) {
        throw new ExpressError("Bad Request: (Missing parameters). nums are required!", 400);
    };

    const arrayOfNumsAsStrings = query.split(',');
    // console.log("arrayOfNumsAsStrings:", arrayOfNumsAsStrings);

    const arrayOfNumsAsNums = arrayOfNumsAsStrings.map(x => parseInt(x))
    // console.log("arrayOfNumsAsNums:", arrayOfNumsAsNums);

    for (let each of arrayOfNumsAsNums) {
        if (!Number.isInteger(each)) throw new ExpressError('Only instances of Number allowed.', 400);
    }

    const reduced = arrayOfNumsAsNums.reduce(function (a, c) {
        return a + c;
    }, 0);

    const val = reduced / arrayOfNumsAsNums.length;

    response.json({
        operation: "mean",
        value: val
    });
})


app.get('/median', function calcMedian (request, response, next) {
    const query = request.query.nums;
    console.log("Query:", query);
    if (!query) {
        throw new ExpressError("Bad Request: (Missing parameters). nums are required!", 400);
    };

    const arrayOfNumsAsStrings = query.split(',');

    const arrayOfNumsAsNums = arrayOfNumsAsStrings.map(x => parseInt(x))

    for (let each of arrayOfNumsAsNums) {
        if (!Number.isInteger(each)) throw new ExpressError('Only instances of Number allowed.', 400);
    }

    const sortedNums = arrayOfNumsAsNums.sort((a, b) => a - b);
    console.log("Sorted:", sortedNums);

    const midIdx = 
        sortedNums.length % 2 === 0
            ? sortedNums.length / 2
            : Math.floor(sortedNums.length / 2)

    const val = sortedNums[midIdx]

    response.json({
        operation: "median",
        value: val
    });
})


app.get('/mode', function calcMode (request, response, next) {
    const query = request.query.nums;
    console.log("Query:", query);
    if (!query) {
        throw new ExpressError("Bad Request: (Missing parameters). nums are required!", 400);
    };

    const arrayOfNumsAsStrings = query.split(',');
    console.log("arrayOfNumsAsStrings:", arrayOfNumsAsStrings);

    const arrayOfNumsAsNums = arrayOfNumsAsStrings.map(x => parseInt(x));
    console.log("arrayOfNumsAsNums:", arrayOfNumsAsNums);

    for (let each of arrayOfNumsAsNums) {
        if (!Number.isInteger(each)) throw new ExpressError('Only instances of Number allowed.', 400);
    }

    let data = {};

    for (let i = 0; i < arrayOfNumsAsNums.length; i++) {
        if (data[arrayOfNumsAsNums[i]]) {
            data[arrayOfNumsAsNums[i]]++;
        } else {
            data[arrayOfNumsAsNums[i]] = 1;
        }
    }
    console.log("data after loop:", data)

    const sortedDataValues = Object.values(data).sort((a, b) => a - b).reverse();
    console.log("Sorted:", sortedDataValues);

    const modeValue = sortedDataValues[0]

    const mode = Object.keys(data).find(key => data[key] === modeValue);

    response.json({
        operation: "mode",
        value: mode
    });
})


// If no other route matches, respond with a 404
// If we call next AND pass in a value, it will hit our Error Handler function below
app.use((req, res, next) => {
    const e = new ExpressError("Page Not Found", 404);
    next(e);
})

// ERRROR HANDLER
// ERRROR HANDLER
app.use(function (err, req, res, next) { //Note the 4 parameters!
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.msg;
  
    // set the status and alert the user
    return res.status(status).json({
      error : { message, status }
    });
  });


app.listen(3000, function port () {
    console.log("Server is running on port 3000");
})

module.exports = app;