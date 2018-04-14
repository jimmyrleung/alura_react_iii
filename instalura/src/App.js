import React, { Component } from 'react';
import Header from './Components/Header';
import TimeLine from './Components/TimeLine';
import { timeline } from './reducers/timeline';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';


// No flux, podemos e provavelmente teremos várias stores
// const timelineStore = new TimeLineStore([]);

// No redux temos uma única store, ou seja, dados centralizados
// A store recebe uma função redutora que será executada
const store = createStore(timeline, applyMiddleware(thunkMiddleware));

class App extends Component {
  // Podemos acessar as props no próprio constructor
  constructor(props) {
    super(props);

    // TODO: Página publica para /timeline/:username
    // olhar propriedade this.props.match para verificar se foi chamado /timeline ou /timeline/:username
  }

  render() {
    return (
      <div id="root">
        <div className="main">
          <Header />
          <TimeLine params={this.props.match.params} store={store} />
        </div>
      </div>
    );
  }
}

export default App;
