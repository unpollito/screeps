const creepTarget = require("./creep.target");
const upgraderRole = require("./role.upgrader");

const harvesterRole = {
    run: function(creep) {
        if (creep.memory.harvesting === true) {
            if (creep.carry.energy < creep.carryCapacity) {
                creep.memory.lastTurn = "harvester";
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
        creep.moveTo(sources[0], {visualizePathStyle: {stroke: "#0f0", opacity: 0.2}});
    }
};

const doStorage = function(creep) {
    let target = Game.getObjectById(creep.memory.storageTarget);
    if (target && target.energy === target.energyCapacity || target === null) {
        creepTarget.setNextStorageTarget(creep);
        target = Game.getObjectById(creep.memory.storageTarget);
    }

    if (!creep.memory.storageTarget) {
        const shouldUpgrade = creep.memory.lastTurn !== "upgrader" && creep.carry.energy === creep.carryCapacity
            || creep.memory.lastTurn === "upgrader" && creep.carry.energy > 0;
        if (shouldUpgrade) {
            creep.memory.lastTurn = "upgrader";
            upgraderRole.run(creep);
        } else {
            creep.memory.lastTurn = "harvester";
            creep.memory.harvesting = true;
        }
        return;
    }

    creep.memory.lastTurn = "harvester";
    const transferResult = creep.transfer(target, RESOURCE_ENERGY);
    if (transferResult === ERR_NOT_IN_RANGE) {
        creep.moveTo(target.pos, {visualizePathStyle: {stroke: "#fff", opacity: 0.2}});
    } else {
        if (transferResult === OK) {
            creep.carry.energy -= (target.energyCapacity - target.energy);
        }
        creepTarget.setNextStorageTarget(creep);
        if (!creep.memory.storageTarget) {
            creep.memory.harvesting = true;
        }
    }
};

module.exports = harvesterRole;