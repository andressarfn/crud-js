window.addEventListener('load', start);

let auxModel = window.localStorage.getItem('registers');
let registers = JSON.parse(auxModel);
console.log(registers);

function start() {
  preventFormSubmit();
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

const clientRegister = () => {
  let email = document.getElementById('emailLogin').value;
  let password = document.getElementById('senhaLogin').value;
  console.log(email + password);

  let user = registers.find((user) => {
    if (user.email == email && user.password == password) {
      console.log('pegou');
      window.location.href = 'clientRegister.html';
    } else {
      alert('E-mail ou senha incorretas!');
    }
  });
};

const register = () => {
  window.location.href = 'register.html';
};
