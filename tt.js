const prompt = require('prompt-sync')({sigint: true});
let party = [];
//region run
const run = () => {
    console.log(`Welcome to Turn Tracker! Type "help" for list of commands.`);
    party = capNames(process.argv.slice(2));
    while (true) {
        console.log(`\n`);
        const response = prompt(">").trim();
        const command = response.match(/^\w+/)[0];
        const value = response.replace(command, "").trim();
        switch (command.toUpperCase()) {
            case "PARTY":
                displayParty();
                break;
            case "ADD":
                addCharacters(value);
                break;
            case "REMOVE":
                removeCharacters(value);
                break;
            case "ROLL":
                roll();
                break;
            case "HELP":
                showHelp();
                break;
            case "CLEAR":
                process.stdout.write('\033c');
                break;
            case "QUIT":
                process.exit();
                break;
            default:
                console.warn(`Invalid command "${command}"`);
                break;
        }
    }
};
//endregion
const addCharacters = value => {
    let characters = value.split(' ');
    if (!(characters.length === 1 && characters[0] === '')) {
        characters.forEach(char => party.push(char.toUpperCase()));
        console.info(`Added characters to party: ` + characters.join(', '));
        displayParty();
        return;
    }
    console.log(`No characters were added to the party.`);
};
const removeCharacters = value => {
    let characters = value.split(' ');
    if (characters.length > 0) {
        characters = capNames(characters);
        let removedChars = [];
        characters.forEach(char => {
            let idx = party.indexOf(char);
            if (idx >= 0) {
                removedChars.push(party.splice(idx, 1))
            }
        });
        console.info(`Removed characters from party: ` + removedChars.join(', '));
        displayParty();
    }
};
const roll = () => {
    party.sort(() => Math.random() - 0.5);
    console.log(`Turn order:\n`);
    for (let i = 0; i < party.length; i++) {
        console.log(`(${i+1}) ` + party[i]);
    }
};
//region help
const showHelp = () => {
    console.log(`List of commands:\n`);
    console.log(`Displays current party`);
    console.log(`party\n`);
    console.log(`Adds name to party`);
    console.log(`add [name1] [name2] [name3] [...]\n`);
    console.log(`Removes name from party`);
    console.log(`remove [name1] [name2] [name3] [...]\n`);
    console.log(`Roll for turn order`);
    console.log(`roll\n`);
    console.log(`Clear the console`);
    console.log(`clear\n`);
    console.log(`Exit script`);
    console.log(`quit`);
};
const capNames = (arr) => arr.map(name => name.toUpperCase());
const displayParty = () => console.info(`Current party: ` + party.join(', '));
//endregion
run();