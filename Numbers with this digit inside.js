function numbersWithDigitInside(x, d) {
var num=[];
var san;
var str;
for(var i=1;i<=x;i++)
{
str=i.toString();
if(str.includes(d))
{
san=this.Number(str);
num.push(san);
}
}

var sum=0;
var mult=1;
for(var j=0;j<num.length;j++)
{sum+=num[j];
mult*=num[j];}
if(num.length==0)
mult=0;
  return [num.length,sum,mult];
}