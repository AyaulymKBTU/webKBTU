function makeParts(arr, chunkSize) {
var Arr=[];
var buf=[];
var i;
var j=0;
var z=0;
if(arr.length>chunkSize)
{

for (i=0;i<arr.length; i+=chunkSize)
{
    buf = arr.slice(i,i+chunkSize);
    Arr[j]=buf;
    j++;
}
 }    
 
else
{
Arr[0]=arr;

}
  return Arr;
  }
