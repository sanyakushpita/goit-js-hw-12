import{a as L,S as b,i}from"./assets/vendor-Db2TdIkw.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}})();const v="49785510-c79f1c3ac74fac394468dbc2f",w="https://pixabay.com/api/";async function l(e,t=1){const o={key:v,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t};try{return(await L.get(w,{params:o})).data}catch(n){throw console.error("Error fetching data:",n.message),n}}const d=document.querySelector(".gallery"),u=document.querySelector(".loader"),m=document.querySelector(".load-more-btn"),S=new b(".gallery a",{captionsData:"alt",captionDelay:250});function f(e){const t=e.map(o=>`
        <li class="gallery-item">
          <a href="${o.largeImageURL}">
            <img src="${o.webformatURL}" alt="${o.tags}" />
          </a>
          <div class="info">
            <div>
              <p><b>Likes:</b> ${o.likes}</p>
            </div>
            <div>
              <p><b>Views:</b> ${o.views}</p>
            </div>
            <div>
              <p><b>Comments:</b> ${o.comments}</p>
            </div>
            <div>
              <p><b>Downloads:</b> ${o.downloads}</p>
            </div>
          </div>
        </li>`).join("");d.insertAdjacentHTML("beforeend",t),S.refresh()}function q(){d.innerHTML=""}function p(){u.classList.remove("is-hidden")}function h(){u.classList.add("is-hidden")}function E(){m.classList.remove("is-hidden")}function y(){m.classList.add("is-hidden")}const I=document.querySelector(".form"),P=document.querySelector('input[name="search-text"]'),$=document.querySelector(".load-more-btn"),M=document.querySelector(".gallery");let a=1,g="";I.addEventListener("submit",async e=>{e.preventDefault();const t=P.value.trim();if(t===""){i.error({message:"Please enter a search query.",position:"top-right"});return}g=t,a=1,q(),p(),y();try{const o=await l(t,a);o.hits.length===0?i.error({message:"Sorry, no images found. Please try again!",position:"top-right"}):(f(o.hits),E())}catch{i.error({message:"Error fetching images. Please try again!",position:"top-right"})}finally{h()}});$.addEventListener("click",async()=>{a+=1,p();try{const e=await l(g,a);f(e.hits),document.querySelectorAll(".gallery-item").length>=e.totalHits&&(y(),i.info({message:"You've reached the end of search results.",position:"top-right"})),B()}catch{i.error({message:"Error loading more images.",position:"top-right"})}finally{h()}});function B(){const e=M.lastElementChild;if(e){const t=e.querySelector("img");t.complete?e.scrollIntoView({behavior:"smooth",block:"end"}):t.onload=()=>{e.scrollIntoView({behavior:"smooth",block:"end"})}}}
//# sourceMappingURL=index.js.map
