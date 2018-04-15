import { List } from 'immutable';
// Estado e ação que foi executada
// Estado inicial: lista vazia
// Essa é uma função redutora (reducer) pois recebe um estado, processa e devolve um novo estado

export function timeline(state = new List(), action) {
    if (action.type === 'LISTAGEM') {
        return new List(action.fotos);
    }
    else if (action.type === 'LIKE') {
        return trocaFoto(state, action.fotoId, () => {
            return { isLiked: action.isLiked, likers: action.likers };
        });
    }
    else if (action.type === 'COMENTARIO') {
        return trocaFoto(state, action.fotoId, () => {
            return { comments: action.comments };
        });
    }

    // Se nenhuma dessas opções forem acionadas, retorna o estado atual para mantê-lo
    return state;
}

// Nosso código se torna imutável pois em nenhum momento alteramos diretamente um objeto
// com atribuição, nós operamos sobre eles com métodos
function trocaFoto(lista, fotoId, callbackNovasPropriedades) {
    const fotoEstadoAntigo = lista.find(f => f.id === fotoId);
    const novasPropriedades = callbackNovasPropriedades();

    // Pega um objeto vazio, cria praticamente uma cópia de 'fotoEstadoAntigo'
    // e substitui as propriedades indicadas por novasPropriedades
    const fotoEstadoNovo = Object.assign({}, fotoEstadoAntigo, novasPropriedades);
    const indice = lista.findIndex(f => f.id === fotoId);
    return lista.set(indice, fotoEstadoNovo);
};