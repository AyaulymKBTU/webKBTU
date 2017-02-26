function passed (list) { 
var sum=0;
var count=0;
for(var i=0;i<list.length;i++)
{if(list[i]<=18)
{sum+=list[i];
count++;}}
if(count==0)
return 'No pass scores registered.';
else{
count=this.Math.round(sum/count);
return count;}
//Good luck!

} 