/**
 * Created by nabilbenabbou1 on 6/13/14.
 */

define([
    'handlebars',
    'backbone.marionette',
    // models
    'models/actions/appear',
    'models/actions/disappear',
    'models/actions/move',
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
    // models
    AppearModel,
    DisappearModel,
    MoveModel,
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

        // childViewContainer: '#myActions',

        initialize : function (options) {
            // mandatory arguments
            this.screencast = options.screencast;
            this.screenId = options.screenId;

            this.collection = this.screencast.model.getScreenById(this.screenId).get('actions');

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

        // We select the ItemView depending on the object type.
        getChildView: function(item){
            // if(item instanceof AppearModel) {
            //     return AppearView;
            // }else if(item instanceof DisappearModel){
            //     return DisappearView;
            // }else if(item instanceof MoveModel){
            //     return MoveView;
            // }
            return ActionView;
        },

        onChanged: function(){
            this.render();
        },

        modelEvents: {
            'change': 'onChanged'
        }
    });
});