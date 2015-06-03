/**
 * Created by nabilbenabbou1 on 6/13/14.
 */

define([
    'handlebars',
    'backbone.marionette',
    // modules
    // 'modules/kernel/SCI',
    // models
    'models/actions/appear',
    'models/actions/disappear',
    'models/actions/move',
    'models/action',
    // views
    'views/workspace/actions/appear',
    'views/workspace/actions/disappear',
    'views/workspace/actions/move',
    'views/workspace/actions/action',
    // templates
    'text!templates/views/workspace/actions.html'
], function(
    Handlebars,
    Marionette,
    // modules
    // Kernel,
    // models
    AppearModel,
    DisappearModel,
    MoveModel,
    ActionModel,
    // views
    AppearView,
    DisappearView,
    MoveView,
    ActionView,
    // templates
    actionsTemplate
) {

    /**
     * Workspace actions view
     */
    return Marionette.CompositeView.extend({

        template: Handlebars.default.compile(actionsTemplate),

        className: "ActionsList",

        childView: ActionView,

        initialize : function (options) {
            // mandatory arguments
            _.extend(this, _.pick(options, ['screencast', 'screenId']));
            
            this.collection = this.screencast.model.getScreenById(this.screenId).get("actions");

            this.childViewOptions = {
                screencast: this.screencast,
                screenId: this.screenId
            };

            /*@remove
            // Specify that the collection we want to iterate, for the childView, is
            // given by the attribute actions.
            if (this.model != null) {
                this.collection = this.model.get('actions');
                // Tell the view to render itself when the
                // model/collection is changed.
                this.model.on('change', this.onChanged(), this);
                if (this.collection != null) {
                    this.collection.on('change', this.onChanged(), this);
                }
            }*/
        },

        getChildView: function(item) {
            if (item instanceof DisappearModel) {
                return DisappearView;
            };
            if (item instanceof MoveModel) {
                return MoveView;
            };
            if (item instanceof AppearModel) {
                return AppearView;
            };
        },

        onChildviewSelect: function (viewSelected) {
            this.children.each(function(view){
                if (view !== viewSelected) {
                    view.setToggle(false);
                };
            });
        }

    });
});