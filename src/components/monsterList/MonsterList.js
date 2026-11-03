import DB from "../../DB";
import Monster from "../monster/Monster";
import getTemplate from "./template";

export default class MonsterList {
    constructor(data) {
        this.domElt = document.querySelector(data.el);
        this.listDomElt = null;
        DB.setApiURL(data.apiURL);
        this.monsters = [];
        this.loadMonsters();
    }
    async loadMonsters() {
        const monsters = await DB.findAll();
        this.monsters = monsters.map((monster) => new Monster(monster));
        this.render();
    }

    render() {
        this.domElt.innerHTML = getTemplate(this);
        this.listDomElt = this.domElt.querySelector(".monster-list");
        this.monsters.forEach((monster) => 
            this.listDomElt.append(monster.render())
        );
        this.initEvents();
    }

    async addMonster(data) {
            // ajouter dans la db
        const created = await DB.create(data);

        // ajouter à this.monsters
        const newMonster = new Monster(created);
        this.monsters.push(newMonster);

        // Ajouter dans le DOM
        this.listDomElt.appendChild(newMonster.render());

        // mettre à jour le compteur
        this.domElt.querySelector("span.display").textContent = this.monsters.length;
    }

    async deleteOneById(id) {
        // Supprimer de la db
        const response = await DB.deleteOneById(id);

        // Supprimer des monsters
        this.monsters.splice(this.monsters.findIndex(monster => monster.id == id), 1);

        // Supprimer du DOM
        this.domElt.querySelector(`[data-id='${id}']`).remove();
        // Mettre à jour le compteur
        this.domElt.querySelector("span.display").textContent = this.monsters.length;

    }

    search(text) {
    const query = text.toLowerCase();

    this.monsters.forEach((monster) => {
        const name = monster.name.toLowerCase();
        const type = monster.type.toLowerCase();

        if (name.includes(query) || type.includes(query)) {
            monster.domElt.hidden = false;   // on montre la ligne
        } else {
            monster.domElt.hidden = true;    // on cache la ligne
        }
    });
}

    initEvents() {
    this.domElt.querySelector("aside button").addEventListener("click", () => {
        const [name, type, dangerLevel, year] = this.domElt.querySelectorAll("aside .field");
        this.addMonster({
            name: name.value,
            type: type.value,
            dangerLevel: dangerLevel.value,
            year: year.value,
        });
        name.value = "";
        type.selectedIndex = 0;
        dangerLevel.value = "";
        year.value = "";
        });

        this.domElt.querySelector("input[type='search']").addEventListener("input", (e) => {
            this.search(e.target.value);
        });
    }
}
    
    