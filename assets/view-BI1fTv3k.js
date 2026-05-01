import{P as e,j as t,n,t as r,z as i}from"./jsx-runtime-DR70OMSW.js";import{t as a}from"./fallback-DW9csm-5.js";import{t as o}from"./createTitle-CstQ5lfB.js";import{t as s}from"./fetchWikipedia-DLmWTejM.js";var c=i(e()),l=r();function u({data:e}){let{html:t}=e,[n,r]=(0,c.useState)(0),i=(0,c.useRef)(null);return(0,c.useEffect)(()=>{function e(e){typeof e.data==`object`&&e.data?.type===`setHeight`&&typeof e.data.height==`number`&&i.current&&r(e.data.height)}return window.addEventListener(`message`,e),()=>window.removeEventListener(`message`,e)},[]),(0,l.jsx)(`section`,{children:(0,l.jsxs)(`div`,{className:`relative`,style:{height:n},children:[(0,l.jsx)(`div`,{className:`absolute inset-0 z-1 bg-neutral-300/10 pointer-events-all cursor-not-allowed -my-2 -mx-4 rounded-lg`,"aria-label":`オーバーレイ`}),(0,l.jsx)(`iframe`,{ref:i,srcDoc:`
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
            ${t}
          </body>
        `,className:`w-full border-none`,style:{height:n},title:`Wikipedia Content`,sandbox:`allow-same-origin allow-scripts`})]})})}function d({data:e,matches:t}){let n=e?.subtitle??``,r=t[1]?.data?.version,i=t[1]?.data?.cl_code;return[{title:o({subtitle:n,title:`${r} - ${i}`})}]}function f({params:e}){let{name:t}=e;return{subtitle:t,wikipedia:s(t)}}var p=t(function({loaderData:e}){let{wikipedia:t}=e;return(0,l.jsx)(c.Suspense,{fallback:(0,l.jsx)(a,{}),children:(0,l.jsx)(n,{resolve:t,children:e=>(0,l.jsx)(u,{data:e})})})});export{f as clientLoader,p as default,d as meta};