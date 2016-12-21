define(['RIB', 'PropertiesPanel', 'utils'], function(RIB, Ppanel, utils) {

  var ShowDataWidget = {};


  ShowDataWidget.getInputs = function() {
    //return inputs;
    return ['Input1', ];
  };


  DataGraphWidget.onBeforeSave = function(){
    return {
      min: this._min,
      max: this._max,
      rate: this._rate,
    };
  };


  ShowDataWidget.onLoad = function(){
    var that = this;

    this.preloadTemplate('properties.html').then(function(template) {
      that._propTemplate = template;

    }).catch(function(err){
      console.log("Error preloading template: ", err);
    });

    // Define an event listener
    this.onData(function(data, target){
      analyseData.call(that, data, target);
    });

  };


  ShowDataWidget.onClick = function(){
    Ppanel.loading();

    // Load basic properties?
    this.loadBaseFeeds();

    var that = this;
    // Any processing here
    var html = this._propTemplate(this);
    this._container = this.displayCustomSettings($(html));

    Ppanel.stopLoading();

  };

  function analyseData(data, targetInput){
    if (targetInput === 'Input1') {
      console.log("---->", data);
      this._lineX.append(new Date().getTime(), data);
    } else {
      console.log("This widget doesn't have an input '%s'", targetInput);
    }
  }

  return ShowDataWidget;

});
