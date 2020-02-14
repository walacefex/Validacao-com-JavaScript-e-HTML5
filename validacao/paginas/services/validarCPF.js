const ehUmCPFComNumerosRepetidos = () => {
    const cpfsInvalidos = [
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999',
    ];
    return cpfsInvalidos.includes(cpf)
};
const calcularTotal = (multiplicador) => (resultado, numeroAtual) => resultado + numeroAtual * multiplicador --;

const calcularDigito = (parteCPF, multiplicador) =>{
const total = parteCPF.reduce(calcularTotal(multiplicador), 0);
const resto = total % 11;

const digito = 11 - resto;

    if(resto > 9){
         digito = 0
    }
    return digito;
}

export const validarCPF = input => {
    const cpfNumeros = input.value.replace(/\D/g, "");
    if(ehUmCPFComNumerosRepetidos(cpfNumeros)){
        input.setCustomValidity('Este não é um CPF valido');
        return;
    }
    const primeiraParteCPF = cpfNumeros.substr(0, 9).split('');
    const primeiroDigitoCPF = Number(cpfNumeros.chartAt(9));
    const primeiroDigitoCalclulado  = calcularDigito(primeiraParteCPF, 10);

        if(primeiroDigitoCPF !== primeiroDigitoCalclulado){
            input.setCustomValidity('Este não é um CPF válido');
            return;
        }

    const segundaParteCPF = cpfNumeros.substr(0, 10).split('');
    const segundoDigitoCPF = Number(cpfNumeros.chartAt(10));
    const segundoDigitoCalclulado = calcularDigito(segundaParteCPF, 11);



    if (segundoDigitoCPF !== segundoDigitoCalclulado) {
        input.setCustomValidity('Este não é um CPF válido');
        return;
    }


    input.setCustomValidity('');
};
