
var SaveAndAddUser=function(username,password)
{
	localStorage.setItem(username,password);
};

var AddUserToUsers=function(username)
{
	
	var us=getAllUsers();
	if(us==""||us==null)
	{
		us=[];
	us.push(username);
	}
	else{us=us.split(' ');
		us.push(' '+username);
	}
	localStorage.setItem("Myusers",us);

};
var getAllUsers=function()
{
	return localStorage.getItem("Myusers");
};


//dial
var getCurrentDial=function(username,selectedUser)//returns my chat from all chats
{
	var chats=getChats();
	var res=chats.split(" ");
	var i=0;
	for(i=0;i<res.count;i++)
	{
		if(res[i].includes(username)&&res[i].includes(selectedUser))
			break;
	}
	return res[i];
};
var getChats=function()
{
	return localStorage.getItem("chats");
};
var getCurrentChat=function(selectedFriend)
{
	var chat=getCurrentDial(username,selectedfriend);
	var ourchat=localStorage.getItem(chat); // big string of your chat
	return ourchat;
};

var dialog=function()//messages
{
	var friend=getSelectedfriend();
	var currentchat=getCurrentChat(friend);
	var messages=currentchat.split(" ");
return messages;
};
var uname;
var createUser=function()
{
	
	uname=document.getElementById("regname").value;
	var psw=document.getElementById("repsw").value;
	SaveAndAddUser(uname,psw);
	AddUserToUsers(uname);
	document.act.action="dial.html";

	prepareChats();
};
var showTextBox=function()
{

	$("#sendButton").append('<div><textarea name="Text1" cols="80" rows="10"></textarea></div>');
	$("#sendButton").append('<button onclick="getFriendsList()" id="showFriendsListBut">To:</button>');
	$("#sendButton").append('<button style="background-color:blue" id="sendToBut">Send</button>');
};
var getFriendsList=function()
{
	$("#sendButton").append('<div><a href="">aya<a></div>');
	$("#sendButton").append('<div><a href="">beka<a></div>');
	$("#sendButton").append('<div><a href="">zhasik<a></div>');
};
var addUserName=function()
{document.getElementById("user").value(uname);};
var prepareChats=function()//uf
{
	// show list of all links to all users
};
var getSelectedFriend=function()//uf
{// take selected friend from users list
};


//function for dialogues button
var fillChatWithMessages=function()//uf
{
var mess=dialog();
//arrange messages to both sides 
};