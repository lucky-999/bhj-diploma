/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (!element) {
      throw new Error('Ошибка! Пустой элемент');
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    let user = User.current();
    this.render({account_id: user.id});
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    this.element.onclick = (e) => {
      if (e.target.closest('.remove-account')) {
        this.removeAccount();
      } else if (e.target.closest('.transaction__remove')) {
        this.removeTransaction(e.target.dataset.id);
      }
    }
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    if (this.lastOptions) {
      if (confirm('Удалить счет?')) {
        Account.remove(this.lastOptions.account_id, {}, (err, response) => {
          App.update();
        })
        
      }
    }
    
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction( id ) {
    if (confirm('Вы действительно хотите удалить транзакцию?')) {
      Transaction.remove(id, {}, (err, response) => {
        App.update();
      })
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render( options ) {
    if (options == undefined) {
      throw new Error('Пустой options');
    } else {
      this.lastOptions = options;
      Account.get(this.lastOptions.account_id, {}, (err, response) => {
        this.renderTitle(response.data.name);
      });
      Transaction.list(options, (err, response) => {
        this.renderTransactions(response.data);
      });
    }
    
    
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счета');
    delete this.lastOptions;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle( name ) {
    let title = document.querySelector('.content-title');
    title.textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate( date ) {

    let newDate = new Intl.DateTimeFormat('ru', {year: 'numeric',month: 'long',day: 'numeric'}).format(date);
    const time = date.toLocaleTimeString('ru', { hour: 'numeric', minute: 'numeric'});
    let fullDate = newDate + time;
    return fullDate;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML( item ) {
    let transactionHTML;
    if (item.type == 'INCOME') {
      item.type = item.type.toLowerCase();
    } else if (item.type == 'EXPENSE') {
      item.type = item.type.toLowerCase();
    }
    transactionHTML = `<div class="transaction transaction_${item.type} row">
                                     <div class="col-md-7 transaction__details">
                                       <div class="transaction__icon">
                                         <span class="fa fa-money fa-2x">
                                         </span>
                                       </div>
                                       <div class="transaction__info">
                                         <h4 class="transaction__title">${item.name}
                                         </h4>
                                       <div class="transaction__date">${item.date ? formatDate(item.date) : "Когда-то давно"}
                                       </div>
                                      </div>
                                    </div>
                                    <div class="col-md-3">
                                      <div class="transaction__summ">${item.sum}
                                        <span class="currency">₽</span>
                                      </div>
                                    </div>
                                    <div class="col-md-2 transaction__controls">
                                      <button class="btn btn-danger transaction__remove" data-id=${item.id}>
                                      <i class="fa fa-trash">
                                      </i>
                                      </button>
                                    </div>
                                  </div>`;
    return transactionHTML;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions( data ) {
    let content = document.querySelector('.content');
    content.innerHTML = '';
    for (let obj of data) {
      content.insertAdjacentHTML('beforeEnd', this.getTransactionHTML(obj));
    }
  }
}