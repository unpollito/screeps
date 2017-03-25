const harvesterRole = {
    run: function(creep) {
        if (creep.memory.harvesting === true) {
            if (creep.carry.energy < creep.carryCapacity) {
                doHarvest(creep);
            } else {
                creep.memory.harvesting = false;
            }
        } else {
            if (creep.carry.energy === 0) {
                creep.memory.harvesting = true;
            } else {
                doStorage(creep);
            }
        }
    }
};

const doHarvest = function(creep) {
    const sources = creep.room.find(FIND_SOURCES_ACTIVE);
    if (sources.length === 0) {
        creep.memory.harvesting = false;
    } else if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], {visualizePathStyle: {stroke: "#ffaa00"}});
    }
};

const doStorage = function(creep) {
    const targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            const rightType = structure.structureType === STRUCTURE_EXTENSION
                || structure.structureType === STRUCTURE_SPAWN;
            return rightType && structure.energy < structure.energyCapacity;
        }
    });
    if (targets.length > 0) {
        if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], {visualizePathStyle: {stroke: "#ffffff"}});
        }
    } else {
        creep.memory.harvesting = true;
    }
};

module.exports = harvesterRole;