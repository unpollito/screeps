const roleHarvester = require("./role.harvester");
const roleUpgrader = require("./role.upgrader");
const roleBuilder = require("./role.builder");

const roleDefinitions = [
    {
        name: "harvester",
        max: 4,
        run: roleHarvester.run
    },
    {
        name: "upgrader",
        max: 12,
        run: roleUpgrader.run
    },
    {
        name: "builder",
        max: 4,
        run: roleBuilder.run
    }
];

module.exports = roleDefinitions;