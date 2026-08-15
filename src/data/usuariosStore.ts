const CHAVE_USUARIOS = "usuarios";


export function buscarUsuarios() {

  const guardados =
    localStorage.getItem(CHAVE_USUARIOS);

  if (guardados) {
    return JSON.parse(guardados);
  }

  localStorage.setItem(
    CHAVE_USUARIOS,
    JSON.stringify([])
  );

  return [];
}



export function cadastrarUsuario(usuario: any) {

  const usuarios = buscarUsuarios();

  const novoUsuario = {
    id: Date.now(),
    ...usuario,
  };


  const atualizados = [
    ...usuarios,
    novoUsuario,
  ];


  localStorage.setItem(
    CHAVE_USUARIOS,
    JSON.stringify(atualizados)
  );


  return novoUsuario;
}



export function loginUsuario(
  email: string,
  senha: string
) {

  const usuarios = buscarUsuarios();

  return usuarios.find(
    (usuario: any) =>
      usuario.email === email &&
      usuario.senha === senha
  );

}