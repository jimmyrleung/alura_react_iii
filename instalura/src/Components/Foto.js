import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FotoHeader extends Component {
    render() {
        return (
            <header className="foto-header">
                <figure className="foto-usuario">
                    <img src="https://instagram.fcgh5-1.fna.fbcdn.net/vp/27db352236ac366c829fb84c9c4a58ce/5B75E5A0/t51.2885-19/s150x150/28763591_116100165895442_7796318781382328320_n.jpg" alt="foto do usuario" />
                    <figcaption className="foto-usuario">
                        <Link to={`/timeline/${this.props.foto.username}`}>{this.props.foto.username}</Link>
                    </figcaption>
                </figure>
                <time className="foto-data">{this.props.foto.date}</time>
            </header>
        );
    }
}

class FotoInfo extends Component {
    render() {
        return (
            <div className="foto-info">
                <div className="foto-info-likes">
                    {this.props.foto.likers.length > 0 ? "♡ " : ""}
                    {
                        this.props.foto.likers.map((liker, i) => {
                            return this.props.foto.likers.length - 1 !== i ?
                                <span><Link key={liker} to={`/timeline/${liker}`}>{liker}</Link>, </span> :
                                <span><Link key={liker} to={`/timeline/${liker}`}>{liker}</Link></span>
                        })
                    }
                </div>

                <p className="foto-info-legenda">
                    <a className="foto-info-autor">{this.props.foto.username} </a>
                    {this.props.foto.description}
                </p>

                <ul className="foto-info-comentarios">
                    {
                        this.props.foto.comments.map(comentario =>
                            <li className="comentario">
                                <Link key={`${comentario.username}${comentario.text}`} className="foto-info-autor" to={`/timeline/${comentario.username}`}>{comentario.username}</Link>
                                {" " + comentario.text}
                            </li>
                        )
                    }
                </ul>
            </div>
        );
    }
}

class FotoAtualizacoes extends Component {

    like(evt) {
        evt.preventDefault();
        this.props.like(this.props.foto.id);
    };

    comentar(evt) {
        evt.preventDefault();
        this.props.comentar(this.props.foto.id, this.comentario.value);
    };

    render() {
        return (
            <section className="fotoAtualizacoes">
                <a onClick={this.like.bind(this)} className={this.props.foto.isLiked ? 'fotoAtualizacoes-like-ativo pointer' : 'fotoAtualizacoes-like pointer'}>Likar</a>
                <form className="fotoAtualizacoes-form" onSubmit={this.comentar.bind(this)}>
                    <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" ref={(input) => this.comentario = input} />
                    <input type="submit" value="Comentar" className="fotoAtualizacoes-form-submit" />
                </form>
            </section>
        );
    }
}

export default class Foto extends Component {
    render() {
        return (
            <div className="foto">
                <FotoHeader foto={this.props.foto} />
                <img alt="foto" className="foto-src" src={this.props.foto.url} />
                <FotoInfo foto={this.props.foto} />
                <FotoAtualizacoes foto={this.props.foto} like={this.props.like} comentar={this.props.comentar} />
            </div>
        );
    }
}