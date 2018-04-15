import React, { Component } from 'react';
import Foto from './Foto';
import TimelineApi from '../apis/TimelineApi';

// Container Component
export default class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = { fotos: [] };
        this.username = this.props.params.username;
    }

    // Quando chamamos por exemplo /timeline, nosso componente é instanciado e carrega o componentDidMount
    // Quando chamamos /timeline/user o componente não carrega o componentDidMount pois entende que somente
    // um parâmetro foi alterado. Portanto, para "forçarmos" um recarregamento nós temos que recorrer ao
    // componentWillReceiveProps
    componentWillReceiveProps(nextProps) {
        this.username = nextProps.params.username || null;
        this.carregaTimeLine();
    }

    componentWillMount() {
        // getStore retorna o ultimo valor retornado pela função redutora
        this.props.store.subscribe(() => this.setState({ fotos: this.props.store.getState().timeline }));
    };

    componentDidMount() {
        this.carregaTimeLine();
    };

    carregaTimeLine() {
        this.props.store.dispatch(TimelineApi.getListaFotos(this.username, this.props.store));
    };

    like(fotoId) {
        this.props.store.dispatch(TimelineApi.like(fotoId));
    };

    comentar(fotoId, comentario) {
        this.props.store.dispatch(TimelineApi.comentar(fotoId, comentario));
    };

    render() {
        return (
            <div className="fotos container">
                {
                    this.state.fotos.map(foto => <Foto key={foto.id} foto={foto} like={this.like.bind(this)} comentar={this.comentar.bind(this)} />)
                }
            </div>
        );
    };
}