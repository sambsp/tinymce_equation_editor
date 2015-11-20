var slice=[].slice;window.EquationEditor={},EquationEditor.Events={on:function(t,o,n){var e;return this._events||(this._events={}),(e=this._events)[t]||(e[t]=[]),this._events[t].push({callback:o,context:n||this})},trigger:function(t){var o,n;if(this._events)return o=Array.prototype.slice.call(arguments,1),(n=this._events[t])?this.triggerEvents(n,o):void 0},triggerEvents:function(t,o){var n,e,i,r,u;for(u=[],e=0,i=t.length;i>e;e++)n=t[e],u.push((r=n.callback).call.apply(r,[n.context].concat(slice.call(o))));return u}},EquationEditor.View=function(){function t(t){this.options=t,this.$el=this.options.$el||$(this.options.el),this.initialize.apply(this,arguments)}return t.prototype.$=function(t){return this.$el.find(t)},t.prototype.initialize=function(){},t.prototype.createElement=function(){return this.$el=$(this.template())},t}();var bind=function(t,o){return function(){return t.apply(o,arguments)}},extend=function(t,o){function n(){this.constructor=t}for(var e in o)hasProp.call(o,e)&&(t[e]=o[e]);return n.prototype=o.prototype,t.prototype=new n,t.__super__=o.prototype,t},hasProp={}.hasOwnProperty;EquationEditor.CollapsibleView=function(t){function o(){return this.toggleCollapse=bind(this.toggleCollapse,this),o.__super__.constructor.apply(this,arguments)}return extend(o,t),o.prototype.initialize=function(){return this.$(".collapsible-box-toggle").on("click",this.toggleCollapse)},o.prototype.toggleCollapse=function(t){return t.preventDefault(),this.$(".box-content-collapsible").is(":visible")?this.closeCollapsible():this.openCollapsible()},o.prototype.openCollapsible=function(){return this.$(".box-content-collapsible").slideDown(),this.toggleOpenClass()},o.prototype.closeCollapsible=function(){return this.$(".box-content-collapsible").slideUp(),this.toggleOpenClass()},o.prototype.toggleOpenClass=function(){return this.$(".collapsible-box-toggle").toggleClass("collapsible-box-toggle-open")},o}(EquationEditor.View);var bind=function(t,o){return function(){return t.apply(o,arguments)}},extend=function(t,o){function n(){this.constructor=t}for(var e in o)hasProp.call(o,e)&&(t[e]=o[e]);return n.prototype=o.prototype,t.prototype=new n,t.__super__=o.prototype,t},hasProp={}.hasOwnProperty;EquationEditor.Buttons={},EquationEditor.Buttons.BaseButtonView=function(t){function o(){return this.handleClick=bind(this.handleClick,this),o.__super__.constructor.apply(this,arguments)}return extend(o,t),o.prototype.initialize=function(){return this.latex=this.options.latex,this.buttonText=this.options.buttonText||this.options.latex,this.className=["math-button",this.options.className].join(" ").trim()},o.prototype.handleClick=function(t){return t.preventDefault(),EquationEditor.Events.trigger("latex:"+this.event,this.latex)},o.prototype.render=function(){return this.createElement(),this.$("a").on("click",this.handleClick),this},o.prototype.template=function(){return'<div class="'+this.className+'">\n  <a title="'+this.buttonText+'" href="#">'+this.buttonText+"</a>\n</div>"},o}(EquationEditor.View),EquationEditor.Buttons.CommandButtonView=function(t){function o(){return o.__super__.constructor.apply(this,arguments)}return extend(o,t),o.prototype.event="command",o}(EquationEditor.Buttons.BaseButtonView),EquationEditor.Buttons.WriteButtonView=function(t){function o(){return o.__super__.constructor.apply(this,arguments)}return extend(o,t),o.prototype.event="write",o}(EquationEditor.Buttons.BaseButtonView);var bind=function(t,o){return function(){return t.apply(o,arguments)}},extend=function(t,o){function n(){this.constructor=t}for(var e in o)hasProp.call(o,e)&&(t[e]=o[e]);return n.prototype=o.prototype,t.prototype=new n,t.__super__=o.prototype,t},hasProp={}.hasOwnProperty;EquationEditor.ButtonGroupView=function(t){function o(){return this.toggle=bind(this.toggle,this),o.__super__.constructor.apply(this,arguments)}return extend(o,t),o.prototype.initialize=function(){return this.groupName=this.options.groupName,this.buttonViews=this.options.buttonViews},o.prototype.render=function(){return this.createElement(),this.renderButtons(),new EquationEditor.CollapsibleView({$el:this.$el}),this.$("header").click(this.toggle),this},o.prototype.toggle=function(){return this.$(".collapsible-box-toggle").click()},o.prototype.renderButtons=function(){var t,o,n,e,i;for(e=this.buttonViews,i=[],o=0,n=e.length;n>o;o++)t=e[o],i.push(this.$(".buttons").append(t.render().$el));return i},o.prototype.template=function(){return"<div class=\"button-group collapsible\">\n  <a href='#' class='collapsible-box-toggle ss-dropdown'></a> <header>"+this.groupName+'</header>\n\n  <div class="buttons box-content-collapsible"></div>\n</div>'},o}(EquationEditor.View),EquationEditor.ButtonViewFactory={create:function(config){var buttonConfig,buttons,i,klass,len;for(buttons=[],i=0,len=config.length;len>i;i++)buttonConfig=config[i],klass=eval(buttonConfig.klass),buttons.push(new klass(buttonConfig));return buttons}},EquationEditor.ButtonGroupViewFactory={create:function(t){var o,n,e,i;for(n=[],e=0,i=t.length;i>e;e++)o=t[e],o.buttonViews=EquationEditor.ButtonViewFactory.create(o.buttonViews),n.push(new EquationEditor.ButtonGroupView(o));return n}};var ButtonGroup,Buttons,bind=function(t,o){return function(){return t.apply(o,arguments)}},extend=function(t,o){function n(){this.constructor=t}for(var e in o)hasProp.call(o,e)&&(t[e]=o[e]);return n.prototype=o.prototype,t.prototype=new n,t.__super__=o.prototype,t},hasProp={}.hasOwnProperty;Buttons=EquationEditor.Buttons,ButtonGroup=EquationEditor.ButtonGroupView,EquationEditor.EquationEditorView=function(t){function o(){return this.focus=bind(this.focus,this),this.handleWriteButton=bind(this.handleWriteButton,this),this.handleCommandButton=bind(this.handleCommandButton,this),o.__super__.constructor.apply(this,arguments)}return extend(o,t),o.prototype.initialize=function(){return this.existingLatex=this.options.existingLatex,this.restrictions=this.options.restrictions||{},EquationEditor.Events.on("latex:command",this.handleCommandButton,this),EquationEditor.Events.on("latex:write",this.handleWriteButton,this)},o.prototype.render=function(){return $.getJSON("config.json").done(function(t){return function(o){return t.config=o,t.addButtonBar(),t.addButtonGroups(),t.enableMathMagic()}}(this)),this},o.prototype.enableMathMagic=function(){return this.$(".math-button a").mathquill(),this.input().mathquill("editable"),null!=this.existingLatex&&this.input().mathquill("latex",this.existingLatex),this.focus()},o.prototype.input=function(){return this.$(".math")},o.prototype.addButtonBar=function(){var t,o,n,e,i;for(e=this.buttonBarButtons(),i=[],o=0,n=e.length;n>o;o++)t=e[o],i.push(this.$(".button-bar").append(t.render().$el));return i},o.prototype.addButtonGroups=function(){var t,o,n,e,i;for(e=this.buttonGroups(),i=[],o=0,n=e.length;n>o;o++)t=e[o],i.push(this.$(".button-groups").append(t.render().$el));return i},o.prototype.buttonBarButtons=function(){return EquationEditor.ButtonViewFactory.create(this.config.buttonBar)},o.prototype.buttonGroups=function(){var t;return t=this.basicButtonGroups(),this.restrictions.disallow_intermediate||(t=t.concat(this.intermediateButtonGroups())),this.restrictions.disallow_advanced||(t=t.concat(this.advancedButtonGroups())),t},o.prototype.basicButtonGroups=function(){return EquationEditor.ButtonGroupViewFactory.create(this.config.buttonGroups.basic)},o.prototype.intermediateButtonGroups=function(){return EquationEditor.ButtonGroupViewFactory.create(this.config.buttonGroups.intermediate)},o.prototype.advancedButtonGroups=function(){return EquationEditor.ButtonGroupViewFactory.create(this.config.buttonGroups.advanced)},o.prototype.handleCommandButton=function(t){return this.performCommand(t),this.focus()},o.prototype.handleWriteButton=function(t){return this.performWrite(t),this.focus()},o.prototype.performCommand=function(t){return this.input().mathquill("cmd",t)},o.prototype.performWrite=function(t){return this.input().mathquill("write",t)},o.prototype.focus=function(){return this.$("textarea").focus()},o.prototype.equationLatex=function(){return this.input().mathquill("latex")},o}(EquationEditor.View);