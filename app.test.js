const { describe, beforeEach, default: test } = require("node:test")
const app = require("./app.js")

let nums;

beforeEach(function () {
    nums = 1,2,1,1,3,2,1,1,5,1,1,2,3,1,3,2,5,1,1,1,2,1,1,4,1,1,5,1
})

describe("Test MEAN function", function () {
    test("Does /mean calculate the mean (average) of all nums passed into the query string?", function () {
        
    })
})


describe("Test MEDIAN function", function () {
    test("Does /median find the middle number of all nums passed into the query string?", function () {
        
    })
})


describe("Test MODE function", function () {
    test("Does /mode find the most common number by frequency of all nums passed into the query string?", function () {

    })
})