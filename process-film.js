(() => {
 const video=document.querySelector('#process-video');
 const button=document.querySelector('.film-toggle');
 if(!video||!button)return;
 const film=video.closest('.process-film');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let userPaused=false,inView=true;
 const sync=()=>{button.textContent=video.paused?'▶':'Ⅱ';button.setAttribute('aria-label',video.paused?'Включить видео':'Приостановить видео');};
 const play=()=>video.play().catch(()=>{film.classList.remove('is-loading');sync();});
 const reveal=()=>{film.classList.remove('is-loading');film.classList.add('has-played');};
 video.addEventListener('playing',()=>{if('requestVideoFrameCallback' in video)video.requestVideoFrameCallback(reveal);else reveal();sync();});
 video.addEventListener('pause',sync);
 video.addEventListener('error',()=>{film.classList.remove('is-loading');sync();});
 button.addEventListener('click',()=>{userPaused=!video.paused;if(video.paused){play();}else{video.pause();}});
 new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;if(!inView){video.pause();}else if(!userPaused&&!reduced.matches&&!document.hidden){play();}},{threshold:.15}).observe(video);
 document.addEventListener('visibilitychange',()=>{if(document.hidden){video.pause();}else if(inView&&!userPaused&&!reduced.matches){play();}});
 reduced.addEventListener('change',()=>{if(reduced.matches){video.pause();film.classList.remove('is-loading');}else if(inView&&!userPaused){play();}});
 if(reduced.matches)film.classList.remove('is-loading');else play();
})();
