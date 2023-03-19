import KanbanAPI from "../api/KanbanAPI.js";
import Item from "../view/Item.js";
import modal from "../view/modal.js";

export default class Modal {
  constructor(id, title, content) {
    this.elements = {};
    this.elements.root = Modal.createRoot();
    this.elements.contitle =
      this.elements.root.querySelector(".modal__item-title");
    this.elements.input =
      this.elements.root.querySelector(".modal__item-input");
    this.elements.button = this.elements.root.querySelector(
      ".modal__item-button"
    );
    this.elements.root.dataset.id = id;
    this.elements.contitle.textContent = title;
    this.elements.input.value = content;
    this.title = title;
    this.content = content;
    console.log(title);

    this.elements.button.addEventListener("click", () => {
      const newTitle = this.elements.contitle.textContent.trim();
      const newContent = this.elements.input.value.trim();
      if (newContent == this.content && newTitle == this.title) {
        return location.reload();
      }
      this.title = newTitle;
      this.content = newContent;
      KanbanAPI.updateItem(
        id,
        {
          title: this.title,
        },
        { content: this.content }
      );

      const viewmodal = document.getElementById("modal");
      const closemodal = () => {
        viewmodal.setAttribute("style", "display : none");
      };

      location.reload();

      closemodal();
    });
  }

  static createRoot() {
    const range = document.createRange();

    range.selectNode(document.body);

    return range.createContextualFragment(`<div class="Modal__box">
               <div class="modal__item-wrapperall">
               <div class="modal__item-title"  contenteditable> </div>
               <div class="modal__item-wrapper"><textarea class="modal__item-input" placeholder="Description" ></textarea>
                 <div class="modal__item-wrapperbuttom"> <button class="modal__item-button">Salvar</button></div>
               </div>
               </div> 
           </div>`).children[0];
  }
}
