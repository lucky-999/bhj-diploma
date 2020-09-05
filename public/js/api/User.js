/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static URL = '/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    delete localStorage.user;
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    return localStorage.user && JSON.parse(localStorage.user);
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f) {
    let options = {data: data, url: `${this.URL}/current`, method: `GET`, responseType: 'json', callback: (err, response) => {
      if (response.success) {
        User.setCurrent(response.user);
      } else {
        User.unsetCurrent();
      }
      callback(err, response);
    }};
    createRequest(options);
    }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login (data, callback = f => f) {
    let options = {data: data, url: `${this.URL}/login`, method: `POST`, responseType: 'json', callback: (err, response) => {
      if (response.success) {
        User.setCurrent(response.user);
      }
      callback (err, response);
    }};
    createRequest(options);
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f) {
    let options = {data: data, url: `${this.URL}/register`, method: `POST`, responseType: 'json', callback: (err, response) => {
      if (response.success) {
        User.setCurrent(response.user);
      }
      callback(err, response);
    }};
    createRequest(options);
  }
  

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f) {
    let options = {data: data, url: `${this.URL}/logout`, method: `POST`, responseType: 'json', callback: (err, response) => {
      if (response.success) {
        User.unsetCurrent();
       }
       callback(err, response);
    }};
    createRequest(options);
  }
}