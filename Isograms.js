function isIsogram(str){
  //...
  var s=str.toLowerCase();
str=s;
var i=0;
while(i<str.length){
if(str.lastIndexOf(str[i])!=i)
{return false;}
else
i++;}
return true;
}