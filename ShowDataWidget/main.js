define(['RIB', 'PropertiesPanel', 'utils'], function(RIB, Ppanel, utils) {

  var ShowDataWidget = {};


  ShowDataWidget.getInputs = function() {
    //return inputs;
    return ['Input1', ];
  };


  ShowDataWidget.onBeforeSave = function(){
    return {
      txtTitle: this._txtTitle,
      txtColor: this._txtColor,
      txtBackground: this._txtBackground,
    };
  };


  ShowDataWidget.onLoad = function(){
    var that = this;

    if (this.storedSettings && this.storedSettings.hasOwnProperty('txtTitle')){
      this._txtTitle = this.storedSettings.txtTitle;
      this._txtIcon = this.storedSettings.txtIcon;      
      this._txtColor = this.storedSettings.txtColor;
      this._txtBackground = this.storedSettings.txtBackground;

    } else {
      this._txtTitle = "Kitsunei Title";
      this._txtIcon = "lightbulb-o";
      this._txtColor = "#fff";
      this._txtBackground = "##eb5e55";

    }

    this.preloadTemplate('properties.html').then(function(template) {

      that._propTemplate = template;

    }).catch(function(err){
      console.log("Error preloading template: ", err);
    });

    // Define an event listener
    this.onData(function(data, target){
      analyseData.call(that, data, target);
    });

    this._showInput1 = this.canvasIcon.find("#showInput1");

  };


  ShowDataWidget.onClick = function(){
    Ppanel.loading();

    // Load basic properties?
    this.loadBaseFeeds();

    var that = this;
    // Any processing here
    var html = this._propTemplate(this);
    this._container = this.displayCustomSettings($(html));

    var changeSettings = function(type) {
      if (type === "txtTitle") {
        this._txtTitle = this._container.find("#txtTitle").val();
        this.canvasIcon.find("#txtTitle").text( this._txtTitle );

      } else if (type === "txtIcon"){
        this._txtIcon = this._container.find("#txtIcon option:selected").text();
        this.canvasIcon.find("#txtIcon").attr( "class", "fa fa-" + this._txtIcon );

      } else if (type === "txtColor"){
        this._txtColor = this._container.find("#txtColor").val();
        this.canvasIcon.find("#widgetContainer").css( "color", this._txtColor );

      } else if (type === "txtBackground"){
        this._txtBackground = this._container.find("#txtBackground").val();
        this.canvasIcon.find("#widgetContainer").css( "background-color", this._txtBackground );

      }

    };

    this._container.find("#txtTitle").css("value", this._txtTitle);
    this._container.find("#txtColor").css("value", this._txtColor);
    this._container.find("#txtBackground").css("value", this._txtBackground);

    this._container.find("#txtTitle").change(changeSettings.bind(this, 'txtTitle'));
    this._container.find("#txtIcon").change(changeSettings.bind(this, 'txtIcon'));
    this._container.find("#txtColor").change(changeSettings.bind(this, 'txtColor'));
    this._container.find("#txtBackground").change(changeSettings.bind(this, 'txtBackground'));

    Ppanel.stopLoading();

  };

  function analyseData(data, targetInput){
    if (targetInput === 'Input1') {
      this._showInput1.text(data);
    } else {
      console.log("This widget doesn't have an input '%s'", targetInput);
    }
  }

  return ShowDataWidget;

});
