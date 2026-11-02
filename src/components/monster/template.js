import './style.css';

export default function getTemplate(monster) {
    return `
        <li>
            <h2>${monster.name}</h2>
            <p>Type: ${monster.type}</p>
            <p>Danger Level: ${monster.dangerLevel}</p>
            <p>Year: ${monster.year}</p>
        </li>
        `;
}