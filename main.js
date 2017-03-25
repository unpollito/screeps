const creepDirector = require("./creep.director");
const memoryCleanerTask = require("./task.memoryCleaner");
const creepTarget = require("./creep.target");

module.exports.loop = function() {
    creepDirector.run();
    memoryCleanerTask.run();
    creepTarget.clearCreepTargetsAfter100Ticks();
};
