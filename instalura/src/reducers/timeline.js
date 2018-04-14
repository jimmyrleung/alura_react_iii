// Estado e ação que foi executada
// Estado inicial: lista vazia
// Essa é uma função redutora (reducer) pois recebe um estado, processa e devolve um novo estado
export function timeline(state = [], action) {
    if (action.type === 'LISTAGEM') {
        return action.fotos;
    }
    else if (action.type === 'LIKE') {
        let foto = state.find(f => f.id === action.fotoId);
        foto.isLiked = action.isLiked;
        foto.likers = action.likers;
        return state;
    }
    else if (action.type === 'COMENTARIO') {
        let foto = state.find(f => f.id === action.fotoId);
        foto.comments = action.comments;
    }

    return state;
}