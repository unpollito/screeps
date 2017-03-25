const getRoomTotalEnergy = function(room) {
    return getStructures(room).map((structure) => {
        return structure.energy;
    }).reduce((a, b) => {
        return a + b;
    });
};

const getRoomTotalCapacity = function(room) {
    return getStructures(room).map((structure) => {
        return structure.energyCapacity;
    }).reduce((a, b) => {
        return a + b;
    });
};

const getStructures = function(room) {
    return room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            const rightType = structure.structureType === STRUCTURE_EXTENSION
                || structure.structureType === STRUCTURE_SPAWN;
            return rightType && structure.isActive();
        }
    });
};

module.exports = {
    getRoomTotalEnergy: getRoomTotalEnergy,
    getRoomTotalCapacity: getRoomTotalCapacity,
};
