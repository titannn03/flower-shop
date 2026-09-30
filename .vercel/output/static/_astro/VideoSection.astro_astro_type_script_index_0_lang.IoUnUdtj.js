import{t as n}from"./tracker.Bp8s150x.js";document.querySelectorAll(".video-facade-container").forEach(o=>{o.addEventListener("click",r=>{if(r.target.closest(".fallback-source-btn"))return;const e=r.currentTarget,t=e.getAttribute("data-embed-url"),a=e.getAttribute("data-provider")||"youtube",l=e.getAttribute("data-title")||"Video",i=e.getAttribute("data-source-url")||"";if(!t){window.open(i,"_blank","noopener,noreferrer");return}n("play_video",{provider:a,video_id:t});const c=t.includes("?")?`${t}&autoplay=1`:`${t}?autoplay=1`;e.innerHTML=`
        <iframe 
          src="${c}" 
          title="${l}" 
          class="w-full h-full border-0 rounded-2xl" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen 
          loading="lazy"
        ></iframe>
      `})});
