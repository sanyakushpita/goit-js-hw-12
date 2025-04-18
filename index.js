import{a as L,S as b,i}from"./assets/vendor-Db2TdIkw.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function e(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=e(t);fetch(t.href,s)}})();const v="49785510-c79f1c3ac74fac394468dbc2f",w="https://pixabay.com/api/";async function l(r,o=1){const e={key:v,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:o};try{return(await L.get(w,{params:e})).data}catch(n){throw console.error("Error fetching data:",n.message),n}}const d=document.querySelector(".gallery"),u=document.querySelector(".loader"),f=document.querySelector(".load-more-btn"),S=new b(".gallery a",{captionsData:"alt",captionDelay:250});function m(r){const o=r.map(e=>`
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
        </li>`).join("");d.insertAdjacentHTML("beforeend",o),S.refresh()}function q(){d.innerHTML=""}function p(){u.classList.remove("is-hidden")}function h(){u.classList.add("is-hidden")}function E(){f.classList.remove("is-hidden")}function y(){f.classList.add("is-hidden")}const P=document.querySelector(".form"),$=document.querySelector('input[name="search-text"]'),I=document.querySelector(".load-more-btn"),M=document.querySelector(".gallery");let a=1,g="";P.addEventListener("submit",async r=>{r.preventDefault();const o=$.value.trim();if(o===""){i.error({message:"Please enter a search query.",position:"top-right"});return}g=o,a=1,q(),p(),y();try{const e=await l(o,a);e.hits.length===0?i.error({message:"Sorry, no images found. Please try again!",position:"top-right"}):(m(e.hits),E())}catch{i.error({message:"Error fetching images. Please try again!",position:"top-right"})}finally{h()}});I.addEventListener("click",async()=>{a+=1,p();try{const r=await l(g,a);m(r.hits),document.querySelectorAll(".gallery-item").length>=r.totalHits&&(y(),i.info({message:"You've reached the end of search results.",position:"top-right"})),B()}catch{i.error({message:"Error loading more images.",position:"top-right"})}finally{h()}});function B(){setTimeout(()=>{const r=M.lastElementChild;r&&r.scrollIntoView({behavior:"smooth",block:"end"})},100)}
//# sourceMappingURL=index.js.map
