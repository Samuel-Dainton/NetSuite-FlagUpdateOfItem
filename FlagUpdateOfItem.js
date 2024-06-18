/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define(['N/record'], function(record) {

    function beforeSubmit(context) {
        if (context.type !== context.UserEventType.EDIT) {
            return;
        }

        var newRecord = context.newRecord;
        var oldRecord = context.oldRecord;

        var fieldsToCheck = ['itemid', 'displayname', 'description', 'salesdescription'];
        var fieldChanged = false;

        for (var i = 0; i < fieldsToCheck.length; i++) {
            var fieldId = fieldsToCheck[i];
            if (newRecord.getValue(fieldId) !== oldRecord.getValue(fieldId)) {
                fieldChanged = true;
                break;
            }
        }

        if (fieldChanged) {
            var designCheckNewValue = newRecord.getValue('custitem_design_check');
            var designCheckOldValue = oldRecord.getValue('custitem_design_check');

            // Check if custitem_design_check was explicitly changed from false to true during this edit
            if (!(designCheckOldValue === false && designCheckNewValue === true)) {
                newRecord.setValue({
                    fieldId: 'custitem_design_check',
                    value: false
                });
            }
        }
    }

    return {
        beforeSubmit: beforeSubmit
    };
});
