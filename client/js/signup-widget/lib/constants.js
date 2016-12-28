/**
 * Use this file to store application constants, including
 * environment-specific constants 
 */


// These are the defaults.
const constants = {
  baseUrl: "http://localhost:3000"
}


// These are the environmental overrides
switch (process.env.NODE_ENV) {
  case 'production': 
    throw new Error("No baseUrl defined for production");
    constants.baseUrl = ''
    break;
}



export default constants
