/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  static URL = '';
  
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list( data, callback = f => f) {
    let options = {data: data, url: `${this.URL}`, method: `GET`, responseType: 'json', callback: callback};
    createRequest(options);
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = ( err, response ) => console.log("err: ", err, " response: ", response) ) {
    let modifiedData = Object.assign({
      _method: 'PUT',
    }, data);
    let options = {data: modifiedData, url: `${this.URL}`, method: `POST`, responseType: 'json', callback: callback};
    createRequest(options);
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = ( err, response ) => console.log("err: ", err, " response: ", response)) {
    let options = {data: data, url: `${this.URL}/${id}`, method: `GET`, responseType: 'json', callback: callback};
    createRequest(options);
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = ( err, response ) => console.log("err: ", err, " response: ", response) ) {
    let modifiedData = Object.assign({
      _method: 'DELETE',
      id: id
    }, data);
    let options = {data: modifiedData, url: `${this.URL}/${id}`, method: `POST`, responseType: 'json', callback: callback};
    createRequest(options);
  }
}