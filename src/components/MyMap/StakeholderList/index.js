import React from 'react';

import { Row } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Draggable, Droppable } from 'react-drag-and-drop'

class StakeholderList extends React.Component {

  constructor(props) {

    super(props);

    const { projectUserList, userList } = props;

    this.state = {
      projectUserList,
      userList,
    };
  }

  componentWillReceiveProps(props) {
    const { projectUserList, userList } = props;
    
    this.setState({
      projectUserList,
      userList
    });
  }

  render() {
    
    return (
      <Row className="stakeholder-list-container">
        <Colxx xs="12">
          <ul>
          {
            this.state.projectUserList.map((statkeholder, index) => {
              
              const user = this.state.userList.find(element => {
                return element.id === statkeholder.user
              });

              // if (user.is_superuser === true) return;
              if (user.first_name === '' && user.last_name === '') return;

              // const user = findObjectByKey(this.state.userList, 'id', statkeholder.user);

              return (
                <Draggable key={index} type="stakeholder" data={statkeholder.id} >
                  <li className="stakeholder-item">
                    <FontAwesomeIcon icon="user" />
                    <span>{user.first_name + " " + user.last_name}</span>
                    <a href="/"><FontAwesomeIcon icon="plus"/></a>
                  </li>
                </Draggable>
              )}
            )
          }
          </ul>
        </Colxx>  
      </Row>
    )
  }
}

export default StakeholderList;