"use strict";(()=>{var F=Object.defineProperty;var H=Object.getOwnPropertySymbols;var S=Object.prototype.hasOwnProperty,A=Object.prototype.propertyIsEnumerable;var k=(o,e,t)=>e in o?F(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t,y=(o,e)=>{for(var t in e||={})S.call(e,t)&&k(o,t,e[t]);if(H)for(var t of H(e))A.call(e,t)&&k(o,t,e[t]);return o};var _=(o,e,t)=>new Promise((r,s)=>{var d=n=>{try{l(t.next(n))}catch(u){s(u)}},c=n=>{try{l(t.throw(n))}catch(u){s(u)}},l=n=>n.done?r(n.value):Promise.resolve(n.value).then(d,c);l((t=t.apply(o,e)).next())});function p(o,e){if(!o[e])throw new Error(`Missing value ${e}`)}var P="https://kratos-auth-staging.luminpdf.com/oauth2/auth";function M(){return(+new Date*Math.random()).toString(36).substring(0,8)}function U(o){return o instanceof DOMException||o.message==="Permission denied"}function T(o,e){let t=window.innerWidth?window.innerWidth:document.documentElement.clientWidth?document.documentElement.clientWidth:screen.width,r=window.innerHeight?window.innerHeight:document.documentElement.clientHeight?document.documentElement.clientHeight:screen.height;return{left:t/2-o/2+window.screenLeft,top:r/2-e/2+window.screenTop}}var b=class{constructor(){this.config={redirect_uri:window.location.href,ux_mode:"redirect"}}initialize(e){p(e,"client_id"),p(e,"scope"),p(e,"response_type"),this.config=y(y({},this.config),e)}signin(e={}){let{onSuccess:t=()=>{},onError:r=()=>{}}=e,{client_id:s,redirect_uri:d,scope:c,response_type:l,nonce:n=M(),state:u=M(),ux_mode:g}=this.config,i=new URL(P);if(i.searchParams.set("client_id",s),i.searchParams.set("redirect_uri",d),i.searchParams.set("scope",c),i.searchParams.set("response_type",l),i.searchParams.set("nonce",n),i.searchParams.set("state",u),g==="popup"){let{left:a,top:w}=T(700,700),m="width=".concat("700",",height=").concat("700",",left=").concat(a.toString(),",top=").concat(w.toString(),",resizable=no,location=no,menubar=no"),h=window.open(i,"LuminAuthentication",m);if(!h)throw new Error("We were unable to open the new tab, its likely that the request was blocked.");let v=setInterval(()=>{try{h.closed&&(clearInterval(v),r({error:"tab_closed",error_description:"The user closed the tab before authentication could be completed"}));let{location:C}=h;if(C.href&&C.href.indexOf(d)!==0)return;clearInterval(v);let f=new URLSearchParams(C.hash.substring(1));h.close(),t({code:f.get("code"),access_token:f.get("access_token"),id_token:f.get("id_token"),error:f.get("error"),error_description:f.get("error_description")})}catch(C){if(U(C))return;r({error:"auth_error",error_description:C.message}),h.closed||h.close(),clearInterval(v)}},300)}else window.open(i,"_self")}},E=new b;var I="https://app-auth-staging.bananasign.co/api/web/v1/document-signing",Z="https://app-auth-staging.bananasign.co";var x=class{sendAndSign(e){p(e,"accessToken"),p(e,"fileData"),p(e,"fileName");let{accessToken:t,fileData:r,fileName:s,onError:d=()=>{},onLoading:c=()=>{}}=e;c(!0),fetch(`${I}/init`,{method:"POST",body:JSON.stringify({fileName:s}),headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}}).then(l=>_(this,null,function*(){let n=yield l.json();if(n.error){d({error:n.error,message:n.message});return}if(n.flowId){let u=typeof r=="function"?yield r():r;yield fetch(n.preSignedUrl,{method:"PUT",body:u,headers:{"Content-Type":"application/pdf"}});let g=w=>{if(w.origin===Z&&["close_task","back_step"].includes(w.data.type)){let m=document.getElementById("bananaSignIframeWrapper");m==null||m.remove(),window.removeEventListener("message",g,!1)}};window.addEventListener("message",g,!1);let i=document.createElement("div");i.style.position="absolute",i.style.top="0",i.style.zIndex="99",i.style.display="flex",i.style.justifyContent="center",i.style.alignItems="center",i.style.width="100%",i.style.height="100%",i.id="bananaSignIframeWrapper";let a=document.createElement("iframe");a.style.width="100%",a.style.width="100%",a.style.height="100%",a.src=`${Z}/embed/${n.flowId}?token=${t}&type=default&owner=${JSON.stringify(n.owner)}`,a.title="Iframe Upload",a.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",a.id="bananaSignIframe",a.onload=()=>{c(!1)},a.style.visibility="visible",a.allowFullscreen=!0,i.appendChild(a),document.body.appendChild(i)}})).catch(l=>{throw l})}},V=class extends HTMLElement{connectedCallback(){let e=this.getAttribute("size")||"large",t=this.attachShadow({mode:"closed"}),r=document.createElement("style"),s=document.createElement("div");switch(s.setAttribute("class","container"),e){case"small":r.textContent=`
          .container {
            position: relative;
            border-radius: 4px;
            border: 1px solid #BDD8FF;
            background-color: #3180F1;
            width: max-content;
            max-width: 52px;
            max-height: 30px;
            cursor: pointer;
          }
          .container:hover {
            background: #0063D1;
          }
          
          .logo {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 54px;
            height: 32px;
          }`;let d=document.createElement("span");d.setAttribute("class","logo"),d.innerHTML=`<svg width="27" height="15" viewBox="0 0 27 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.62231 12.129H8.31346V5.95532H6.62231V12.129Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.94357 7.69763C4.44461 7.45553 3.64777 7.20073 2.94152 7.19434C2.3 7.19434 1.97606 7.41728 1.97606 7.75491C1.97606 8.11184 2.4296 8.20093 2.99984 8.28382L3.55705 8.36665C4.91751 8.57043 5.67574 9.16939 5.67574 10.2142C5.67574 11.4885 4.61309 12.3104 2.79248 12.3104C1.93718 12.3104 0.81621 12.1511 0 11.5841L0.667238 10.3225C1.20508 10.6731 1.85956 10.9279 2.8053 10.9279C3.58938 10.9279 3.96515 10.7113 3.96515 10.3482C3.96515 10.0486 3.64777 9.88298 2.92201 9.78099L2.41022 9.711C0.958905 9.51335 0.239693 8.88904 0.239693 7.83774C0.239693 6.56996 1.23755 5.81812 2.88954 5.81812C3.89394 5.81812 4.67789 6.0028 5.51367 6.4043L4.94357 7.69763Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.1835 8.9655C11.1835 9.85746 11.7991 10.5838 12.7644 10.5838C13.7039 10.5838 14.3389 9.88287 14.3389 8.9655C14.3389 8.04161 13.7039 7.34079 12.7644 7.34079C11.7991 7.34079 11.1835 8.06716 11.1835 8.9655ZM14.2806 6.66546V5.97742H15.9392V11.6416C15.9392 13.6229 14.6239 14.8207 12.5506 14.8207C11.5592 14.8207 10.5097 14.5659 9.80349 14.0753L10.4059 12.7182C11.0345 13.1259 11.7278 13.3489 12.4793 13.3489C13.5289 13.3489 14.2675 12.7755 14.2675 11.7114V11.2784C13.8399 11.7944 13.2049 12.1129 12.3368 12.1129C10.8078 12.1129 9.44702 10.8577 9.44702 8.96551C9.44702 7.06677 10.8078 5.81183 12.3368 5.81183C13.2115 5.81183 13.8529 6.14308 14.2806 6.66546Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M23.0254 8.22012V12.1511H21.3342V8.75528C21.3342 7.86332 20.8808 7.3728 20.1097 7.3728C19.3841 7.3728 18.7815 7.83771 18.7815 8.76799V12.1511H17.0903V5.97742H18.7361V6.70365C19.1832 6.04748 19.8699 5.81183 20.5827 5.81183C22.0081 5.81183 23.0254 6.78648 23.0254 8.22012Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M26.2877 10.967C26.2877 11.5927 25.7424 12.129 25.1181 12.129C24.4879 12.129 23.9365 11.5927 23.9365 10.967C23.9365 10.3474 24.4879 9.81702 25.1181 9.81702C25.7424 9.81702 26.2877 10.3474 26.2877 10.967Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.1924 0.8747C1.70594 1.04042 2.21806 1.20156 2.74004 1.32577C3.25823 1.46102 3.7817 1.57306 4.30907 1.65782C5.36228 1.83152 6.42729 1.93238 7.49399 1.91435C8.56063 1.925 9.62423 1.81695 10.6746 1.63619C11.2005 1.54798 11.722 1.43248 12.2382 1.29417C12.7578 1.16676 13.2676 1.0025 13.7782 0.833984L14.2879 2.03244C13.3636 2.82753 12.259 3.36629 11.1026 3.74544C9.94208 4.11554 8.71736 4.30268 7.49399 4.3102C6.27056 4.31692 5.04293 4.14401 3.87687 3.78748C2.71479 3.4217 1.60165 2.89546 0.666504 2.11141L1.1924 0.8747Z" fill="#FAE200"/>
        </svg>
        `,s.appendChild(d);break;case"large":{r.textContent=`
        .container {
          position: relative;
          border-radius: 8px;
          border: 1px solid #BDD8FF;
          background-color: #3180F1;
          width: max-content;
          max-width: 145px;
          padding: 7px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: Axiforma, sans-serif;
          cursor: pointer;
        }
        
        .container:hover {
          background: #0063D1;
        }

        .sign {
          color: #FFFFFF;
          font-weight: 600;
          font-size: 14px;
          line-height: 20px;
          font-style: normal;
        }

        .powered {
          align-items: end;
          color: #FFFFFF;
          font-weight: 500;
          font-size: 8px;
          line-height: 10px;
          display: flex;
          font-style: normal;
        }

        .logo {
          display: flex;
        }

        .logo svg {
          padding-left: 4px;
        }`;let c=document.createElement("span");c.setAttribute("class","sign"),c.textContent="Sign and Send";let l=document.createElement("span");l.setAttribute("class","powered"),l.textContent="Powered by";let n=document.createElement("span");n.setAttribute("class","logo"),n.innerHTML=`<svg width="62" height="12" viewBox="0 0 62 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M44.4868 9.68379H45.9018V4.43066H44.4868V9.68379Z" fill="white"/>
      <mask id="mask0_16962_86510" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="2" width="7" height="8">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0.831055 2.11292H6.97335V9.70266H0.831055V2.11292Z" fill="white"/>
      </mask>
      <g mask="url(#mask0_16962_86510)">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.34356 6.54751V8.36914L4.04046 8.37455C4.87522 8.37455 5.4012 8.17934 5.4012 7.45275C5.4012 6.74272 4.87522 6.54751 4.04046 6.54751H2.34356ZM2.34356 3.44661V5.21939H3.8941C4.64756 5.21939 5.2332 5.06204 5.2332 4.3248C5.2332 3.6092 4.63674 3.44661 3.88869 3.44661H2.34356ZM3.93196 2.11292C5.69934 2.11292 6.81077 2.76886 6.81077 4.21646C6.81077 4.98075 6.34446 5.59342 5.71015 5.82649C6.40413 6.05956 6.97336 6.7101 6.97336 7.5288C6.97336 8.98706 5.93798 9.70266 4.11635 9.70266H0.831055V2.11292H3.93196Z" fill="white"/>
      </g>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.1447 7.07345C9.1447 7.87576 9.67051 8.52088 10.5 8.52088C11.3077 8.52088 11.8554 7.90297 11.8554 7.07345C11.8554 6.24393 11.3077 5.62601 10.5 5.62601C9.67051 5.62601 9.1447 6.27114 9.1447 7.07345ZM13.1943 9.7028H11.8119V9.12274C11.4705 9.54545 10.9608 9.83835 10.2397 9.83835C8.79231 9.83835 7.69727 8.65103 7.69727 7.07345C7.69727 5.49587 8.79231 4.30872 10.2397 4.30872C10.9608 4.30872 11.4651 4.60145 11.8119 5.02956V4.44967H13.1943V9.7028Z" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M19.1933 6.35777V9.70272H17.7783V6.81309C17.7783 6.05422 17.3987 5.63675 16.7535 5.63675C16.1464 5.63675 15.6423 6.03242 15.6423 6.82391V9.70272H14.2273V4.44943H15.6043V5.06751C15.9784 4.50909 16.5529 4.30847 17.1494 4.30847C18.3419 4.30847 19.1933 5.13799 19.1933 6.35777Z" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M21.5744 7.07345C21.5744 7.87576 22.1002 8.52088 22.9297 8.52088C23.7374 8.52088 24.285 7.90297 24.285 7.07345C24.285 6.24393 23.7374 5.62601 22.9297 5.62601C22.1002 5.62601 21.5744 6.27114 21.5744 7.07345ZM25.624 9.7028H24.2416V9.12274C23.9002 9.54545 23.3904 9.83835 22.6694 9.83835C21.222 9.83835 20.127 8.65103 20.127 7.07345C20.127 5.49587 21.222 4.30872 22.6694 4.30872C23.3904 4.30872 23.8948 4.60145 24.2416 5.02956V4.44967H25.624V9.7028Z" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M31.6613 6.35777V9.70272H30.2463V6.81309C30.2463 6.05422 29.8669 5.63675 29.2216 5.63675C28.6145 5.63675 28.1103 6.03242 28.1103 6.82391V9.70272H26.6953V4.44943H28.0723V5.06751C28.4465 4.50909 29.0209 4.30847 29.6174 4.30847C30.8101 4.30847 31.6613 5.13799 31.6613 6.35777Z" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M34.0624 7.07345C34.0624 7.87576 34.5882 8.52088 35.4177 8.52088C36.2255 8.52088 36.7731 7.90297 36.7731 7.07345C36.7731 6.24393 36.2255 5.62601 35.4177 5.62601C34.5882 5.62601 34.0624 6.27114 34.0624 7.07345ZM38.112 9.7028H36.7296V9.12274C36.3881 9.54545 35.8785 9.83835 35.1575 9.83835C33.71 9.83835 32.615 8.65103 32.615 7.07345C32.615 5.49587 33.71 4.30872 35.1575 4.30872C35.8785 4.30872 36.3828 4.60145 36.7296 5.02956V4.44967H38.112V9.7028Z" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M43.0869 5.9133C42.6694 5.70727 42.0027 5.49042 41.4118 5.48485C40.875 5.48485 40.6039 5.67465 40.6039 5.96197C40.6039 6.26552 40.9833 6.34158 41.4605 6.41206L41.9268 6.48254C43.0653 6.65595 43.6996 7.16552 43.6996 8.05454C43.6996 9.13893 42.8104 9.83831 41.2871 9.83831C40.5713 9.83831 39.6334 9.70259 38.9504 9.22023L39.5089 8.14682C39.9588 8.44496 40.5064 8.66181 41.2979 8.66181C41.9538 8.66181 42.2682 8.47758 42.2682 8.16845C42.2682 7.91358 42.0027 7.77262 41.3954 7.68592L40.9671 7.62626C39.7527 7.45826 39.1511 6.92704 39.1511 6.03245C39.1511 4.95364 39.986 4.31409 41.3684 4.31409C42.2087 4.31409 42.8646 4.4711 43.5638 4.81268L43.0869 5.9133Z" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M48.3034 6.99215C48.3034 7.75119 48.8185 8.36911 49.6261 8.36911C50.4123 8.36911 50.9435 7.77283 50.9435 6.99215C50.9435 6.20607 50.4123 5.60962 49.6261 5.60962C48.8185 5.60962 48.3034 6.22787 48.3034 6.99215ZM50.8948 5.03497V4.44967H52.2826V9.26911C52.2826 10.955 51.182 11.9742 49.4474 11.9742C48.6177 11.9742 47.7395 11.7573 47.1487 11.34L47.6528 10.1853C48.1786 10.5322 48.7587 10.722 49.3876 10.722C50.2658 10.722 50.8839 10.234 50.8839 9.3286V8.96015C50.5261 9.39908 49.9948 9.67018 49.2684 9.67018C47.989 9.67018 46.8503 8.60218 46.8503 6.99215C46.8503 5.37655 47.989 4.30872 49.2684 4.30872C50.0003 4.30872 50.5369 4.59063 50.8948 5.03497Z" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M58.1794 6.35777V9.70272H56.7644V6.81309C56.7644 6.05422 56.3849 5.63675 55.7396 5.63675C55.1327 5.63675 54.6284 6.03242 54.6284 6.82391V9.70272H53.2134V4.44943H54.5905V5.06751C54.9645 4.50909 55.5392 4.30847 56.1355 4.30847C57.3282 4.30847 58.1794 5.13799 58.1794 6.35777Z" fill="white"/>
      <mask id="mask1_16962_86510" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="58" y="7" width="4" height="3">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M58.9924 7.73486H61.096V9.83824H58.9924V7.73486Z" fill="white"/>
      </mask>
      <g mask="url(#mask1_16962_86510)">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M61.096 8.78106C61.096 9.35047 60.608 9.83824 60.0498 9.83824C59.4858 9.83824 58.9924 9.35047 58.9924 8.78106C58.9924 8.2174 59.4858 7.73486 60.0498 7.73486C60.608 7.73486 61.096 8.2174 61.096 8.78106Z" fill="white"/>
      </g>
      <mask id="mask2_16962_86510" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="39" y="0" width="13" height="4">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M39.355 0H51.0339V3.03106H39.355V0Z" fill="white"/>
      </mask>
      <g mask="url(#mask2_16962_86510)">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M39.8057 0.035493C40.246 0.179831 40.6851 0.320451 41.1328 0.428789C41.577 0.546592 42.0259 0.644451 42.478 0.71831C43.3811 0.869747 44.2941 0.957803 45.2088 0.941916C46.1233 0.951211 47.0353 0.857071 47.9358 0.69938C48.3866 0.622479 48.834 0.521747 49.2764 0.401239C49.722 0.290197 50.1589 0.146873 50.5968 0L51.0339 1.04485C50.2415 1.73814 49.2942 2.208 48.3029 2.53859C47.3078 2.86124 46.2577 3.02434 45.2088 3.03093C44.1599 3.03685 43.1073 2.88608 42.1074 2.5751C41.111 2.25634 40.1566 1.79746 39.355 1.1138L39.8057 0.035493Z" fill="#FAE200"/>
      </g>
      </svg>`,l.appendChild(n),s.appendChild(c),s.appendChild(l)}break;default:break}t==null||t.appendChild(r),t==null||t.appendChild(s)}};customElements.define("lumin-sign",V);var L=new x;window.lumin={auth:E,sign:L};})();
