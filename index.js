import{a as L,S as b,i}from"./assets/vendor-Db2TdIkw.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function e(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=e(o);fetch(o.href,s)}})();const v="49785510-c79f1c3ac74fac394468dbc2f",w="https://pixabay.com/api/";async function l(r,t=1){const e={key:v,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t};try{return(await L.get(w,{params:e})).data}catch(n){throw console.error("Error fetching data:",n.message),n}}const d=document.querySelector(".gallery"),u=document.querySelector(".loader"),m=document.querySelector(".load-more-btn"),S=new b(".gallery a",{captionsData:"alt",captionDelay:250});function f(r){const t=r.map(e=>`
        <li class="gallery-item">
          <a href="${e.largeImageURL}">
            <img src="${e.webformatURL}" alt="${e.tags}" />
          </a>
          <div class="info">
            <div>
              <p><b>Likes:</b> ${e.likes}</p>
            </div>
            <div>
              <p><b>Views:</b> ${e.views}</p>
            </div>
            <div>
              <p><b>Comments:</b> ${e.comments}</p>
            </div>
            <div>
              <p><b>Downloads:</b> ${e.downloads}</p>
            </div>
          </div>
        </li>`).join("");d.insertAdjacentHTML("beforeend",t),S.refresh()}function q(){d.innerHTML=""}function p(){u.classList.remove("is-hidden")}function y(){u.classList.add("is-hidden")}function I(){m.classList.remove("is-hidden")}function h(){m.classList.add("is-hidden")}const P=document.querySelector(".form"),E=document.querySelector('input[name="search-text"]'),R=document.querySelector(".load-more-btn");document.querySelector(".gallery");let a=1,g="";P.addEventListener("submit",async r=>{r.preventDefault();const t=E.value.trim();if(t===""){i.error({message:"Please enter a search query.",position:"topRight"});return}g=t,a=1,q(),p(),h();try{const e=await l(t,a);e.hits.length===0?i.error({message:"Sorry, no images found. Please try again!",position:"topRight"}):(f(e.hits),I())}catch{i.error({message:"Error fetching images. Please try again!",position:"topRight"})}finally{y()}});R.addEventListener("click",async()=>{a+=1,p();try{const r=document.querySelectorAll(".gallery-item").length,t=await l(g,a);f(t.hits),document.querySelectorAll(".gallery-item").length>=t.totalHits&&(h(),i.info({message:"You've reached the end of search results.",position:"topRight"})),$(r)}catch{i.error({message:"Error loading more images.",position:"topRight"})}finally{y()}});function $(r){const e=document.querySelectorAll(".gallery-item")[r];if(e){const n=e.querySelector("img");n.complete?e.scrollIntoView({behavior:"smooth",block:"start"}):n.onload=()=>{e.scrollIntoView({behavior:"smooth",block:"start"})}}}
//# sourceMappingURL=index.js.map
