import getTemplate from './template';
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

    render(el) {
        el.insertAdjacentHTML("beforeend", getTemplate(this));
        this.domElt = el.lastElementChild;
        this.initEvents();
    }

    initEvents() {
        this.domElt.querySelector(".btn-delete").addEventListener("click", () => {
            window.monsterList.deleteOneById(this.id);
        });
    }
}