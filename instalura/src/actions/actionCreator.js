export function listagem(fotos) {
    return { type: 'LISTAGEM', fotos };
};

export function like(fotoId, isLiked, likers) {
    return { type: 'LIKE', fotoId, isLiked, likers }
};

export function comentario(fotoId, comments) {
    return { type: 'COMENTARIO', fotoId, comments }
};

export function notificacao(msg) {
    return { type: 'NOTIFICACAO', msg }
};
