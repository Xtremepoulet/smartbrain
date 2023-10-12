import './App.css'
import React, { Component } from 'react'
import Navigation from './components/Navigation';
import Inputfield from './components/Inputfield';
import ParticlesBg from 'particles-bg'
import Clarifai from 'clarifai'
import ImageField from './components/imagefield/imagefield';
import Signin from './components/signin/signin';
import Register from './components/register/register';

const app = new Clarifai.App({
  apiKey: '80d06163be4f4089b5dc156e79cad75c'
 });


 const MODEL_ID = 'general-image-recognition';
 const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';




class App extends Component {


  constructor(){
    super();
    this.state = {
      input: '',
      url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2Ff3cLOucMpD0%2Fmaxresdefault.jpg&f=1&nofb=1&ipt=115c2f5211eadafbb8b9a824aff90eb8bd9eec31400b50aa999030227e1df2f0&ipo=images',  //va changer pour etre dynamique
      concept: [],
      route: 'signin',
      isSignedIn: true,
      user: {
        id: '',
        name: '',
        email: '',
        joined: '',
        entries: ''
      }
    }
  }


  //external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.-XXN4Y5N9CvzsVDOmI9VlwHaEK%26pid%3DApi&f=1&ipt=ac0f191c9eff630ad23b3dec21b96cbca02e396ec4cc6e8a01415547ae68743b&ipo=images

requestOptions = () => {
      // Your PAT (Personal Access Token) can be found in the portal under Authentification
      const PAT = 'c6086e8cf04e4aa6aa04e311ca963189';
      // Specify the correct user_id/app_id pairings
      // Since you're making inferences outside your app's scope
      const USER_ID = 'us2slrw223jz';       
      const APP_ID = 'smartBrain';
      // Change these to whatever model and image URL you want to use    
      const IMAGE_URL = this.state.input;
  
      ///////////////////////////////////////////////////////////////////////////////////
      // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
      ///////////////////////////////////////////////////////////////////////////////////
  
      const raw = JSON.stringify({
          "user_app_id": {
              "user_id": USER_ID,
              "app_id": APP_ID
          },
          "inputs": [
              {
                  "data": {
                      "image": {
                          "url": IMAGE_URL
                      }
                  }
              }
          ]
      });
  
      const requestOptions = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Key ' + PAT
          },
          body: raw
      };

      return requestOptions;
  
      // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
      // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
      // this will default to the latest version_id
}



  loadUser = (data) => {
    this.setState({ user: {
      id: data.id,
      name: data.name,
      email: data.email,
      joined: data.joined,
      entries: data.entrie
    } })
  }

 
  //we load inside our state the concept of our API (its name concept by the API. we take this word)
  conceptLoading = (data) => {

    this.setState({concept: data})
    
  }

  
  //on input on our input, we modify the value of input 
  onInput = (event) => {
    this.setState({input: event.target.value })
  }



  //on submit button, we call ou url and our API 
  onSubmit = () => {
    this.setState({url: this.state.input})
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", this.requestOptions())
    .then(response => response.json())
    .then(result => {
      if(result.status.code >= 10000 && result.status.code < 30000){
        this.conceptLoading(result.outputs[0].data.concepts)
        fetch('http://localhost:3001/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(data => {
          Object.assign(this.state.user, {entries: data});
        })
       
      } else {
        console.log("really an error ? ")
  
        // this.setState({ input: 'https://wi-images.condecdn.net/image/Yregvqx6jOP/crop/405/f/oppenheimer.jpg'})
        this.setState({ url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.imgflip.com%2F1fasq4.jpg&f=1&nofb=1&ipt=70168b2d5d709b92456ac86fc502d07d31455a3312baecd6e42213906ca5ee10&ipo=images'})
        this.setState({ concept: []})
      }
    })
    .catch(error => console.log('error', error));

  }



  //modification of our route for displaying pages 
  onChangeRoute = (route) => {

    if(this.state.route === 'home'){
      this.setState({ isSignedIn: true })
    } else if (this.state.route === 'signinout'){
      this.setState({ isSignedIn: false })
    }

    this.setState( {route: route} )
  }
 



  render(){
    return(
      
      <div className='container'>


        <ParticlesBg color={'#025458'} num={100} type="cobweb" bg={true} />
             

        {/* <Signin /> */}

        { this.state.route === 'home' 

            ? <div>
            <Navigation onChangeRoute={this.onChangeRoute} isSignedIn={this.state.isSignedIn}/>
            <Inputfield onInput={this.onInput} onSubmit={this.onSubmit} user={this.state.user}/>
            <ImageField url={this.state.url} concept={this.state.concept}/>
          </div>
          
          : (this.state.route === 'signin'

          ? <Signin loadUser={this.loadUser} onChangeRoute={this.onChangeRoute}/>
          : <Register loadUser={this.loadUser} onChangeRoute={this.onChangeRoute}/>
          
          )
             
        }
        
      </div>



    );
  }
}


export default App