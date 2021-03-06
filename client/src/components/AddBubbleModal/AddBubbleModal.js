import React, { Component } from 'react'
import { Button, Header, Modal, Form, Input, Icon, Dropdown } from 'semantic-ui-react'

import API from '../../utils/API';
import querystring from 'querystring';

class AddBubbleModal extends Component {

  state = { open: false, name: '' }
  bubbleOptions = [{ value: 1, text: 'Circle One' }, { value: 2, text: 'Circle Two' }, { value: 3, text: 'Circle Three' }]


  show = dimmer => () => this.setState({ dimmer, open: true })

  createBubble = () => {

    console.log("props", this.props)
    let bubbles = this.props.bubbles;
    this.setState({ open: false })

    API.createBubble({ name: this.state.name}).then(res => {
      console.log("WHAT DIS", res.data)
      bubbles.push(res.data);
      this.props.updateBubbles(bubbles)

    }
    )


  }

  close = () =>
    this.setState({ open: false })

  handleChange = (event) => {

    this.setState({ name: event.target.value, bubbleCategories: event.target.value })
    console.log(event.target.value)
    console.log(this.state.bubbleCategories)
  }

  render() {
    const { open, dimmer } = this.state
    

    return (
      <div>
        <div className="AddBubble" onClick={this.show('blurring')}>
          <Header as='h4'>
            <Icon name='plus' />
            <Header.Content>Add ELITE</Header.Content>
          </Header>
        </div>
        <Modal closeIcon dimmer={dimmer} open={open} onClose={this.close} >
          <Modal.Header>Create a New ELITE</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field required>
                <label>ELITE Name</label>
                <Input
                  placeholder='ELITE Name'
                  name="name"
                  onChange={this.handleChange} />
                </Form.Field>
                <Form.Group required inline>
              <label>ELITE Circle</label>
              <Dropdown placeholder='ELITE Circle' value={this.state.bubbleCategories} selection options={this.bubbleOptions} onChange={this.handleChange}/>
            </Form.Group>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            {/* <Button
              positive
              icon='x'
              labelPosition='right'
              content="No Bubble!"
              onClick={this.onClose}
            /> */}
            <Button
              basic
              color='black'
              icon='checkmark'
              labelPosition='right'
              content="Make New ELITE!"
              onClick={this.createBubble}
            />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default AddBubbleModal
