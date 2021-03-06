const harvest = function(creep, upgradeFailed) {
    if (creep.carry.energy === creep.carryCapacity) {
        creep.memory.harvesting = false;
        if (!upgradeFailed) {
            upgrade(creep, true);
        }
    } else {
        const sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[1]) === ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[1], {visualizePathStyle: {stroke: "#0f0"}});
        }
    }
};

const upgrade = function(creep, harvestFailed) {
    if (creep.carry.energy === 0) {
        creep.memory.harvesting = true;
        if (!harvestFailed) {
            harvest(creep, true);
        }
    } else {
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: "#0ff", opacity: 0.2}});
        }
    }
};

const upgraderRole = {
    run: function(creep) {
        if (creep.memory.harvesting) {
            harvest(creep);
        } else {
            upgrade(creep);
        }
    }
};

module.exports = upgraderRole;