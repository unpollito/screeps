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
        if (target && target.hits === target.hitsMax) {
            target = findNextRepairTarget(creep)
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
        const rightType = structure.structureType === STRUCTURE_WALL || structure.structureType === STRUCTURE_ROAD
            || structure.my;
        return rightType && structure.hits < structure.hitsMax / 2;
    }});
    if (structures.length === 0) {
        return null;
    }

    let minHits = Number.POSITIVE_INFINITY;
    let structure = null;
    for (let i = 0; i < structures.length; i++) {
        if (structures[i].hits < minHits) {
            minHits = structures[i].hits;
            structure = structures[i];
        }
    }
    return structure;
};

module.exports = repairerRole;
