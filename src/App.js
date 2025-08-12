import React, { Component } from 'react';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Memorandum from './components/Memorandum';
import GenerateMemorandum from './components/GenerateMemorandum';
import './App.css';

// Define TESTParametersButton component at the top
const TESTParametersButton = () => (
  <button style={{margin: '5px', height: '50px', display: 'none'}} form="setTestForm" type="submit">Set Test Parameters</button>
);

class App extends Component {

  constructor(props){
      super(props);
      this.state={
          devMode: true,
      }
  }


  ToggleButton(){
    this.setState((currentState) => ({
        devMode: !currentState.devMode,
    }));
  console.log(this.state.devMode)
  }


  //LINKS for Buttons
    AirForceWriterLink(){
        window.open("http://www.airforcewriter.com/officialmemorandum.htm");
    }
    TheTongueAndQuillLink(){
        window.open("https://static.e-publishing.af.mil//production/1/saf_ds/publication/afh33-337/afh33-337.pdf");
    }
    GitHubLink(){
        window.open("https://github.com/jakemil")
    }


render() {

  //AutoGenerate the sessionStorage("adv"). Various issues are caused if it is not always present
  if(sessionStorage.getItem("adv") === null){
  sessionStorage.setItem("adv", ",,,")
}
return (
<HashRouter>
  <div>
    <h1 style={{
      textAlign: 'center', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      fontSize: '2.5rem',
      fontWeight: '700',
      margin: '2rem 0',
      textShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      Air Force Academy Memo Tool
    </h1>
{/*
    <svg style={{width: '80'}} className="devCorner" viewBox="0 0 80 80" aria-hidden="true">
      <path fill="rgb(70, 74, 78)" d="M80 0L80 80L0 0L80 0Z"></path>
    </svg>


    <label style={{transform: 'rotate(45deg)', margin: '0', top:'18', height: '20' }} className="devCorner switch"><input type="checkbox" className="" onClick={()=> this.ToggleButton() } /><span className="slider round"></span></label>
*/}
    <nav style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      padding: '1rem 2rem', 
      borderRadius: '12px', 
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)', 
      marginBottom: '2rem'
    }}>
      <ul style={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: '1rem', 
        listStyle: 'none', 
        margin: '0', 
        padding: '0',
        flexWrap: 'wrap'
      }}>
        <Link to={'/'} style={{textDecoration: 'none'}}>
          <button style={{
            background: 'rgba(255,255,255,0.2)', 
            border: 'none', 
            color: 'white', 
            padding: '12px 24px', 
            borderRadius: '8px', 
            fontSize: '16px', 
            fontWeight: '500', 
            cursor: 'pointer', 
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.3)';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.2)';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}>
            🏠 Home
          </button>
        </Link>
        <Link to={'/memorandum'} style={{textDecoration: 'none'}}>
          <button style={{
            background: 'rgba(255,255,255,0.2)', 
            border: 'none', 
            color: 'white', 
            padding: '12px 24px', 
            borderRadius: '8px', 
            fontSize: '16px', 
            fontWeight: '500', 
            cursor: 'pointer', 
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.3)';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.2)';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}>
            📋 Review
          </button>
        </Link>
        <TESTParametersButton />
        <button style={{
          background: 'rgba(255,255,255,0.2)', 
          border: 'none', 
          color: 'white', 
          padding: '12px 24px', 
          borderRadius: '8px', 
          fontSize: '16px', 
          fontWeight: '500', 
          cursor: 'pointer', 
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(255,255,255,0.3)';
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(255,255,255,0.2)';
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'none';
        }}
        onClick={this.AirForceWriterLink} type="button">
          ✈️ Air Force Writer
        </button>
        <button style={{
          background: 'rgba(255,255,255,0.2)', 
          border: 'none', 
          color: 'white', 
          padding: '12px 24px', 
          borderRadius: '8px', 
          fontSize: '16px', 
          fontWeight: '500', 
          cursor: 'pointer', 
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(255,255,255,0.3)';
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(255,255,255,0.2)';
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'none';
        }}
        onClick={this.TheTongueAndQuillLink} type="button">
          📖 The Tongue and Quill
        </button>
        <button style={{
          background: 'rgba(255,255,255,0.2)', 
          border: 'none', 
          color: 'white', 
          padding: '12px 20px', 
          borderRadius: '8px', 
          fontSize: '16px', 
          fontWeight: '500', 
          cursor: 'pointer', 
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(255,255,255,0.3)';
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(255,255,255,0.2)';
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'none';
        }}
        onClick={this.GitHubLink} type="button">
          <icon aria-hidden="true" className="fa fa-github" style={{marginRight: '8px'}} />
          GitHub
        </button>
      </ul>
    </nav>
    <hr />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/memorandum' component={Memorandum} />
      <Route path='/about' component={About} />
      <Route path='/generatememorandum' component={GenerateMemorandum} />
    </Switch>
  </div>
</HashRouter>
);
}
}

export default App;
