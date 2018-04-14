import PubSub from 'pubsub-js';
import Request from '../services/Request';

export default class TimeLineApi {
    /* Likes */
    static getListaFotos(username, store) {
        let url = `http://localhost:3002/api/photos${username ? `/${username}` : ""}`;
        return dispatch => {
            Request.send(url, "GET", true, null)
                .then(fotos => {
                    dispatch({ type: 'LISTAGEM', fotos });
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
                    dispatch({ type: 'LIKE', fotoId, isLiked: response.isLiked, likers: response.likers });
                })
                .catch(err => console.log(err.message));
        }
    };

    /* Comentários */
    static comentar(fotoId, comentario) {
        const url = `http://localhost:3002/api/photos/${fotoId}/comments`;

        return dispatch => {
            Request.send(url, "POST", true, { comment: comentario })
                .then(response => {
                    dispatch({ type: 'COMENTARIO', fotoId, comments: response.comments });
                })
                .catch(err => console.log(err.message));
        }
    }
}