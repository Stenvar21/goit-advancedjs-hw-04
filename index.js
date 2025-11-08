import{a as b,i,S as C}from"./assets/vendor-MjawMu3A.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();const S="https://pixabay.com/api/",P="53074697-31effdba198fed340456f0d43";async function M(e,a=1,o=15){try{return(await b.get(S,{params:{key:P,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:o,page:a}})).data}catch(n){throw console.error("Error fetching data from Pixabay API:",n),new Error("Failed to fetch images. Please try again later.")}}const f=e=>`
    <li class="gallery-card">
      <a class="js-gallery-link" href="${e.largeImageURL}">
        <img 
          class="gallery-img" 
          src="${e.webformatURL}" 
          alt="${e.tags}" 
          loading="lazy"
        />
      </a>
      <div class="stats-container">
        <div class="stat">
          <span class="label">Likes</span>
          <span class="value">${e.likes}</span>
        </div>
        <div class="stat">
          <span class="label">Views</span>
          <span class="value">${e.views}</span>
        </div>
        <div class="stat">
          <span class="label">Comments</span>
          <span class="value">${e.comments}</span>
        </div>
        <div class="stat">
          <span class="label">Downloads</span>
          <span class="value">${e.downloads}</span>
        </div>
      </div>
    </li>
  `,r={form:document.querySelector(".js-search-form"),gallery:document.querySelector(".js-gallery"),loader:document.querySelector(".js-loader"),loadMoreBtn:document.querySelector(".js-load-more")};let d=null,u="",l=1;const g=15;let p=0;function y(e="Loading images, please wait..."){r.loader.classList.add("is-active"),r.loader.textContent=e}function h(){r.loader.classList.remove("is-active"),r.loader.textContent=""}function m(){r.loadMoreBtn.style.display="block"}function w(){r.loadMoreBtn.style.display="none"}function v(){d?d.refresh():d=new C(".js-gallery a",{captionsData:"alt",captionDelay:250})}async function L(e,a){try{return await M(e,a,g)}catch(o){return console.error(o),i.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topCenter",timeout:3500}),{hits:[],totalHits:0}}}function q(){if(l===1)return;const e=r.gallery.querySelectorAll(".gallery-card");if(!e.length)return;const a=e[0].getBoundingClientRect().width;e[0].getBoundingClientRect().height,Math.floor(r.gallery.clientWidth/a);const o=(l-1)*g,n=e[o];if(!n)return;const t=parseInt(getComputedStyle(r.gallery).gap)||24,s=window.scrollY+n.getBoundingClientRect().top-t;window.scrollTo({top:s,behavior:"smooth"})}async function E(e){e.preventDefault();const a=e.currentTarget.elements.user_query.value.trim();if(!a){i.warning({title:"Warning",message:"Search query cannot be empty!",position:"topCenter",timeout:2e3});return}u=a,l=1,r.gallery.innerHTML="",w(),y();const o=await L(u,l),n=o.hits||[];if(p=o.totalHits,h(),!n.length){i.error({title:"Error",message:"Sorry, there are no images matching your search query.",position:"topCenter",timeout:3500});return}r.gallery.insertAdjacentHTML("beforeend",n.map(f).join("")),v(),r.gallery.children.length<p&&m()}async function j(){l+=1,y(),w();const a=(await L(u,l)).hits||[];r.gallery.insertAdjacentHTML("beforeend",a.map(f).join("")),v(),h(),q(),r.gallery.children.length<p?m():i.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topCenter",timeout:3500})}r.form.addEventListener("submit",E);r.loadMoreBtn.addEventListener("click",j);
//# sourceMappingURL=index.js.map
