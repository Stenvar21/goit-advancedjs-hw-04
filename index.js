import{i as l,S as u}from"./assets/vendor-5ObWk2rO.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const d=t=>{const s=new URLSearchParams({key:"53074697-31effdba198fed340456f0d43",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:21});return fetch(`https://pixabay.com/api/?${s}`).then(a=>{if(!a.ok)throw new Error(`HTTP error! Status: ${a.status}`);return a.json()})},p=t=>`
    <li class="gallery-card">
      <a class="js-gallery-link" href="${t.largeImageURL}">
        <img 
          class="gallery-img" 
          src="${t.webformatURL}" 
          alt="${t.tags}" 
          loading="lazy"
        />
      </a>
      <div class="stats-container">
        <div class="stat">
          <span class="label">Likes</span>
          <span class="value">${t.likes}</span>
        </div>
        <div class="stat">
          <span class="label">Views</span>
          <span class="value">${t.views}</span>
        </div>
        <div class="stat">
          <span class="label">Comments</span>
          <span class="value">${t.comments}</span>
        </div>
        <div class="stat">
          <span class="label">Downloads</span>
          <span class="value">${t.downloads}</span>
        </div>
      </div>
    </li>
  `,o={form:document.querySelector(".js-search-form"),gallery:document.querySelector(".js-gallery"),loader:document.querySelector(".js-loader")};let c=null;function f(t="Loading images, please wait..."){o.loader.classList.add("is-active"),o.loader.textContent=t}function m(){o.loader.classList.remove("is-active"),o.loader.textContent=""}function y(){c?c.refresh():c=new u(".js-gallery a",{captionsData:"alt",captionDelay:250})}async function h(t){t.preventDefault();const s=t.currentTarget.elements.user_query.value.trim();if(!s){l.warning({title:"Warning",message:"Search query cannot be empty!",position:"topCenter",timeout:2e3});return}o.gallery.innerHTML="",f();try{const a=await d(s),n=Array.isArray(a.hits)?a.hits:[];if(n.length===0){l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please, try again!",position:"topCenter",timeout:3500});return}const e=n.map(r=>p(r)).join("");o.gallery.insertAdjacentHTML("beforeend",e),y()}catch(a){console.error("Fetch error:",a),l.error({title:"Error",message:"Something went wrong. Please, try again later.",position:"topCenter",timeout:3500})}finally{m(),o.form.reset()}}o.form.addEventListener("submit",h);
//# sourceMappingURL=index.js.map
