"use strict";(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[340],{2340:function(s,e,r){r.r(e),r.d(e,{default:function(){return g}});var a=r(3396),o=r(9242);const t={class:"register-form"},i=(0,a._)("h1",{class:"h3 mb-3 fw-normal",style:{"font-family":"Verdana, Geneva, Tahoma, sans-serif"}},"Criar conta",-1),n={class:"mb-3"},l=(0,a._)("label",{for:"name",class:"form-label"},"Nome:",-1),u={class:"mb-3"},m=(0,a._)("label",{for:"email",class:"form-label"},"E-mail:",-1),d={class:"mb-3"},f=(0,a._)("label",{for:"password",class:"form-label"},"Senha:",-1),c={class:"mb-3"},h=(0,a._)("label",{for:"confirm-password",class:"form-label"},"Confirme sua senha:",-1),p=(0,a._)("button",{class:"w-100 btn btn-lg btn-primary",type:"submit"},"Continuar",-1);function w(s,e,r,w,b,y){return(0,a.wg)(),(0,a.iD)("div",t,[(0,a._)("form",{onSubmit:e[4]||(e[4]=(0,o.iM)(((...s)=>y.submit&&y.submit(...s)),["prevent"]))},[i,(0,a._)("div",n,[l,(0,a.wy)((0,a._)("input",{"onUpdate:modelValue":e[0]||(e[0]=s=>b.user.Name=s),type:"text",class:"form-control",id:"name",ref:"Name",required:""},null,512),[[o.nr,b.user.Name]])]),(0,a._)("div",u,[m,(0,a.wy)((0,a._)("input",{"onUpdate:modelValue":e[1]||(e[1]=s=>b.user.Email=s),type:"email",class:"form-control",id:"email",ref:"Email",required:""},null,512),[[o.nr,b.user.Email]])]),(0,a._)("div",d,[f,(0,a.wy)((0,a._)("input",{"onUpdate:modelValue":e[2]||(e[2]=s=>b.user.hashPassword=s),type:"password",class:"form-control",id:"hashPassword",ref:"Password",required:""},null,512),[[o.nr,b.user.hashPassword]])]),(0,a._)("div",c,[h,(0,a.wy)((0,a._)("input",{"onUpdate:modelValue":e[3]||(e[3]=s=>b.user.ConfirmPassword=s),type:"password",class:"form-control",id:"confirm-password",ref:"psw",required:""},null,512),[[o.nr,b.user.ConfirmPassword]])]),p],32)])}r(7658);var b=r(4161),y=r(2492),_=r.n(y),v=r(2483),P={name:"Register",data(){return{endereco:"https://rechargeapi.azurewebsites.net/",user:{Name:"",Email:"",hashPassword:""}}},methods:{async submit(){if(this.checkValidation())try{await b.Z.post(`${this.endereco}/Users/register`,this.user,{headers:{"Content-Type":"application/json"}}),this.$router.push("/login")}catch(s){console.error("Erro ao registrar:",s)}},checkValidation(){return this.user.Name?this.user.Email?this.user.hashPassword?this.user.hashPassword===this.user.ConfirmPassword||(this.$refs.psw.focus(),_().fire("Password and repeat password mismatched !"),!1):(this.$refs.hashPassword.focus(),_().fire("Give Password !"),!1):(this.$refs.Email.focus(),_().fire("Give Email !"),!1):(this.$refs.Name.focus(),_().fire("Give username !"),!1)}},setup(){const s=(0,v.tv)();return{router:s}}},C=r(89);const E=(0,C.Z)(P,[["render",w]]);var g=E}}]);
//# sourceMappingURL=340.a90079f1.js.map