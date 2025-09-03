import{a as l,p as i,w as h,B as p}from"./chunk-EF7DTUVF-C60KZCPR.js";import{a as m,F as b}from"./fetchWikipedia-Dq0T_p5o.js";import{c as f}from"./createTitle-pJw4r4bV.js";function w({data:t}){const{html:e}=t,[s,n]=l.useState(0),a=l.useRef(null);return l.useEffect(()=>{function c(o){var r;typeof o.data=="object"&&((r=o.data)==null?void 0:r.type)==="setHeight"&&typeof o.data.height=="number"&&a.current&&n(o.data.height)}return window.addEventListener("message",c),()=>window.removeEventListener("message",c)},[]),i.jsx("section",{children:i.jsxs("div",{className:"relative",style:{height:s},children:[i.jsx("div",{className:"absolute inset-0 z-1 bg-neutral-300/10 pointer-events-all cursor-not-allowed -my-2 -mx-4 rounded-lg","aria-label":"オーバーレイ"}),i.jsx("iframe",{ref:a,srcDoc:`
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
        `,className:"w-full border-none",style:{height:s},title:"Wikipedia Content",sandbox:"allow-same-origin allow-scripts"})]})})}function y({data:t,matches:e}){var o,r,d,u;const s=(t==null?void 0:t.subtitle)??"",n=(r=(o=e[1])==null?void 0:o.data)==null?void 0:r.version,a=(u=(d=e[1])==null?void 0:d.data)==null?void 0:u.cl_code;return[{title:f({subtitle:s,title:`${n} - ${a}`})}]}async function j({params:t}){const{name:e}=t,{title:s}=await m(e),n=m(e);return{subtitle:s,wikipedia:n}}const H=h(function({loaderData:e}){const{wikipedia:s}=e;return i.jsx(l.Suspense,{fallback:i.jsx(b,{}),children:i.jsx(p,{resolve:s,children:n=>i.jsx(w,{data:n})})})});export{j as clientLoader,H as default,y as meta};
