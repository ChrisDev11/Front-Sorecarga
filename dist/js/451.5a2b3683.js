"use strict";(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[451],{2262:function(a,e,t){t.d(e,{Z:function(){return f}});var l=t(3396);const s=a=>((0,l.dD)("data-v-062abe82"),a=a(),(0,l.Cn)(),a),n={class:"sidebar"},d=s((()=>(0,l._)("a",{href:"/",class:"d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom"},[(0,l._)("svg",{class:"bi me-2",width:"30",height:"24"},[(0,l._)("use",{"xlink:href":"#bootstrap"})]),(0,l._)("span",{class:"fs-5 fw-semibold"},"Página Inicial")],-1))),r={class:"menu"},o={class:"mb-1"},i={class:"btn-toggle-nav list-unstyled fw-normal pb-1 small"},c={class:"mb-1"},u=(0,l.uE)('<li class="border-top my-3" data-v-062abe82></li><li class="mb-1" data-v-062abe82><button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false" data-v-062abe82> Account </button><div class="collapse" id="account-collapse" style="" data-v-062abe82><ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small" data-v-062abe82><li data-v-062abe82><a href="#" class="link-dark rounded" data-v-062abe82>New...</a></li><li data-v-062abe82><a href="#" class="link-dark rounded" data-v-062abe82>Profile</a></li><li data-v-062abe82><a href="#" class="link-dark rounded" data-v-062abe82>Settings</a></li><li data-v-062abe82><a href="#" class="link-dark rounded" data-v-062abe82>Sign out</a></li></ul></div></li>',2);function b(a,e,t,s,b,h){const m=(0,l.up)("router-link");return(0,l.wg)(),(0,l.iD)("div",n,[d,(0,l._)("ul",r,[(0,l._)("div",o,[(0,l._)("ul",i,[(0,l._)("li",null,[(0,l.Wm)(m,{class:"dropdown-item",to:"/CadastroCategoria"},{default:(0,l.w5)((()=>[(0,l.Uk)("Cadastro de Categorias")])),_:1})]),(0,l._)("li",null,[(0,l.Wm)(m,{class:"dropdown-item",to:"/CadastroMarca"},{default:(0,l.w5)((()=>[(0,l.Uk)("Cadastro de Marca")])),_:1})]),(0,l._)("li",null,[(0,l.Wm)(m,{class:"dropdown-item",to:"/CadastroProduto"},{default:(0,l.w5)((()=>[(0,l.Uk)("Cadastro de Produtos")])),_:1})]),(0,l._)("li",null,[(0,l.Wm)(m,{class:"dropdown-item disabled",to:"#"},{default:(0,l.w5)((()=>[(0,l.Uk)("Cadastro de Ficha Técnica")])),_:1})])])]),(0,l._)("div",c,[(0,l._)("li",null,[(0,l.Wm)(m,{to:"/neworders",class:"link-dark rounded"},{default:(0,l.w5)((()=>[(0,l.Uk)("Novas Vendas")])),_:1})])]),u])])}var h={name:"SideBarDash"},m=t(89);const _=(0,m.Z)(h,[["render",b],["__scopeId","data-v-062abe82"]]);var f=_},1451:function(a,e,t){t.r(e),t.d(e,{default:function(){return v}});var l=t(3396),s=t(7139);const n={class:"d-flex"},d={class:"container"},r=(0,l._)("h1",null,"Painel de Acompanhamento de Vendas",-1),o={class:"table"},i=(0,l._)("thead",null,[(0,l._)("tr",null,[(0,l._)("th",null,"Número da Venda"),(0,l._)("th",null,"Nome do Cliente"),(0,l._)("th",null,"Data da Compra"),(0,l._)("th",null,"Processo"),(0,l._)("th",null,"Confirmar Pagamento"),(0,l._)("th",null,"Detalhes")])],-1),c=(0,l._)("td",null,[(0,l._)("button",null,"Confirmar")],-1),u=["onClick"];function b(a,e,t,b,h,m){const _=(0,l.up)("SideBarDash");return(0,l.wg)(),(0,l.iD)("div",n,[(0,l.Wm)(_,{class:"flex-shrink-0"}),(0,l._)("div",d,[r,(0,l._)("table",o,[i,(0,l._)("tbody",null,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(h.purchases,(e=>((0,l.wg)(),(0,l.iD)("tr",{key:e.id},[(0,l._)("td",null,(0,s.zw)(e.id),1),(0,l._)("td",null,(0,s.zw)(e.userName),1),(0,l._)("td",null,(0,s.zw)(e.buyDate),1),(0,l._)("td",null,(0,s.zw)(e.status),1),c,(0,l._)("td",null,[(0,l._)("button",{onClick:t=>a.viewDetails(e.id),class:"btn btn-primary"},"Detalhes",8,u)])])))),128))])])])])}var h=t(2262),m=t(4161),_={name:"Neworder",components:{SideBarDash:h.Z},data(){return{endereco:"https://rechargeapi.azurewebsites.net/",purchases:[]}},created(){this.fetchPurchaseData()},methods:{async fetchPurchaseData(){try{const a=await m.Z.get(`${this.endereco}/Purchase`),e=a.data,t=e.map((a=>m.Z.get(`${this.endereco}/Users/${a.userId}`).then((e=>{a.userName=e.data.name}))));await Promise.all(t),this.purchases=e}catch(a){console.error("Erro ao buscar dados de compra:",a)}}}},f=t(89);const p=(0,f.Z)(_,[["render",b]]);var v=p}}]);
//# sourceMappingURL=451.5a2b3683.js.map