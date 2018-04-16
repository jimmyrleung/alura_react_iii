import Request from '../services/Request';
import { comentario, like, listagem, notificacao } from '../actions/actionCreator';

export default class TimeLineApi {
    /* Likes */
    static getListaFotos(username) {
        let url = `http://localhost:3002/api/photos${username ? `/${username}` : ""}`;
        return dispatch => {
            Request.send(url, "GET", true, null)
                .then(fotos => {
                    dispatch(listagem(fotos));
                    return fotos;
                })
                .catch(err => console.log(err));
        }
    };

    static like(fotoId) {
        const url = `http://localhost:3002/api/photos/${fotoId}/likes`;

        return dispatch => {
            Request.send(url, "POST", true)
                .then((response) => {
                    dispatch(like(fotoId, response.isLiked, response.likers));
                })
                .catch(err => console.log(err.message));
        }
    };

    /* Comentários */
    static comentar(fotoId, comment) {
        const url = `http://localhost:3002/api/photos/${fotoId}/comments`;

        return dispatch => {
            Request.send(url, "POST", true, { comment })
                .then(response => {
                    dispatch(comentario(fotoId, response.comments));
                })
                .catch(err => console.log(err.message));
        }
    };

    static pesquisa(username) {
        let url = `http://localhost:3002/api/photos/${username}`;
        return dispatch => {
            Request.send(url, "GET", true, null)
                .then(fotos => {
                    if (fotos.length === 0) {
                        dispatch(notificacao("Usuário não encontrado."));
                    }
                    else {
                        dispatch(notificacao(""));
                    }
                    dispatch(listagem(fotos));
                    return fotos;
                })
                .catch(err => console.log(err));
        }
    }
}