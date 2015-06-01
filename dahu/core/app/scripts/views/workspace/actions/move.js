/**
 * Created by nabilbenabbou1 on 6/13/14.
 */

define([
    'handlebars',
    'backbone.marionette',
    // views
    'views/workspace/actions/action',
    // templates
    'text!templates/views/workspace/actions/move.html'
], function(
    Handlebars,
    Marionette,
    // views
    ActionView,
    // templates
    moveTemplate
) {

    var ExtraParamView = Marionette.ItemView.extend({

        template: Handlebars.default.compile(moveTemplate),

        initialize: function (model) {
            this.model = model;
        },

        triggers: {
            "change .trXChoice": "move:trx:change",
            "change .trYChoice": "move:try:change"
        }
    });

    /**
     * Move action view
     */
    return ActionView.extend({

        onChildviewMoveTrxChange: function () {
            this.model.set("trX", $("#trXChoice_" + this.model.id).val());
        },

        onChildviewMoveTryChange: function () {
            this.model.set("trY", $("#trYChoice_" + this.model.id).val());
        },

        onShow: function () {
            this.getRegion('extra').show(new ExtraParamView(this.model));
        },

    });
});