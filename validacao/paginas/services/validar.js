import { validarDataNascimento } from './valirdarDataNascimento.js';
import { validarCPF } from './validarCPF.js';
import { recuperarEndereco } from './recuperarEndereco.js';

const retornarMensagemDeErro = (tipo, validity ) => {
    let mensagemDeErro = '';
    const tiposErros = ['valueMissing, typeMismastch', 'tooShort', 'rangeUnderFlow', 'customError', 'patternMismatch'];

    const mensagensDeErro ={
        email: {
            valueMissing: 'O E-mail é necessário',
            typeMismatch: 'Este não é um e-mail válido'
        },
        senha: {
            valueMissing: 'A senha é necessário',
            tooShort: 'A senha deve ter no mínimo 4 caracteres'
        },
        dataNascimento: {
            valueMissing: 'A data de nascimento é necessário',
            rangeUnderFlow: 'A data minimoa é 01/01/1901',
            customError: 'A idade mínima é 18 anos'
        },
        cpf:{
            valueMissing: 'O CPF é necessário',
            customError: 'Esse CPF não é valido'
        },
         rg: {
            valueMissing: 'O RG é necessário',
        },
        cep: { 
            valueMissing: 'O CEP é necessário',
            patternMismatch: 'Este não é um CEP válido', 
            customError: 'Este não é um CEP válido'
        },
        logradouro: {
             valueMissing: 'O logradouro é necessário',
        },
        cidade: {
             valueMissing: 'A Cidade é necessário',
        },
        estado: {
             valueMissing: 'O estado é necessário',
        },
    };
    //interrar os tipos de error
    tiposErros.forEach(erro => {
        if(validity[erro]){
            mensagemDeErro = mensagensDeErro[tipo][erro];
        }
    });
    return mensagemDeErro;
};

export const validarInput = (input, adicionarErro = true) =>{

    const classeElementoErro = 'erro-validacao';
    const classeInputErro = 'possui-erro';
    const elementoPai = input.parentNode;
    const elementoErroExiste = elementoPai.querySelector(`.${classeElementoErro}`);
    const elementoErro = elementoErroExiste || document.createElemement('div');
    const elementoValido = input.validity.valid;
    
   const tipo = input.dataset.tipo;
   const validadoresEspecificos = {
       dataNascimento: input => validarDataNascimento(input),
       cpf: input => validarCPF(input),
       cep: input => recuperarEndereco(input),
   };

   if(validadoresEspecificos[tipo]){
       validadoresEspecificos[tipo](input);
   }

   if(!elementoValido){
    elementoErro.className = classeElementoErro;
    elementoErro.textContent = retornarMensagemDeErro(tipo, input.validity);
    if(adicionarErro){
        input.after(elementoErro);
        input.classList.add(classeInputErro);
        }
   }else{
    elementoErro.remove();
    input.classList.remove(classeInputErro);
   }
};