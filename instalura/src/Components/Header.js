import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import TimeLineApi from '../apis/TimelineApi';


export default class Header extends Component {
    constructor() {
        super();
        this.state = { msg: "" };
    }

    filtrarTimeline(evt) {
        evt.preventDefault();
        this.props.store.dispatch(TimeLineApi.pesquisa(this.pesquisaText.value));
    }

    componentWillMount() {
        // getStore retorna o ultimo valor retornado pela função redutora
        this.props.store.subscribe(() => this.setState({ msg: this.props.store.getState().header }));
    };

    render() {
        return (
            <header className="header container">
                <h1 className="header-logo">Instalura</h1>

                <form className="header-busca" onSubmit={this.filtrarTimeline.bind(this)}>
                    <input type="text" name="search" placeholder="Pesquisa" className="header-busca-campo" ref={(input) => this.pesquisaText = input} />
                    <input type="submit" value="Buscar" className="header-busca-submit" />
                </form>

                <nav>
                    <ul className="header-nav">
                        <li className="header-nav-item">
                            <span>{this.state.msg}</span>
                            {/*                 ♥ */}
                            {/* Quem deu like nas minhas fotos */}
                            <a>♡</a>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}