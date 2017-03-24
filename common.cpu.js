const printCpuUsage = function() {
    console.log("CPU usage: " + Game.cpu.getUsed() + "/" + Game.cpu.tickLimit);
};

module.exports = {
    printCpuUsage: printCpuUsage
};
