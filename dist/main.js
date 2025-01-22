(()=>{const e=document.querySelector("#gamesboard-container"),t=document.querySelector(".option-container"),o=document.querySelector("#flip-button");let n=new Audio("../src/images/sounds/music.mp3"),s=(new Audio("../src/images/sounds/background_sound.mp3"),new Audio("../src/images/sounds/fire_shot.mp3")),r=new Audio("../src/images/sounds/fire_shot.mp3"),a=new Audio("../src/images/sounds/shot_hit.mp3"),c=new Audio("../src/images/sounds/shot_miss.mp3"),l=new Audio("../src/images/sounds/shot_hit.mp3"),i=new Audio("../src/images/sounds/shot_miss.mp3");const u=document.querySelector(".inputName"),d=document.querySelector(".input-container"),m=document.querySelector(".submitBtn"),p=[];m.addEventListener("click",(e=>{e.preventDefault();const t=u.value.trim();t?(p.push(t),console.log(p[0]),d.classList.add("fade"),setTimeout((()=>{d.style.display="none",n.play()}),3e3)):alert("Please enter your name to statrt")}));let y=0;o.addEventListener("click",(function(){const e=Array.from(t.children);y=0===y?90:0,e.forEach((e=>e.style.transform=`rotate(${y}deg)`))}));const h=10;function f(t,o){const n=document.createElement("div");n.classList.add("game-board"),n.style.backgroundColor=t,n.id=o;for(let e=0;e<h*h;e++){const t=document.createElement("div");t.classList.add("block"),t.id=e,n.append(t)}e.append(n)}f("rgba(0, 0, 0, 0.850)","player"),f("rgba(0, 0, 0, 0.850","computer");class g{constructor(e,t){this.name=e,this.length=t}}const L=[new g("destroyer","2"),new g("submarine","3"),new g("cruiser","3"),new g("battleship","4"),new g("carrier","5")];let S,b;function k(e){S=!1,b=e.target}function v(e){e.preventDefault()}function C(e){const o=e.target.id;N("player",L[b.id],o),0==t.children.length-1&&setTimeout(M,100),S||b.remove()}L.forEach((e=>N("computer",e))),Array.from(t.children).forEach((e=>e.addEventListener("dragstart",k))),document.querySelectorAll("#player div").forEach((e=>{e.addEventListener("dragover",v),e.addEventListener("drop",C)})),document.querySelector("#start-button");const q=document.querySelector("#info"),A=document.querySelector("#turn-display"),E=document.querySelector("#computer"),w=document.querySelector(".game-container"),T=document.querySelector(".option-container");let x,Y=!1;function M(){0==t.children.length&&(allBoardBlocks=document.querySelectorAll("#computer div"),allBoardBlocks.forEach((e=>e.addEventListener("click",D))),setTimeout((()=>{w.classList.add("fade")}),100),setTimeout((()=>{w.classList.add("fadeIn"),E.style.display="flex",o.style.display="none",T.style.display="none"}),2e3),x=!0,A.textContent="Your Turn!",q.textContent="The game has Started")}let _=[],B=[];const $=[],I=[];function N(e,t,o){const n=document.querySelectorAll(`#${e} div`);let s,r=Math.random()<.5,a="player"===e?0===y:r,c=Math.floor(Math.random()*h*h),l=o||c,i=a?l<=h*h-t.length?l:h*h-t.length:l<=h*h-h*t.length?l:l-t.length*h+h,u=[];for(let e=0;e<t.length;e++)a?u.push(n[Number(i)+e]):u.push(n[Number(i)+e*h]);a?u.every(((e,t)=>s=u[0].id%h!=h-(u.length-(t+1)))):u.every(((e,t)=>s=u[0].id<h*t+1+90));const d=u.every((e=>!e.classList.contains("taken")));s&&d?u.forEach((e=>{e.classList.add(t.name),e.classList.add("taken")})):("computer"===e&&N(t),"player"===e&&(S=!0))}function D(e){if(!Y){if(r.play(),e.target.classList.contains("taken")){e.target.classList.add("boom"),q.textContent="You hit the computer's ship";let t=Array.from(e.target.classList);t=t.filter((e=>"block"!==e)),t=t.filter((e=>"boom"!==e)),t=t.filter((e=>"taken"!==e)),_.push(...t),W("player",_,$),setTimeout((()=>{l.play()}),700)}e.target.classList.contains("taken")||(q.textContent="You Missed",e.target.classList.add("empty"),setTimeout((()=>{i.play()}),700)),x=!1,document.querySelectorAll("#computer div").forEach((e=>e.replaceWith(e.cloneNode(!0)))),setTimeout(H,3e3)}}function H(){Y||(A.textContent="Computer's Turn",q.textContent="The Computer Is Arming...",s.play()),Y||(setTimeout((()=>{let e=Math.floor(Math.random()*h*h);const t=document.querySelectorAll("#player div");if(t[e].classList.contains("taken")&&t[e].classList.contains("boom")||t[e].classList.contains("empty"))H();else if(t[e].classList.contains("taken")&&!t[e].classList.contains("boom")||!t[e].classList.contains("empty")){t[e].classList.add("boom"),q.textContent="The Computer Hits Your Ship",a.play();let o=Array.from(t[e].classList);o=o.filter((e=>"block"!==e)),o=o.filter((e=>"boom"!==e)),o=o.filter((e=>"taken"!==e)),B.push(...o),W("computer",B,I)}else q.textContent="Computer Missed",c.play(),t[e].classList.add("empty")}),2e3),setTimeout((()=>{x=!0,A.textContent="Your Turn!",q.textContent="Shoot!!!",document.querySelectorAll("#computer div").forEach((e=>e.addEventListener("click",D)))}),5e3))}const O=document.querySelector("#winnerDisplay"),P=document.querySelector(".gameOver-container");function W(e,t,o){function n(n,s){t.filter((e=>e===n)).length===s&&("player"===e&&(q.textContent=`You sunk the computer's ${n}`,_=t.filter((e=>e!==n))),"computer"===e&&(q.textContent=`Computer sunk your ${n}`,B=t.filter((e=>e!==n))),o.push(n))}if(n("destroyer",2),n("submarine",3),n("cruiser",3),n("battleship",4),n("carrier",5),console.log("playerHits",_),console.log("playerSunkShips",$),5===$.length){Y=!0;let e=p[0];O.textContent=`Congradulations ${e} You sunk all the computers ships . You won!`,setTimeout(j(),1e3)}5===I.length&&(Y=!0,P.classList.add("fadeIn"),O.textContent="Computer sunk all you ships you, lost the game",setTimeout(j(),1e3))}function j(){P.classList.add("fadeIn"),P.style.display="flex"}document.querySelectorAll("#restart-button").forEach((e=>e.addEventListener("click",(()=>{window.location.reload()}))))})();