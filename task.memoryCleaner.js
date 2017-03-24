const cpu = require("./common.cpu");

const cleanMemoryEvery100Ticks = function() {
    if (Game.time % 100 === 32) {
        cleanMemory();
        console.log("Cleaned memory");
        cpu.printCpuUsage();
    }
};

const cleanMemory = function() {
    const keys = Object.keys(Memory.creeps);
    for (let index in keys) {
        if (!Game.creeps[keys[index]]) {
            delete Memory.creeps[keys[index]];
            console.log("Deleting reference to dead creep " + keys[index]);
        }
    }
};

module.exports = {
    run: cleanMemoryEvery100Ticks
};
