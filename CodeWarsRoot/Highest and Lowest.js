function highAndLow(numbers){
var numb2 = numbers.split(" ");
var numbers1=[];
for(var i=0;i<numb2.length;i++)
{numbers1.push(this.Number(numb2[i]));}
 
var max=numbers1[0];
var min=numbers1[0];
for(var i=1;i<numbers1.length;i++)
{if(max<numbers1[i])
max=numbers1[i];
if(min>numbers1[i])
min=numbers1[i];
}
return max+" "+min;
}