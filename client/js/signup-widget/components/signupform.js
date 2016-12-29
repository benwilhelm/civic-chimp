import React from "react";
import Representative from "./representative";
import ErrorMessage from "./error-message";

class SignupForm extends React.Component {
  
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <h2>Subscribe</h2>
        <ErrorMessage message={this.props.errorMessage} />
        <div className="row">
          <div className="col-xs-8">
            <input type="email" 
                   name='email' 
                   className="form-control" 
                   placeholder='Your Email'
                   value={this.props.email}
                   onChange={this.props.handleChange} />
          </div>
          <div className="col-xs-4">
            <input type="submit" 
                   className='btn btn-primary btn-block col-xs-4' 
                   value="Subscribe" />
          </div>
        </div>
        
        <h3>Your Representatives</h3>
        <div className="row">
          <div className="col-xs-6">
            <h4>House</h4>
            <p>{this.props.reps.congressionalDistrict}</p>
            <Representative rep={this.props.reps.congressperson} />
          </div>
          <div className="col-xs-6">
            <h4>Senate</h4>
            <Representative rep={this.props.reps.senator1} />
            <Representative rep={this.props.reps.senator2} />
          </div>
        </div>

      </form>
    )
  }
}

export default SignupForm
