import{a as l,p as s,w as m,C as p}from"./chunk-EF7DTUVF-Cm3DCMif.js";import{F as h}from"./fallback-C1eEMM6i.js";import{a as b}from"./fetchWikipedia-BAK3JIzh.js";import{c as f}from"./createTitle-pJw4r4bV.js";import"./utils-D-KgF5mV.js";function g({data:t}){const{html:e}=t,[i,o]=l.useState(0),a=l.useRef(null);return l.useEffect(()=>{function c(n){var r;typeof n.data=="object"&&((r=n.data)==null?void 0:r.type)==="setHeight"&&typeof n.data.height=="number"&&a.current&&o(n.data.height)}return window.addEventListener("message",c),()=>window.removeEventListener("message",c)},[]),s.jsx("section",{children:s.jsxs("div",{className:"relative",style:{height:i},children:[s.jsx("div",{className:"absolute inset-0 z-1 bg-neutral-300/10 pointer-events-all cursor-not-allowed -my-2 -mx-4 rounded-lg","aria-label":"オーバーレイ"}),s.jsx("iframe",{ref:a,srcDoc:`
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
        `,className:"w-full border-none",style:{height:i},title:"Wikipedia Content",sandbox:"allow-same-origin allow-scripts"})]})})}function H({data:t,matches:e}){var n,r,d,u;const i=(t==null?void 0:t.subtitle)??"",o=(r=(n=e[1])==null?void 0:n.data)==null?void 0:r.version,a=(u=(d=e[1])==null?void 0:d.data)==null?void 0:u.cl_code;return[{title:f({subtitle:i,title:`${o} - ${a}`})}]}function k({params:t}){const{name:e}=t,i=b(e);return{subtitle:e,wikipedia:i}}const E=m(function({loaderData:e}){const{wikipedia:i}=e;return s.jsx(l.Suspense,{fallback:s.jsx(h,{}),children:s.jsx(p,{resolve:i,children:o=>s.jsx(g,{data:o})})})});export{k as clientLoader,E as default,H as meta};
