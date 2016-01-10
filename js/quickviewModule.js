// JavaScript Document
(function(angular){
var quickViewModule = angular.module('QuickView', [])

//Factory
quickViewModule.factory("quickViewFactory", function($http){
	  
	  var objQuickViewData = {};
	  var jsonData = [];
	  objQuickViewData.mydata = function(callback,currIndex)
	  {
		  $http.post("data/quickview"+currIndex+".txt").success(function (data)
		  {
			  console.log("data::"+data);
				jsonData = data;
				callback(jsonData);
		  });
	  }
	  
	  return objQuickViewData;
  })
 .controller('QuickViewController', function($scope, quickViewFactory) {
	 console.log("controller is called");
	 $scope.currentIndex = 0;
	 $scope.prevIndex = 0;
	 $scope.nexttIndex = 0;
	 var plpItemsLen = 0
	 appendContent();
	 
	 //Application start from here..
	  function mycallback(data){
		  $scope.initController(data);
	  }
	  
	  
	  /*this function append the quickview component on click on plp item*/
	  function appendContent()
	  {
		  plpItemsLen = $(".plpContainer").length;
		  $(".plpContainer").unbind("click").bind("click", function(){
			  		$(".qview").css("display","block");
			  		var ind = Number($(this).index())+1;
					var indiv = Math.ceil(ind/4)*4;
					$("#divResult").insertAt(indiv-1, $('custom-component'));
					var ind1 = $(this).index();
					$scope.currentIndex = ind1;
					adjustIconPt();
					onItemClicked();
					quickViewFactory.mydata(mycallback,$scope.currentIndex);
			})
	  }
	  
	  
	  function adjustIconPt()
	  {
			var arr = [920, 650,380,110];
			var indiv = Math.ceil(($scope.currentIndex+1)/4)*4;
			var colInd = (indiv-1)-$scope.currentIndex;
			var leftPos = arr[colInd];
			//console.log("leftPos::"+leftPos);
			$(".icon-uppointer").css("left",leftPos);
	  }
	  
	  function onItemClicked()
	  {
		  if($scope.currentIndex>0)
		  {
			  $scope.enableDisablePrev(false,1);
			  $scope.enableDisableNext(false,1);
		  }
		  else if($scope.currentIndex===0)
		  {
			  $scope.enableDisablePrev(true,0.5);
			  $scope.enableDisableNext(false,1);
		  }
		  else if($scope.currentIndex >= plpItemsLen)
		  {
			 $scope.enableDisablePrev(false,1);
			  $scope.enableDisableNext(true,0.5);
		  }
		  else if($scope.currentIndex < plpItemsLen)
		  {
			  $scope.enableDisablePrev(false,1);
			  $scope.enableDisableNext(false,1);
		  }
	  }
	  
	  
	  //Listen for next and prev buttons in quickview.
	  $scope.addNavListener = function()
	  {
		  console.log("plpItemsLen:::"+plpItemsLen);
		  $scope.enableDisablePrev(true,0.5);
		  $("#prev").off("click").on("click",onPrev);		  
		  $("#next").off("click").on("click",onNext);
	  }
	  
	  
	  function onNext()
	  {
			  if($scope.currentIndex < plpItemsLen)
			  {
				  $scope.currentIndex++;
				  $scope.nexttIndex = $scope.currentIndex;
				  $scope.enableDisablePrev(false,1);
				  $scope.enableDisableNext(false,1);
				  quickViewFactory.mydata(mycallback,$scope.currentIndex);
			  }
			  adjustIconPt();
		  }
	  
	  function onPrev(){
		  	 $scope.currentIndex--;
			 console.log()
			  if($scope.currentIndex>0)
			  {
				  $scope.prevIndex = $scope.currentIndex;
				  quickViewFactory.mydata(mycallback,$scope.currentIndex);
			  }
			  else if($scope.currentIndex===0)
			  {
				  $scope.currentIndex = 0;
				  $scope.enableDisablePrev(true,0.5);
				  $scope.enableDisableNext(false,1);
				  quickViewFactory.mydata(mycallback,$scope.currentIndex);
			  }
			  
			  adjustIconPt();
	  }
	  $scope.enableDisablePrev = function(bValue,opacity)
	  {
		  console.log("PREV::"+$scope.currentIndex);
		  if($scope.currentIndex===0)
		  {
			  $("#prev").off("click");
			  $("#prev").css({"opacity":opacity,"cursor":"default"});
		  }
		  else
		  {
		  $("#prev").off().on("click",onPrev);
		  $("#prev").css({"opacity":opacity,"cursor":"pointer"});
		  }
	  }
	  
	  $scope.enableDisableNext = function(bValue,opacity)
	  {
		  console.log("NEXT::"+$scope.currentIndex);
		  if($scope.currentIndex >= plpItemsLen)
		  {
			  $("#next").off();
			  $("#next").css({"opacity":opacity,"cursor":"default"});
		  }
		  else
		  {
			  $("#next").off().on("click",onNext);
			  $("#next").css({"opacity":opacity,"cursor":"pointer"});
		  }
	  }
	  
	  
	  $scope.initController = function(data)
	  {
		  $scope.jsonData = data;
		  $scope.quickView = $scope.jsonData.quickview;
		  $scope.customization = $scope.jsonData.quickview.measurment.customization;
		  $scope.gallary = $scope.jsonData.quickview.gallary;
		  $scope.imgSrc = $scope.gallary.mainimg.path;
		  console.log("$scope.imgSrc:::"+$scope.imgSrc);
		  
	  }
	  
	  
	  /*Custom function to insert a component at specific index*/
	  jQuery.fn.insertAt = function(index, element) {
		  var lastIndex = this.children().size()
		  if (index < 0) {
			index = Math.max(0, lastIndex + 1 + index)
		  }
		  this.append(element)
		  if (index < lastIndex) {
			this.children().eq(index).after(this.children().last())
		  }
		  return this;
		}
		////////////////////////////////////////////////////////////
	  
  })
  .directive('dir0', function() {
				return {
				restrict:'C',	
				scope: {
				  // creates a scope variable in your directive
				  // called `locations` bound to whatever was passed
				  // in via the `locations` attribute in the DOM
				  optionsWindow: '=dataobj'
				},
				link: function(scope, element, attrs) {
					scope.$parent.displayProp(element,attrs);
					scope.changeVal = function(index,radiobtnindex){
						scope.$parent.changeVal(element,attrs,index,radiobtnindex);
					}
				}
		  	}; 
		})
	.directive('dir1', function() {
				return {
				restrict:'C',
				scope: {
				optionsWindow: '=dataobj'
				},
				templateUrl:'templates/save_on_shipping.html',
				link: function(scope, element, attrs) {
					scope.$parent.displayProp(element,attrs);
				}
		  	}; 
		})
		.directive('dir2', function() {
				return {
				restrict:'C',
				scope: {
				  optionsWindow: '=dataobj'
				},
				link: function(scope, element, attrs) {
					scope.$parent.displayProp(element,attrs);
				}
		  	}; 
		})
		.directive('dir3', function() {
				return {
				restrict:'C',
				scope: {
				  optionsWindow: '=dataobj'
				},
				templateUrl:'templates/select_your_size.html',
				link: function(scope, element, attrs) {
					scope.$parent.displayProp(element,attrs);
				}
		  	}; 
		})
		
		.directive('customComponent', function() {
				return {
				restrict:'E',
				scope: {
				  mainobj: '=jsondata'
				},
				templateUrl:'templates/qview.htm',
				link: function(scope, element, attrs) {
					console.log("Custom Compoenet");
					scope.$parent.addNavListener();
					scope.displayProp = function(element, attrs)
					  {
								//console.log("Attr:::"+attrs.display);
								if(attrs.display=="true")
								element.css("display","block");
								else
								element.css("display","none");
					  }
					  
					  scope.changeVal = function(element, attrs, index, radiobtnindex)
					  {
						  //console.log("current:"+index+"::radiobtnindex::"+radiobtnindex);
						  $(".size-fields"+index).css("display","none");
						  $("#radiocnt"+index+radiobtnindex).css("display","block");		  
					  }
				}
		  	}; 
		})
		
		.directive('customHeader', function() {
				return {
				restrict:'C',
				scope: {
				  optionsWindow: '=dataobj'
				},
				templateUrl:'templates/custom_header.html',
				link: function(scope, element, attrs) {
				}
		  	}; 
		})
		.directive('customGallary', function() {
				return {
				restrict:'C',
				scope: {
				  optionsWindow: '=dataobj',
				  gallaryProp:'@gallaryProp'
				},
				templateUrl:'templates/gallary.html',
				link: function(scope, element, attrs) {
					scope.imgSrc ="";
					
					//First way to get the data through attribute in directive
					attrs.$observe('gallaryProp', function(value) {
                		if(value)
						scope.imgSrc = value;
            		});
					
					//second way to get the json data in directive
					/*scope.$watch('optionsWindow', function(optionsWindow) {
					angular.forEach(optionsWindow, function(value, key) {
					  // do something
					  console.log("Value::"+value+"::Key::"+value.path);
					  scope.imgSrc = value.path;
						});
					});*/
					scope.onMouseOver = function(url){
						scope.imgSrc = url;
					}
				}
		  	}; 
		});
		
		
})(window.angular);