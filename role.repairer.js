const harvesterRole = require("./role.harvester");

const repairerRole = {
    run: function(creep) {
        if (creep.memory.repairing && creep.carry.energy === 0) {
            creep.memory.repairing = false;
            delete creep.memory.repairTarget;
        }
        if (creep.memory.repairing || creep.carry.energy === creep.carryCapacity) {
            creep.memory.repairing = true;
            performRepairIfPossible(creep);
        } else {
            creep.memory.repairing = false;
            harvesterRole.run(creep);
        }
    }
};

const performRepairIfPossible = function(creep) {
    let target;
    if (!creep.memory.repairTarget) {
        target = findNextRepairTarget(creep);
    } else {
        target = Game.getObjectById(creep.memory.repairTarget);
        if (target.hits === target.hitsMax) {
            target = findNextRepairTarget()
        }
    }

    if (target === null) {
        harvesterRole.run(creep);
    } else {
        creep.memory.repairTarget = target.id;
        if (creep.repair(target) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: "#f0f", opacity: 0.2}});
        }
        creep.repair(target);
    }
};

const findNextRepairTarget = function(creep) {
    const structures = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
        const rightType = structure.structureType === STRUCTURE_WALL || structure.my;
        return rightType && structure.hits < structure.hitsMax;
    }});
    if (structures.length === 0) {
        return null;
    }
    const mostDamagedStructures = [];
    for (let i = 1; i <= 20; i++) {
        for (let j = 0; j < structures.length; j++) {
            if (structures[j].hits / structures[j].hitsMax <= i / 20) {
                mostDamagedStructures.push(structures[j]);
            }
        }
        if (mostDamagedStructures.length > 0) {
            return creep.pos.findClosestByPath(mostDamagedStructures);
        }
    }
    return null;
};

module.exports = repairerRole;
