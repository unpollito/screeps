const roleDefinitions = require("./role.definitions");
const commonEnergy = require("./common.energy");
const commonCreep = require("./common.creep");

const spawn = function(creepAndRoleAssignations) {
    const lastCreepId = Memory.lastCreepId || 0;
    const neededCreepsPerRole = creepAndRoleAssignations.neededCreepsPerRole;
    const spawn = Game.spawns["Spawn1"];
    const newCreepParts = getNewCreepParts();
    const necessaryEnergy = newCreepParts.length * 200 / 3;

    if (commonEnergy.getRoomTotalEnergy(Game.rooms["W77N88"]) >= necessaryEnergy && spawn.spawning === null) {
        const name = "" + (lastCreepId + 1);
        let nextRole;
        for (let i = 0; i < roleDefinitions.length && nextRole === undefined; i++) {
            if (neededCreepsPerRole[roleDefinitions[i].name] > 0) {
                nextRole = roleDefinitions[i].name;
                break;
            }
        }
        if (nextRole === undefined) {
            return;
        }

        const spawnResult = Game.spawns["Spawn1"].createCreep(newCreepParts, name, {role: nextRole});
        if (spawnResult === name) {
            console.log("Creating creep with role " + nextRole + " and " + newCreepParts.length + " parts");
            Memory.lastCreepId = lastCreepId + 1;
        } else {
            console.log("Spawn failed with code " + spawnResult);
        }
    }
};

const getNewCreepParts = function() {
    let partsPerType;
    if (commonCreep.getCreepNamesByRole().harvester.length > 0) {
        partsPerType = Math.floor(commonEnergy.getRoomTotalCapacity(Game.rooms["W77N88"]) / 200);
    } else {
        partsPerType = Math.floor(commonEnergy.getRoomTotalEnergy(Game.rooms["W77N88"]) / 200);
        if (partsPerType === 0) {
            partsPerType = 1;
        }
    }
    let parts = new Array(3 * partsPerType);
    let i;
    for (i = 0; i < partsPerType; i++) {
        parts[3 * i] = WORK;
        parts[3 * i + 1] = CARRY;
        parts[3 * i + 2] = MOVE;
    }
    return parts;
};

module.exports = {
    spawn: spawn
};
