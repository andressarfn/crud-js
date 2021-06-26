// executado quando a página termina de ser carregada, garantindo que todos elementos estejam em tela
window.addEventListener('load', start);

let selectedRow = null;

// primeira atividade da página, para não recarregar e focar no input name
function start() {
  preventFormSubmit();
  activeInput();
  masksInputs();
}

// função para não recarregar a página
const preventFormSubmit = () => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    onFormSubmit();
  };
  // buscando o form
  let form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
};

const onFormSubmit = () => {
  let formData = readFormData();
  if (selectedRow == null) {
    insertNewClient(formData);
  } else {
    updateClient(formData);
  }
  resetInput();
  activeInput();
};

// colocando o foco no inputName quando carregar a página
const activeInput = () => {
  inputName = document.getElementById('fullName');
  inputName.focus();
  // pegando elemento de zipCode para a API
  document
    .getElementById('zipCode')
    .addEventListener('focusout', searchZipCode);
};

// capturando todos os valores dos inputs
const readFormData = () => {
  let formData = {};
  formData['fullName'] = document.getElementById('fullName').value;
  formData['phone'] = document.getElementById('phone').value;
  formData['zipCode'] = document.getElementById('zipCode').value;
  formData['address'] = document.getElementById('address').value;
  formData['number'] = document.getElementById('number').value;
  formData['city'] = document.getElementById('city').value;
  formData['state'] = document.getElementById('state').value;
  formData['country'] = document.getElementById('country').value;
  return formData;
};

// inserindo os dados na tabela
const insertNewClient = (data) => {
  let table = document
    .getElementById('attList')
    .getElementsByTagName('tbody')[0];
  let newRow = table.insertRow(table.length);
  row1 = newRow.insertCell(0);
  row1.innerHTML = data.fullName;
  row2 = newRow.insertCell(1);
  row2.innerHTML = data.phone;
  row3 = newRow.insertCell(2);
  row3.innerHTML = data.zipCode;
  row4 = newRow.insertCell(3);
  row4.innerHTML = data.address;
  row5 = newRow.insertCell(4);
  row5.innerHTML = data.number;
  row6 = newRow.insertCell(5);
  row6.innerHTML = data.city;
  row7 = newRow.insertCell(6);
  row7.innerHTML = data.state;
  row8 = newRow.insertCell(7);
  row8.innerHTML = data.country;
  row9 = newRow.insertCell(8);
  row9.innerHTML = `<a onClick="editClient(this)">Editar</a>
                    <a onclick="deleteClient(this)">Exlcuir</a>`;
};

// resetando todos os campos
const resetInput = () => {
  document.getElementById('fullName').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('zipCode').value = '';
  document.getElementById('address').value = '';
  document.getElementById('number').value = '';
  document.getElementById('city').value = '';
  document.getElementById('state').value = '';
  document.getElementById('country').value = '';

  let selectedRow = null;
};

// para editar
const editClient = (td) => {
  selectedRow = td.parentElement.parentElement;
  document.getElementById('fullName').value = selectedRow.cells[0].innerHTML;
  document.getElementById('phone').value = selectedRow.cells[1].innerHTML;
  document.getElementById('zipCode').value = selectedRow.cells[2].innerHTML;
  document.getElementById('address').value = selectedRow.cells[3].innerHTML;
  document.getElementById('number').value = selectedRow.cells[4].innerHTML;
  document.getElementById('city').value = selectedRow.cells[5].innerHTML;
  document.getElementById('state').value = selectedRow.cells[6].innerHTML;
  document.getElementById('country').value = selectedRow.cells[7].innerHTML;
};

// atualizando os dados do cliente
const updateClient = (updateData) => {
  selectedRow.cells[0].innerHTML = updateData.fullName;
  selectedRow.cells[1].innerHTML = updateData.phone;
  selectedRow.cells[2].innerHTML = updateData.zipCode;
  selectedRow.cells[3].innerHTML = updateData.address;
  selectedRow.cells[4].innerHTML = updateData.number;
  selectedRow.cells[5].innerHTML = updateData.city;
  selectedRow.cells[6].innerHTML = updateData.state;
  selectedRow.cells[7].innerHTML = updateData.country;
};

// deletando os dados do cliente
const deleteClient = (td) => {
  if (confirm('Você quer deletar este cliente?')) {
    row = td.parentElement.parentElement;
    document.getElementById('attList').deleteRow(row.rowIndex);
    resetInput();
  }
};

//mascára para os inputs de telefone e cep

const masksInputs = () => {
  const masks = {
    phone(value) {
      return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1)$2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');
    },

    zipCode(value) {
      return value
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1');
    },
  };
  document.querySelectorAll('input').forEach(($input) => {
    const field = $input.dataset.js;

    $input.addEventListener(
      'input',
      (e) => {
        e.target.value = masks[field](e.target.value);
      },
      false
    );
  });
};

const searchZipCode = async () => {
  const cep = document.getElementById('zipCode').value;
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  const data = await fetch(url);
  const addressData = await data.json();
  autocompleteForm(addressData);
};

const autocompleteForm = (addressData) => {
  document.getElementById('address').value = addressData.logradouro;
  document.getElementById('city').value = addressData.localidade;
  document.getElementById('state').value = addressData.uf;
};

// validando os campos
// const validate = () => {
//   isValid = false;
//   if (document.getElementById('fullname').value == '') {
//     isValid = true;
//     document.getElementById('fullNameValidationError').classList.remove('hide');
//   } else {
//     isValid = false;
//     if (
//       !document
//         .getElementById('fullNameValidationError')
//         .classList.contains('hide')
//     )
//       document.getElementById('fullNameValidationError').classList.add('hide');
//   }
//   return isValid;
// };
