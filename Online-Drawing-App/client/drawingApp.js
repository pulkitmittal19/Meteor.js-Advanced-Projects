points = new Meteor.Collection('pointsCollection');
var canvas;

// we use these for drawing more interesting shapes
var lastX=0;
var lastY=0;
var strokeWidth = 1;
var thickness=1;
var strokeColor = "black";

Meteor.startup( function() {
  canvas = new Canvas();

  Deps.autorun( function() {
    var data = points.find({}).fetch();

    if (canvas) {
      canvas.draw(data);
    }
  });
});

Template.wall.events({

  "click button.clear": function (event) {
    Meteor.call('clear', function() {
      canvas.clear();
    });
  },


	//choose a color. Initialise the last vals, otherwise a stray line will appear.

	  "click button.red": function () {
	    lastX=0;
	    lastY=0;
	    strokeColor = "red";
	  },

	 "click button.grey": function () {
	    lastX=0;
	    lastY=0;
	    strokeColor = "grey";
	  },

	 "click button.magenta": function () {
	    lastX=0;
	    lastY=0;
	    strokeColor = "magenta";
	  },

	  "click button.black": function () {
	    lastX=0;
	    lastY=0;
	    strokeColor = "black";
	  },

	 "click button.orange": function () {
	    lastX=0;
	    lastY=0;
	    strokeColor = "orange";
	  },

	  "click button.pink": function () {
	    lastX=0;
	    lastY=0;
	    strokeColor = "pink";
	  },

	  "click button.blue": function () {
	    lastX=0;
	    lastY=0;
	    strokeColor = "blue";
	  },

	  "click button.green": function () {
	    lastX=0;
	    lastY=0;
	    strokeColor = "green";
	  },

	  "click button.thicker": function () {

	    thickness+=1;

	  },

	  "click button.thinner": function () {
	    
	    if (thickness > 0) {
	      thickness-=1;
		
	    }
	  },



  
})

var markPoint = function() {

  var offset = $('#canvas').offset();



      if (lastX==0) {
        lastX = (event.pageX - offset.left);
        lastY = (event.pageY - offset.top);
      }
      points.insert({
        
        //2) draw a line - requires you to change the code in drawing.js
        x: (event.pageX - offset.left),
        y: (event.pageY - offset.top),
        x1: lastX,
        y1: lastY,
        
        w: thickness,
        
        c: strokeColor,


      }); // end of points.insert()

        lastX = (event.pageX - offset.left);
        lastY = (event.pageY - offset.top);

}

Template.canvas.events({
  'click': function (event) {
    markPoint();
  },
  'mousedown': function (event) {
    Session.set('draw', true);
  },
  'mouseup': function (event) {
    Session.set('draw', false);
    lastX=0;
    lasyY=0;
  },
  'mousemove': function (event) {
    if (Session.get('draw')) {
      markPoint();
    }
  }
});
