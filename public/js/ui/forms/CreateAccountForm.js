/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * Наследуется от AsyncForm
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно (в котором находится форма) в случае успеха,
   * а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit( options ) {
    let form = document.getElementById('new-account-form');
    Account.create(options, () => {
      let modal = App.getModal('createAccount');
      modal.close();
      form.reset();
      App.update();
    })
  }
}