/*global GLOBE, Em */

GLOBE.OnionooBandwidthHistory = Em.Object.extend({});
GLOBE.OnionooBandwidthHistory.reopenClass({

    /**
     * Find bandwidth history for a given fingerprint
     * @param {String} fingerprint
     * @param {Boolean} isHashed flag if the given hash is already hashed
     * @returns {Promise}
     */
    find: function(fingerprint, isHashed) {
        var hashedFingerprint = fingerprint;
        if (!isHashed) {
            // use generate hashed fingerprint if not already hashed
            hashedFingerprint = GLOBE.Util.hashFingerprint(fingerprint);
        }

        hashedFingerprint = hashedFingerprint.toUpperCase();

        var url = '/bandwidth?lookup=' + hashedFingerprint;
        return GLOBE.getJSON(url).then(function(result) {
            return GLOBE.Util.processHistoryResponse({
                readHistory: 'read_history',
                writeHistory: 'write_history'
            }, result);
        });
    }
});
