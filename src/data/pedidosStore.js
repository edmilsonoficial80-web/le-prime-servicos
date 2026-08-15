import { pedidos } from "./pedidos";
export function buscarPedidos() {
    const guardados = localStorage.getItem("pedidos");
    if (guardados) {
        return JSON.parse(guardados);
    }
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    return pedidos;
}
export function adicionarPedido(novoPedido) {
    const listaAtual = buscarPedidos();
    const atualizados = [
        ...listaAtual,
        novoPedido,
    ];
    localStorage.setItem("pedidos", JSON.stringify(atualizados));
    return atualizados;
}
