decodeMorse = function(morseCode){
  //your code here
  var s=""
  var j=0;
  morseCode=morseCode.trim();
  var ar= morseCode.split(" ");
  for(var i=0;i<ar.length;i++)
  {
  var m=MORSE_CODE[ar[i]];
 if(m==undefined)
 {if(s[s.length-1]==' ')
 continue;
 else
 s+=' ';}
 else{
 s+=m;}
 }
  return s;
}