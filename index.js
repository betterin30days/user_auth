'use strict';

function readResponseAsJson(response) {
  return response.json();
}

function logError(error) {
  console.log('There was an error!', error);
}

function updateMessage(message = '') {
  document.getElementById('message').innerHTML = message;
}

function clearForm() {
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
}

function login(response) {
  clearForm();
  if (response.status !== 200) {
    return updateMessage(response.error);
  }
  window.localStorage.setItem('username', response.username);
  window.localStorage.setItem('token', response.token);
  updateMessage();
}

function onClickLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const body = {username, password};
  const init = {
    method: 'post',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(body)
  };
  fetch('http://localhost:8080/user/login', init)
    .then(readResponseAsJson)
    .then(login)
    .catch(logError);
}
