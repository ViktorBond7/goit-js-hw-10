import"./assets/modulepreload-polyfill-ec808ebb.js";import{f as m,i as f}from"./assets/vendor-651d7991.js";const c=document.querySelector("#datetime-picker"),n=document.querySelector("button"),h=document.querySelector("[data-days]"),S=document.querySelector("[data-hours]"),y=document.querySelector("[data-minutes]"),p=document.querySelector("[data-seconds]");n.disabled=!0;let i;const D={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){t[0]<new Date?f.error({position:"topRight",message:"Please choose a date in the future"}):(i=t[0],n.disabled=!1)}},g=m(c,D);c.addEventListener("focus",()=>{g.config.defaultDate=new Date});n.addEventListener("click",t=>{t.preventDefault(),n.disabled=!0;const r=i.getTime(),a=setInterval(()=>{const s=new Date().getTime();let o=r-s;const e=v(o);h.textContent=`${e.days}`,S.textContent=`${e.hours}`,y.textContent=`${e.minutes}`,p.textContent=`${e.seconds}`,o<=1e3&&clearInterval(a)},1e3)});function v(t){const e=String(Math.floor(t/864e5)).padStart(2,"0"),u=String(Math.floor(t%864e5/36e5)).padStart(2,"0"),d=String(Math.floor(t%864e5%36e5/6e4)).padStart(2,"0"),l=String(Math.floor(t%864e5%36e5%6e4/1e3)).padStart(2,"0");return{days:e,hours:u,minutes:d,seconds:l}}
//# sourceMappingURL=commonHelpers.js.map
