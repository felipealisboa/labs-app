import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, Input, Label, FormGroup } from 'reactstrap';

class App extends Component {

  state = {
    users: [],
    newUserData: {
      name: '',
      username: '',
      email: '',
      zipcode: ''
    },
    editUserData: {
      id: '',
      username: '',
      email: '',
      zipcode: ''
    },
    newUserModal: false,
    editUserModal: false
  }

  componentWillMount() {
    this._refreshUsers();
  }

  toggleNewUserModal() {
    this.setState({
      newUserModal: ! this.state.newUserModal
    });
  }

  toggleEditUserModal() {
    this.setState({
      editUserModal: ! this.state.editUserModal
    });
  }

  addUser() {
    axios.post('http://localhost:3000/users', this.state.newUserData).then((response) => {
      let { users } = this.state;
      users.push(response.data);
      this.setState({ users, newUserModal: false, newUserData: {
        name: '',
        username: '',
        email: '',
        zipcode: ''
        }
      });
    });
  }

  updateUser() {
    let { name, username, email, zipcode } = this.state.editUserData;
    axios.put('http://localhost:3000/users/' + this.state.editUserData.id, {
      name, username, email, zipcode
    }).then((response) => {
      this._refreshUsers();
      this.setState({
        editUserModal: false, editUserData: {
          id: '', name: '', username: '', email: '', zipcode: ''
        }
      })
    });
  }

  editUser(id, name, username, email, zipcode) {
    this.setState({
      editUserData: { id, name, username, email, zipcode },
      editUserModal: ! this.state.editUserModal
    });
  }

  deleteUser(id) {
      axios.delete('http://localhost:3000/users/' + id).then((response) => {
        this._refreshUsers();
      });
    }

  _refreshUsers() {
    axios.get('http://localhost:3000/users')
    .then((response) => {
      this.setState({
        users: response.data
      })
    });
  }

  render() {
    let users = this.state.users.map((user) => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.address.zipcode}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editUser.bind(this, user.id, user.name, user.username, user.zipcode)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteUser.bind(this, user.id)}>Delete</Button>
          </td>
        </tr>
      )
    });
        return (
          <div className="App" container>
            <h1>Users App</h1>
            <Button class="my-3" color="primary" onClick={this.toggleNewUserModal.bind(this)}>Add New User</Button>
              <Modal isOpen={this.state.newUserModal} toggle={this.toggleNewUserModal.bind(this)}>
                <ModalHeader toggle={this.toggleNewUserModal.bind(this)}>New User</ModalHeader>
                <ModalBody>
                    <FormGroup>
                      <Label for="name">Full Name</Label>
                      <Input id="name" value={this.state.newUserData.name} onChange={(e) => {
                        let { newUserData } = this.state;
                        newUserData.name = e.target.value;

                        this.setState({ newUserData });
                      }} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="username">User Name</Label>
                      <Input id="username" value={this.state.newUserData.username} onChange={(e) => {
                        let { newUserData } = this.state;
                        newUserData.username = e.target.value;

                        this.setState({ newUserData });
                      }} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="email">@Email</Label>
                      <Input id="email" value={this.state.newUserData.email} onChange={(e) => {
                        let { newUserData } = this.state;
                        newUserData.email = e.target.value;

                        this.setState({ newUserData });
                      }} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="zipcode">Zip Code</Label>
                      <Input id="zipcode" value={this.state.newUserData.zipcode} onChange={(e) => {
                        let { newUserData } = this.state;
                        newUserData.zipcode = e.target.value;

                        this.setState({ newUserData });
                      }} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.addUser.bind(this)}>Add User</Button>{' '}
                  <Button color="secondary" onClick={this.toggleNewUserModal.bind(this)}>Cancel</Button>
                </ModalFooter>
              </Modal>

              <Modal isOpen={this.state.editUserModal} toggle={this.toggleEditUserModal.bind(this)}>
                <ModalHeader toggle={this.toggleEditUserModal.bind(this)}>Edit User</ModalHeader>
                <ModalBody>
                    <FormGroup>
                      <Label for="name">Full Name</Label>
                      <Input id="name" value={this.state.editUserData.name} onChange={(e) => {
                        let { editUserData } = this.state;
                        editUserData.name = e.target.value;

                        this.setState({ editUserData });
                      }} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="username">User Name</Label>
                      <Input id="username" value={this.state.editUserData.username} onChange={(e) => {
                        let { editUserData } = this.state;
                        editUserData.username = e.target.value;

                        this.setState({ editUserData });
                      }} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="email">@Email</Label>
                      <Input id="email" value={this.state.editUserData.email} onChange={(e) => {
                        let { editUserData } = this.state;
                        editUserData.email = e.target.value;

                        this.setState({ editUserData });
                      }} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="zipcode">Zip Code</Label>
                      <Input id="zipcode" value={this.state.editUserData.zipcode} onChange={(e) => {
                        let { editUserData } = this.state;
                        editUserData.zipcode = e.target.value;

                        this.setState({ editUserData });
                      }} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.updateUser.bind(this)}>Update User</Button>{' '}
                  <Button color="secondary" onClick={this.toggleEditUserModal.bind(this)}>Cancel</Button>
                </ModalFooter>
              </Modal>
            <Table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Zip code</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {users}
              </tbody>
            </Table>
          </div>
        );
      }
}

export default App;
