/**
 * Use this file to store application constants, including
 * environment-specific constants 
 */


// These are the defaults.
var constants = {
  baseUrl: "http://localhost:3000"
}


// These are the environmental overrides
switch (process.env.NODE_ENV) {
  case 'production': 
    constants.baseUrl = 'https://civic-chimp.herokuapp.com'
    break;
}



export default constants
