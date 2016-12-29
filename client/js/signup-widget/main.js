import React    from "react";
import ReactDOM from "react-dom";
import _ from "lodash"
import request from "request";

import SignupForm from "./components/signupform";
import RepLocator from "./components/replocator";
import ThankYou   from "./components/thank-you";
import constants from "./lib/constants";

class SignupWidget extends React.Component {
  constructor(props) {
    super(props);
    this.bindMethods();

    this.state = {
      email: "",
      reps: {
        senator1: {},
        senator2: {},
        congressperson: {},
        congressionalDistrict: ""
      },
      location: {
        street: "",
        city: "",
        state: "",
        zip: ""
      },
      located: false,
      requestPending: false,
      subscribed: false,
      errorMessage: ""
    }
  }
  
  bindMethods() {
    var self = this;
    ([
      '_handleRepLocatorChange',
      '_handleRepLocatorSubmit',
      '_handleSubscribeChange',
      '_handleSubscribeSubmit',
      'setRepresentatives'
    ]).forEach(fn => {
      self[fn] = self[fn].bind(self)
    })
  }
  
  _handleRepLocatorChange(e) {
    var location = Object.assign({}, this.state.location)
    location[e.target.name] = e.target.value
    this.setState({location: location})
  }
  
  _handleRepLocatorSubmit(e) {
    e.preventDefault();
    var self = this;
    this.setState({requestPending: true, errorMessage: "" })
    var queryString = this.getLocationQueryString(this.state.location);
    var url = `${constants.baseUrl}/representatives/?${queryString}`
    request.get(url, function(err, res){
      self.setState({requestPending: false})
      var resBody = JSON.parse(res.body)
      if (res.statusCode !== 200) {
        return self.setState({ errorMessage: "Could not locate your representatives. Please double check and try again." })
      }

      return self.setRepresentatives(resBody)
    })
  }
  
  _handleSubscribeChange(e) {
    this.setState({ email: e.target.value })
  }
  
  _handleSubscribeSubmit(e) {
    e.preventDefault();
    var self = this;
    self.setState({ requestPending: true, errorMessage: "" })
    var url = `${constants.baseUrl}/subscribers/`
    var location = self.state.location;
    var reps = self.state.reps;
    request.post(url, {
      json: true,
      body: {
        email: this.state.email,
        mergeFields: {
          ZIP        : location.zip,
          STATE      : location.state,
          CONG_DIST  : _.get(reps, 'congressionalDistrict'),
          US_REP     : _.get(reps, 'congressperson.name'),
          US_REP_PHO : _.get(reps, 'congressperson.phones.0'),
          US_SEN_1   : _.get(reps, 'senator1.name'),
          US_SEN1_PH : _.get(reps, 'senator1.phones.0'),
          US_SEN_2   : _.get(reps, 'senator2.name'),
          US_SEN2_PH : _.get(reps, 'senator2.phones.0')
        }
      }
    }, function(err, res){
      self.setState({ requestPending: false })
      if (res.statusCode !== 200) {
        var errorMessage = "There was a problem.";
        switch (res.body.error.STATUS_CODE) {
          case "MEMBER_EXISTS": 
            errorMessage = "That email already exists in our system.";
            break;
          
          case "INVALID_RESOURCE":
            errorMessage = "That does not appear to be a valid email address";
            break;
        }
        return self.setState({ errorMessage: errorMessage })
      }
      
      self.setState({ subscribed: true })
    })
  }
  
  setRepresentatives(params) {
    this.setState({
      located: true,
      reps: {
        senator1: params.senators[0],
        senator2: params.senators[1],
        congressperson: params.representative,
        congressionalDistrict: params.congressionalDistrict
      }
    })
  }
  
  getLocationQueryString(location) {
    return ([
      'street',
      'city',
      'state',
      'zip'
    ]).map(prop => {
      var val = encodeURIComponent(location[prop])
      return `${prop}=${val}`
    }).join("&")
  }
  
  render() {
    if (this.state.subscribed) {
      return <ThankYou />
    }
    
    if (this.state.located) {
      return <SignupForm reps={this.state.reps} 
                         email={this.state.email}
                         errorMessage={this.state.errorMessage}
                         handleChange={this._handleSubscribeChange}
                         handleSubmit={this._handleSubscribeSubmit} />
    }
    
    return <RepLocator handleChange={this._handleRepLocatorChange}
                       handleSubmit={this._handleRepLocatorSubmit}
                       errorMessage={this.state.errorMessage}
                       location={this.state.location} 
                       requestPending={this.state.requestPending} />
  }
}

ReactDOM.render(<SignupWidget />, document.getElementById('signup_widget'))
