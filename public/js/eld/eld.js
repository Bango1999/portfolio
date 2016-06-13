function sleep(milliseconds) {
  		var start = new Date().getTime();
  		for (var i = 0; i < 1e7; i++) {
    		if ((new Date().getTime() - start) > milliseconds){
      		break;
    		}
  		}
}
var eldBool = 0;
function ShowNavChild(child) {
	var x = document.getElementsByClassName(child);
	
	for (var i = 0; i < x.length; i++) {
		//x[i].style.display="block";
		x[i].style.overflowY="visible";
		x[i].style.maxHeight= "500px";
		x[i].style.backgroundColor="rgba(255,255,255,0.1)";
		//x[i].style.border="1px solid rbga(0,0,0,0)";
		//x[i].style.cssFloat= "none";
	}
}
function HideNavChild(child) {
	var x = document.getElementsByClassName(child);
	
	for (var i = 0; i < x.length; i++) {
		x[i].style.overflowY="hidden";
		x[i].style.maxHeight="0px";
		x[i].style.backgroundColor="transparent";
		//x[i].style.border="0px";
		//x[i].style.cssFloat= "right";
		//x[i].style.display="none";
	}
}

function ShowEldChild(child) {
	var x = document.getElementById(child).style.overflowY;
	//alert(x);
	if (x == '' || x == "hidden") {
		document.getElementById(child).style.overflowY="visible";
		//document.getElementById(child).style.maxHeight="800px";
		for (var i = 0; i <= 8; i++) {
			sleep(5);
			if (i == 0) {
				var x = i.toString();
			} else {
				var x = i.toString() + "00px";
			}
			document.getElementById(child).style.maxHeight=x;
		}
		
		
		var img = child + "IMG";
		document.getElementById(img).style.transform="rotate(90deg)";
		document.getElementById(img).style['WebkitTransform']="rotate(90deg) translate3d( 0, 0, 0)";
		document.getElementById(img).style['MozTransform']="rotate(90deg)";
		document.getElementById(img).style['oTransform']="rotate(90deg)";
		document.getElementById(img).style['WebkitBoxShadow']="0px 0px 0px black";
		document.getElementById(img).style['MozBoxShadow']="0px 0px 0px black";
		document.getElementById(img).style['BoxShadow']="0px 0px 0px black";
	} else {
		document.getElementById(child).style.overflowY="hidden";
		document.getElementById(child).style.maxHeight="0px";
		var img = child + "IMG";
		document.getElementById(img).style.transform="rotate(90deg)";
		document.getElementById(img).style['WebkitTransform']="rotate(0deg) translate3d( 0, 0, 0)";
		document.getElementById(img).style['MozTransform']="rotate(0deg)";
		document.getElementById(img).style['oTransform']="rotate(0deg)";
		document.getElementById(img).style['WebkitBoxShadow']="4px 4px 3px black";
		document.getElementById(img).style['MozBoxShadow']="4px 4px 3px black";
		document.getElementById(img).style['BoxShadow']="4px 4px 3px black";
	}
}

function CheckContents() {
	
	//start checking
	var nameGood = 0;
	var emailGood = 0;
	var intentGood = 0;
	var otherBoxGood = 0;
	var commentGood = 0;
	var robotGood = 0;
	
	var name = document.getElementById("contactName").value;
		if (name.length < 50 && name.length > 0) {
			nameGood = 1;
		}
	var email = document.getElementById("contactEmail").value;
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))  {  
			emailGood = 1;  
		}  
	var intent = document.getElementById("contactReason").value;
		if (intent == "other") {
			var other = document.getElementById("contactOTHER").value;
			if (other.length > 0) {
				otherBoxGood = 1;
			}
			intentGood = 1;
		} else if (intent == "Unban_Request") {
			intentGood = 2;
			otherBoxGood=1;
		} else if (intent != "noChoice") {
			intentGood = 1;
			otherBoxGood = 1;
		} else if (intent == "noChoice") {
			otherBoxGood = 1;
		}
		
	var comment = document.getElementById("contactComment").value;
		if (comment.length > 0) {
			if (comment.indexOf("<a href=") == -1) {
				commentGood = 1;
			}
		}
		
	var robot = document.getElementsByName("rbt");
	if (!(robot[0].checked)) {
		robotGood = 1;
	}
	
	var probDivs = document.getElementsByClassName("formProblems");
	//0 = name
	//1 = intent
	//2 = otherBox
	//3 = otherBox
	//4 = intent
	//5 = robot
	if (nameGood == 0) {
		probDivs[0].innerHTML="You must include your Name or Handle, and it must be less than 50 characters";
		probDivs[0].style.display="block";
	} else {
		probDivs[0].style.display="none";
	}
	if (otherBoxGood == 0) {
		probDivs[2].innerHTML="You specified OTHER reason of contact, without filling out the OTHER field!";
		probDivs[2].style.display="block";
		document.getElementById("hideMe").style.display="block";
	} else {
		probDivs[2].style.display="none";
		document.getElementById("hideMe").style.display="none";
	}
	if (intentGood == 0) {
		probDivs[3].innerHTML="You need to specify a reason for contact (for sorting purposes)";
		probDivs[3].style.display="block";
	} else if (intentGood == 2) {
		probDivs[3].innerHTML="You can't submit an unban request here. You should have been redirected...";
		probDivs[3].style.display="block";
	} else {
		probDivs[3].style.display="none";
	}
	if (robotGood == 0) {
		probDivs[5].innerHTML="Robots can't submit forms!";
		probDivs[5].style.display="block";
	} else {
		probDivs[5].style.display="none";
	}
	if (commentGood == 0) {
		probDivs[4].innerHTML="You didn't even enter a comment! Are you SURE youre not a robot??";
		probDivs[4].style.display="block";
	} else {
		probDivs[4].style.display="none";
	}
	
	if (nameGood == 1 && intentGood == 1 && otherBoxGood == 1 && intentGood == 1 && commentGood == 1 && robotGood == 1) {
		alert("form good");
		return false;
	} else {
		return false;
	}
}

function ShowOther() {
var x = document.getElementById("contactReason").selectedIndex;
	if (x == 6) {
		document.getElementById("hideMe").style.display="block";
		document.getElementById("uno").style.display="block";
	} else if (x == 5) {
		setTimeout(RDRunban(), 5000);
		window.location="http://www.xxxepoch.tk/unban.php";
	} else {
		document.getElementById("hideMe").style.display="none";
		document.getElementById("uno").style.display="block";
	}
}

function RDRunban() {
	alert("Redirecting you to the unban form...");
}

function CheckUnban() {
	//start checking
	var serverGood = 0;
	var nameGood = 0;
	var idGood = 0;
	var appealGood = 0;
	var robotGood = 0;
	
	var server = document.getElementById("whichGame").value;
		if (server == "xxx" || server == "vip" || server == "epoch") {
			serverGood = 1;
		}
	var name = document.getElementById("playerName").value;
		if (name.length < 50 && name.length > 0) {
			nameGood = 1;
		}
	var id = document.getElementById("playerId").value;
		if (id.length > 6 && id.length < 10)  {  
			idGood = 1;  
		}
		
	var appeal = document.getElementById("unbanComment").value;
		if (appeal.length > 0) {
			if (appeal.indexOf("<a href=") == -1) {
				appleaGood = 1;
			}
		}
		
	var robot = document.getElementsByName("rbt");
	if (!(robot[0].checked)) {
		robotGood = 1;
	}
	
	var probDivs = document.getElementsByClassName("ubFormProblems");
	//0 = select
	//1 = name
	//2 = id
	//3 = comment
	//4 = robot
	if (serverGood == 0) {
		probDivs[0].innerHTML="Please specify a server to be unbanned from!";
		probDivs[0].style.display="block";
	} else {
		probDivs[0].style.display="none";
	}
	if (nameGood == 0) {
		probDivs[1].innerHTML="You must include your Player Name!";
		probDivs[1].style.display="block";
	} else {
		probDivs[1].style.display="none";
	}
	if (idGood == 0) {
		probDivs[2].innerHTML="You must include your Player ID! Please follow the steps above.";
		probDivs[2].style.display="block";
	} else {
		probDivs[2].style.display="none";
	}
	if (appealGood == 0) {
		probDivs[3].innerHTML="You need to write an appeal or your request will not even be considered.";
		probDivs[3].style.display="block";
	} else {
		probDivs[3].style.display="none";
	}
	if (robotGood == 0) {
		probDivs[4].innerHTML="Robots can't submit forms!";
		probDivs[4].style.display="block";
	} else {
		probDivs[4].style.display="none";
	}
	
	if (serverGood == 1 && nameGood == 1 && idGood == 1 && appealGood == 1 && robotGood == 1) {
		alert("form good");
		return false;
	} else {
		return false;
	}
}
