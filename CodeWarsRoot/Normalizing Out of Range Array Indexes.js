function normIndex(array, index){
if(index<0)
    {
      if(index*(-1)<array.length)
      {
      return array[array.length-index];
      }
      else if(index*(-1)>array.length)
      {
      index=index%array.length;
      return array[array.length+index];
      }
      else
      return array[0];
    }
else if(index>0)
{
//index+=1;
if(index>array.length)
{index=index%array.length;
return array[index];
}
else if(index<array.length)
return array[index];
else
return array[0];

}
else
return array[0];}
