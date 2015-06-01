/**
 * Created by nabilbenabbou1 on 6/13/14.
 */

define([
    'handlebars',
    'backbone.marionette',
    // module
    'modules/kernel/SCI',
    // views
    'views/workspace/actions/action',
    // templates
    'text!templates/views/workspace/actions/move.html'
], function(
    Handlebars,
    Marionette,
    // module,
    Kernel,
    // views
    ActionView,
    // templates
    moveTemplate
) {

    var ExtraParamView = Marionette.ItemView.extend({

        template: Handlebars.default.compile(moveTemplate),

        triggers: {
                "change #trXChoice": "move:trx:change",
                "change #trYChoice": "move:try:change"
        }
    });
    
    /**
     * Move action view
     */
    return ActionView.extend({

        initialize: function (options) {
            ActionView.prototype.initialize.call(this, options);
        },

        onChildviewMoveTrxChange: function () {
            this.model.attributes.trX = $("#trXChoice").val();
        },

        onChildviewMoveTryChange: function () {
            this.model.attributes.trY = $("#trYChoice").val();
        },

        setToggle: function (state) {
            ActionView.prototype.setToggle.call(this, state);
            this.getRegion('extra').show(new ExtraParamView());
        }

    });
});