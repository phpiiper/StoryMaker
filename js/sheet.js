/* DRAG DROP */
/*
function scDragStart(){
    // SELECT THIS
    let s = document.getElementById("selectedSCModule"); if (s !== null){s.id = ""}
    event.currentTarget.id = "selectedSCModule"
}
function scDragDrop(){ let dz = event.currentTarget; let tg = document.getElementById("selectedSCModule");
    if (dz === tg || tg === null){if (tg !== null){tg.id = "";}; return} // SAME
    let dzd = getDataset(dz,"data"); let tgd = getDataset(tg,"data");
    // TRY OTHER WAY
    let order = getSCOrder(); let dzParents = scGetElemParentsList(dz); let index = "MAIN";
    if (dz.id !== "schList") {index = get_index("id",JSON.parse(dzParents.at(-1).dataset.data).id,order,"items");}
    if (dzParents.at(-1) === tg){tg.id = ""; return} // PARENT OF TARGET

    //console.log(order,index,tgd[1])
    order = scMoveItem(order,index,tgd[1]);// console.log(order)
    // replace ALL
    scRefreshList(order,index)

    tg.id = ""
}
function scMoveItem(order,loc,obj){
    // ORDER = scOrder; loc = []ofTargetLocation; obj = movingItem
    //console.log("<--->");
    //console.log(order); console.log(loc); console.log(obj); console.log("<--->");
    console.log(order,loc,obj)
    let moveItem = obj; let miParentLoc = get_index("id",moveItem.id,order,"items"); let miParent = "MAIN"; if (miParentLoc.length > 1){miParent = get_item(miParentLoc,order).id}
    if (miParent === moveItem.id){miParentLoc.pop(); miParent = get_item(miParentLoc,order).id;}
    //console.log(moveItem.id,miParent)
    // DELETE
    order = deleteItem(miParent,moveItem.id,order);
    // ADD
    let target = "MAIN"; if (loc.length > 0 && loc !== "MAIN") {target = get_item(loc,order).id;}
    order = addItem(target,moveItem,order)
    return order
}
*/

function modDragStart(){
    let drag = event.currentTarget;
    drag.id = "selectedItem"
}
function modDragDrop(){
let target = event.target;
    if (target === null || target.parentNode === null){return}

if (target.id === "ssList"){
    console.log("WOW")
    if (pd("selectedItem").parentNode.id === "ssList"){return}
}else {
while (target !== null && target.parentNode !== null && target.id !== "ssList" && !target.parentNode.classList.contains("coverDiv") && target.parentNode.id !== "ssList" && !target.classList.contains("scmBody") && !target.classList.contains("ssModule")){ target = target.parentNode; };

if (target === null || pd("selectedItem") === null || target.id === "selectedItem" || !target.data().items){return}
}


let drag = pd("selectedItem"); let dd = drag.data(); let dl = drag.loc();



    let dpL = dl.slice(0,-1);
    let td = (target.id !== "ssList") ? target.data().id : "MAIN";
    let tl;
    if (target.classList.contains("scmBody")){
        tl = target.previousSibling.loc()
    } else if (td === "MAIN") {
        tl = "MAIN"
    } else {tl = target.loc();}

// if parent going in child
    if (dl.toString() === tl.toString()){return;}
    if (dl.toString() === tl.slice(0,-1).toString()){return;}
    //if (tl.toString() === dl.slice(0,-1).toString()){return;}

let o = pd("storySheet").order();
if (dpL.length === 0){
    dpL = "MAIN"
} else {
    dpL = get_item(dpL,o,"items").id;
}


o = deleteItem(dpL,dd.id,o,"items");
o = addItem(td,dd,o,"items")
    let new_ind = get_index("id",dd.id,o,"items");
pd("storySheet").save(o,"order"); pd("ssList").refresh();
    pd("ssList").select(new_ind);

target = null; drag = null;
}










function scRefreshList(order,index){
    while (pd("schList").childNodes.length > 0){pd("schList").childNodes[0].remove();}
    for (var i=0; i<order.length; i++){pd("schList").appendChild(scCreateItem(order[i].type,order[i]))}
    // THEN OPEN (based on index
    if (index && index !== "MAIN"){
        let p = pd("schList").childNodes[index[0]]; if (p !== null && p !== undefined && p.ondblclick){p.ondblclick()}
        for (var i=1; i<index.length; i++){
            if (p !== null && index.length > i && p.childNodes.length >= index[i]){p = p.nextSibling.childNodes[index[i]]; p.ondblclick()}
        }; /* AND SAVE PREVIEW */  }
    scCreatePreview(getSCOrder(),pd("scPreview"))
}

function shRefreshList(order,index,id){ let slct;
    while (pd("shList").childNodes.length > 0){pd("shList").childNodes[0].remove();}
    for (var i=0; i<order.length; i++){let item = shCreateItem(order[i].type,order[i]); pd("shList").appendChild(item); if (order[i].id === id){slct = item}
    }
    // THEN OPEN (based on index
    if (index && index !== "MAIN"){
        let p = pd("shList").childNodes[index[0]]; if (p !== null && p !== undefined && p.ondblclick){p.ondblclick()}
        for (var i=1; i<index.length; i++){
            if (p !== null && index.length > i && p.childNodes.length >= index[i]){p = p.nextSibling.childNodes[index[i]]; p.ondblclick()}
        }; /* AND SAVE PREVIEW */  }
    //console.log("?")
    shCreatePreview(getSHOrder(),pd("shPreview"));
}




// 1207 ELEM.js
function shBarSave(){ let style = {};
    // barStartEnd (max, min, value)
    let bse = pd("barStartEnd"); let bseV = bse.list();
    for (key in bseV){style[key] = bseV[key];}
    // barLeftOption
    let blo = pd("barLeftOption"); let bloV = blo.list();
    style["leftText"] = bloV;
    // barRightOption
    let bro = pd("barRightOption"); let broV = bro.list();
    style["rightText"] = broV;
    // tracker
    let bto = pd("barTrackerOption"); let btoV = bto.list();
    style["tracker"] = btoV;
    // CONTAINER
    let no = pd("shNormalOptions"); let noV = no.list();
    style["container"] = noV;

    let id = pd("shStyleList").itemID;
    let obj = get_item(get_index("id",id,getSHOrder(),"items"),getSHOrder());
    for (key in style){obj[key] = style[key];}
    shRefreshList(save_item(id,obj,getSHOrder(),"items"),get_index("id",id,getSHOrder(),"items"),id)
}



function SLSave(){
    let sl; let order;
    let loc = event.currentTarget;
    while (!loc.parentNode.classList.contains("coverDiv")) {loc = loc.parentNode;}
    if (loc.id === "storyCreator"){sl = getSCstyleList(); order = getSCOrder();}
    else if (loc.id === "sheetCreator"){sl = getSHstyleList(); order = getSHOrder();}
    else {console.log("WEH?"); return}

    console.log(loc.id,loc.itemID)
    let index = get_index("id",loc.itemID,order,"items");
    let elem = get_item(index,order,"items");
    console.log(elem)
    let d = getDataset(elem,"data");
    d[1].style = sl;
    d[0].dataset.data = JSON.stringify(d[1]);
    let newOrder = save_item(d[1].id,d[1],order,"items");

    shRefreshList(newOrder,get_index("id",d[1].id,newOrder),d[1].id);
    let item = get_item(get_index("id",d[1].id,order),order);
    /* console.log(item); */ return item
}

function getOrder(){ console.log("E")
    let l; let lis;
    let loc = event.currentTarget;
    while (!loc.parentNode.classList.contains("coverDiv")) {loc = loc.parentNode;}
    if (loc.id === "storyCreator"){l = pd("schList"); lis =  Array.from(l.childNodes).filter(x => x.classList.contains("scModule"));} // Creating character sheet options
    else if (loc.id === "sheetCreator"){l = pd("shList"); lis =  Array.from(l.childNodes).filter(x => x.classList.contains("shModule"));} // Creating styled sheet
    else {console.log("WEH?"); return}

    let arr = []; for (var i=0; i<lis.length; i++){arr.push(JSON.parse(lis[i].dataset.data))}
    return arr
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

/*
function  a(obj){ let div = cre("div","barDiv"); div.dataset.data = JSON.stringify(obj); console.log(obj);
    // TYPE RANGE
    let main = cre("div","barMain"); div.appendChild(main);
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
    let blockDiv = cre("div","barBlockDiv"); main.childNodes[0].after(blockDiv);
    let block = cre("div","barBlock"); blockDiv.appendChild(block);
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
    //   block.style.left = leftpos;
    //STYLES
    //
    //if (obj.style){for (key in obj.style){
    //    if (!["width","height"].includes(key)){main.style[key] = obj.style[key];}}
    //}

    return div
}
*/






/* STORY Creator */
function createStoryCreator(parent,obj){ let p = pd(parent);
    /* storySheet {}
    .order = [] // list of items in story
        // TEXT {id: "idInOrder", type: "text", title: "Text", items: [], style: [], value: "Value"}
        // GROUP {id: "idInOrder", type: "group", title: "Group", items: [], style: []}
        // MODULE {id: "idInOrder", type: "module", title: "Module", mID: "moduleID", style: []}
     */

    let c = coverDiv(p); let div = cre("div"); div.id = "storyCreator"; c.appendChild(div);
    let js; if (!obj){js = {order: [], id: "abcd1234"}} else {js = {order: obj.storySheet, id: obj.id}}
    div.dataset.data = JSON.stringify(js)

    let d = getDataset(div,"data"); div.order = getSCOrder;
// LEFT - Hierarchy ORDER
    let hd = cre("div"); hd.id = "scHierarchy"; div.appendChild(hd);
    let hdl = cre("div"); hdl.id = "schList"; hd.appendChild(hdl); hdl.ondragover = function(){event.preventDefault()}; hdl.ondrop = scDragDrop;
    // Actual list
    let mu = cre("div"); mu.id = "schMenu"; hd.appendChild(mu);
    let tx = ic("menu"); mu.appendChild(tx);
    let pop = cre("div"); pop.id = "schmPopup"; mu.appendChild(pop);
    let crb = coolButton("Create Story Sheet","save_as"); if (obj && obj.storySheet && obj.storySheet.length > 0){crb = coolButton("Edit Story Sheet","save_as")}
    crb.classList.add("schmpOption"); pop.appendChild(crb); crb.style = "border-radius: 0; width: 100%;";
    crb.onclick = function(){ if (obj){
        obj.storySheet = getSCOrder(); let ind = storyList.findIndex(x=>x.id === obj.id); if (ind !== -1) {storyList[ind] = obj; //
            c.remove(); saveLS();
        }
    }}
    let addTitle = cre("div",null,"border-radius: 0; width: 100%; padding: 0.5em; background-color: white; text-align: center; font-weight: bold;"); pop.appendChild(addTitle); addTitle.innerText = "Add Item"
    let pTx = coolButton("Text","text_format"); pTx.classList.add("schmpOption"); pop.appendChild(pTx); pTx.style = "border-radius: 0; width: 100%;";
    pTx.onclick = function(){
        let it = scCreateItem("text"); hdl.appendChild(it);
        scCreatePreview(getSCOrder(),pd("scPreview"));
    }
    let pGR = coolButton("Group","create_new_folder"); pGR.classList.add("schmpOption"); pop.appendChild(pGR); pGR.style = "border-radius: 0; width: 100%;";
    pGR.onclick = function(){
        let it = scCreateItem("group"); hdl.appendChild(it);
        scCreatePreview(getSCOrder(),pd("scPreview"));
    }
    let pMod = coolButton("Module","extension"); pMod.classList.add("schmpOption"); pop.appendChild(pMod); pMod.style = "border-radius: 0; width: 100%;";
    pMod.onclick = function(){
        scModulePicker(c,d[1].order,hdl);
    }
// Center - PREVIEW
    let pv = cre("div"); pv.id = "scPreview"; div.appendChild(pv);
// RIGHT - Style
    let sd = cre("div"); sd.id = "scStyleList"; div.appendChild(sd);

    if (obj){scRefreshList(obj.storySheet);}
    return div
}


function createStorySheet(parent,obj){
let c = coverDiv(pd(parent)); let div = cre("div"); div.id = "storySheet"; c.appendChild(div);

let js; if (!obj){
    js = {order: [], id: randomUntil(4,4,storyList)}
} else {
    js = {order: obj.storySheet, id: obj.id}
};

// LEFT Order
let hd = cre("div"); hd.id = "ssHierarchy"; div.appendChild(hd);
    let hdl = cre("div"); hdl.id = "ssList"; hd.appendChild(hdl);
        hdl.ondragover = function(){
            event.preventDefault()
            };
        hdl.ondrop = modDragDrop;

        hdl.refresh = function(ord){
            let order = div.data().order; if (ord) {order = ord;}
                while (hdl.childNodes.length > 0){hdl.childNodes[0].remove();}
            for (var i=0; i<order.length; i++) { hdl.appendChild(ssCreateItem(order[i])); }
            pv.refresh();
        }
        hdl.select = function(loc){
        // open up to this option, then click
        //console.log(loc)
                let elemClick = hdl.childNodes[loc[0]];
                if (loc.length === 1){elemClick.click()}
                else {elemClick.openFolder();}
                for (var i=1; i<loc.length; i++){
                    elemClick = elemClick.nextSibling.childNodes[loc[i]];
                    if (elemClick.openFolder){
                        if (i === loc.length-1){hdl.item = elemClick;}
                        elemClick.openFolder();
                    } else {
                        elemClick.click();
                        hdl.item = elemClick;
                        hdl.itemData = elemClick.data();
                        return
                    }
                }

        }
    let menu = cre("div"); menu.id = "sshMenu"; hd.appendChild(menu);
        let tx = ic("menu"); menu.appendChild(tx);
        let pop = createSSpopup(obj);
        menu.appendChild(pop);

// CENTER Preview
let pv = cre("div"); pv.id = "scPreview"; div.appendChild(pv);
pv.refresh = function(data,loc){
    if (!data){data = div.order();}
    ssCreatePreview(data,pd("scPreview"),loc)
}
// RIGHT Style Sheet
let sd = cre("div"); sd.id = "scStyleList"; div.appendChild(sd);
    //ssStyleList()
    // usage: elem.click = ssStyleList, pd(scStyleList).change(elem,"elem")


// FUNCTIONS
div.data = function(){return JSON.parse(div.dataset.data);}
div.get = function(key){return div.data()[key]}
div.save = function(data,key){
    let d = div.data();
    if (key){d[key] = data;}
    else {d = data;}
    div.dataset.data = JSON.stringify(d);
}
div.refresh = function(elem,data){
    elem.refresh(data)
}
div.order = function(){
    let arr = [];
    let hdlList = Array.from(hdl.childNodes).filter(x => x.className.includes("ssModule"))
        hdlList.map(x => arr.push(x.data()))
    return arr
}

div.dataset.data = JSON.stringify(js)


c.appendChild(div)
}


function createSSpopup(obj){
    let pop = cre("div"); pop.id = "sshPopup";
    let crb = coolButton("Save Story Sheet","save_as"); crb.classList.add("schmpOption");
        crb.style = "border-radius: 0; width: 100%;";
    pop.appendChild(crb);
    crb.onclick = function(){
        obj.storySheet = pd("storySheet").order();
        let ind = storyList.findIndex(x=>x.id === obj.id);
        if (ind !== -1) {
            storyList[ind] = obj; pd("storySheet").parentNode.remove(); saveLS();
        }
    }
    let addTitle = cre("div",null,"border-radius: 0; width: 100%; padding: 0.5em; background-color: white; text-align: center; font-weight: bold;"); pop.appendChild(addTitle);
        addTitle.innerText = "Add Item"
    let ops = [
        {tx: "Text", ic: "text_format", func: function(){
            pd("ssList").appendChild(ssCreateItem("text"));
            ssCreatePreview(pd("storySheet").order(),pd("scPreview"));
            }
        },
        {tx: "Group", ic: "create_new_folder", func: function(){
            pd("ssList").appendChild(ssCreateItem("group"));
            ssCreatePreview(pd("storySheet").order(),pd("scPreview"));
            }
        },
        {tx: "Module", ic: "extension", func: function(){
                ssModulePicker(pd("storySheet").order())
            }
        }
    ]


for (var i=0; i<ops.length; i++){ let oj = ops[i];
let btn = coolButton(oj.tx,oj.ic); btn.classList.add("schmpOption"); pop.appendChild(btn); btn.style = "border-radius: 0; width: 100%";
    btn.addEventListener("click",oj.func)
}

return pop
}



function ssStyleList(elem){ //console.log(elem)
let p = pd("scStyleList");
    if (p !== null && p.itemData && p.itemData.id === elem.data().id){return}
    while (p.childNodes.length > 0){p.childNodes[0].remove();}
    p.item = elem;
    p.itemData = JSON.parse(elem.dataset.data);
let obj = elem.data()
let styles = obj.style

// FUNCTIONS
    p.styles = function(){
        let arr = [];
        let childs = Array.from(p.childNodes).filter(x => x.className && x.className.includes("packRow"))
        for (var i=0; i<childs.length; i++){
            arr.push(childs[i].list())
        }
        return arr;
    }
    p.combine = function(styleArr){
        let obj = {};
        for (var i=0; i<styleArr.length; i++){
            let sa = styleArr[i];
            for (key in sa){obj[key] = sa[key]}
        }
        return obj
    }
    p.combineStyles = function(){return this.combine(p.styles());}
    p.changeStyle = function(){
        let sty = p.combineStyles();
        let newItem = p.item.data(); newItem.style = sty;
        let o = pd("storySheet").order();
            let itemLoc = get_index("id",newItem.id,o,"items")
            o = save_item(newItem.id,newItem,o,"items");

            pd("ssList").refresh(o);
            ssCreatePreview(pd("storySheet").order(),pd("scPreview"),itemLoc);
    } // onkeyup
    p.refresh = function(s){
        let styles = p.combineStyles(); if (s){styles = s;}
        let cc = Array.from(cc.childNodes).filter(x => x.classList.contains("packRow"))
        for (var i=0; i<cc.length; i++){
            cc[i].refresh(styles);
        }
    }
let textPack = inputRowList.filter(x => x.i && x.i.includes("ssTextRow"))
let groupPack = inputRowList.filter(x => x.i && x.i.includes("ssGroupRow"))
// Text Styles
function ts(){
    let p1 = createPack(textPack,styles) // TEXT STYLES
    let title1 = cre("div","slTitle"); title1.innerText = "Text Options"; p.appendChild(title1); title1.id = "ssTextOptionsTitle";
    p.appendChild(p1); p1.classList.add("packRowGroup");
    p1.addListener("input",p.changeStyle)
}

if (obj.type.includes("text")){
    ts();
}

// Group Styles --- Child Alignment, Row Direction
    if (obj.type.includes("group")){

let p2 = createPack(groupPack,styles) // TEXT STYLES
let title2 = cre("div","slTitle"); title2.innerText = "Group Options"; p.appendChild(title2); title2.id = "ssGroupOptionsTitle";
p.appendChild(p2); p2.classList.add("packRowGroup");
        p2.addListener("input",p.changeStyle)
    }


// Module Styles?

// ALL Styles
let allPack = [
{style: "border-bottom: 2px solid black; display: flex;", className: "packRow", children: [
    {name: "width", type: "input", obj: {
    type: "input-text", style: [
        {type: "width", val: "50%", affect: "parent"}, {type: "border", val: "none", affect: "child"}, {type: "border-right", val: "2px solid black", affect: "parent"}
    ], placeholder: "Width"
    }},
    {name: "height", type: "input", obj: {
    type: "input-text", style: [
        {type: "width", val: "50%", affect: "parent"}, {type: "border", val: "none", affect: "child"}
    ], placeholder: "Height"
    }}
]},
{style: "border-bottom: 2px solid black; display: flex;", className: "packRow", children: [
    {name: "padding", type: "input", obj: {
    type: "input-text", style: [
        {type: "width", val: "50%", affect: "parent"}, {type: "border", val: "none", affect: "child"}, {type: "border-right", val: "2px solid black", affect: "parent"}
    ], placeholder: "Padding"
    }},
    {name: "margin", type: "input", obj: {
    type: "input-text", style: [
        {type: "width", val: "50%", affect: "parent"}, {type: "border", val: "none", affect: "child"}
    ], placeholder: "Margin"
    }}
]},
{style: "border-bottom: 2px solid black; display: flex;", className: "packRow", children: [
    {name: "border", type: "input", obj: {
    type: "input-text", style: [
        {type: "width", val: "100%", affect: "parent"}, {type: "border", val: "none", affect: "child"}
    ], placeholder: "Border"
    }}
]},
{style: "border-bottom: 2px solid black; display: flex; align-items: center;", className: "packRow", children: [
    {name: "toggle-backgroundColor", type: "input", obj: {
        type: "input-checkbox", style: [ {type: "width", val: "3em", affect: "parent"}, {type: "height", val: "2em", affect: "child"}, {type: "padding", val: "0", affect: ["parent","child"]}, {type: "border", val: "none", affect: ["child"]}, {type: "marginBottom", val: "0", affect: "parent"}, {type: "backgroundColor", val: "rgba(0,0,0,0)", affect: "child"} ], defaultVal: "#000", text: "Show BG",  textStyle: "font-size: 0.6em; margin-left: 1px;",
            defaultVal: true
            }},
    {name: "backgroundColor", type: "input", obj: {
        type: "input-color", style: [ {type: "width", val: "2.45em", affect: "parent"}, {type: "height", val: "2.45em", affect: "child"}, {type: "padding", val: "0", affect: ["parent","child"]}, {type: "border", val: "none", affect: ["child"]}, {type: "marginBottom", val: "0", affect: "parent"}, {type: "backgroundColor", val: "rgba(0,0,0,0)", affect: "child"} ], defaultVal: "#000", text: "Background", textStyle: "font-size: 0.6em; margin-left: 1px;", defaultVal: "#ffffff"
    }},
    { name: "opacity", type: "input", obj: {
        text: "Opacity", type: "input-range", style: [{type: "margin", val: "0.25em", affect: "parent"}, {type: "padding", val: 0, affect: "child"}, {type: "backgroundColor", val: "#000000", affect: "child"}, {type: "justifyContent", val: "center", affect: "parent"}, {type: "width", val: "calc(50% - 3.25em)", affect: "parent"}, {type: "padding-top", val: "1rem", affect: "parent"}, {type: "padding-bottom", val: "1rem", affect: "parent"}
        ],
            max: 100, min: 0, step: 1, defaultVal: "100"
    }},
    { name: "borderRadius", type: "input", obj: {
        text: "Roundness", type: "input-range", style: [{type: "margin", val: "0.25em", affect: "parent"}, {type: "padding", val: 0, affect: "child"}, {type: "backgroundColor", val: "#000000", affect: "child"}, {type: "justifyContent", val: "center", affect: "parent"}, {type: "width", val: "calc(50% - 3.25em)", affect: "parent"}, {type: "padding-top", val: "1rem", affect: "parent"}, {type: "padding-bottom", val: "1rem", affect: "parent"}
        ],
            max: 100, min: 0, step: 0.5, defaultVal: "0",
    }}
]}
]
let p3 = createPack(allPack,styles) // TEXT STYLES
let title3 = cre("div","slTitle"); title3.innerText = "Other Options"; p.appendChild(title3); title3.id = "ssOtherOptionsTitle";
p.appendChild(p3); p3.classList.add("packRowGroup");
    p3.addListener("input",p.changeStyle)





//p.appendChild(p3)
}



function ssCreateItem(obj){
let order = pd("storySheet").order();
// console.log(obj)

if (typeof obj === "string"){
    if (obj === "text"){
    obj = {id: randomUntil(4,4,order), type: "text", title: "Text",
        style: {
            value: "Text", color: "#000000",
            fontSize: "18px", fontFamily: "Noto Sans",
            justifyContent: "left", alignItems: "center",
            backgroundColor: "#ffffff",
            opacity: "100", borderRadius: "0"
        }};
    } else if (obj === "group"){
    obj = {id: randomUntil(4,4,order), type: "group", title: "Group",
        style: {

        }, items: []};
    }
}
else if (typeof obj === "object" && obj.type.includes("-")) { //console.log("576",obj))
    obj = {id: randomUntil(4,4,order), type: "module", title: obj.name, mID: obj.id,
         style: {

         }}
}
else if (obj.title){

}
else {return false}


let iconName = "";
if (obj.type === "text"){iconName = "text_format"} else if (obj.type === "group"){iconName = "folder"} else if (obj.type === "module"){iconName = "extension";} else {}

let i = cre("div","ssModule"); i.dataset.data = JSON.stringify(obj);
    i.data = function(){return JSON.parse(i.dataset.data);}
    i.save = function(data,key){
        if (key){
            let js = i.data(); js[key] = data;
            i.dataset.data = JSON.stringify(js)
        } else {
            i.dataset.data = JSON.stringify(data);
        }
    }
    i.change = function(key,value){
        let data = i.data(); data[key] = value;
        i.save(data);
    }
    i.loc = function(){
        return get_index("id",i.data().id,pd("storySheet").order(),"items");
    }
    i.get = function(key){
        return i.data()[key]
    }

    let icon = ic(iconName); i.appendChild(icon);
    let inpD = document.createElement("div"); inpD.className = "ssModuleInpDiv"; i.appendChild(inpD);
    let ip = document.createElement("input"); i.appendChild(ip);
    ip.onkeyup = function(){ i.change("title",ip.value); }
    if (obj.title){ip.value = obj.title;}


//GROUP ONLY
if (obj.type === "group"){
    i.isOpen = function(){
        if (i.nextSibling !== null && i.nextSibling.className === "scmBody"){return true}
        return false
    }
    i.folder = function(){
        if (i.isOpen()) {return i.nextSibling}
        else {return false}
    }
    i.openFolder = function(){
        i.closeFolder();
        if (i.data().items && i.data().items.length > 0){createFolder(i.data());}
    }
    i.closeFolder = function(){
        if (i.isOpen()){
            i.folder().remove();
        }}
    i.toggleFolder = function(type){
        if (i.data().items && i.data().items.length === 0){i.closeFolder(); return}
        if (type){
            if (i.folder()){i.closeFolder();}
            if (type === "open"){i.openFolder();}
        } else {
            if (i.folder()){i.closeFolder();}
            else {i.openFolder()}
        }
    }



    function createFolder(data){
    let body = cre("div","scmBody"); i.after(body);
    // FUNCTIONS
    body.ondragover = function(){event.preventDefault()};
    body.ondrop = modDragDrop;
    body.data = function(name){
        if (name){return JSON.parse(body.dataset[name])}
        return JSON.parse(body.dataset.data)
    }
    body.refresh = function(){
        if (!i.data().items){return}
        let items = i.data().items;
        for (var x=0; x<items.length; x++){
            body.appendChild(ssCreateItem(items[x]))
        }
    }
    body.save = function(){
        let d = body.data();
        let cl = []; for (var x=0; x<body.childNodes.length; x++){cl.push(body.childNodes[x].data())};
        d.items = cl;
        body.dataset.data = JSON.stringify(d);
    }
    // END FUNCTIONS


    body.dataset.data = JSON.stringify(data);
    body.dataset.id = i.data().id;

    body.refresh()
    } // create folder

i.ondblclick = function(){
    i.toggleFolder()
}
}// if group





i.addEventListener("click",function(){
    ssStyleList(i);
    selectDiv("ssModule","stay");
    //console.log(i)
    // if (pd("scContextMenu") !== null){pd("scContextMenu").remove()}
});

/* DRAGGABLE */
i.draggable = true; i.ondragstart = modDragStart;
i.ondragend = function(){i.id = ""}
i.oncontextmenu = function(event) {
    event.preventDefault();
    modContextMenu(i);
}
i.ondragover = function(){event.preventDefault()};
i.ondrop = modDragDrop;


return i;
}

function modContextMenu(item){
    if (pd("mmContextDiv")){pd("mmContextDiv").remove();}
    let cd = createElement(ceList.find(x => x.i==="mmContextDiv"));
        pd("storySheet").appendChild(cd);
    cd.style.top = item.getBoundingClientRect().y-10 + "px";
    cd.style.left = item.getBoundingClientRect().width+2 + "px";
    cd.item = function(){return item};

    function removeIf(){
        let elem = event.target
        while (elem.id !== "mmContextDiv" && elem.id !== "storyManager"){elem = elem.parentNode;}
        if (elem !== cd){cd.remove(); document.removeEventListener("click",removeIf)}
    }
    document.addEventListener("click",removeIf)
}




function ssCreatePreview(arr,p,loc){
let ss = pd("storySheet");
    while (p.childNodes.length > 0){p.childNodes[0].remove();}
    for (var i=0; i<arr.length; i++){ let mod = arr[i]; //console.log(mod);
        let div = document.createElement("div");
            div.dataset.data = JSON.stringify(mod);
            div.data = function(){return JSON.parse(div.dataset.data)}
        if (mod.style){ for (key in mod.style){
            if (key === "value"){div.innerText = mod.style[key]}
            else if (key === "opacity"){ div.style[key] = JSON.parse(mod.style[key])/100;}
            else if (key === "borderRadius"){ div.style[key] = mod.style[key] + "px"}
            else if (key.includes("toggle-")){
                if (mod.style[key] === false){div.style[key.split("-")[1]] = undefined;}
            }
            else { if (mod.style["toggle-"+key] !== false){div.style[key] = mod.style[key];}
        }}}
        p.appendChild(div)
        if (mod.type === "text") { //console.log("text")
            div.style.display = "flex";
        } else if (mod.type === "group"){ if (mod.items){
            ssCreatePreview(mod.items,div);
            if (mod.style["item-alignment"] && mod.style["item-alignment"] === "Horizontal"){
                div.style.display = "flex"; div.style.alignItems = "baseline";}
        }

        } else if (mod.type === "module"){ let module; let obj = modList.find(x => x.id === mod.mID);
            if (obj.type.includes("input")){module = createInput(obj)}
            if (obj.type.includes("dropdown")){module = createDropdown(obj)}
            if (obj.type.includes("table")){module = createTable(obj)}
            div.appendChild(module)
        } else {console.log("err"); return []}
    }
if (ss.order().length > 0){ ss.save(ss.order(),"order"); }

if (loc){ // open up to this option, then click
//console.log(loc)
    let elemClick = pd("ssList").childNodes[loc[0]];
        if (loc.length === 1){elemClick.click()}
        else {elemClick.openFolder();}
    for (var i=1; i<loc.length; i++){
        elemClick = elemClick.nextSibling.childNodes[loc[i]];
        if (elemClick.openFolder){
            if (i === loc.length-1){pd("ssList").item = elemClick;}
            elemClick.openFolder();
        } else {
            elemClick.click();
            pd("ssList").item = elemClick;
            pd("ssList").itemData = elemClick.data();
            return
        }
    }
}
}



function ssModulePicker(order){
let c = coverDiv(pd("storySheet").parentNode);
let div = createElement({ type: "div", tags: {id: "ssModulePicker"}
});

let top = createElement({type:"div", tags: {className: "top"}, children: [
        {type: "span", tags: {innerText: "Select A Module", className: "ssmpOpDiv"}},
        {type: "span", tags: {innerText: "SELECT", className: "ssmpOpDiv"}, methods: [{type: "click", func: function(){
            let lis = Array.from(pd("ssMMList").childNodes);
            if (lis.find(x => x.classList.contains("selected"))){
                let mod = lis.find(x => x.classList.contains("selected"));
                //console.log(mod.data());
                pd("ssList").appendChild(ssCreateItem(mod.data()));
                pd("ssList").refresh(pd("storySheet").order())
                c.remove()
            } else {toast("Select a module!");}
        }}]}
]}); div.appendChild(top)



let lis = cre("div"); lis.id = "ssMMList"; div.appendChild(lis);
for (var i=0; i<modList.length; i++){
    let md = mmCreateModule(modList[i])
    md.select = function(slct){
        let lis = Array.from(md.parentNode.childNodes);
        if (lis.findIndex(x => x.classList.contains("selected")) !== -1){
            lis.find(x => x.classList.contains("selected")).classList.remove("selected");
        }
        slct.classList.add("selected")
    }
    md.onclick = function(){
        md.select(md);
        dt.refresh(md.data());
        while (prev.childNodes.length>0){prev.childNodes[0].remove();}
        createPreview(prev,md.data());

    }
    lis.appendChild(md);
}


let bot = cre("div","bot"); div.appendChild(bot);
    let dt = cre("div","details"); bot.appendChild(dt);
        let dtp = cre("div"); dtp.innerText = "NAME: ---"; dt.appendChild(dtp);
        let dti = cre("div"); dti.innerText = "ID: ---"; dt.appendChild(dti);
        let dtt = cre("div"); dtt.innerText = "TYPE: ---"; dt.appendChild(dtt);
        dt.refresh = function(data){
            dtp.innerText = "NAME: " + data.name;
            dti.innerText = "ID: " + data.id;
            let t1 = data.type.split("-")[0]; t1 = t1[0].toUpperCase() + t1.substring(1);
            let t2 = data.type.split("-")[1]; t2 = t2[0].toUpperCase() + t2.substring(1);
            let type = t1 + "-" + t2;
            dtt.innerText = "Type: " + type;
        }
    let prev = cre("div","preview"); bot.appendChild(prev);



    c.appendChild(div)
    return div;
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


