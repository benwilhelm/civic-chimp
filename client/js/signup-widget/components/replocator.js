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
              <option value="IL">Illinois</option>
              <option value="OH">Ohio</option>
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
