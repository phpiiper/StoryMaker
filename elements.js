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

/* HOME PAGE */
function createHomePage(parent){
let p = pd(parent)
let div = document.createElement("div"); div.id = "homePage"; p.appendChild(div);

let bS = document.createElement("div");  bS.className = "hpBook"; div.appendChild(bS);
    let bST = document.createElement("span"); bST.className = "hpbText"; bS.appendChild(bST); bST.innerText = "STORIES"; bS.onclick = function(){ createStoryManager(parent); }
let bA = document.createElement("div");  bA.className = "hpBook"; div.appendChild(bA);
    let bAT = document.createElement("span"); bAT.className = "hpbText"; bA.appendChild(bAT); bAT.innerText = "Add"; bA.style.height = "80%";
    let bAU = document.createElement("div"); bAU.className = "hpbUnder"; bA.appendChild(bAU); bAU.innerText = "Story"; bA.onclick = function(){ /*createStoryCreator(parent)*/ mainStoryCreator(parent)}
let bM = document.createElement("div");  bM.className = "hpBook"; div.appendChild(bM);
    let bMT = document.createElement("span"); bMT.className = "hpbText"; bM.appendChild(bMT); bMT.innerText = "MODULES"; bM.onclick = function(){createModuleManager(parent)}
let bMa = document.createElement("div");  bMa.className = "hpBook"; div.appendChild(bMa);
    let bMaT = document.createElement("span"); bMaT.className = "hpbText"; bMa.appendChild(bMaT); bMaT.innerText = "Add"; bMa.style.height = "80%"
    let bMaU = document.createElement("div"); bMaU.className = "hpbUnder"; bMa.appendChild(bMaU); bMaU.innerText = "Modules"; bMa.onclick = function(){createModuleCreator(parent);}

return div
}




function createDropdown(object){
let ct = document.createElement("div"); ct.className = "dropdownContainer"; ct.dataset.data = JSON.stringify(object);
    let div = document.createElement("div"); div.className = "dropdown"; ct.appendChild(div);
        let top = document.createElement("div"); top.className = "dpTop"; div.appendChild(top);
            let inp = document.createElement("div"); if (object.type.split("-")[1] === "input"){inp = document.createElement("input")}; top.appendChild(inp);
                if (object.type.split("-")[1] === "input"){ top.style.padding = "0.2em 0.5em"
                    let arr = ic("add_circle"); top.appendChild(arr); arr.onclick = function(tx){
                        if (inp.value.length > 0){ let op = document.createElement("div"); op.innerText = inp.value; if (tx){op.innerText = tx;};op.onclick = function(){op.remove();};
                            inp.before(op)
                            inp.value = ""; op.className = "dpInputOption dpOption";
                            if ("fList" in object){for (key in object.fList){op.addEventListener(key,object.fList[key])}};
                        }}
                    inp.addEventListener("keyup",function(){ if (event.key === "Enter"){arr.onclick()}})
                    if ("fList" in object && "keyup" in object.fList){inp.addEventListener("keyup",object.fList["keyup"])}
                } else {let arr = ic("arrow_drop_down"); top.appendChild(arr);}
        let bot = document.createElement("div"); bot.className = "dpBot"; div.appendChild(bot);
            // OPTIONS EXIST
            if (object.ops){
            for (var i=0; i<object["ops"].length; i++){
            let opj = object["ops"][i]; let o = document.createElement("div");
                if (typeof opj !== "string") {o.innerText = opj.title;} else {o.innerText = opj}
                o.dataset.data = JSON.stringify(opj); bot.appendChild(o); o.className = "dpOption";
                o.addEventListener("click",function(){
                    if (object.type.includes("input")){ let txt = opj; arr.onclick(txt);}
                    else {
                        if (o.parentNode === inp && !object.type.split("-").includes("static")){bot.appendChild(o);}
                        else {if (inp.childNodes.length > 0){o.after(inp.childNodes[0]); inp.prepend(o);} else {inp.appendChild(o);} }}
                })
            if ("fList" in object){for (key in object.fList){o.addEventListener(key,object.fList[key])}}}
            }
    div.inputElem = inp; if (object.type !== "input"){div.listElem = bot; }
    ct.inputElem = inp; if (object.type !== "input"){ct.listElem = bot; }
    for (var i=0; i<object.style.length; i++){ // ALL styles
        let s = object.style[i]; // {affect: ["parent"], type: "width", val: "100%"}
        if ("affect" in s && s.affect.includes("parent")){ ct.style[s.type] = s.val;}
        if ("affect" in s && s.affect.includes("child")){ for (var x=0; x<div.listElem.childNodes.length; x++){ div.listElem.childNodes[x].style[s.type] = s.val;}}
    }
    div.getVal = function(){ // easy way to access values in a dropdown
        if (object.type.split("-")[1] === "input"){
            return Array.from(inp.parentNode.childNodes).filter(x => x.nodeName.toLowerCase() === "div").map(x => x = x.innerText);
        } else { return inp.innerText; }
    }
    if (object.text) {let tx = document.createElement("span"); ct.appendChild(tx); tx.innerText = object.text;}
    if ("id" in object){div.id = object.id};
    return ct
}


function createInput(obj){
let inpD = document.createElement("div"); inpD.className = "inputContainer"; inpD.dataset.data = JSON.stringify(obj);
    let inp; if (obj.type.includes("textarea")) {inp = document.createElement("textarea")} else {
        inp = document.createElement("input"); inp.type = obj.type.split("-")[1];};
         inpD.appendChild(inp); inp.className = "input";     inp.addEventListener("keyup",function(){
    if (inp.parentNode.parentNode.id !== "mcPreviewMod" && document.getElementById("moduleCreator") !== null){
    saveDataset("moduleCreator","data",getModOptions());}})
        if ("fList" in obj){for (key in obj.fList){inp.addEventListener(key,obj.fList[key])}}
    if ("text" in obj){let sp = document.createElement("span"); sp.innerText = obj.text; inpD.appendChild(sp); }
    if (obj.id){inp.id = obj.id;}
        if (obj.resize){inp.style.resize = obj.resize;}
        if (obj.min){inp.min = JSON.stringify(obj.min);}
        if (obj.max){inp.max = JSON.stringify(obj.max);}
        if (obj.step){inp.step = JSON.stringify(obj.step);}
        if (obj.defaultVal){inp.value = obj.defaultVal;}
            if (obj.value){inp.value = obj.value;}
        if (obj.placeholder){inp.placeholder = obj.placeholder;}
    inpD.inputElem = inp;
    for (var i=0; i<obj.style.length; i++){ // ALL styles
        let s = obj.style[i];  //console.log(s)
        if ("affect" in s && s.affect.includes("parent")){ inpD.style[s.type] = s.val;}
        if ("affect" in s && s.affect.includes("child")){inp.style[s.type] = s.val; }
    };

    inp.getVal = function(){return inp.value;}
return inpD
}


function createTable(obj){ let tdiv = document.createElement("div"); tdiv.className = "tableDiv";
    let t = document.createElement("table"); t.className = "table"; tdiv.appendChild(t); t.dataset.data = JSON.stringify(obj);
    for (var i=0; i<obj.table.length; i++){ let r = obj.table[i];
        let rowD = document.createElement("tr"); rowD.className = "row"; t.appendChild(rowD);
            for (var x=0; x<r.length; x++){ let c = r[x]; let cell;
                if (c.type === "Input"){cell = document.createElement("input"); cell.placeholder = c.value; cell.className = "cell";}
                else {cell = document.createElement("td"); cell.className = "cell header";}
                    cell.dataset.data = JSON.stringify(c); cell.json = function(){return c}
                    if (c.value){cell.innerText = c.value} else {cell.innerText = "["+c.type+"]";}
                // if STYLE, FUNCTIONS
                if ("style" in obj){ let filterS = obj.style.filter(x => x.affect.includes("child"));
                    for (var s=0; s<filterS.length; s++){cell.style[filterS[s].type] = filterS[s].val;} // style cell
                    // OVERRIDE styles in actual cell IF exists
                    if ("style" in c){for (var st=0; st<c.style.length; st++){cell.style[c.style[st].type] = c.style[st].val}}
                    // BIU
                    if (c.biu){
                        for (key in c.biu){cell.style[key] = c.biu[key];}
                    }
                    // lcr
                    if (c.lcr){
                        cell.style.justifyContent = c.lcr["justifyContent"]
                    }
                }
                if ("fList" in obj){ for (key in obj.fList){cell.addEventListener(key,obj.fList[key])}} // funcs
                rowD.appendChild(cell)
            }
    } // row loop
    if ("style" in obj) {let fs = obj.style.filter(x => x.affect.includes("parent")); for (var s=0; s<fs.length; s++){tdiv.style[fs[s].type] = fs[s].val;}}

    if (obj.type.includes("expandable") && obj.expand){
        let bar = document.createElement("div"); bar.id = "tableBar"; bar.innerText = "+"; tdiv.appendChild(bar)
        if (obj.expand === "Bottom"){tdiv.style.flexDirection = "column"; bar.style = "width: 100%; height: 2em;"; tdiv.style.display = "flex"; tdiv.style.flexDirection = "column"; bar.onclick = function(){
            let last = t.childNodes[t.childNodes.length-1];
            let nr = document.createElement("tr"); nr.className = "row"; for (var i=0; i<last.childNodes.length; i++){let nrT = last.childNodes[i].cloneNode(true); nr.appendChild(nrT); nrT.value = ""; let newJ = JSON.parse(nrT.dataset.data); newJ.value = ""; nrT.dataset.data = JSON.stringify(newJ);}; t.appendChild(nr)
        }}
        else {tdiv.style.flexDirection = "flex"; bar.id = "tableBar";bar.style = "width: 2em; height: 100%;"; tdiv.style.display = "flex"; tdiv.style.flexDirection = "row"; bar.onclick = function(){
            for (var i=0; i<t.childNodes.length; i++){ let last = t.childNodes[i]; last = last.childNodes[last.childNodes.length-1]; let nd = last.cloneNode(true); nd.value = ""; let newJ = JSON.parse(nd.dataset.data); if (newJ.type === "Input"){newJ.value = ""; nd.dataset.data = JSON.stringify(newJ);}
            last.after(nd);

            }
        }}
    }
return tdiv
}


function createPrepTable(obj){ let pt = document.getElementById("mcPrepTable"); if (pt !== null){pt.remove();}
        //console.log("210",((pt === null) ? pt : JSON.parse(pt.dataset.data).table),obj.table)

    pt = document.createElement("div"); pt.id = "mcPrepTable"; pt.dataset.data = JSON.stringify(obj)
    for (var i=0; i<obj.table.length; i++){ let r = obj.table[i]; let rd = document.createElement("div"); rd.className = "row"; pt.appendChild(rd);
        for (var x=0; x<r.length; x++){ let c = r[x]; let cell = document.createElement("div"); cell.className = "cell"; cell.dataset.data = JSON.stringify(c);
                cell.innerText = "["+c.type+"]"; if (c.value){cell.innerText = c.value;}
             rd.appendChild(cell)
            let icon; if (c.type === "Input"){icon = ic("keyboard_keys");
            } else {icon = ic("text_fields"); }; cell.appendChild(icon);
            icon.style = "position: absolute; right: 0; bottom: 0; margin: 0.2em; font-size: 0.8em;";
            cell.onclick = function(){ selectDiv("selectedCell","stay"); ptOpenOptions(cell);}
        }
    }
return pt
}


function ptOpenOptions(div){ let p = document.getElementById("mcTOODiv"); let dt = document.getElementById("mcPrepTable"); let obj = JSON.parse(div.dataset.data); p.targetElem = div;
while (p.childNodes.length > 0){p.childNodes[0].remove()}
console.log("231",obj)

    let tbDP = createDropdown(dpList.find(x => x.id === "mctType")); p.appendChild(tbDP); Array.from(tbDP.listElem.childNodes).find(x => x.innerText === obj.type).click(); // TYPE: Title, Input
    let biu = ptCreateOps([ {icon: "format_bold", value: {fontWeight: "bold"}}, {icon: "format_italic", value: {fontStyle: "italic"}}, {icon: "format_underlined", value: {textDecoration: "underline"}}],"multi",function(){ptSave(); saveDataset("moduleCreator","data",getModOptions())}); p.appendChild(biu); biu.id = "ptBIU" // Style: BIU (Bold, ital, under)
        if (obj.biu){for (var i=0; i<biu.childNodes.length;i++){
            if (Object.keys(obj.biu).includes(Object.keys(JSON.parse(biu.childNodes[i].dataset.data))[0])){biu.childNodes[i].click()}}} // if exists
     let lcr = ptCreateOps([ {icon: "format_align_left", value: {justifyContent: "left"}}, {icon: "format_align_center", value: {justifyContent: "center"}}, {icon: "format_align_right", value: {justifyContent: "right"}}],"single",function(){ptSave(); saveDataset("moduleCreator","data",getModOptions())}); p.appendChild(lcr); lcr.id = "ptLCR"; // Style: Text Align (L,C,R)
        if (obj.lcr){for (var i=0; i<lcr.childNodes.length;i++){if (obj.lcr.includes(lcr.childNodes[i].dataset.data)){lcr.childNodes[i].click()}}} else {obj.lcr = "C"; lcr.childNodes[1].click()} // if exists
     let pt = createInput(inpList.find(x => x.id === "ptValue")); p.appendChild(pt);
        pt.inputElem.value = obj.value;

     let pt1 = createInput(inpList.find(x => x.id === "ptWidth")); p.appendChild(pt1);
     let pt2 = createInput(inpList.find(x => x.id === "ptHeight")); p.appendChild(pt2)
     let pt3 = createInput(inpList.find(x => x.id === "ptBorder")); p.appendChild(pt3)
    let pt4 = createInput(inpList.find(x => x.id === "ptFontColor")); p.appendChild(pt4)
     let pt5 = createInput(inpList.find(x => x.id === "ptBackgroundCol")); p.appendChild(pt5)
        if (obj.style){
            let wd = obj.style.find(x => x.type === "width"); if (wd){pt1.inputElem.value = wd.val;}
            let ht = obj.style.find(x => x.type === "height"); if (ht){pt2.inputElem.value = ht.val;}
            let bd = obj.style.find(x => x.type === "border"); if (bd){pt3.inputElem.value = bd.val;}
            let fc = obj.style.find(x => x.type === "border"); if (fc){pt4.inputElem.value = fc.val;}
            let bg = obj.style.find(x => x.type === "backgroundColor"); if (bg){pt5.inputElem.value = bg.val;}
        }
        console.log(p,obj)
    p.dataset.data = JSON.stringify(obj);
   ptSave()

}

function ptCreateOps(arr,type,f,pStyle,opStyle) {let opd = document.createElement("div"); opd.className = "opDiv"; opd.dataset.data = JSON.stringify({}); if (pStyle){opd.style = pStyle;}
/* array = [
    ["icon","value"]
]
 */
for (var i=0; i<arr.length; i++){ let op = document.createElement("div"); op.className = "opdOp"; opd.appendChild(op); let icon = ic(arr[i].icon); op.appendChild(icon); op.dataset.data = JSON.stringify(arr[i].value); if (opStyle){op.style = opStyle}
    op.onclick = function(){ let c = JSON.parse(opd.dataset.data); let option = JSON.parse(op.dataset.data);
        //console.log(opd.dataset.data)
        //console.log(c,option,Object.keys(c),Object.keys(option))
        if (JSON.stringify(c).includes(JSON.stringify(option).slice(1,JSON.stringify(option).length-1))){
            if (type === "single"){c = {};}
            else { for (key in option){delete c[key];}; };
            op.classList.remove("selected");
        } else {
            if (type !== "single") {
                for (key in option){c[key] = option[key];}; op.classList.add("selected");
            } else {
                c = option; console.log(c,opd.childNodes.length)
                for (var x=0; x<opd.childNodes.length; x++){opd.childNodes[x].classList.remove("selected");};
                op.classList.add("selected");};
        }
        opd.dataset.data = JSON.stringify(c);
    console.log(c)
    }
    if (f){op.addEventListener("click",f)}
};
    opd.refresh = function(ops){ let d = getDataset(opd,"data"); d[1] = ops; d[0].dataset.data = JSON.stringify(d[1]);
        for (var i=0; i<opd.childNodes.length; i++){ let oc = opd.childNodes[i];
            if (Object.keys(d[1]).includes(Object.keys(JSON.parse(oc.dataset.data))[0])){oc.classList.add("selected")} else {oc.classList.remove("selected")}
        }
    }; opd.getValue = function(){
        let ob = {};
        for (var i=0; i<opd.childNodes.length; i++){
            if (opd.childNodes[i].classList.contains("selected")){let dp = JSON.parse(opd.childNodes[i].dataset.data); for (key in dp){ob[key] = dp[key];}}
        }
        return ob;
    }

return opd
}


/* storySheet MODULES */
function createFlipcard(obj){ let div = document.createElement("div"); div.className = "flipcardDiv"; div.dataset.data = JSON.stringify(obj); div.dataset.id = "0";
    for (var i=0; i<obj.cards.length; i++){ let co = obj.cards[i]; let card = document.createElement("div"); card.className = "fcCard"; card.dataset.data = JSON.stringify(co); div.appendChild(card); for (key in co.style){
        if (key === "value"){card.innerText = co.style[key];}
        else {card.style[key] = co.style[key];}
        }; if (i !== 0){card.style.display = "none"}
    }; div.onclick = function(){ let d = getDataset(div,"data"); let id = getDataset(div,"id");
        let ch = Array.from(d[0].childNodes); let newID = id[1] + 1; if (ch.length === newID){newID = 0}; id[0].dataset.id = newID;
            for (var i=0; i<ch.length; i++){if (i === newID){ch[i].style.display = null} else {ch[i].style.display = "none"}}
    }; if (obj.style){for (key in obj){div.style[key] = obj.style[key]}}
return div
}

function createBar(obj){ let div = document.createElement("div"); div.className = "barDiv"; div.dataset.data = JSON.stringify(obj); console.log(obj);
    // TYPE RANGE
    let main = document.createElement("div"); main.className = "barMain"; div.appendChild(main);
        // WIDTH HEIGHT
        for (key in obj.container){main.style[key] = obj.container[key]}
    // TYPE

    // TEXT
        let vars = ["leftText","rightText"]; for (var i=0; i<vars.length; i++){let vtx = vars[i];
            let txDiv = cre("div","barTextDiv",""); main.appendChild(txDiv);
                txDiv.id = "bar" + vtx[0].toUpperCase() + vtx.substring(1);
            for (key in obj[vtx]){
                if (key === "value"){txDiv.innerText = obj[vtx][key]}
                else if (["showVal"].includes(key)){
                    if (!obj[vtx][key]) {txDiv.style.display = "none";}
                    }
                else {txDiv.style[key] = obj[vtx][key];}
                }
            }
    // BLOCK
    let blockDiv = document.createElement("div"); blockDiv.className = "barBlockDiv"; main.childNodes[0].after(blockDiv);
        let block = document.createElement("div"); block.className = "barBlock"; blockDiv.appendChild(block);
        let padding;
            if ("padding" in obj.tracker){padding = "(" + obj.tracker.padding + ")";}
            else {padding = 0}
        for (key in obj["tracker"]){
            if (["value"].includes(key)){
                if (key === "value"){block.innerText = obj.tracker[key];}
            }
            else if (["showVal","borderRadius"].includes(key)){
                if (key === "showVal" && !obj.tracker[key]){block.style.display = "none"}
                if (key === "borderRadius"){block.style.borderRadius = (obj.tracker[key] + "%")}
            }
            else {block.style[key] = obj.tracker[key];}
        }
        // block height/width = CONTAINER HEIGHT
            if (obj.container.height){
                block.style["height"] = obj.container.height;
                block.style["width"] = obj.container.height;
            }
    let bgc = block.style //block.getBoundingClientRect();
    // calc(max(min(55.5556% - 0.5em, 100%), (0% - 30px)))
    // calc(max(min(55.55555555555556% - (0.5em), 100% - 50px),0% ))
    let leftpos = "calc(max(min(" + obj.value/(obj.end-obj.start)*100 + "% - " + padding + " - " + "calc(" + bgc.width + "/2), 100% - calc(" + bgc.width + "/2) ), 0% ))"; console.log(leftpos)
    /* pos */   block.style.left = leftpos;
    //STYLES
    /*
    if (obj.style){for (key in obj.style){
        if (!["width","height"].includes(key)){main.style[key] = obj.style[key];}}
    } */

return div
}


function createStoryManager(parent){
let c = coverDiv(parent); let div = document.createElement("div"); div.id = "storyManager"; c.appendChild(div);

let top = document.createElement("div"); top.id = "smTopDiv"; div.appendChild(top);
    let cic = iconButton("Add Story","add_circle"); cic.onclick = function(){
        console.log("createSTory")
    }; top.appendChild(cic); cic.style.width = "300px"; console.log(cic)

    let object = dpList.find(x => x.id === "storyPicker"); object.ops = storyList;
    let dp = createDropdown(object); top.appendChild(dp);

let iconList = document.createElement("div"); iconList.style = "display: flex; align-items: center; justify-content: flex-end; width: 100%;"; top.appendChild(iconList)
    let iconA = iconButton("Add Ch.","person_add"); iconA.onclick = function(){
        console.log("createChara");
    }; iconList.appendChild(iconA)
    let iconI = iconButton("Info","info"); iconI.onclick = function(){
        console.log("infoBtn");
    }; iconList.appendChild(iconI)
    let iconS = iconButton("Story S.","brush"); iconS.onclick = function(){
        console.log("openStorySheet");
        let d = getDataset("storyManager","data"); if (d[1].id){
            createStoryCreator(c,d[1]);
        } else {toast("Please select a story!")}
    }; iconList.appendChild(iconS)
    let iconC = iconButton("Chara S.","book"); iconC.onclick = function(){
        console.log("openStorySheet");
    }; iconList.appendChild(iconC)
}


function createModuleManager(parent){
    let c = coverDiv(parent); let div = document.createElement("div"); div.id = "moduleManager"; c.appendChild(div);
    let top = document.createElement("div"); top.id = "mmTopDiv"; div.appendChild(top);
        let topText = document.createElement("div"); topText.innerText = "Module List"; top.appendChild(topText);
        let opDiv = document.createElement("div"); opDiv.id = "mmOptionsList"; top.appendChild(opDiv)
            // CREATE
            let cdeBtn = iconButton("Add Module","library_add"); opDiv.appendChild(cdeBtn);
                cdeBtn.onclick = function(){ createModuleCreator(c); }
            // Edit, Delete
            let odeBtn = iconButton("Edit","edit"); opDiv.appendChild(odeBtn);
                odeBtn.onclick = function(){ let m = document.getElementById("selectedModule"); if (m === null){
                toast("Please select a module.")
                } else {
                   /* console.log("ed",m);*/ let d = JSON.parse(m.dataset.data);
                    createModuleCreator(c,d);
                }}
            let oddBtn = iconButton("Delete","delete"); opDiv.appendChild(oddBtn);
                oddBtn.onclick = function(){ let m = document.getElementById("selectedModule"); if (m === null){
                    toast("Please select a module.")
                } else {
                    console.log("del",m); let d = JSON.parse(m.dataset.data);
                    modList = modList.filter(x => x.id !== d.id); saveLS();
                    console.log(modList); bot.refresh();
                }}
    let bot = document.createElement("div"); bot.id = "mmBotDiv"; div.appendChild(bot);
    bot.refresh = function(){ while (bot.childNodes.length > 0){bot.childNodes[0].remove();}
        for (var i=0; i<modList.length; i++){bot.appendChild(createModuleDiv(modList[i],c))}
        }
    bot.refresh();
}
    function createModuleDiv(obj,p){ let div = document.createElement("div"); div.className = "mmModule"; div.dataset.data = JSON.stringify(obj); if (obj && obj.id) {div.dataset.id = obj.id}
        let prev = ic("visibility"); div.appendChild(prev); prev.onclick = function(){ let cov = coverDiv(p); let pdiv = document.createElement("div"); cov.appendChild(pdiv); pdiv.style = "width: 70%; height: 60%; background-color: white; padding: 1em; display: flex; flex-direction: column; align-items: center; justify-content: center;";
            let tx = document.createElement("div"); tx.innerText = "Preview"; pdiv.appendChild(tx); tx.style = "position: absolute; right: 0.5em; bottom: -1.75em;"
            let btm = document.createElement("div"); pdiv.appendChild(btm); btm.style = " width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;";
                createPreview(btm,obj);
            }// onclick
        let n = document.createElement("div"); n.innerText = obj.name; div.appendChild(n); n.className = "mmName";
        let td = document.createElement("div"); div.appendChild(td); td.className = "mmTypeList";
            let typeA = obj.type.split("-")
            let t1 = document.createElement("div"); t1.innerText = typeA[0][0].toUpperCase() + typeA[0].substring(1); td.appendChild(t1);
            let t2 = document.createElement("div"); t2.innerText = typeA[1][0].toUpperCase() + typeA[1].substring(1); td.appendChild(t2);
        n.onclick = function(){let c = document.getElementById("selectedModule"); if (c !== null){c.id = ""}; div.id = "selectedModule";}
    //console.log(obj)
    return div
    }




function createModuleCreator(parent,obj){ console.log("350",obj)
    let c = coverDiv(parent); let div = document.createElement("div"); div.id = "moduleCreator"; c.appendChild(div); if (obj && obj.id){div.dataset.id = obj.id}
    let l = document.createElement("div"); l.id = "mcLeftDiv"; div.appendChild(l);
        let prev = document.createElement("div"); prev.id = "mcPreviewMod"; l.appendChild(prev);
        let lb = document.createElement("div"); lb.id = "mclBottom"; l.appendChild(lb);
            let lbl = document.createElement("div"); lbl.id = "mclInfoDiv"; lb.appendChild(lbl);
                let dobj = dpList.find(x => x.id === "mcType")
                let lbl_dp = createDropdown(dobj); lbl.appendChild(lbl_dp);

                let st_obj = dpList.find(x => x.id === "mcSubtype"); let st = createDropdown(st_obj); lbl.appendChild(st);

                let nObj = inpList.find(x => x.id === "mcName"); let name = createInput(nObj); lbl.appendChild(name);

            if (obj && obj.id){console.log("EDIT")
                let eObj = inpList.find(x => x.id === "mcCreateBtn"); eObj.value = "Edit Module";
                let erBtn = createInput(eObj); lbl.appendChild(erBtn);
            }
            else {
                let cObj = inpList.find(x => x.id === "mcCreateBtn"); let crBtn = createInput(cObj); lbl.appendChild(crBtn);
            }
            let mdl = document.createElement("div"); mdl.id = "mcModList"; lb.appendChild(mdl);
                // mod options

    let r = document.createElement("div"); r.id = "mcRightDiv"; div.appendChild(r);

    let rdata = {Container: [], Element: [], focus: "Container"};
    if (obj){
        // style
        rdata = {}; rdata.Container = obj.style.filter(x => x.affect === "parent"); rdata.Element = obj.style.filter(x => x.affect === "child"); rdata.focus = "Container";
    }
    r.dataset.data = JSON.stringify(rdata);

        let rt = document.createElement("div"); rt.innerText = "Style List"; r.appendChild(rt); rt.classList.add("mcrTitle");
        let ch = document.createElement("div"); r.appendChild(ch); ch.classList.add("mcrTitle"); let slct = document.createElement("div"); slct.style = "width: 100%; height: 100%;"; slct.innerText = "Container"; ch.appendChild(slct);
            slct.onclick = function(){
            if (slct.innerText === "Container"){ getStyleList(); let d = getDataset(r,"data"); slct.innerText = "Element"; d[1].focus = "Element"; d[0].dataset.data = JSON.stringify(d[1]); addStyleList(rl,d[1].focus);
            }
            else { getStyleList(); let d = getDataset(r,"data"); slct.innerText = "Container"; d[1].focus = "Container"; d[0].dataset.data = JSON.stringify(d[1]); addStyleList(rl,d[1].focus);
            }
        }; let chIc = ic("autorenew"); ch.appendChild(chIc); chIc.style = "position: absolute; top: 0; right: 0; margin: 0.2em; padding: 0; font-size: 1em;"
    // let rLIST
        let rl = document.createElement("div"); rl.id = "mcStyleList"; r.appendChild(rl);
        addStyleList(rl,rdata.focus)

    if (!obj) {lbl_dp.childNodes[0].listElem.childNodes[0].click(); let ml = getModOptions(); createModList(mdl,ml);} // CHANGE THIS
// mod options last?

if (obj){ //console.log("392",obj);
// main Type
let mtList = Array.from(lbl_dp.listElem.childNodes); let mt1 = mtList.find(x => x.innerText.toLowerCase() === obj.type.split("-")[0].toLowerCase()); mt1.click();
// sub
let stList = Array.from(st.listElem.childNodes); let mt2 = stList.find(x => x.innerText.toLowerCase() === obj.type.split("-")[1].toLowerCase()); if (mt2){mt2.click();}
// name
name.inputElem.value = obj.name;

div.dataset.data = JSON.stringify(obj); createModList(mdl,obj); createPreview(prev,obj);

}// if obj

return div
}

function addStyleList(p,type){ let d = getDataset("mcRightDiv","data");
    // console.log("-",p,type); console.log(d[1][type])
    while (p.childNodes.length > 0){p.childNodes[0].remove();}
    let list = mlStyles;
    for (var i=0; i<list.length; i++){ let l = list[i]; let op = document.createElement("div"); op.className = "mlsdDiv"; p.appendChild(op); let inp = document.createElement("input"); op.appendChild(inp); let tx = document.createElement("span"); tx.innerText = l.name; op.appendChild(tx); op.dataset.data = JSON.stringify(l); if ("placeholder" in l){inp.placeholder = l.placeholder}
        let f = d[1][type].find(x => x.type === l.style);
            if (f){op.dataset.data = JSON.stringify(f); inp.value = f.val}
            inp.onkeyup = function(){getModOptions()}
    }
}
    function getStyleList(){ let d = getDataset("mcRightDiv","data"); let sld = document.getElementById("mcStyleList"); let lis = [];
        for (var i=0; i<sld.childNodes.length;i++){ let dc = sld.childNodes[i]
            if (dc.childNodes[0].value.length > 0){ let or = JSON.parse(dc.dataset.data); or.val = dc.childNodes[0].value; lis.push(or);}}
        d[1][d[1]["focus"]] = lis; d[0].dataset.data = JSON.stringify(d[1]);
    }

function createModList(p,obj){ let t = obj.type.split("-"); while (p.childNodes.length > 0){p.childNodes[0].remove()}
console.log("428",obj)

if (t[0] === "input"){ // placeholder, default value, range/num: max,min,step
let pldvC = document.createElement("div"); pldvC.style = "display: flex; width: 100%;"; p.appendChild(pldvC)
   let pl = createInput(inpList.find(x => x.id === "mcPlaceholder")); pldvC.appendChild(pl);
   let dv = createInput(inpList.find(x => x.id === "mcDefaultVal")); pldvC.appendChild(dv);
        if (t[1] === "color"){pl.remove()}
        if (t[1] === "textarea"){let rs = createInput(inpList.find(x => x.id === "mcResize")); p.appendChild(rs);}
   if (t[1] === "range" || t[1] === "number"){ // MAX MIN STEP
       let mx = createInput(inpList.find(x => x.id === "mcMax")); pldvC.appendChild(mx);
       let mn = createInput(inpList.find(x => x.id === "mcMin")); pldvC.appendChild(mn);
       if (t[1] === "range"){ let sp = createInput(inpList.find(x => x.id === "mcStep")); pldvC.appendChild(sp); pl.remove();}
        }
}
else if (t[0] === "dropdown"){ // options
    let op = createDropdown(dpList.find(x => x.id === "mcOptions")); p.appendChild(op)
}
else if (t[0] === "table"){ // table
    let rcC = document.createElement("div"); rcC.style = "display: flex; width: 100%;"; p.appendChild(rcC);
    let tbR = inpList.find(x => x.id === "mcRows"); rcC.appendChild(createInput(tbR))
    let tbC = inpList.find(x => x.id === "mcCols"); rcC.appendChild(createInput(tbC))

    if (t[1] === "expandable"){
    let tbE = dpList.find(x => x.id === "mctExpandable"); rcC.appendChild(createDropdown(tbE))
        let dtbe = document.getElementById("mctExpandable");
        if (obj.expand){Array.from(dtbe.listElem.childNodes).find(x => x.innerText === obj.expand).click();} else {dtbe.listElem.childNodes[0].click();}}
        let dtbr = document.getElementById("mcRows"); if (dtbr !== null && obj.rows){dtbr.value = obj.rows;}
        let dtbc = document.getElementById("mcCols"); if (dtbc !== null && obj.cols){dtbc.value = obj.cols;}

let tbd = document.createElement("div"); tbd.id = "mcTableOptionsDiv"; p.appendChild(tbd);
    let js = {rows: 2, cols: 2, table: [
            [{type: "Title", value: "Header"}, {type: "Title", value: "Header"}],
            [{type: "Input", value: "Placeholder"}, {type: "Input", value: "Placeholder"}]
            ]}; if (obj.table){js = obj}
    tbd.dataset.data = JSON.stringify(js)
    let tbdUI = document.createElement("div"); tbdUI.id = "mcTOPrev"; tbd.appendChild(tbdUI);
        let tb = createPrepTable(JSON.parse(tbd.dataset.data)); tbdUI.appendChild(tb);
    let tbdOP = document.createElement("div"); tbdOP.id = "mcTOODiv"; tbd.appendChild(tbdOP)


} else {console.log("err")}
}



function createPreview(p,obj){ while (p.childNodes.length > 0){p.childNodes[0].remove();}
    if (obj.type.includes("input-")){
        let inp = createInput(obj); p.appendChild(inp)
    }
    else if (obj.type.includes("dropdown-")){
        let dp = createDropdown(obj); p.appendChild(dp);
    }
    else if (obj.type.includes("table-")){
        let tb = createTable(obj); p.appendChild(tb);
    }
    else {console.log("wah")}

}


function mccbPopup(obj){ let c = coverDiv(document.getElementById("content"));
    let id = document.getElementById("moduleCreator").dataset.id; if (id){obj.id = id;}

let d = document.createElement("div"); d.id = "mccbPopup"; c.appendChild(d);
    let prev = document.createElement("div"); prev.id = "mccbpPrev"; d.appendChild(prev);
        createPreview(prev,obj);
    let bot = document.createElement("div"); bot.id = "mccbpBot"; d.appendChild(bot);
        let tx = document.createElement("div"); tx.id = "mccpbText";
                tx.innerText = "[" + obj.name + "] \nwas created!"; bot.appendChild(tx);
                if (obj.id){tx.innerText = "[" + obj.name + "] \nwas edited!";}
        let btnl = document.createElement("div"); btnl.id = "mccpbBList"; bot.appendChild(btnl);
            let b1 = coolButton("Create New Mod","add_circle"); btnl.appendChild(b1);
                b1.onclick = function(){c.remove(); document.getElementById("moduleCreator").parentNode.remove(); createModuleCreator("content")}
            let b2 = coolButton("Go to List","list"); btnl.appendChild(b2);
                b2.onclick = function(){c.remove(); document.getElementById("moduleCreator").parentNode.remove(); createModuleManager("content")}
            let b3 = coolButton("Close","list"); btnl.appendChild(b3);
                b3.onclick = function(){c.remove();}
if (obj.id){let ind = modList.findIndex(x => x.id === obj.id); modList[ind] = obj; saveLS();}
else {obj.id = randomUntil(5,5,modList);console.log(obj); modList.push(obj); saveLS();}
if (document.getElementById("mmBotDiv") !== null){document.getElementById("mmBotDiv").refresh();}
}


function createPackRow(obj,styleObj){
    // obj from inputRowList (data.js)
    // styleObj is the style key-value list
let m = cre("div","inputRow","display: flex;");
    if (obj.style) {m.style = obj.style;}
    if (obj.id) {m.id = obj.id}
    if (obj.className){m.className = obj.className;}
// CHILDREN
let array = []
if (obj.children){for (var i=0; i<obj.children.length; i++){ let child = obj.children[i]; let c;
    if (child.type === "opsList"){let a = child.args; c = ptCreateOps(a[0],a[1],a[2],a[3],a[4]); array.push([child.name,c]);
        let sarr = {};
            if (styleObj["fontWeight"]){sarr["fontWeight"] = styleObj["fontWeight"]}
            if (styleObj["textDecoration"]){sarr["textDecoration"] = styleObj["textDecoration"]}
            if (styleObj["fontStyle"]){sarr["fontStyle"] = styleObj["fontStyle"]}
        c.refresh(sarr)
        // how to work out?
    }
    else if (child.type.includes("input")){c = createInput(child.obj); array.push([child.name,c.inputElem]);
        if (child.name in styleObj){c.inputElem.value = styleObj[child.name];
            if (typeof styleObj[child.name] === "boolean" && child.obj.type.includes("check")){c.inputElem.checked = styleObj[child.name]}
        }}
    else if (child.type.includes("dropdown")){c = createDropdown(child.obj); array.push([child.name,c.inputElem.childNodes[0]]);
        if (child.name in styleObj){c.inputElem.value = styleObj[child.name];}}
    else {console.log("err"); return}

m.appendChild(c); c.dataset.name = child.name;
}}
    m.list = function(){let r = {}; array.map(function(x){
        if (x[1].classList.contains("opDiv")){for (key in x[1].getValue()){r[key] = x[1].getValue()[key]}}
        else if (x[1].type === "checkbox"){r[x[0]] = x[1].checked;}
        else {r[x[0]] = x[1].value}}); return r
    };
    m.refresh = function(styleList){ console.log(styleList)
        for (var x=0; x<m.childNodes.length; x++){let mr = m.childNodes[x];
            if (mr.classList.contains("opDiv")){mr.refresh(styleList);}
            else if (mr.classList.contains("inputContainer")){
                if (styleList[mr.dataset.name]){mr.inputElem.value = styleList[mr.dataset.name]}
            }  else {console.log("?")}
        }
    }

return m
}
function createPack(arr,styleObj){ // obj = [{row1}, ]
    let txld = cre("div",undefined,"display: flex; flex-direction: column;");
    let so = {}; // if (styleObj){so = styleObj} <--FIX THIS -->
        if (styleObj){so = styleObj}
    for (var i=0; i<arr.length; i++){txld.appendChild(createPackRow(arr[i],so))}
    txld.list = function(){let list = {}; for (var i=0; i<txld.childNodes.length; i++){
        let slist = txld.childNodes[i].list();
        for (key in slist){list[key] = slist[key];}
        }; return list;}
return txld
}
/*

 */




function mainStoryCreator(p){ let c = coverDiv(p);
let div = document.createElement("div"); div.id = "mStoryCreator"; c.appendChild(div)
    let title = document.createElement("div"); title.innerText = "Create Story"; div.appendChild(title); title.className = "title";
    let bot = document.createElement("div"); bot.id = "mscBottom"; div.appendChild(bot);
        let left = document.createElement("div"); left.id = "mscLeft"; bot.appendChild(left);
            let name = createInput({id: "mscTitle", type: "input-text", text: "Title", style: [{type: "width",val: "100%", affect: "parent"}]}); left.appendChild(name);
            let esc = createInput({id: "mscDesc", type: "input-textarea", text: "Description", style: [{type: "width",val: "100%", affect: "parent"},{type: "height",val: "16vh",affect: "child"}]}); left.appendChild(esc);
        let right = document.createElement("div"); right.id = "mscRight"; bot.appendChild(right);
            let opD = coolButton("Options","settings"); right.appendChild(opD);
            let cr = coolButton("Create Story","save_as"); right.appendChild(cr)

cr.onclick = function(){ let obj = {charList: [], charSheet: [], storySheet: []}
obj.title = name.inputElem.value; obj.desc = esc.inputElem.value;  obj.id = randomUntil(4,4,storyList)
    c.remove(); storyList.push(obj); saveLS();
    }

}

/* STORY Creator */
function createStoryCreator(parent,obj){ let p = pd(parent);
/* storySheet {}
.order = [] // list of items in story
    // TEXT {id: "idInOrder", type: "text", title: "Text", items: [], style: [], value: "Value"}
    // GROUP {id: "idInOrder", type: "group", title: "Group", items: [], style: []}
    // MODULE {id: "idInOrder", type: "module", title: "Module", mID: "moduleID", style: []}
 */

let c = coverDiv(p); let div = document.createElement("div"); div.id = "storyCreator"; c.appendChild(div);
let js; if (!obj){js = {order: [], id: "abcd1234"}} else {js = {order: obj.storySheet, id: obj.id}}
    div.dataset.data = JSON.stringify(js)

let d = getDataset(div,"data"); div.order = getSCOrder;
// LEFT - Hierarchy ORDER
let hd = document.createElement("div"); hd.id = "scHierarchy"; div.appendChild(hd);
    let hdl = document.createElement("div"); hdl.id = "schList"; hd.appendChild(hdl); hdl.ondragover = function(){event.preventDefault()}; hdl.ondrop = scDragDrop;
        // Actual list
    let mu = document.createElement("div"); mu.id = "schMenu"; hd.appendChild(mu);
        let tx = ic("menu"); mu.appendChild(tx);
        let pop = document.createElement("div"); pop.id = "schmPopup"; mu.appendChild(pop);
            let crb = coolButton("Create Story Sheet","save_as"); if (obj && obj.storySheet && obj.storySheet.length > 0){crb = coolButton("Edit Story Sheet","save_as")}
             crb.classList.add("schmpOption"); pop.appendChild(crb); crb.style = "border-radius: 0; width: 100%;";
                crb.onclick = function(){ if (obj){
                    obj.storySheet = getSCOrder(); let ind = storyList.findIndex(x=>x.id === obj.id); if (ind !== -1) {storyList[ind] = obj; //
                        c.remove(); saveLS();
                    }
                }}
            let addTitle = document.createElement("div"); pop.appendChild(addTitle); addTitle.style = "border-radius: 0; width: 100%; padding: 0.5em; background-color: white; text-align: center; font-weight: bold;"; addTitle.innerText = "Add Item"
            let pTx = coolButton("Text","text_format"); pTx.classList.add("schmpOption"); pop.appendChild(pTx); pTx.style = "border-radius: 0; width: 100%;";
                pTx.onclick = function(){ let it = scCreateItem("text"); hdl.appendChild(it);
                scCreatePreview(getSCOrder(),pd("scPreview"));   }
            let pGR = coolButton("Group","create_new_folder"); pGR.classList.add("schmpOption"); pop.appendChild(pGR); pGR.style = "border-radius: 0; width: 100%;";
                pGR.onclick = function(){ let it = scCreateItem("group"); hdl.appendChild(it);
                scCreatePreview(getSCOrder(),pd("scPreview"));   }
            let pMod = coolButton("Module","extension"); pMod.classList.add("schmpOption"); pop.appendChild(pMod); pMod.style = "border-radius: 0; width: 100%;";
                pMod.onclick = function(){ scModulePicker(c,d[1].order,hdl);   }
// Center - PREVIEW
let pv = document.createElement("div"); pv.id = "scPreview"; div.appendChild(pv);
// RIGHT - Style
let sd = document.createElement("div"); sd.id = "scStyleList"; div.appendChild(sd);

if (obj){scRefreshList(obj.storySheet);}
return div
}
    function scModulePicker(p,order,list){
        let c = coverDiv(p); let div = document.createElement("div"); div.id = "scModulePicker"; c.appendChild(div);
            let ti = document.createElement("div"); ti.id = "scmpTitle"; div.appendChild(ti); ti.innerText = "Select Module to Add";
            let li = document.createElement("div"); li.id = "scmpList"; div.appendChild(li);
                for (var i=0; i<modList.length; i++){
                let mod = createModuleDiv(modList[i],c); mod.childNodes[1].addEventListener("click",function(){ let slct = document.getElementById("selectedModule"); if (slct !== null){
                    let m = scCreateItem("module",JSON.parse(slct.dataset.data)); list.appendChild(m); c.remove(); scCreatePreview(getSCOrder(),pd("scPreview"))
                }})
                li.appendChild(mod)}

    }

function scCreateItem(type,obj){ let d = getDataset("storyCreator","data"); let o; let iconName = ""; // console.log(type,obj)
if (!obj){
    if (type === "text"){o = {id: randomUntil(4,4,d[1].order), type: "text", title: "Text", style: {value: "Text"}};
    }
    if (type === "group"){o = {id: randomUntil(4,4,d[1].order), type: "group", title: "Group", style: {}, items: []};
    }
} else if (obj && type === "module") { //console.log("576",obj)
    if (obj.style && !obj.type.includes("-")) {o = obj}
    else {o = {id: randomUntil(4,4,d[1].order), type: "module", title: obj.name, mID: obj.id, style: []}}
} else if (obj){o = obj;}
else {return false}
    if (type === "text"){iconName = "text_format"}
    if (type === "group"){iconName = "folder"}
let i = document.createElement("div"); i.dataset.data = JSON.stringify(o); i.className = "scModule";
    if (type === "module"){ iconName = "extension";}
    if (type === "group"){i.ondblclick =function(){
        if (i.nextSibling && i.nextSibling.className === "scmBody"){i.nextSibling.remove();}
        else { let body = document.createElement("div"); body.className = "scmBody"; i.after(body); let o = JSON.parse(i.dataset.data); if (o && o.items){
        for (var x=0; x<o.items.length; x++){body.appendChild(scCreateItem(o.items[x].type,o.items[x]));}};
         body.ondragover = function(){event.preventDefault()}; body.ondrop = scDragDrop; body.dataset.id = o.id;
        }
    }; i.ondragover = function(){event.preventDefault()}; i.ondrop = scDragDrop;}
    let icon = ic(iconName); i.appendChild(icon);
    let inpD = document.createElement("div"); inpD.className = "scmInpDiv"; i.appendChild(inpD);
        let ip = document.createElement("input"); i.appendChild(ip);
            ip.onkeyup = function(){let newTitle = ip.value; let dd = getDataset(i,"data"); dd[1].title = ip.value; dd[0].dataset.data = JSON.stringify(dd[1]);}
            if (o.title){ip.value = o.title;}
    i.addEventListener("click",function(){ scCreateStyleList(i); selectDiv("scOpenItem","stay"); if (document.getElementById("scContextMenu") !== null){pd("scContextMenu").remove()}});
    /* DRAGGABLE */
    i.draggable = true; i.ondragstart = scDragStart;
    /* onContextMEnu */
    i.oncontextmenu = function(){event.preventDefault(); scContextMenu(o);}
        return i;
}




function scCreateStyleList(elem){ let p = pd("scStyleList"); while (p.childNodes.length >0){p.childNodes[0].remove();};
    function scSLSave(){ let sl = getSCstyleList(); let d = getDataset(elem,"data"); d[1].style = sl; d[0].dataset.data = JSON.stringify(d[1]);
            let newOrder = save_item(d[1].id,d[1],getSCOrder())
        let sp = pd("scPreview"); while (sp.childNodes.length >0){sp.childNodes[0].remove()}
        scCreatePreview(newOrder,sp)
    }

    let obj = JSON.parse(elem.dataset.data); p.itemID = obj.id; p.parentNode.parentNode.itemID = p.itemID;
    if (obj.type === "text"){
let title = document.createElement("div"); title.className = "slTitle"; title.innerText = "Text Options"; p.appendChild(title);
// VALUE
let vd = document.createElement("div"); vd.style = "display: flex; padding: 1em 1em 0 1em;"; p.appendChild(vd);
    let sv = createInput(inpList.find(x => x.id === "slValue")); vd.appendChild(sv);
// FONT FAMILY / SIZE
let ffsD = document.createElement("div"); ffsD.style = "display: flex; padding: 0 1em;"; p.appendChild(ffsD);
    let ffsDFf = createInput(inpList.find(x => x.id === "slFontFamily")); ffsD.appendChild(ffsDFf);
    let ffsDFs = createInput(inpList.find(x => x.id === "slFontSize")); ffsD.appendChild(ffsDFs);

// FONT COLOR, WHEEL
let fcwD = document.createElement("div"); fcwD.style = "display: flex; padding: 0 1em"; p.appendChild(fcwD);
    let fcwDFc = createInput(inpList.find(x => x.id === "slFontColor")); fcwD.appendChild(fcwDFc);
    let fcwDCw = createInput(inpList.find(x => x.id === "slColorWheel")); fcwD.appendChild(fcwDCw);
        fcwDCw.inputElem.id = "";
        fcwDCw.oninput = function(){fcwDFc.inputElem.value = fcwDCw.inputElem.value; scSLSave()}
        fcwDFc.oninput = function(){fcwDCw.inputElem.value = fcwDFc.inputElem.value; scSLSave()}
// ALIGN TEXT
let atd = document.createElement("div"); atd.style = "display: flex; padding: 0 1em;"; p.appendChild(atd);
    let at = createInput(inpList.find(x => x.id === "slAlignText")); atd.appendChild(at);
// BIU
let biu = ptCreateOps([ {icon: "format_bold", value: {fontWeight: "bold"}}, {icon: "format_italic", value: {fontStyle: "italic"}}, {icon: "format_underlined", value: {textDecoration: "underline"}}],"multi",function(){ scSLSave() }); p.appendChild(biu); biu.style.margin = "0 1em 0 1em"; biu.style.width = "calc(100% - 2em)"; biu.style.borderWidth = "2px"; biu.id = "slBIU"

pd("slValue").onkeyup = scSLSave; pd("slFontFamily").onkeyup = scSLSave; pd("slFontSize").onkeyup = scSLSave; pd("slFontColor").onkeyup = scSLSave; pd("slAlignText").onkeyup = scSLSave;

// IF Opening IN
if (obj.style){ let styleL = obj.style
if (styleL.value){pd("slValue").value = styleL.value;}
if (styleL.fontFamily){pd("slFontFamily").value = styleL.fontFamily;}
if (styleL.fontSize){pd("slFontSize").value = styleL.fontSize;}
if (styleL.color){pd("slFontColor").value = styleL.color; fcwDCw.inputElem.value = styleL.color;}
if (styleL.textAlign){pd("slAlignText").value = styleL.textAlign;}
    if (styleL.fontWeight){biu.childNodes[0].click();}
    if (styleL.fontStyle){biu.childNodes[1].click();}
    if (styleL.textDecoration){biu.childNodes[2].click();}
}
    } else if (obj.type === "group"){
let title = document.createElement("div"); title.className = "slTitle"; title.innerText = "Group Options"; p.appendChild(title);
// Child - Alignment
let ald = document.createElement("div"); ald.style = "display: flex; padding: 1em;"; p.appendChild(ald);
    let dpAl = dpList.find(x => x.id === "slgAlignment"); dpAl.fList.click = scSLSave;
    let al = createDropdown(dpAl); ald.appendChild(al);
    if (obj.style && obj.style["childAlignment"]){Array.from(al.listElem.childNodes).find(x => x.innerText === obj.style["childAlignment"]).click()} else {al.listElem.childNodes[0].click();}

    } else if (obj.type === "module"){
let title = document.createElement("div"); title.className = "slTitle"; title.innerText = "Module Options"; p.appendChild(title);
        console.log("?")
    } else {console.log("error"); return}
// REST OF MODULES -- wdith, hieght, padding, margin, background color
let mLis = document.createElement("div"); p.appendChild(mLis); mLis.style = "padding: 1em;";
    let mhd = document.createElement("div"); mhd.style = "display: flex;"; mLis.appendChild(mhd);
        let mWidth = createInput(inpList.find(x => x.id === "slWidth")); mhd.appendChild(mWidth); mWidth.style.marginRight = "1em"
        let mHeight = createInput(inpList.find(x => x.id === "slHeight")); mhd.appendChild(mHeight);
    let pmDiv = document.createElement("div"); mLis.appendChild(pmDiv); pmDiv.style = "display: flex;";
        let mPadding = createInput(inpList.find(x => x.id === "slPadding")); pmDiv.appendChild(mPadding); mPadding.style.marginRight = "1em"
        let mMargin = createInput(inpList.find(x => x.id === "slMargin")); pmDiv.appendChild(mMargin);
    let bgDiv = document.createElement("div"); bgDiv.style = "display: flex;"; mLis.appendChild(bgDiv)
        let mBG = createInput(inpList.find(x => x.id === "slBackgroundCol")); bgDiv.appendChild(mBG);
        let mWh = createInput(inpList.find(x => x.id === "slColorWheel")); bgDiv.appendChild(mWh);
        mWh.inputElem.id = ""; mWh.oninput = function(){mBG.inputElem.value = mWh.inputElem.value; scSLSave()}
        mBG.oninput = function(){mWh.inputElem.value = mBG.inputElem.value; scSLSave()}
pd("slWidth").onkeyup = scSLSave; pd("slHeight").onkeyup = scSLSave; pd("slPadding").onkeyup = scSLSave; pd("slMargin").onkeyup = scSLSave; pd("slBackgroundCol").onkeyup = scSLSave;


let styleL = obj.style; if (styleL){
    if (styleL.width){pd("slWidth").value = styleL.width;}
    if (styleL.height){pd("slHeight").value = styleL.height;}
    if (styleL.padding){pd("slPadding").value = styleL.padding;}
    if (styleL.margin){pd("slMargin").value = styleL.margin;}
    if (styleL.backgroundColor){pd("slBackgroundCol").value = styleL.backgroundColor; mWh.inputElem.value = styleL.backgroundColor;}}


}

function getSCstyleList(){ let list = {};
    // TEXT
let vl = pd("slValue"); if (vl !== null && vl.value.length > 0){list["value"] = vl.value} /* value */
let ff = pd("slFontFamily"); if (ff !== null && ff.value.length > 0){list["fontFamily"] = ff.value} /* font family */
let fs = pd("slFontSize"); if (fs !== null && fs.value.length > 0){list["fontSize"] = fs.value} /* font size */
let fc = pd("slFontColor"); if (fc !== null && fc.value.length > 0){list["color"] = fc.value} /* font size */
let ta = pd("slAlignText"); if (ta !== null && ta.value.length > 0){list["textAlign"] = ta.value} /* text align */
/* GROUP */
let ag = pd("slgAlignment"); if (ag !== null && ag.inputElem.childNodes.length > 0){list["item-alignment"] = ag.inputElem.childNodes[0].innerText} /* text align */
// BIU
let biu = pd("slBIU"); if (biu !== null){ let biuD = JSON.parse(biu.dataset.data)
    for (key in biuD){list[key] = biuD[key]}
}
// ALL
let wd = pd("slWidth"); if (wd !== null && wd.value.length > 0){list["width"] = wd.value}
let ht = pd("slHeight"); if (ht !== null && ht.value.length > 0){list["height"] = ht.value}
let pa = pd("slPadding"); if (pa !== null && pa.value.length > 0){list["padding"] = pa.value}
let ma = pd("slMargin"); if (ma !== null && ma.value.length > 0){list["margin"] = ma.value}
let bc = pd("slBackgroundCol"); if (bc !== null && bc.value.length > 0){list["backgroundColor"] = bc.value}
return list
}

function getSCOrder(){ let l = pd("schList"); let lis = Array.from(l.childNodes).filter(x => x.classList.contains("scModule"));
let arr = []; for (var i=0; i<lis.length; i++){arr.push(JSON.parse(lis[i].dataset.data))}
return arr
}



function scCreatePreview(arr,p){
    if (p.id === "scPreview"){while (p.childNodes.length > 0){p.childNodes[0].remove();}}
for (var i=0; i<arr.length; i++){ let mod = arr[i]; //console.log(mod);
        let div = document.createElement("div"); div.dataset.data = JSON.stringify(mod); div.dataset.id = mod.id;
            if (mod.style){ for (key in mod.style){
                if (key === "value"){div.innerText = mod.style[key]}
                else {div.style[key] = mod.style[key]}
            }}
            p.appendChild(div)
    if (mod.type === "text") { //console.log("text")
    } else if (mod.type === "group"){ if (mod.items){
        scCreatePreview(mod.items,div);
        if (mod.style["item-alignment"] && mod.style["item-alignment"] === "Horizontal"){
            div.style.display = "flex"; div.style.alignItems = "baseline";}
    }

    } else if (mod.type === "module"){ let module; let obj = modList.find(x => x.id === mod.mID);
        if (obj.type.includes("input")){module = createInput(obj)}
        if (obj.type.includes("dropdown")){module = createDropdown(obj)}
        if (obj.type.includes("table")){module = createTable(obj)}
            div.appendChild(module)
    } else {console.log("err"); return []}
} if (getSCOrder().length > 0){ let sc = getDataset("storyCreator","data"); sc[1].order = getSCOrder(); sc[0].dataset.data = JSON.stringify(sc[1]); }
}


function scContextMenu(obj){
let m = document.getElementById("scContextMenu"); if (m !== null) {if (obj.id === JSON.parse(m.dataset.data).id){m.remove(); return}; m.remove();} // MOVE
    let tg = event.currentTarget; let tgcr = tg.getBoundingClientRect(); tg.click();

 // create
m = document.createElement("div"); m.id = "scContextMenu"; pd("storyCreator").appendChild(m); m.dataset.data = JSON.stringify(obj)
    let row1 = document.createElement("div"); row1.className = "sccmRow"; m.appendChild(row1);
        let up = iconButton("","arrow_drop_up"); row1.appendChild(up); up.dataset.data = "Move Up";
    let row3 = document.createElement("div"); row3.className = "sccmRow"; m.appendChild(row3);
        let down = iconButton("","arrow_drop_down"); row3.appendChild(down); down.dataset.data = "Move Down";
    let row2 = document.createElement("div"); row2.className = "sccmRow"; m.appendChild(row2);
        let tr = iconButton("","delete"); row2.appendChild(tr); tr.dataset.data = "Delete Item";

up.onclick = function(){ let order = getSCOrder(); let index = get_index("id",obj.id,order,"items")
    let slct = pd("scOpenItem"); let prev = slct.previousSibling;
    if (prev !== null && prev.classList.contains("scModule")){
        if (slct.parentNode.id === "schList" && prev.parentNode.id === "schList"){
            if (slct.nextSibling !== null && slct.nextSibling.classList.contains("scmBody")){slct.ondblclick()}
            slct.after(prev); scCreatePreview(getSCOrder(),pd("scPreview"))
        }
        else { let ds = getDataset(slct,"data"); let dp = getDataset(prev,"data");
            slct.after(prev); let items = [];
                for (var i=0; i<slct.parentNode.childNodes.length; i++){items.push(JSON.parse(slct.parentNode.childNodes[i].dataset.data))}
                let pID = slct.parentNode.dataset.id;
            let order = getSCOrder(); let index = get_index("id",JSON.parse((scGetElemParentsList(prev)).at(-1).dataset.data).id,order,"items"); index.pop()
            for (var i=0; i<items.length; i++){scMoveItem(order,index,items[i])}
            scRefreshList(order,index)
        }
    } else if (prev !== null && prev.classList.contains("scmBody")){
        prev.previousSibling.ondblclick(); up.click();
    } else {console.log("err",slct,prev); return}
}; down.onclick = function(){let order = getSCOrder(); let index = get_index("id",obj.id,order,"items")
        let slct = pd("scOpenItem"); let next = slct.nextSibling;
        if (next !== null && next.classList.contains("scModule")){
            if (slct.parentNode.id === "schList" && next.parentNode.id === "schList"){
                if (slct.previousSibling !== null && slct.previousSibling.classList.contains("scmBody")){slct.ondblclick()}
                slct.after(next); scCreatePreview(getSCOrder(),pd("scPreview"))
            }
            else { let ds = getDataset(slct,"data"); let dp = getDataset(next,"data");
                slct.after(next); let items = [];
                for (var i=0; i<slct.parentNode.childNodes.length; i++){items.push(JSON.parse(slct.parentNode.childNodes[i].dataset.data))}
                let pID = slct.parentNode.dataset.id;
                let order = getSCOrder(); let index = get_index("id",JSON.parse((scGetElemParentsList(next)).at(-1).dataset.data).id,order,"items"); index.pop()
                for (var i=0; i<items.length; i++){scMoveItem(order,index,items[i])}
                scRefreshList(order,index)
            }
        } else if (next !== null && next.classList.contains("scmBody")){
            next.nextSibling.ondblclick(); up.click();
        } else {console.log("err",slct,next); return}

    }; tr.onclick = function(){
    let order = getSCOrder(); let del = obj.id; let index = get_index("id",obj.id,order,"items"); index.pop(); let pt = get_item(index,order);
    if (del === pt.id){order = deleteItem("MAIN",del,order); }
    else {order = deleteItem(pt.id,del,order);}
    scRefreshList(order,index)
};
    m.style.top = (tgcr.y+tgcr.height) + "px"

pd("content").onclick = function(){ if (!event.currentTarget.classList.contains("scModule")){m.remove(); pd("content").onclick = null}; tg.id = "";}
}


/* COMPONENT CREATOR */
function sheetCreator(parent,obj){ let p = parent; let cd = coverDiv(p); let div = document.createElement("div"); div.id = "sheetCreator"; cd.appendChild(div)

let l = document.createElement("div"); l.id = "shLeft"; div.appendChild(l);
    let list = document.createElement("div"); list.id = "shList"; l.appendChild(list); // LIST OF ITEMS
    let md = document.createElement("div"); md.id = "shMenuDiv"; l.appendChild(md);
        let mBar = document.createElement("div"); mBar.id = "shmBar"; md.appendChild(mBar);
            let mbic = ic("menu"); mBar.appendChild(mbic);
        let mp = document.createElement("div"); mp.id = "shmPopup"; md.appendChild(mp);
            let m = createMenu(menuList.find(x => x.id === "shMenu")); mp.appendChild(m);

let c = document.createElement("div"); c.id = "shPreview"; div.appendChild(c);


let r = document.createElement("div"); r.id = "shStyleDiv"; div.appendChild(r);

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
function createStyleTitle(text,style){
let title = document.createElement("div"); title.className = "titleDiv"; title.innerText = text;
    if (style){title.style = style;}
return title
}







function shCreatePreview(arr,p){
    if (p.id === "shPreview"){while (p.childNodes.length > 0){p.childNodes[0].remove();}}
    for (var i=0; i<arr.length; i++){ let mod = arr[i]; //console.log(mod);
        let div = document.createElement("div"); div.dataset.data = JSON.stringify(mod); div.dataset.id = mod.id;
        if (mod.style){ for (key in mod.style){
            if (key === "value"){div.innerText = mod.style[key]}
            else {div.style[key] = mod.style[key]}
        }}
        p.appendChild(div)
        if (mod.type === "text") { //console.log("text")
        } else if (mod.type === "group"){ if (mod.items){
            scCreatePreview(mod.items,div);
            if (mod.style["item-alignment"] && mod.style["item-alignment"] === "Horizontal"){
                div.style.display = "flex"; div.style.alignItems = "baseline";}     }
        } else if (mod.type === "flipcard"){ let flip = createFlipcard(mod); div.appendChild(flip);
        } else if (mod.type.includes("bar")) { let bar = createBar(mod); div.appendChild(bar);
        } else {console.log("err"); return [];}
    } if (getSHOrder().length > 0){ let sc = getDataset("sheetCreator","data"); sc[1].order = getSHOrder(); sc[0].dataset.data = JSON.stringify(sc[1]); }
}


function shCreateItem(type,obj){
    if (type && !obj){ // CREATE NEW
        if (type === "flipcard"){
            obj = {type: "flipcard", title: "Flipcard", cards: [
                {name: "Front", style: {value: "Title", alignItems: "center", justifyContent: "center", fontWeight: "bold"}}, {name: "Back", style: {value: "This is sample text for the back."}}
            ], style: {width: "200px", height: "200px", border: "1px solid black", padding: "5px"}};
        }
        if (type.includes("bar")){
            obj = {type: "bar", start: "1", end: "10", value: "5", title: "Bar",
                leftText: {fontSize: "22px", fontFamily: "Calibri", showVal: true, color: "#efefef", value: "Left", padding: ""},
                rightText: {fontSize: "22px", fontFamily: "Calibri", showVal: true, color: "#efefef", value: "Right", padding: ""},
                tracker: {fontSize: "22px", fontFamily: "Calibri", showVal: true, color: "#5165ea", value: "5", padding: "0.5em", borderRadius: 0, border: "2px solid black"},
                container: {backgroundColor: "#000000", width: "100%", height: "30px"}
            }
        }
        if (type === "component"){
            obj = {type: "component", title: "Component", style: {}, cID: "abcd1234",
                options: []
            }
        }
        if (type === "text"){ obj = {type: "text", title: "Text", style: {value: "Text"}};}
        if (type === "group"){ obj = {type: "group", title: "Group", style: {}, items: []};}
        obj.id = randomUntil(4,4,getSHOrder())
    } else if (obj){
        //console.log("exists",obj)
    } else {console.log("Err"); return false}
    let i = document.createElement("div"); i.dataset.data = JSON.stringify(obj); i.className = "shModule"; let iconName = "";

    if (obj.type === "text"){iconName = "text_format"}
    if (obj.type === "group"){iconName = "folder"}
    if (obj.type === "flipcard"){ iconName = "view_agenda";}
    if (obj.type.includes("bar")){iconName = "linear_scale"}
    if (obj.type === "component"){iconName = "inventory_2"}
    if (obj.type === "group"){i.ondblclick = function(){
        if (i.nextSibling && i.nextSibling.className === "shBody"){i.nextSibling.remove();}
        else { let body = document.createElement("div"); body.className = "shBody"; i.after(body); let o = JSON.parse(i.dataset.data); if (o && o.items){
        for (var x=0; x<o.items.length; x++){body.appendChild(shCreateItem(o.items[x].type,o.items[x]));}};
         body.ondragover = function(){event.preventDefault()}; body.ondrop = scDragDrop; body.dataset.id = o.id;
        }
    }; i.ondragover = function(){event.preventDefault()}; i.ondrop = scDragDrop;}
    let icon = ic(iconName); i.appendChild(icon);
    let inpD = document.createElement("div"); inpD.className = "shInpDiv"; i.appendChild(inpD);
        let ip = document.createElement("input"); i.appendChild(ip);
            ip.onkeyup = function(){let newTitle = ip.value; let dd = getDataset(i,"data"); dd[1].title = ip.value; dd[0].dataset.data = JSON.stringify(dd[1]);}
            if (obj.title){ip.value = obj.title;}
    i.addEventListener("click",function(){
        //console.log("WAH",obj)
        shStyleList(i,obj)
    }); i.js = function(){return obj}
    /* DRAGGABLE */
    i.draggable = true; i.ondragstart = scDragStart;
    /* onContextMEnu */
    //i.oncontextmenu = function(){event.preventDefault(); scContextMenu(o);}
        return i;
}


function getSHOrder(){
    let l = pd("shList");
    let lis = Array.from(l.childNodes).filter(x => x.classList.contains("shModule"))

    let arr = []; for (var i=0; i<lis.length; i++){arr.push(JSON.parse(lis[i].dataset.data))}
    return arr
}


function getSHstyleList(){ let list = {};
    // TEXT
let vl = pd("shValue"); if (vl !== null && vl.value.length > 0){list["value"] = vl.value} /* value */
let ff = pd("shFontFamily"); if (ff !== null && ff.value.length > 0){list["fontFamily"] = ff.value} /* font family */
let fs = pd("shFontSize"); if (fs !== null && fs.value.length > 0){list["fontSize"] = fs.value} /* font size */
let fc = pd("shFontColor"); if (fc !== null && fc.value.length > 0){list["color"] = fc.value} /* font size */
let ta = pd("shAlignText"); if (ta !== null && ta.value.length > 0){list["justifyContent"] = ta.value} /* text align */
let pt = pd("shPositionText"); if (pt !== null && pt.value.length > 0){list["alignItems"] = pt.value} /* text align */
/* GROUP */
let ag = pd("shgAlignment"); if (ag !== null && ag.inputElem.childNodes.length > 0){list["item-alignment"] = ag.inputElem.childNodes[0].innerText} /* text align */
// BIU
let biu = pd("shBIU"); if (biu !== null){ let biuD = biu.dataset.data
        for (key in biuD){list[key] = biuD[key]}
}


// ALL
if (document.getElementById("shNormalOptions") !== null){
    list = document.getElementById("shNormalOptions").list()
}
else {
let wd = pd("shWidth"); if (wd !== null && wd.value.length > 0){list["width"] = wd.value}
let ht = pd("shHeight"); if (ht !== null && ht.value.length > 0){list["height"] = ht.value}
let pa = pd("shPadding"); if (pa !== null && pa.value.length > 0){list["padding"] = pa.value}
let ma = pd("shMargin"); if (ma !== null && ma.value.length > 0){list["margin"] = ma.value}
let bc = pd("shBackgroundCol"); if (bc !== null && bc.value.length > 0){list["backgroundColor"] = bc.value}
let bd = pd("shBorder"); if (bd !== null && bd.value.length > 0){list["border"] = bd.value}
}
//console.log(list)
return list
}
function shStyleList(elem,obj){ let ed = getDataset(elem,"data"); let div = document.getElementById("shStyleList"); if (div !== null) {while(div.childNodes.length > 0){div.childNodes[0].remove()}} else {div = document.createElement("div"); div.id = "shStyleList";}
    pd("shStyleDiv").appendChild(div); div.itemID = JSON.parse(elem.dataset.data).id; div.parentNode.parentNode.itemID = div.itemID;
    function shSLSave(){
        let sl = getSHstyleList();
        let d = getDataset(elem,"data");

        d[1].style = sl; d[0].dataset.data = JSON.stringify(d[1]);
        let newOrder = save_item(d[1].id,d[1],getSHOrder());
     let sp = pd("shPreview"); shRefreshList(newOrder,get_index("id",d[1].id,newOrder),d[1].id);
        let item = get_item(get_index("id",d[1].id,getSHOrder()),getSHOrder());
        /* console.log(item); */ return item
     }
//console.log(elem,obj)

    let hlp = createStyleTitle("VARIABLES Help","background-color: black; color: white; cursor: pointer"); div.appendChild(hlp);
    // FLIPCARD
    if (obj.type === "flipcard"){
    let ft = createStyleTitle("Flipcard Options"); div.appendChild(ft);
        let flipSelectDiv = document.createElement("div"); flipSelectDiv.style = "padding: 0.5em; border: 3px solid black; border-radius: 2px; margin: 0.25em;"; div.appendChild(flipSelectDiv)
        let cf = document.createElement("div"); cf.id = "shsFlipSelect"; flipSelectDiv.appendChild(cf); cf.innerText = obj.cards[0].name; cf.dataset.data = JSON.stringify({id: 0, cards: obj.cards});
            cf.onclick = function(){ let cfd = getDataset(cf,"data");
                let newID = cfd[1].id+1; if (cfd[1].cards.length-1 < newID){newID = 0;};
                cfd[1].id = newID; cf.dataset.data = JSON.stringify(cfd[1]);
                let newSt = cfd[1].cards[newID].style;
                    //console.log(newSt)//
                    let v = pd("shfsValue"); if ("value" in newSt){v.value = newSt.value} else {v.value = ""}
                    let bc = pd("shfsBackgroundCol"); if ("backgroundColor" in newSt){bc.value = newSt.backgroundColor;} else {bc.value = ""}
                    let fc = pd("shfsFontColor"); if ("color" in newSt){fc.value = newSt.color} else {fc.value = ""}
                    let ff = pd("shfsFontFamily"); if ("fontFamily" in newSt){ff.value = newSt.fontFamily} else {ff.value = ""}
                    let fs = pd("shfsFontSize"); if ("fontSize" in newSt){fs.value = newSt.fontSize} else {fs.value = ""}
                    let at = pd("shfsAlignText"); if ("justifyContent" in newSt){at.value = newSt.justifyContent} else {at.value = ""}
                    let pt = pd("shfsPositionText"); if ("alignItems" in newSt){pt.value = newSt.alignItems} else {pt.value = ""}
                    let biu = pd("shfsBIU"); let biuS = {};
                        if (newSt["fontWeight"]){biuS["fontWeight"] = "bold"}
                        if (newSt["textDecoration"]){biuS["textDecoration"] = "underline"}
                        if (newSt["fontStyle"]){biuS["fontStyle"] = "italic"}
                    biu.refresh(biuS)
                cf.innerText = obj.cards[newID].name; let item = shSLSave();
                    let idNum = JSON.parse(elem.dataset.data).cards.findIndex(x => x.name === cf.innerText);        //console.log(idNum,elem);

            };
            // CF OPTIONS
            /* value, bg color, font color, font family, font size, padding, text align, text position */
            let fv = createInput(inpList.find(x=>x.id==="slValue")); fv.inputElem.id = "shfsValue"; fv.style.padding = "0.25em 0"; flipSelectDiv.appendChild(fv);
            let bgfcd = document.createElement("div"); bgfcd.style = "display: flex"; flipSelectDiv.appendChild(bgfcd);
                let bgd = document.createElement("div"); bgd.style = "margin-bottom: 0.25em; display: flex; width: 50%; margin-right: 0.25em;"; bgfcd.appendChild(bgd);
                    let bg = createInput(inpList.find(x=>x.id==="slBackgroundCol")); bgd.appendChild(bg); bg.inputElem.id = "shfsBackgroundCol"; bg.childNodes[1].innerText = "Card Color"
                    let bgcol = createInput(inpList.find(x=>x.id==="slColorWheel")); bgd.appendChild(bgcol); bgcol.inputElem.style.padding = "0"
                    bgcol.inputElem.oninput = function(){bg.inputElem.value = bgcol.inputElem.value;}
                let fcd = document.createElement("div"); fcd.style = "margin-bottom: 0.25em; display: flex; width: 50%; margin-right: 0.25em;"; bgfcd.appendChild(fcd);
                    let fc = createInput(inpList.find(x=>x.id==="slBackgroundCol")); fcd.appendChild(fc); fc.inputElem.id = "shfsFontColor"; fc.childNodes[1].innerText = "Font Color"
                    let fcc = createInput(inpList.find(x=>x.id==="slColorWheel")); fcd.appendChild(fcc); fcc.inputElem.style.padding = "0"
                    fcc.inputElem.oninput = function(){fc.inputElem.value = fcc.inputElem.value;}
            let fffs = document.createElement("div"); fffs.style = "display: flex"; flipSelectDiv.appendChild(fffs);
                let ff = createInput(inpList.find(x=>x.id==="slFontFamily")); ff.inputElem.id = "shfsFontFamily"; fffs.appendChild(ff);
                let fs = createInput(inpList.find(x=>x.id==="slFontSize")); fs.inputElem.id = "shfsFontSize"; fffs.appendChild(fs); fs.style.width = "6rem"
            let alg = document.createElement("div"); alg.style = "display: flex;"; flipSelectDiv.appendChild(alg);
                let ta = createInput(inpList.find(x=>x.id==="slAlignText")); ta.inputElem.id = "shfsAlignText"; alg.appendChild(ta); ta.style.marginRight = "0.5em";
                let pos = createInput(inpList.find(x=>x.id==="slAlignText")); pos.inputElem.id = "shfsPositionText"; alg.appendChild(pos); pos.childNodes[1].innerText = "Text Position"; pos.inputElem.placeholder = "Ex. Top, Center, Bottom";
            let biu = ptCreateOps([ {icon: "format_bold", value: {fontWeight: "bold"}}, {icon: "format_italic", value: {fontStyle: "italic"}}, {icon: "format_underlined", value: {textDecoration: "underline"}}],"multi",function(){ fsSave() }); biu.id = "shfsBIU"; flipSelectDiv.appendChild(biu);
    function fsSave(){ let styles = {};
        if (pd("shfsValue") && pd("shfsValue").value.length > 0){styles.value = pd("shfsValue").value}
        if (pd("shfsBackgroundCol") && pd("shfsBackgroundCol").value.length > 0){styles.backgroundColor = pd("shfsBackgroundCol").value}
        if (pd("shfsFontColor") && pd("shfsFontColor").value.length > 0){styles.color = pd("shfsFontColor").value}
        if (pd("shfsFontFamily") && pd("shfsFontFamily").value.length > 0){styles.fontFamily = pd("shfsFontFamily").value}
        if (pd("shfsFontSize") && pd("shfsFontSize").value.length > 0){styles.fontSize = pd("shfsFontSize").value}
        if (pd("shfsAlignText") && pd("shfsAlignText").value.length > 0){styles.justifyContent = pd("shfsAlignText").value}
        if (pd("shfsPositionText") && pd("shfsPositionText").value.length > 0){styles.alignItems = pd("shfsPositionText").value}
        if (pd("shfsBIU") !== null){ let l = getDataset("shfsBIU","data")[1];
            for (key in l){styles[key] = l[key]}
        }
        let cfd = getDataset(cf,"data");
        cfd[1].cards[cfd[1].id].style = styles;
        cfd[0].dataset.data = JSON.stringify(cfd[1]);
        ed[1].cards = cfd[1].cards; ed[0].dataset.data = JSON.stringify(ed[1])
        console.log(cfd[1],ed[1])
        shSLSave();




    //console.log(styles)
    }; fv.inputElem.onkeyup = fsSave; bg.inputElem.onkeyup = fsSave; fc.inputElem.onkeyup = fsSave; bgcol.inputElem.addEventListener("input",fsSave); fcc.inputElem.addEventListener("input",fsSave); ff.inputElem.onkeyup = fsSave; fs.inputElem.onkeyup = fsSave; ta.inputElem.onkeyup = fsSave; pos.inputElem.onkeyup = fsSave;

    }
    //BAR
    if (obj.type.includes("bar")){
        let ft = createStyleTitle("Bar Options"); div.appendChild(ft);
        // LEFT RIGHT VAL
            let mmv = createPack([inputRowList.find(x => x.i === "shMaxMinVal")], obj);
                div.appendChild(mmv);
        // TEXT
        let txArr = [
            {text: "[L] Text Options", style: "display: flex; align-items: center;",
                ic1: "custom_typography", ic2: "arrow_left", icOps: [["style",["padding","0"]]],
                id: "barLeftOption", key: "leftText"
            },
            {text: "[R] Text Options", style: "display: flex; align-items: center;",
                ic1: "custom_typography", ic2: "arrow_right", icOps: [["style",["padding","0"]]],
                id: "barRightOption", key: "rightText"
            }
        ]
        for (var i=0; i<txArr.length; i++){ let txa = txArr[i];
            let tst = createStyleTitle(txa.text,txa.style); div.appendChild(tst);
            tst.prepend(ic(txa.ic1,txa.icOps)); tst.prepend(ic(txa.ic2,txa.icOps));
            let barText12 = inputRowList.filter(x => x.i.includes("barText")).filter(x => x.i !== "barText3");
            let txp = createPack(barText12,obj[txa.key]); div.appendChild(txp); txp.id = txa.id;
        }


        let tsH = createStyleTitle("[Button] Tracker Options","border-top: 2px solid black; display: flex; align-items: center;"); div.appendChild(tsH);
            tsH.prepend(ic("switches",[["style",["padding","0"]]]));
            let barText123 = inputRowList.filter(x => x.i.includes("barText"))
            let ts = createPack(barText123,obj.tracker); div.appendChild(ts);
                let parentRow = Array.from(ts.childNodes).find(x => Array.from(x.childNodes).findIndex(y => y.dataset.data.includes("Padding")) !== -1);
                let rem = Array.from(parentRow.childNodes).find(x => x.dataset.data.includes("Padding"));
                rem.remove()
            ts.id = "barTrackerOption";


        div.appendChild(createStyleTitle("Container Options","border-top: 2px solid black"));
    }    //COMPONENT

    //TEXT
    if (obj.type === "text"){
        // Value, FontSize, FontFamily, BIU, COLOR
        console.log("text")

    }
    //GROUP

    // REST
//let mLis = cre("div",null,"padding: 1em;"); div.appendChild(mLis)
    let mdarr = inputRowList.filter(x => x.i.includes("shNormal"))
    let md = createPack(mdarr,obj.container); div.appendChild(md);
            md.id = "shNormalOptions";

if (obj.type === "flipcard"){ let cf = pd("shsFlipSelect");
cf.onclick(); while (cf.innerText !== "Front" || (!obj.cards.find(x => x.name === "Front"))) {cf.onclick();}}

return div
}