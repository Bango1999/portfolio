// Spamless Email

function stringReverse(textString) {
   if (!textString) return '';
   var revString='';
   for (i = textString.length-1; i>=0; i--)
       revString+=textString.charAt(i)
   return revString;
}

function showEM(userName, emServer) {
		
    /*
		The showEM() function displays a link to the user's e-mail address.  
		The text of the user and email server names are entered in reverse order to thwart e-mail harversers.
		*/

    userName = stringReverse(userName);//reverse the text of the userName parameter
    emServer = stringReverse(emServer);//reverse the text of the emServer parameter

    var emLink = userName + "@" + emServer;//combime the text of userName and emServer
    emLink = '<a href="mailto:' + emLink + '">' + emLink + '</a>';
    return emLink;
  }

	$(function() {
		$("#slider").easySlider({
			auto: true,
			continuous: true,
			speed:800,
			pause:2000,
			controlsShow: false
		});
	});

$(document).ready(function() {
  
  $('.headContact').html(
    '812-XXX-XXXX &bull; ' + showEM("nagol","zyx.ognaws")
  );
});
	
