import React from "react"

class ErrorMessage extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    if (!this.props.message) return false 
    
    return (
      <p className="well bg-danger text-danger">
        {this.props.message}
      </p>
    )
  }
}

export default ErrorMessage
