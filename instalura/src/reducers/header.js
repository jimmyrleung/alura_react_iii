export function header(state = "", action) {
    if (action.type === 'NOTIFICACAO') {
        return action.msg;
    }

    // Se nenhuma dessas opções forem acionadas, retorna o estado atual para mantê-lo
    return state;
}