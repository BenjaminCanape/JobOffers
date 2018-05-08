import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header'

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      jobOfferList: []
    }
  }

  componentDidMount() {
    this.getJobOfferList()
      .then(jobOfferList => this.setState({ jobOfferList: jobOfferList }))
      .catch(err => console.log(err));
  }

  getJobOfferList = async () => {
    const response = await fetch('/jobOffers');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  getShortDescription(description){
    return description.substring(0,150);
  }

  render() {
    const {jobOfferList} = this.state

    return (
      <div className="App">
        <Header />

        {jobOfferList.length ? (
          jobOfferList.map( ({title, company, city, jobDescription}, index) => (
            <div key={index} className="jobOffer"> 
              <a href="/" className="jobOfferTitle"> {title}  </a><br/>
              <span>{company},{city}</span><br/>
              <span>{this.getShortDescription(jobDescription) }</span>
            </div>

        ))) : 
        ( <span> Aucune offre</span> )}
      </div>
    );
  }
}

export default App;
