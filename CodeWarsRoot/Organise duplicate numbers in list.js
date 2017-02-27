function group(arr) {
var cur;
var buf=[];
var result=[];

for(var j=0;j<arr.length;j++)
  {
  cur=arr[j];
  if(cur==-19999)
  continue;
  else{
    
   // cur=arr[j];
    buf.push(cur);
        for(var i=0;i<arr.length;i++)
        {
        if(i!=j){
                  if(arr[i]==cur)
                  {
                  buf.push(arr[i]);
                  arr[i]=-19999;
                  }
                }
        }
    result.push(buf);
    buf=[];
    }
  }
return result;
}
