/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    let toggle = document.querySelector('.sidebar-toggle');
    let body = document.querySelector('body');
    toggle.onclick = function() {
      body.classList.toggle('sidebar-open');
      body.classList.toggle('sidebar-collapse');
    }
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    let logout = document.getElementsByClassName('menu-item_logout');
    let register = document.getElementsByClassName('menu-item_register');
    let login = document.getElementsByClassName('menu-item_login');
    
    register[0].onclick = function() {
      let registerButton = App.getModal('register');
      registerButton.open();
    }

    login[0].onclick = function() {
      let loginButton = App.getModal('login');
      loginButton.open();
    }
    
    logout[0].onclick = function() {
      User.logout();
      App.setState('init');
    }
  }

}