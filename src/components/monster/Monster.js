import getTemplate from './template';
import DB from '../../DB';
export default class Monster {
    static TYPES = [
        "Giant reptile",
        "Alien",
        "Mutant",
        "Giant insect",
        "Robot",
        "Deep-sea creature",
    ];
    
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.dangerLevel = data.dangerLevel;
        this.year = data.year;
    }

    render() {
        const template = document.createElement("template");
        template.innerHTML = getTemplate(this);
        this.domElt = template.content.firstElementChild;
        this.initEvents();
        return this.domElt;
    }

        async update(data) {
            const [name, type, danger, year] = this.domElt.querySelectorAll("span.isEditing-hidden");

            // Je modifie dans le tableau puis ca va dans le DOM
            this.name = data.name;
            name.textContent = this.name;

            this.type = data.type;
            type.textContent = this.type;

            this.dangerLevel = data.dangerLevel;
            danger.textContent = "☠️".repeat(this.dangerLevel);
            danger.title = `Danger level ${this.dangerLevel}`;

            this.year = data.year;
            year.textContent = this.year;

            // Retour au mode affichage
            this.domElt.classList.remove("isEditing");
            
            // Dans la DB
            return await DB.updateOneById(this);  
        }

    initEvents() {
        this.domElt.querySelector(".btn-delete").addEventListener("click", () => {
            window.monsterList.deleteOneById(this.id);
        });

        this.domElt.querySelector(".btn-edit").addEventListener("click", () => {
            this.domElt.classList.add("isEditing");
        });

        this.domElt.querySelector(".btn-check").addEventListener("click", (e) => {
            this.update({
        name: this.domElt.querySelector(".input-name").value,
        type: this.domElt.querySelector(".input-type").value,
        dangerLevel: this.domElt.querySelector(".input-danger").value,
        year: this.domElt.querySelector(".input-year").value,
    });
        });
    }
}