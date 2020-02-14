export const validarDataNascimento = input => {
    const dataNascimento = new Date(input.value); //23/12/1997
    const dataAtual = new Date(); //2020

    //exemplo 23/12/2015
    const dataFaz18 = new Date(
        dataNascimento.getUTCFullYear() + 18,
        dataNascimento.getUTCMonth(),
        dataNascimento.getUTCDate()
    );



    if(dataFaz18 > dataAtual){
        input.setCustomValidity("A idade mínima é 18 anos ");
        return;
    }

    input.setCustomValidity("");
    return;
}