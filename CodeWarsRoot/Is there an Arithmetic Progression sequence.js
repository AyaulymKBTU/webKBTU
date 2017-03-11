function hasArithmProg(arr) {
var has=false;
  if(arr.length<3)
  return undefined;
 else
  {
  var i;
  var res=-56;
  if(arr.length>3){
  for(i=0;i<=arr.length-3;i++)
  {
    if(arr[i]-arr[i+1]==arr[i+1]-arr[i+2])
    {
    if(has==false)
    res=i;
    has=true;}
 }}
 else{
 if(arr[2]-arr[1]==arr[1]-arr[0])
 return true;
 else
 return false;}
 if(has==true)
 {
 if(res==0)
 return true;
 else
  return res;
  }
  else
  return has;
  }
 
}
