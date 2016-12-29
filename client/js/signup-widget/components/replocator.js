import React from 'react'
import ErrorMessage from "./error-message";

class RepLocator extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    var disabled = !!this.props.requestPending
    var submitText = this.props.requestPending ? 'Locating...' : 'Locate My Representatives';

    return (
      <form onSubmit={this.props.handleSubmit}>
        <h2>Find Your Reps</h2>
        
        <ErrorMessage message={this.props.errorMessage} />
        <div className="form-group">
          <label htmlFor="street">Street Address</label>
          <input type="text" 
                 className='form-control' 
                 name='street' 
                 disabled={disabled}
                 value={this.props.location.address}
                 onChange={this.props.handleChange} />
        </div>
        <div className="row">
          <div className="form-group col-xs-6">
            <label htmlFor="city">City</label>
            <input type="text" 
                   className="form-control" 
                   name='city'
                   disabled={disabled}
                   value={this.props.location.city}
                   onChange={this.props.handleChange} />
          </div>
          <div className="form-group col-xs-3">
            <label htmlFor="state">State</label>
            <select className="form-control" 
                    name='state'
                    disabled={disabled}
                    value={this.props.location.state}
                    onChange={this.props.handleChange} >
              <option value=""></option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </div>
          <div className="form-group col-xs-3">
            <label htmlFor="zip">ZIP</label>
            <input type="text" 
                   className="form-control" 
                   name='zip'
                   disabled={disabled}
                   value={this.props.location.zip}
                   onChange={this.props.handleChange} />
          </div>
        </div>
        
        <input className='btn btn-primary btn-block' 
               type="submit" 
               value={submitText} />
      </form>
    )
  }
}

export default RepLocator
