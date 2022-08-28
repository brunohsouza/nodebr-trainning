/*
0 - Obter usuario
1 - Obter o numero de telefone do usuario a partir de id
2 - Obter o endereco do usuario  pelo id
*/

function obterUsuario(callback) {
    setTimeout(function () {
        return callback (null, {
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date()

        }

    )}, 1000)
}

function obterTelefone(idUsuario) {
    setTimeout(() => {
        return {
            telefone: '123456',
            ddd: 353
        }

    }, 1000)
}

function obterEndereco(idUsuario) {
    setTimeout(() => {
        return {
            rua : 'dos bobos',
            numero: 0
        }

    }, 2000)

}

function resolverUsuario(erro, usuario) {

}

obterUsuario(function resolverUsuario(erro, usuario) {
    if (erro) {
        console.log('Deu ruim em usuario');
    }
})

const usuario = obterUsuario(resolverUsuario)
// const telefone = obterTelefone(usuario.id)

console.log('usuario', usuario)
//console.log('telefone', $telefone)