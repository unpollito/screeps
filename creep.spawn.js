const roleDefinitions = require("./role.definitions");

const spawn = function(creepAndRoleAssignations) {
    const lastCreepId = Memory.lastCreepId || 0;
    const neededCreepsPerRole = creepAndRoleAssignations.neededCreepsPerRole;
    const spawn = Game.spawns["Spawn1"];
    if (spawn.energy >= 200 && spawn.spawning === null) {
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

        const spawnResult = Game.spawns["Spawn1"].createCreep([WORK, CARRY, MOVE], name, {role: nextRole});
        if (spawnResult === name) {
            console.log("Creating creep with role " + nextRole);
            Memory.lastCreepId = lastCreepId + 1;
        } else {
            console.log("Spawn failed with code " + spawnResult);
        }
    }
};

module.exports = {
    spawn: spawn
};
