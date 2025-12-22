import{a,p as i,w as l,C as c}from"./chunk-JMJ3UQ3L-Chcwey8u.js";import{F as u}from"./fallback--07p3dpM.js";import{a as m}from"./fetchWikipedia-BXnAnnXI.js";import{c as p}from"./createTitle-pJw4r4bV.js";import"./utils-CDN07tui.js";function h({data:s}){const{html:e}=s,[t,n]=a.useState(0),o=a.useRef(null);return a.useEffect(()=>{function d(r){typeof r.data=="object"&&r.data?.type==="setHeight"&&typeof r.data.height=="number"&&o.current&&n(r.data.height)}return window.addEventListener("message",d),()=>window.removeEventListener("message",d)},[]),i.jsx("section",{children:i.jsxs("div",{className:"relative",style:{height:t},children:[i.jsx("div",{className:"absolute inset-0 z-1 bg-neutral-300/10 pointer-events-all cursor-not-allowed -my-2 -mx-4 rounded-lg","aria-label":"オーバーレイ"}),i.jsx("iframe",{ref:o,srcDoc:`
          <style>html,body{margin:0;padding:0;box-sizing:border-box;}</style>
          <body>
            <script>
              function sendHeight() {
                window.parent.postMessage({type:'setHeight',height:document.documentElement.scrollHeight}, '*');
              }
              window.addEventListener('load', sendHeight);
              window.addEventListener('resize', sendHeight);
              const observer = new MutationObserver(sendHeight);
              observer.observe(document.body, { childList: true, subtree: true, attributes: true, characterData: true });
              sendHeight();
            <\/script>
            ${e}
          </body>
        `,className:"w-full border-none",style:{height:t},title:"Wikipedia Content",sandbox:"allow-same-origin allow-scripts"})]})})}function v({data:s,matches:e}){const t=s?.subtitle??"",n=e[1]?.data?.version,o=e[1]?.data?.cl_code;return[{title:p({subtitle:t,title:`${n} - ${o}`})}]}function y({params:s}){const{name:e}=s,t=m(e);return{subtitle:e,wikipedia:t}}const j=l(function({loaderData:e}){const{wikipedia:t}=e;return i.jsx(a.Suspense,{fallback:i.jsx(u,{}),children:i.jsx(c,{resolve:t,children:n=>i.jsx(h,{data:n})})})});export{y as clientLoader,j as default,v as meta};
