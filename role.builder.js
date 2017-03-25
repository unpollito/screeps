const harvesterRole = require("./role.harvester");

const builderRole = {
    run: function(creep) {

        if (creep.memory.building && creep.carry.energy === 0) {
            creep.memory.building = false;
        }
        if (!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
            creep.memory.building = true;
        }

        if (creep.memory.building) {
            delete creep.memory.storageTarget;
            const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                const target = creep.pos.findClosestByPath(targets);
                if (creep.build(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: "#ffffff"}});
                }
            } else {
                creep.memory.building = false;
                harvesterRole.run(creep);
            }
        }
        else {
            harvesterRole.run(creep);
        }
    }
};

module.exports = builderRole;