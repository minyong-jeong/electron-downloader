let date = new Date();
let h = date.getHours();
let m = date.getMinutes();
let s = date.getSeconds();

let hour = document.getElementsByClassName('hour')[0];
let minute = document.getElementsByClassName('minute')[0];
let second = document.getElementsByClassName('second')[0];
hour.style.transform = 'rotate('+((h*(360/12))+(m*((360/12)/60)))+'deg)';
minute.style.transform = 'rotate('+m*(360/60)+'deg)';
second.style.transform = 'rotate('+s*(360/60)+'deg)';