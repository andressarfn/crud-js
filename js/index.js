window.addEventListener('load', start);
// buscando dados de cadastro no localStorage
let auxModel = window.localStorage.getItem('registers');
// conversando o objeto ser lido para o login
let registers = JSON.parse(auxModel);
console.log(registers);
// a função só é startada quando todos os dados da página são carregados
function start() {
  // chamando a função para quando aperte submit a página não recarregue
  preventFormSubmit();
  // chamando a função para focar primeiro input
  activeInput();
}

const preventFormSubmit = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    clientRegister();
  };
  // buscando o form
  let form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);
};
// conferindo valores do input de login e senha para conferir com o objeto do localStorage
const clientRegister = () => {
  let email = document.getElementById('emailLogin').value;
  let password = document.getElementById('passwordLogin').value;

  let user = registers.find((user) => {
    // if para pecorrer o objeto para buscar os dados
    if (user.email == email && user.password == password) {
      window.location.href = 'clientRegister.html';
    } else if (email == '' || password == '') {
      alert('Preencha todos os campos!');
      resetInputs();
      activeInput();
    } else {
      alert('Dados incorretos!');
      resetInputs();
      activeInput();
    }
  });
};
// função para direcionar o input de cadastrar para o register.html
const register = () => {
  window.location.href = 'register.html';
};
// função para resetar os inputs
const resetInputs = () => {
  document.getElementById('emailLogin').value = '';
  document.getElementById('passwordLogin').value = '';
};
// função para focar o primeiro input da página
const activeInput = () => {
  inputEmail = document.getElementById('emailLogin');
  inputEmail.focus();
};
