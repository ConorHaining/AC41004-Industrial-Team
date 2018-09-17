
module.exports = {
    getCurrentDeskUsage: () => {
        const n = Date.now();

        if(n % 2 === 1) {
            return {'0001': true, '0002': true, '0003': false, '0004': true, '0006': true, '0007': false, '0008': false, '0009': true, '0010': true};
        } else {
            return {'0001': true, '0002': false, '0003': false, '0004': false, '0006': true, '0007': true, '0008': true, '0009': true, '0010': true};
        }
    }
}