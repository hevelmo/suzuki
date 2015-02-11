var sampleJSON = {
  "people": [
    {
      "name": "Peter",
      "gender": "Male"
    },
    {
      "name": "Alanna",
      "gender": "Female"
    }
  ]
};
 
var getTemplateContents = function() {
  jQuery.get( 'html-widget.html', processTemplate );
};
 
var processTemplate = function( template ) {
  var rendered = Mustache.render( template, sampleJSON );
  jQuery( '#template-output' ).html( rendered );
};
 
getTemplateContents();