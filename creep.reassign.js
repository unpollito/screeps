const reassignOrKillCreepsInWrongRoleEvery10Ticks = function(creepAndRoleAssignations) {
    if (Game.time % 10 === 7) {
        reassignOrKillCreepsInWrongRole(creepAndRoleAssignations);
    }
};

const reassignOrKillCreepsInWrongRole = function(creepAndRoleAssignations) {
    const creepsInWrongRole = creepAndRoleAssignations.creepsInWrongRole;
    const neededCreepsPerRole = creepAndRoleAssignations.neededCreepsPerRole;

    if (creepsInWrongRole.length === 0) {
        return;
    }

    for (let roleName in neededCreepsPerRole) {
        if (neededCreepsPerRole.hasOwnProperty(roleName)) {
            while (neededCreepsPerRole[roleName] > 0 && creepsInWrongRole.length > 0) {
                const name = creepsInWrongRole.pop();
                Memory.creeps[name].role = roleName;
                console.log("Reassigned creep " + name + " to role " + roleName);
                neededCreepsPerRole[roleName]--;
            }
        }
    }

    creepsInWrongRole.map((name) => {
        Game.creeps[name].suicide();
        console.log("Creep " + name + " suicided");
    });
};

module.exports = {
    reassignOrKillCreepsInWrongRoleEvery10Ticks: reassignOrKillCreepsInWrongRoleEvery10Ticks
};
