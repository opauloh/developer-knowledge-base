type MeuToken = string | number;

// agora aceita os tipos string e number!
function processaToken(token: MeuToken) {

    if (typeof (token) === 'number')
        token = token.toFixed();

    // muda o dígito 2 por X!
    return token.replace(/2/g, 'X');
}

// compila
const tokenProcessado1 = processaToken('1234');
// compila
const tokenProcessado2 = processaToken(1234);