import PubSub from 'pubsub-js';
import Request from '../services/Request';

export default class TimeLineStore {
    constructor(fotos) {
        this.fotos = fotos;
    }

    /* Likes */
    getListaFotos(username, callback) {
        let url = `http://localhost:3002/api/photos${username ? `/${username}` : ""}`;

        Request.send(url, "GET", true, null)
            .then(fotos => {
                this.fotos = fotos;
                callback(fotos);
            })
            .catch(err => console.log(err));
    };

    like(fotoId) {
        const url = `http://localhost:3002/api/photos/${fotoId}/likes`;
        Request.send(url, "POST", true)
            .then(response => {
                PubSub.publish("atualiza-likers", { fotoId, isLiked: response.isLiked });
            })
            .catch(err => console.log(err.message));
    };

    subscribeLikes(callback) {
        const likesUrl = `http://localhost:3002/api/photos/fotoId/likes`;

        PubSub.subscribe("atualiza-likers", (topico, data) => {
            Request.send(likesUrl.replace("fotoId", data.fotoId), "GET", true)
                .then((result) => {
                    let fotoLikeada = this.fotos.find(f => f.id === data.fotoId);
                    fotoLikeada.isLiked = data.isLiked;
                    fotoLikeada.likers = result.likers;
                    callback(this.fotos);
                })
                .catch(err => console.log(err.message));
        });
    };

    /* Comentários */
    comentar(fotoId, comentario) {
        const url = `http://localhost:3002/api/photos/${fotoId}/comments`;

        Request.send(url, "POST", true, { comment: comentario })
            .then(response => {
                PubSub.publish("atualiza-comentarios", { fotoId });
            })
            .catch(err => console.log(err.message));
    }

    subscribeComentarios(callback) {
        const commentsUrl = `http://localhost:3002/api/photos/fotoId/comments`;

        PubSub.subscribe("atualiza-comentarios", (topico, data) => {
            Request.send(commentsUrl.replace("fotoId", data.fotoId), "GET", true)
                .then((result) => {
                    let fotoComentada = this.fotos.find(f => f.id === data.fotoId);
                    fotoComentada.comments = result.comments;
                    callback(this.fotos);
                })
                .catch(err => console.log(err.message));
        });
    };
}