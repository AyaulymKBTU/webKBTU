
var SaveAndAddUser=function(username,password)
{
	localStorage.setItem(username,password);
};
var uname="ayaBeka";
var selectedfriend="";
var AddUserToUsers=function(username)
{
	
	var us=getAllUsers();
	if(us==""||us==null)
	{
		us=[];
		us.push(username);
	}
	else
	{
		us+=','+username;
	}
	localStorage.setItem("Myusers",us);
};
var getAllUsers=function()
{
	return localStorage.getItem("Myusers");
};

var validateNew=function()
{
	if(localStorage.getItem(uname)!=null)
		{
			alert("already registered!")
			return false;
		}
	return true;
};
var createUser=function()
{   
	uname=document.getElementById("regname").value;
	if(validateNew())
	{
	alert("hi");
	var psw=document.getElementById("repsw").value;
	SaveAndAddUser(uname,psw);
	AddUserToUsers(uname);
	document.act.action="dial.html";
	}
	//prepareChats();
};
var showTextBox=function()
{

	$("#sendButton").append('<div><textarea id="Text1" cols="80" rows="10"></textarea></div>');
	$("#sendButton").append('<button class="smallbut" onclick="getFriendsList()" id="showFriendsListBut">To:</button>');
	$("#sendButton").append('<button  class="smallbut" style="background-color:blue" id="sendToBut" onclick="validateSending()">Send</button>');	
};
var m=function()
{
		var userss=getAllUsers().split(',');
		for(var i=0;i<userss.length;i++)
	    {
		if(userss[i]!=uname)
		$("#Messenger").append('<div class="friends" id="'+i+'fr" onclick="getFriendChat("'+i+'fr") ">'+userss[i]+'</div>');
	    }
};
var sendingText="";
var updateChat=function(uname)
{
	var ourchat=uname;
	
	var nn=localStorage.getItem(ourchat);
	if((nn==null)||(nn==""))
		{
			nn=[];
			nn.push(sendingText);
		}
	else
		{if(sendingText.length<20)	
			{
			nn+=',';
			while(sendingText.length!=20)
				{
				sendingText+='.';
				}
				nn+=sendingText;
				nn+=uname;
			}
		}

localStorage.setItem(ourchat,nn);
};

var validateSending=function()
{
	
	if((selectedfriend==null)||(selectedfriend=="")||($('#Text1').value==""))
		{
			alert("select receiver!");
			return false;
		}
	else if((selectedfriend!=null)&&(selectedfriend!="")&&($('#Text1').value!=""))
		{
		//alert("message is sent");
		sendingText=document.getElementById("Text1").value;
		
		updateChat(uname);
			
		return true;
		}
	
};
var getFriendChat=function(idfr)
{
	alert(5);
	alert(document.getElementById(idfr).value);
};
var getFriendsList=function()
{//better to call this function only once
	var userss=getAllUsers().split(',');
	for(var i=0;i<userss.length-1;i++)
	{
		if(userss[i]!=uname)
		$("#sendButton").append('<div class="forselection" id="'+i+'"onclick="getSelectedFriend('+i+') ">'+userss[i]+'</div>');
	}
};
var getSelectedFriend=function(id)
{// take selected friend from users list

selectedfriend= document.getElementById(id).innerHTML;
document.getElementById("user").innerHTML=selectedfriend;
};
var validatePassword=function(){
	var name=document.getElementById("uname");
	if(name!=null)
		{name=name.value;
			uname=name;
			alert(uname);}
	var pass=document.getElementById("psw");
	if(pass!=null)
		pass=pass.value;
	var UnameReturn=localStorage.getItem(name);
	if((UnameReturn==null)||(UnameReturn!=pass)||(name=="")||(pass==""))
		{
			alert("incorrect!");
			return false;
		}
	else if(pass==UnameReturn)
	{
		alert("correct!");
	document.loginform.action="dial.html";
	}

};

var renderMessageLeft = function(message){
  return '<div style=" text-align:left">'+  message +' </div>';
};
var renderMessageRight = function(message){
  return '<div style="text-align:right">'+  message +' </div>';
};
var getMesPlaceDiv = function(){
  return $('.mesplace');
};
var showMessages = function(){
var ourchat="ayaBeka";
var messages=localStorage.getItem(ourchat);
var div = getMesPlaceDiv();
if(messages!=null){
var mgs=messages.split(',');
 
  for(var i=0;i<1;i++){
    div.append(renderMessageLeft(mgs[i]));
	}
	for(var i=1;i<3;i++){
	div.append(renderMessageRight(mgs[i]));
  }}
  else
  	div.append(renderMessageLeft('<div> no messages yet</div>'));

};
