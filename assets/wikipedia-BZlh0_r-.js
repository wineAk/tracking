import{w as u,p as t,a as r,A as m}from"./chunk-EF7DTUVF-DcPiyVfu.js";import{f as c,F as p}from"./fallback-D_uL88Dt.js";function w({data:i}){const e=`W - ${(i==null?void 0:i.title)??"Wikipedia"}`;return[{title:e},{name:"description",content:`${e} - Wikipediaの解説ページ`}]}async function b({params:i}){const{name:e}=i,{title:s}=await c(e),n=c(e);return{title:s,wikipedia:n}}const x=u(function({loaderData:e}){const{wikipedia:s}=e;return t.jsx("article",{className:"h-full",children:t.jsx(r.Suspense,{fallback:t.jsx(p,{}),children:t.jsx(m,{resolve:s,children:n=>t.jsx(h,{data:n})})})})});function h({data:i}){const{html:e}=i,[s,n]=r.useState(0),o=r.useRef(null);return r.useEffect(()=>{function l(a){var d;typeof a.data=="object"&&((d=a.data)==null?void 0:d.type)==="setHeight"&&typeof a.data.height=="number"&&o.current&&n(a.data.height)}return window.addEventListener("message",l),()=>window.removeEventListener("message",l)},[]),t.jsx("section",{className:"py-8",children:t.jsxs("div",{className:"relative",style:{height:s},children:[t.jsx("div",{className:"absolute inset-0 z-1 bg-neutral-300/10 pointer-events-all cursor-not-allowed -my-2 -mx-4 rounded-lg","aria-label":"オーバーレイ"}),t.jsx("iframe",{ref:o,srcDoc:`
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
        `,className:"w-full border-none",style:{height:s},title:"Wikipedia Content",sandbox:"allow-same-origin allow-scripts"})]})})}export{b as clientLoader,x as default,w as meta};
