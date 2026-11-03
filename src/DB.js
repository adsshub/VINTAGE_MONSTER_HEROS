export default class DB {
    static setApiURL(data) {
        this.apiURL = data;
    }

    static async findAll() {
        const response = await fetch(this.apiURL + "monsters");
        return response.json();
    }

    static async create(data) {
    const response = await fetch(this.apiURL + "monsters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: data.name,
            type: data.type,
            dangerLevel: Number(data.dangerLevel),
            year: Number(data.year),
        }),
    });
    return response.json();
}
}