const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);

    // TODO láta hluti í _items virka
    _items.addEventListener("click", finish);
    _items.addEventListener("click", edit);
    _items.addEventListener("click", deleteItem);
    _items.addEventListener("keydown", commit);
  }

  function formHandler(e) {
    e.preventDefault();

    console.log('halló heimur');
    const textarea = document.querySelector('.form__input');
    //Athuga hvort strengurinn í input innihaldi staf
    if(textarea.value.trim() != "")
      add(textarea.value);

    textarea.value = ""; //Endurstilli input reitinn í tóman streng
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    //athuga hvort reiturinn sem ýtt var á er checkbox
    if(e.target.classList.value === "item__checkbox")
      e.target.parentElement.classList.toggle("item--done"); //Bæti við klasanum item--done á foreldrið
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    //athuga hvort reiturinn sem ýtt var á er textareiturinn
    if(e.target.classList.value === "item__text"){
     e.target.classList.add("item__edit"); //Bæti við klasanum item__edit 
     e.target.contentEditable = "true"; //leyfi targetinu að vera editable
    }
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    //ef ýtt er á "enter" takkann þá commitast breytingin, ekki er hægt að breyta fyrr en ýtt á reitinn aftur
    if (e.keyCode === 13){ 
      e.target.contentEditable = "false";
      e.target.classList.remove("item__edit")
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    //bý til nýtt "li" lista element 
    var li = el("li", "item", null);
    li.setAttribute("class", "item");

    //bý til nýtt checkbox element og bæti því inn í lista elementið
    var check = el("input", "item__checkbox", null);
    check.setAttribute("type", "checkbox");
    li.appendChild(check);

    //bý til nýtt texta element og bæti því inn í lista elementið
    var text = el("span", "item__text", null);
    text.innerHTML = value;
    li.appendChild(text);

    //bý til nýtt button element og bæti því inn í lista elementið
    var button = el("button", "item__button", null);
    button.innerHTML = "Eyða";
    li.appendChild(button);

    //bæti lista elementinu sem barn í items
    items.appendChild(li);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    //athuga hvort ýtt var á eyða hnappinn
    if(e.target.classList.value === "item__button"){
        e.target.parentElement.parentElement.removeChild(e.target.parentElement); //fjarlægi foreldri hnappsins
    }
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    var el = document.createElement(type);
    el.classList.add(className);
    return el;
  }

  return {
    init: init
  }
})();
