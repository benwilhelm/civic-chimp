import React from "react"

class Representative extends React.Component {
  
  constructor(props) {
    super(props)
  }
  
  render() {
    var rep = this.props.rep;
    if (!rep || !rep.phones) {
      return false
    }
    
    return <dl>
      <dt>{rep.name}</dt>
      {
        rep.phones.map(phone => {
          return <dd key={phone}>{phone}</dd>
        })
      }
    </dl>
  }
}

export default Representative
