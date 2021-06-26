window.addEventListener('load', start);

let registers = [];

function start() {
  preventFormSubmit();
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

const registerUser = () => {
  user = {
    name: document.getElementById('nameRegister').value,
    email: document.getElementById('emailRegister').value,
    password: document.getElementById('passwordRegister').value,
  };

  registers.push(user);
  alert('Você está cadastrado!');
  console.log(registers);
  resetInput();
  let auxModel = JSON.stringify(registers);
  window.localStorage.setItem('registers', auxModel);

  window.location.href = 'index.html';
};

// resetando todos os campos
const resetInput = () => {
  document.getElementById('nameRegister').value = '';
  document.getElementById('emailRegister').value = '';
  document.getElementById('passwordRegister').value = '';
};
