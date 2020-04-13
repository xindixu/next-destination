import React, {useState} from "react";
import { Form } from "react-bootstrap";
import "./form.css";

class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
        event.preventDefault();
        console.log(`search term: ${ this.state.value }`);
        const name = this.state.value
        
    }
  
    render() {
      return (
        <>
        <h1> Search </h1>
        
        <div id="background">
        </div>
        <table>
          <td>
            <button class="city_but">Cities</button>
          </td>
          <td>
            <button class="restaurants_but">Restaurants</button>
          </td>
          <td>
            <button class="events_but">Events</button>
          </td>
        </table>
        
        <form onSubmit={this.handleSubmit} >
          <label>
            Name:
            <input type="text" name='search_form' value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <p></p>
        
        </>
      );
    }
  }

  export default NameForm;