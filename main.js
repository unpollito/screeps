const creepDirector = require("./creep.director");
const memoryCleanerTask = require("./task.memoryCleaner");

module.exports.loop = function() {
    creepDirector.run();
    memoryCleanerTask.run();
};
