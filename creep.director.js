const creepCommon = require("./common.creep");
const creepActionRunner = require("./creep.actionRunner");
const creepReassign = require("./creep.reassign");
const creepSpawn = require("./creep.spawn");

const run = function() {
    creepActionRunner.run();
    const creepAndRoleAssignations = creepCommon.getCreepAndRoleAssignations();
    creepReassign.reassignOrKillCreepsInWrongRoleEvery10Ticks(creepAndRoleAssignations);
    creepSpawn.spawn(creepAndRoleAssignations);
};

module.exports = {
    run: run
};