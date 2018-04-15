import React, { Component } from 'react';
import Header from './Components/Header';
import TimeLine from './Components/TimeLine';
import { timeline } from './reducers/timeline';
import { header } from './reducers/header';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';


// No flux, podemos e provavelmente teremos várias stores
// const timelineStore = new TimeLineStore([]);

// A store do redux recebe uma única função redutora. Para resolver esse problema,
// podemos utilizar o módulo 'combineReducers' do próprio redux
const reducers = combineReducers({ timeline, header });

// No redux temos uma única store, ou seja, dados centralizados
// A store recebe uma função redutora que será executada
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

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
          <Header store={store} />
          <TimeLine params={this.props.match.params} store={store} />
        </div>
      </div>
    );
  }
}

export default App;
