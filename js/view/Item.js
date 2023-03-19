import DropZone from "./DropZone.js";
import KanbanAPI from "../api/KanbanAPI.js";
import Modal from "../api/ModalAPI.js";
import modal from "./modal.js";
export default class Item {
  constructor(id, title, content) {

    const bottomDropZone = DropZone.createDropZone();

    this.elements = {};
    this.elements.root = Item.createRoot();
    this.elements.contitle = this.elements.root.querySelector(
      ".kanban__item-title"
    );
    this.elements.input = this.elements.root.querySelector(
      ".kanban__item-input"
    );
    this.elements.button=this.elements.root.querySelector(
        ".kanban__item-button"
    )
    this.elements.root.dataset.id = id;
    this.elements.contitle.textContent = title;
    this.elements.input.value = content;
    this.title = title;
    this.content = content;
    this.elements.root.appendChild(bottomDropZone);

    const onBlur = () => {
      const newTitle = this.elements.contitle.textContent.trim();
      const newContent = this.elements.input.value.trim();

      if (newContent == this.content && newTitle == this.title) {
        return;
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
    };
    this.elements.contitle.addEventListener("blur", onBlur);
    this.elements.input.addEventListener("blur", onBlur);
    this.elements.button.addEventListener("click", () => {
      const check = confirm("Are you sure you want to delete this item?");

      if (check) {
        KanbanAPI.deleteItem(id);

        this.elements.contitle.removeEventListener("blur", onBlur);
        this.elements.input.removeEventListener("blur", onBlur);
        this.elements.root.parentElement.removeChild(this.elements.root);
      }

       /*this.elements.root.addEventListener("dblclick", () => {

           const modal = new modal(data.id, data.title, data.content);

           this.elements.items.appendChild(modal.elements.root);

       }
       );*/
    });


    this.elements.input.addEventListener("click", () => {

     new modal(document.querySelector((".modal")), id,
         {
           title
         },
         { content: this.content })

      const viewmodal = document.getElementById("modal")

      const openModal = () => {viewmodal.setAttribute("style", "display : flex")}

      openModal()


    })


    this.elements.root.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", id);
    });

    this.elements.contitle.addEventListener("drop", (e) => {
      e.preventDefault();
    });

    this.elements.input.addEventListener("drop", (e) => {
      e.preventDefault();
    });

  }

  static createRoot() {
    const range = document.createRange();

    range.selectNode(document.body);

    return range.createContextualFragment(`
			<div class="kanban__item" draggable="true">
			<div class="kanban__item-container">
			<div class="kanban__item-test" >
	            <div class="kanban__item-title"  contenteditable></div><div class="kanban__item-buttonwrapper"><button class="kanban__item-button">X</button></div></div>
			   
	            <div class="kanban__item-wrapper"><textarea class="kanban__item-input" placeholder="Description" ></textarea>
</div>	
			</div>
		`).children[0];
  }


}
