const roleDefinitions = require("./role.definitions");

const run = function() {
    const roleFunctions = {};
    roleDefinitions.map((definition) => {
        roleFunctions[definition.name] = definition.run;
    });

    const creepNames = Object.keys(Game.creeps);
    creepNames.map((creepName) => {
        roleFunctions[Game.creeps[creepName].memory.role](Game.creeps[creepName]);
    });
};

module.exports = {
    run: run
};
