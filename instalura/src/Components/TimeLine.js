import React, { Component } from 'react';
import Foto from './Foto';
import TimelineApi from '../apis/TimelineApi';
import { connect } from 'react-redux';

// Container Component
class Timeline extends Component {
    constructor(props) {
        super(props);
        this.username = this.props.params.username;
    }

    // Quando chamamos por exemplo /timeline, nosso componente é instanciado e carrega o componentDidMount
    // Quando chamamos /timeline/user o componente não carrega o componentDidMount pois entende que somente
    // um parâmetro foi alterado. Portanto, para "forçarmos" um recarregamento nós temos que recorrer ao
    // componentWillReceiveProps
    componentWillReceiveProps(nextProps) {
        if (nextProps.params.username !== this.username) {
            this.username = nextProps.params.username || null;
            this.props.carregaTimeLine(this.username);
        }
    }

    // O connect gera nosso container component, portanto, não precisamos mais nos inscrever
    // pois isso já é feito pelo mapStateToProps

    // componentWillMount() {
    //     // getStore retorna o ultimo valor retornado pela função redutora
    //     this.props.store.subscribe(() => this.setState({ fotos: this.props.store.getState().timeline }));
    // };

    componentDidMount() {
        this.props.carregaTimeLine();
    };

    // carregaTimeLine() {
    //     this.props.store.dispatch(TimelineApi.getListaFotos(this.username, this.props.store));
    // };

    render() {
        return (
            <div className="fotos container">
                {
                    this.props.fotos.map(foto => <Foto key={foto.id} foto={foto} like={this.props.like} comentar={this.props.comentar} />)
                }
            </div>
        );
    };
}

// A ideia é que a store do redux seja nosso novo state
const mapStateToProps = state => {
    return { fotos: state.timeline }
};

const mapDispatchToProps = dispatch => {
    return {
        like: (fotoId) => { dispatch(TimelineApi.like(fotoId)); },
        comentar: (fotoId, comentario) => { dispatch(TimelineApi.comentar(fotoId, comentario)); },
        carregaTimeLine: (username) => { dispatch(TimelineApi.getListaFotos(username)) }
    }
};

// O connect nos dará um container component otimizado, por exemplo,
// com seu estado já linkado na store, com um shouldcomponentupdate implementado
// para evitar uma re-renderização sem mudança de estado, etc
// O connect pega o estado, as funções de dispatch e mapeia no nosso component
const TimelineContainer = connect(mapStateToProps, mapDispatchToProps)(Timeline);
export default TimelineContainer;