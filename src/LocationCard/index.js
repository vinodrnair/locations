import React from 'react'
import {Card, Button} from 'react-bootstrap';

// function LocationCard (props) {
//     let {data, index, editModeFn, deleteFn} = props.config
//     return (
//         <div className="col-md-6 locationCard" key={`locCard-${index}`}>                   
//         <Card>
//           <Card.Header>{data.name}</Card.Header>
//           <Card.Body>
//             <p className="address"><b>Address:</b>{data.address}</p>
//             <p className="position"><b>Latitude:</b>{data.position.lat}</p>
//             <p className="position"><b>Longitude:</b>{data.position.lng}</p>
//             <div className="footerButtons">
//               {props.config.editingIndex !== index ? <Button variant="primary" onClick={editModeFn.bind(this, index)}>Edit</Button> 
//               : <Button variant="primary" onClick={editModeFn.bind(this, -1)}>Cancel</Button>}
              
//               <Button variant="danger" onClick={deleteFn.bind(this, index)}>Delete</Button>
//             </div>
//           </Card.Body>
//         </Card>
//       </div>
//     )
// }

class LocationCard extends React.Component {
  render() {
    let props = this.props
    let {data, index, editModeFn, deleteFn} = props.config
    return (
        <div className="col-md-6 locationCard" key={`locCard-${index}`}>                   
        <Card>
          <Card.Header>{data.name}</Card.Header>
          <Card.Body>
            <p className="address"><b>Address:</b>{data.address}</p>
            <p className="position"><b>Latitude:</b>{data.position.lat}</p>
            <p className="position"><b>Longitude:</b>{data.position.lng}</p>
            <div className="footerButtons">
              {props.config.editingIndex !== index ? <Button variant="primary" onClick={editModeFn.bind(this, index)}>Edit</Button> 
              : <Button variant="primary" onClick={editModeFn.bind(this, -1)}>Cancel</Button>}
              
              <Button variant="danger" onClick={deleteFn.bind(this, index)}>Delete</Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default LocationCard