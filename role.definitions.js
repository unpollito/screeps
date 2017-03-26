const roleHarvester = require("./role.harvester");
const roleUpgrader = require("./role.upgrader");
const roleBuilder = require("./role.builder");

const roleDefinitions = [
    {
        name: "harvester",
        max: 3,
        run: roleHarvester.run
    },
    {
        name: "upgrader",
        max: 9,
        run: roleUpgrader.run
    },
    {
        name: "builder",
        max: 3,
        run: roleBuilder.run
    }
];

module.exports = roleDefinitions;