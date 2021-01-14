(this.webpackJsonprecipes=this.webpackJsonprecipes||[]).push([[0],{14:function(e,t,n){e.exports={RecipesContainer:"Recipes_RecipesContainer__3Y0gB",RecipeItem:"Recipes_RecipeItem__shgWc",DetailsContainer:"Recipes_DetailsContainer__3Mrj0"}},19:function(e,t,n){e.exports={AddRecipe:"AddRecipe_AddRecipe__3SxrA"}},20:function(e,t,n){e.exports={Recipe:"Recipe_Recipe__2iQUq",DetailsContainer:"Recipe_DetailsContainer__25Cay"}},23:function(e,t,n){},24:function(e,t,n){e.exports={Navbar:"Nav_Navbar__2WAoB"}},26:function(e,t,n){e.exports={PositionButtons:"IngredientInput_PositionButtons__3lufe"}},27:function(e,t,n){e.exports={PositionButtons:"MethodInput_PositionButtons__1dOA3"}},28:function(e,t,n){e.exports={loader:"Spinner_loader__3ENkM",load3:"Spinner_load3__jjSEM"}},34:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var c=n(0),i=n(1),a=n.n(i),s=n(22),r=n.n(s),o=(n(34),n(8)),l=n(9),d=n(23),j=n.n(d),h=n(24),b=n.n(h),u=n(7),p=function(){return Object(c.jsx)("nav",{className:b.a.Navbar,children:Object(c.jsxs)("ul",{children:[Object(c.jsx)("li",{children:Object(c.jsx)(u.b,{to:"/",children:"Recipes"})}),Object(c.jsx)("li",{children:Object(c.jsx)(u.b,{to:"/addrecipe",children:"Add Recipe"})}),Object(c.jsx)("li",{}),Object(c.jsx)("li",{children:Object(c.jsx)("button",{children:Object(c.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",viewBox:"0 0 16 16",children:Object(c.jsx)("path",{d:"M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"})})})})]})})},x=n(2),O=n(14),g=n.n(O),m=function(e){var t=e.recipes.map((function(e,t){return Object(c.jsxs)(u.b,{to:"/recipes/".concat(t),className:g.a.RecipeItem,children:[Object(c.jsx)("h2",{children:e.name}),Object(c.jsxs)("div",{className:g.a.DetailsContainer,children:[Object(c.jsx)("p",{children:e.category}),Object(c.jsxs)("p",{children:[e.time," Min"]})]})]},t)}));return Object(c.jsxs)("section",{className:g.a.RecipesContainer,children:[Object(c.jsx)("h1",{children:"Recipes"}),Object(c.jsx)("div",{children:t})]})},f=n(19),v=n.n(f),C=n(26),y=n.n(C),w=function(e){return Object(c.jsxs)("li",{children:[Object(c.jsx)("input",{type:"text",name:"ingredient",onChange:e.ingredientsChange,"data-index":e.index,value:e.ingredient,autoComplete:"off"}),Object(c.jsxs)("div",{className:y.a.PositionButtons,children:[Object(c.jsx)("button",{type:"button",children:Object(c.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",viewBox:"0 0 16 16",children:Object(c.jsx)("path",{fillRule:"evenodd",d:"M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"})})}),Object(c.jsx)("button",{type:"button",children:Object(c.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",viewBox:"0 0 16 16",children:Object(c.jsx)("path",{fillRule:"evenodd",d:"M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"})})})]}),Object(c.jsx)("button",{type:"button","data-index":e.index,"data-key":"ingredients",onClick:e.deleteInput,children:"Delete"})]})},_=n(27),R=n.n(_),I=function(e){return Object(c.jsxs)("li",{children:[Object(c.jsx)("input",{type:"text",name:"method",onChange:e.methodChange,"data-index":e.index,value:e.step,autoComplete:"off"}),Object(c.jsxs)("div",{className:R.a.PositionButtons,children:[Object(c.jsx)("button",{type:"button",children:Object(c.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",viewBox:"0 0 16 16",children:Object(c.jsx)("path",{fillRule:"evenodd",d:"M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"})})}),Object(c.jsx)("button",{type:"button",children:Object(c.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",viewBox:"0 0 16 16",children:Object(c.jsx)("path",{fillRule:"evenodd",d:"M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"})})})]}),Object(c.jsx)("button",{type:"button","data-index":e.index,"data-key":"method",onClick:e.deleteInput,children:"Delete"})]})},N=function(e){var t=e.ingredients.map((function(t,n){return Object(c.jsx)(w,{ingredientsChange:e.ingredientsChange,index:n,ingredient:t,deleteInput:e.deleteInput},n)})),n=e.method.map((function(t,n){return Object(c.jsx)(I,{methodChange:e.methodChange,index:n,step:t,deleteInput:e.deleteInput},n)}));return Object(c.jsxs)("div",{className:v.a.AddRecipe,children:[Object(c.jsx)("h1",{className:v.a.MainHeading,children:"Add a New Recipe"}),Object(c.jsxs)("form",{onSubmit:e.saveRecipe,onKeyDown:function(e){"Enter"===e.key&&e.preventDefault()},children:[Object(c.jsx)("label",{children:"Name"}),Object(c.jsx)("input",{type:"text",name:"name",onChange:e.formChange,value:e.name,placeholder:"Enter Name"}),Object(c.jsx)("label",{children:"Category"}),Object(c.jsx)("input",{type:"text",name:"category",onChange:e.formChange,value:e.category,placeholder:"Enter Category"}),Object(c.jsx)("label",{children:"Time"}),Object(c.jsx)("input",{type:"number",name:"time",onChange:e.formChange,value:e.time,placeholder:"Enter Time"}),Object(c.jsx)("label",{children:"Ingredients"}),Object(c.jsx)("ul",{children:t}),Object(c.jsx)("button",{type:"button",onClick:e.addIngredientInput,children:"Add"}),Object(c.jsx)("label",{children:"Method"}),Object(c.jsx)("ol",{children:n}),Object(c.jsx)("button",{type:"button",onClick:e.addMethodInput,children:"Add"}),Object(c.jsx)("button",{type:"submit",children:"Save"})]})]})},M=n(20),S=n.n(M),A=function(e){var t=Object(x.g)().pathname.split("/"),n=t[t.length-1];return 0===e.recipes.length?null:Object(c.jsxs)("section",{className:S.a.Recipe,children:[Object(c.jsx)("h1",{children:e.recipes[n].name}),Object(c.jsxs)("div",{className:S.a.DetailsContainer,children:[Object(c.jsx)("p",{children:e.recipes[n].category}),Object(c.jsxs)("p",{children:[e.recipes[n].time," Min"]})]}),Object(c.jsx)("h2",{children:"Ingredients"}),Object(c.jsx)("ul",{children:e.recipes[n].ingredients.map((function(e,t){return Object(c.jsx)("li",{children:e},t)}))}),Object(c.jsx)("h2",{children:"Method"}),Object(c.jsx)("ol",{children:e.recipes[n].method.map((function(e,t){return Object(c.jsx)("li",{children:e},t)}))})]})},k=n(28),B=n.n(k),D=function(){return Object(c.jsx)("div",{className:B.a.loader})},E=function(){var e=Object(i.useState)(""),t=Object(l.a)(e,2),n=t[0],a=t[1],s=Object(i.useState)(""),r=Object(l.a)(s,2),d=r[0],h=r[1],b=Object(i.useState)(""),u=Object(l.a)(b,2),O=u[0],g=u[1],f=Object(i.useState)([""]),v=Object(l.a)(f,2),C=v[0],y=v[1],w=Object(i.useState)([""]),_=Object(l.a)(w,2),R=_[0],I=_[1],M=Object(i.useState)([]),S=Object(l.a)(M,2),k=S[0],B=S[1],E=Object(i.useState)(!0),P=Object(l.a)(E,2),z=P[0],L=P[1];Object(i.useEffect)((function(){0===k.length&&fetch("https://recipes-f31ef-default-rtdb.firebaseio.com/recipes.json").then((function(e){return e.json()})).then((function(e){console.log(e);for(var t=[],n=Object.keys(e),c=0;c<n.length;c++)t.push(e[n[c]]);B(t),L(!1)})).catch((function(e){console.error(e)}))}),[]);var T=Object(x.f)();return Object(c.jsxs)("div",{className:j.a.App,children:[Object(c.jsx)("header",{children:Object(c.jsx)(p,{})}),Object(c.jsxs)(x.c,{children:[Object(c.jsx)(x.a,{exact:!0,path:"/",children:z?Object(c.jsx)(D,{}):Object(c.jsx)(m,{recipes:k})}),Object(c.jsx)(x.a,{path:"/addrecipe",children:z?Object(c.jsx)(D,{}):Object(c.jsx)(N,{name:n,category:O,time:d,formChange:function(e){var t=e.target.name,n=e.target.value;switch(t){case"name":a(n);break;case"category":g(n);break;case"time":h(n)}},ingredients:C,ingredientsChange:function(e){var t=e.target.getAttribute("data-index"),n=Object(o.a)(C);n[t]=e.target.value,y(n)},addIngredientInput:function(){y([].concat(Object(o.a)(C),[""]))},method:R,methodChange:function(e){var t=e.target.getAttribute("data-index"),n=Object(o.a)(R);n[t]=e.target.value,I(n)},addMethodInput:function(){I([].concat(Object(o.a)(R),[""]))},saveRecipe:function(e){console.log(e),e.preventDefault();var t={name:n,category:O,time:d,ingredients:C,method:R},c=function(e){for(var t=[],n=0;n<e.length;n++){var c={name:e[n].name,category:e[n].category,time:e[n].time,ingredients:Object(o.a)(e[n].ingredients),method:Object(o.a)(e[n].method)};t.push(c)}return t}(k);c.push(t),B(c),fetch("https://recipes-f31ef-default-rtdb.firebaseio.com/recipes.json",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()})).then((function(e){return console.log("Success",e)})).catch((function(e){console.log("Error: ",e)})),T.push("/")},deleteInput:function(e){var t=e.target.getAttribute("data-index");if("ingredients"===e.target.getAttribute("data-key")){var n=Object(o.a)(C);console.log(n),n.splice(t,1),console.log(n),y(n)}else{var c=Object(o.a)(R);c.splice(t,1),I(c)}}})}),Object(c.jsx)(x.a,{path:"/:id",children:z?Object(c.jsx)(D,{}):Object(c.jsx)(A,{recipes:k})})]})]})};r.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(u.a,{children:Object(c.jsx)(E,{})})}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.cec8a26f.chunk.js.map