import React, { Component } from 'react';
import Foto from './Foto';
import PubSub from 'pubsub-js';

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
        this.props.store.subscribeLikes(fotos => this.setState({ fotos }));

        this.props.store.subscribeComentarios(fotos => this.setState({ fotos }));

        PubSub.subscribe("filtrar-timeline", (topico, data) => this.carregaTimeLine(null, `?p=${data.text}`));
    };

    componentDidMount() {
        this.carregaTimeLine();
    };

    carregaTimeLine() {
        this.props.store.getListaFotos(this.username, fotos => this.setState({ fotos }));
    };

    like(fotoId) {
        this.props.store.like(fotoId);
    };

    comentar(fotoId, comentario) {
        this.props.store.comentar(fotoId, comentario);
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