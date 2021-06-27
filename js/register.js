window.addEventListener('load', start);
// criando um array para salvar os usuários de cadastro
let registers = [];

function start() {
  // chamando a função para não recarregar a página quando apertar submit
  preventFormSubmit();
  activeInput();
}

const preventFormSubmit = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    registerUser();
  };
  // buscando o form
  let form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);
};
// função para criar o objeto e jogar no array de registros
const registerUser = () => {
  user = {
    name: document.getElementById('nameRegister').value,
    email: document.getElementById('emailRegister').value,
    password: document.getElementById('passwordRegister').value,
  };
  if (user.name == '' || user.email == '') {
    alert('Preencha todos os campos!');
    activeInput();
  } else if (user.password == '') {
    alert('Preencha todos os campos!');
    activeInput();
  } else {
    registers.push(user);
    alert('Você está cadastrado!');
    console.log(registers);
    resetInput();
    let auxModel = JSON.stringify(registers);
    window.localStorage.setItem('registers', auxModel);

    window.location.href = 'index.html';
  }
};

// função  para limpar todos os campos
const resetInput = () => {
  document.getElementById('nameRegister').value = '';
  document.getElementById('emailRegister').value = '';
  document.getElementById('passwordRegister').value = '';
};
// função para redirecionar para o index.html
const backLogin = () => {
  window.location.href = 'index.html';
};
// função para focar o primeiro input da página
const activeInput = () => {
  inputName = document.getElementById('nameRegister');
  inputName.focus();
};
