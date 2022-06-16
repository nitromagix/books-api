//

const {
   json
} = require("express");

const trace = label => value => {
   console.log(`\r\n${label} --> ${typeof value === 'object' ? JSON.stringify(value) : value}`);
   return value;
};

const stub = (name) => `<h1>${name}</h1>`;

const apiStub = (name) => {
   return ({
      stub: name
   })
};

const apiErrorStub = (error) => {

   return ({
      error: error
   })
};

const dateToMMDDYYYY = date => `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`


module.exports = {
   trace,
   stub,
   apiStub,
   apiErrorStub,
   dateToMMDDYYYY
}