const setNextStorageTarget = function(creep) {
    if (!Memory.storageLevels) {
        Memory.storageLevels = {};
    }
    delete creep.memory.storageTarget;
    if (creep.carry.energy <= 0) {
        return;
    }

    const targets = creep.room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
            const rightType = structure.structureType === STRUCTURE_EXTENSION
                || structure.structureType === STRUCTURE_SPAWN;
            const energy = Memory.storageLevels[structure.id] || structure.energy;
            return rightType && energy < structure.energyCapacity;
        }
    });
    if (targets.length > 0) {
        const target = creep.pos.findClosestByPath(targets);
        const targetId = target.id;
        if (Memory.storageLevels[targetId] && Memory.storageLevels[targetId] !== null) {
            Memory.storageLevels[targetId] += creep.carry.energy;
        } else {
            Memory.storageLevels[targetId] = target.energy + creep.carry.energy;
        }
        creep.memory.storageTarget = targetId;
    }
};

const clearCreepTargets = function() {
    Memory.storageLevels = {};
    for (let creepName in Game.creeps) {
        if (Game.creeps.hasOwnProperty(creepName)) {
            delete Game.creeps[creepName].memory.storageTarget;
        }
    }
    Memory.creepTargetsLastDeletedAt = Game.time;
};

const clearCreepTargetsAfter100Ticks = function() {
    if (!Memory.creepTargetsLastDeletedAt || Game.time - Memory.creepTargetsLastDeletedAt >= 100) {
        clearCreepTargets();
        console.log("creep targets cleared after 100 ticks");
    }
};

module.exports = {
    clearCreepTargets: clearCreepTargets,
    clearCreepTargetsAfter100Ticks: clearCreepTargetsAfter100Ticks,
    setNextStorageTarget: setNextStorageTarget
};
