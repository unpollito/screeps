const roleDefinitions = require("./role.definitions");

const getCreepAndRoleAssignations = function() {
    const creepNamesByRole = getCreepNamesByRole();
    let creepsInWrongRole = [];
    const neededCreepsPerRole = {};

    roleDefinitions.map((role) => {
        if (creepNamesByRole[role.name].length < role.max) {
            neededCreepsPerRole[role.name] = role.max - creepNamesByRole[role.name].length;
        } else {
            creepsInWrongRole = creepsInWrongRole.concat(creepNamesByRole[role.name].slice(role.max));
            neededCreepsPerRole[role.name] = 0;
        }
    });

    return {
        creepsInWrongRole: creepsInWrongRole,
        neededCreepsPerRole: neededCreepsPerRole
    };
};

const getCreepNamesByRole = function() {
    const namesByRole = {};
    const names = Object.keys(Game.creeps);
    names.map(function(name) {
        const role = Game.creeps[name].memory.role;
        if (!namesByRole[role]) {
            namesByRole[role] = [name];
        } else {
            namesByRole[role].push(name);
        }
    });
    roleDefinitions.map(function(item) {
        if (namesByRole[item.name] === undefined) {
            namesByRole[item.name] = [];
        }
    });
    return namesByRole;
};

const getNextCreepRole = function(creepAndRoleAssignations) {
    const neededCreepsPerRole = creepAndRoleAssignations.neededCreepsPerRole;
    let nextRole;
    let proportion = 0;
    for (let i = 0; i < roleDefinitions.length; i++) {
        const roleName = roleDefinitions[i].name;
        if (neededCreepsPerRole[roleName] > 0) {
            const newProportion = neededCreepsPerRole[roleName] / roleDefinitions[i].max;
            if (newProportion > proportion) {
                proportion = newProportion;
                nextRole = roleName;
            }
        }
    }
    return nextRole;
};

module.exports = {
    getCreepAndRoleAssignations: getCreepAndRoleAssignations,
    getCreepNamesByRole: getCreepNamesByRole,
    getNextCreepRole: getNextCreepRole
};
