import{a as b,S as v,i}from"./assets/vendor-Db2TdIkw.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function e(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(o){if(o.ep)return;o.ep=!0;const n=e(o);fetch(o.href,n)}})();const L="49785510-c79f1c3ac74fac394468dbc2f",w="https://pixabay.com/api/",S=15;async function d(s,t=1){const e={key:L,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:S,page:t};try{return(await b.get(w,{params:e})).data}catch(r){throw console.error("Error fetching data:",r.message),r}}const u=document.querySelector(".gallery"),m=document.querySelector(".loader"),f=document.querySelector(".load-more-btn"),q=new v(".gallery a",{captionsData:"alt",captionDelay:250});function p(s){const t=s.map(e=>`
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
        </li>`).join("");u.insertAdjacentHTML("beforeend",t),q.refresh()}function P(){u.innerHTML=""}function h(){m.classList.remove("is-hidden")}function g(){m.classList.add("is-hidden")}function I(){f.classList.remove("is-hidden")}function l(){f.classList.add("is-hidden")}const E=document.querySelector(".form"),R=document.querySelector('input[name="search-text"]'),A=document.querySelector(".load-more-btn");let a=1,y="";const M=15;E.addEventListener("submit",async s=>{s.preventDefault();const t=R.value.trim();if(t===""){i.error({message:"Please enter a search query.",position:"topRight"});return}y=t,a=1,P(),h(),l();try{const e=await d(t,a);if(e.hits.length===0)i.error({message:"Sorry, no images found. Please try again!",position:"topRight"});else{p(e.hits);const r=Math.ceil(e.totalHits/M);a<r?I():(l(),i.info({message:"You've reached the end of search results.",position:"topRight"}))}}catch{i.error({message:"Error fetching images. Please try again!",position:"topRight"})}finally{g()}});A.addEventListener("click",async()=>{a+=1,h();try{const s=document.querySelectorAll(".gallery-item").length,t=await d(y,a);p(t.hits);const e=document.querySelectorAll(".gallery-item").length,r=t.totalHits;e>=r&&(l(),i.info({message:"You've reached the end of search results.",position:"topRight"})),$(s)}catch{i.error({message:"Error loading more images.",position:"topRight"})}finally{g()}});function $(s){const e=document.querySelectorAll(".gallery-item")[s];if(e){const r=e.querySelector("img");r.complete?e.scrollIntoView({behavior:"smooth",block:"start"}):r.onload=()=>{e.scrollIntoView({behavior:"smooth",block:"start"})}}}
//# sourceMappingURL=index.js.map
