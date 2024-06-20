import axios from 'axios';

const baseURL = 'https://localhost:5000';
// const baseURL = 'https://gsfind.ru';
// const baseURL = 'https://4d60689b4db5d657a8941709cafa784e.serveo.net';

const api = axios.create({
  baseURL,
});

const routes = {
  groups: () => `${baseURL}/api/groups`, // получить все группы
  groupId: (id) => `${baseURL}/api/groups/${id}`, // вытащить группу по id
  groupIdEdit: () => `${baseURL}/api/groups/${id}/edit`, // редактировать группу (права доступа)
  groupIdDelete: (id) => `${baseURL}/api//groups/${id}/delete`, // удаление группы (права доступа)
  userMe: () => `${baseURL}/api/user/me`, // получить данные по своему профилю
  userUsername: () => `${baseURL}/api/user/${username}`, // получить данные юзера (другого)
  userMeEdit: () => `${baseURL}/api/user/me/edit`, // релактировать свой профиль
  // redirectGithub: () => `${baseURL}/api/github/redirect`, // auth github redirect
  redirectGithub: () => `${baseURL}/github/redirect`, // auth github redirect
  sendTokenGithub: (data) => `${baseURL}/github/callback?code=${data}`, // auth github redirect
  addGroup: () => `${baseURL}/api/groups/new`, // auth github redirect
};


export { api, routes };