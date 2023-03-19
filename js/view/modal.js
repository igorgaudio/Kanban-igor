import omodal from "../api/ModalAPI.js";
import Modal from "../api/ModalAPI.js";
import KanbanAPI from "../api/KanbanAPI.js";
import Item from "./Item.js";

export default class modal {
  constructor(root, id, title, content) {
    this.root = root;
    const newmodal = new Modal(id, title.title, content.content);

    this.root.appendChild(newmodal.elements.root);
  }
}
