const repairerRole = require("./role.repairer");

const builderRole = {
    run: function(creep) {
        if (creep.memory.building && creep.carry.energy === 0) {
            creep.memory.building = false;
        }
        if (creep.memory.building || creep.carry.energy === creep.carryCapacity) {
            buildIfThereAreConstructionSites(creep);
        } else {
            if (creep.memory.role !== "repairer") {
                repairerRole.run(creep);
            }
        }
    }
};

const buildIfThereAreConstructionSites = function(creep) {
    const targets = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
    if (targets.length) {
        creep.memory.building = true;
        delete creep.memory.storageTarget;
        delete creep.memory.harvesting;
        const target = creep.pos.findClosestByPath(targets);
        if (creep.build(target) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: "#f00", opacity: 0.2}});
        }
    } else {
        creep.memory.building = false;
        if (creep.memory.role !== "repairer") {
            repairerRole.run(creep);
        }
    }
};

module.exports = builderRole;