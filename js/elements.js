/*
General functions that involve nodes and creating elements
 */


function coverDiv(parent){
    let p = parent; if (typeof parent == "string") {p = document.getElementById(p)}
    let cov = document.createElement("div"); cov.className = "coverDiv"; p.appendChild(cov); cov.onclick = function(event){
        if (event.target === cov) {cov.remove()} }
    return cov
}

function ic(name,ops){
    let c = document.createElement("span"); c.classList.add("material-symbols-outlined"); c.classList.add("icon"); c.innerText = name;
    if (ops !== undefined){
        // [["dataset","data","Text"],["style",["bg","yel"]],["checked","true"]]
        for (var i=0; i<ops.length; i++){ let o = ops[i];
            if (o[0] === "dataset"){ c["dataset"][o[1]] = o[2]; }
            if (o[0] !== "style" && o[0] !== "dataset"){ c[o[0]] = o[1] }
            if (o[0] === "style") { for (var x=1; x<o.length; x++){ let st = o[x];
                c["style"][st[0]] = st[1] }}
        }}
    return c
}

function toast(text){
    var div = document.getElementById("toast");
    if (div !== null) {div.remove()}
    div = document.createElement("div"); document.getElementById("content").appendChild(div); div.id = "toast";

    div.innerText = text;
    setTimeout(function(){   div.classList.add("visible");   },100)
    setTimeout(function(){   div.classList.toggle("visible");   },3000)
}

function popUp(text,parent,func){ let p = parent; if (typeof parent === "string"){p = document.getElementById(parent);}
    let c = coverDiv(parent)
let div = document.createElement("div"); div.className = "popUp"; c.appendChild(div)
    let tx = document.createElement("div"); tx.innerText = text; tx.className = "topDiv"; div.appendChild(tx);
    let bottom = document.createElement("div"); bottom.className = "bottomDiv"; div.appendChild(bottom);
        let lef = coolButton("Cancel","close","flat"); bottom.appendChild(lef);
            lef.onclick = function(){c.remove()}
        let rig = coolButton("Confirm","done","flat"); bottom.appendChild(rig);
            rig.onclick = function(){func(); c.remove()}
return c
}

function coolButton(tx,ico,type){
    let div = document.createElement("button"); div.className = "coolButton"; if (type){div.classList.add(type)} else {div.classList.add("normal")}
        if (ico){let icon = ic(ico); div.appendChild(icon); icon.style.backgroundColor = "transparent";icon.style.color = "inherit";}
        let text = document.createElement("div"); text.innerText = tx; div.appendChild(text); text.className = "coolButtonText"
return div
}
function iconButton(tx,ico){
    let main = document.createElement("div"); main.className = "iconButtonDiv"
    let div = document.createElement("button"); div.className = "iconButton"; main.appendChild(div);
        let icon = ic(ico); div.appendChild(icon);
    let text = document.createElement("div"); text.innerText = tx; main.appendChild(text)
return main
}


function pd(parent){ let p = parent; if (typeof parent === "string"){p = document.getElementById(parent);}
return p
}
function cre(type,className,style){
let elem = document.createElement(type);
if (className) {elem.className = className;};
if (style){elem.style = style;}
return elem
}

function createStyleTitle(text,style){
let title = document.createElement("div"); title.className = "titleDiv"; title.innerText = text;
    if (style){title.style = style;}
return title
}


function createMenu(obj){ let div = document.createElement("div"); div.id = obj.id; div.className = "menuList";
    for (var i=0; i<obj.options.length; i++){ let op = document.createElement("div"); let oo = obj.options[i];
        op.className = "menuOption"; div.appendChild(op);
        if (oo.text){let tx = document.createElement("div"); tx.className = "menuText"; op.appendChild(tx); tx.innerText = oo.text; if (oo.textStyle){tx.style = oo.textStyle;};}
        if (oo.style){op.style = oo.style;}
        if (oo.ic){let icon = ic(oo.ic); op.prepend(icon); if (oo.icStyle){icon.style = oo.icStyle;}}
        if (oo.dataset){for (key in oo.dataset){op.dataset[key] = oo.dataset[key];}}
        if (oo.type === "option"){for (key in obj.fList){op.addEventListener(key,obj.fList[key])}}
        else {op.className = "menuHeader"}
    }
    return div
}




