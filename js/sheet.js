/* DRAG DROP */
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





/*
function scGetElemParent(div){ if (div.id === "schList"){return div}
    while (!div.classList.contains("scModule")){
        while (div.parentNode.classList.contains("scmBody")){div = div.parentNode;}
        if (div.previousSibling !== null){div = div.previousSibling}
    }
    return div
} */
function scGetElemParentsList(div){ let arr = []; if (div.id === "schList"){return []}
    if (div.classList.contains("scModule") && !div.parentNode.classList.contains("scmBody")){arr.push(div); return arr}
    if (div.previousSibling !== null && div.previousSibling.classList.contains("scModule")) {arr.push(div.previousSibling)};
    while (!div.classList.contains("scModule")){
        while (div.parentNode.classList.contains("scmBody")){div = div.parentNode;
            if (div.previousSibling !== null && div.previousSibling.classList.contains("scModule")) {arr.push(div.previousSibling)};}
        if (div.previousSibling !== null){div = div.previousSibling;}
    }
    arr = arr.reverse()
    return arr
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

function createBar(obj){ let div = cre("div","barDiv"); div.dataset.data = JSON.stringify(obj); console.log(obj);
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
    /* pos */   block.style.left = leftpos;
    //STYLES
    /*
    if (obj.style){for (key in obj.style){
        if (!["width","height"].includes(key)){main.style[key] = obj.style[key];}}
    } */

    return div
}







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

let js; if (!obj){js = {order: [], id: randomUntil(4,4,storyList)}} else {js = {order: obj.storySheet, id: obj.id}};

// LEFT Order
let hd = cre("div"); hd.id = "ssHierarchy"; div.appendChild(hd);
    let hdl = cre("div"); hdl.id = "ssList"; hd.appendChild(hdl);
        hdl.ondragover = function(){event.preventDefault()};
        hdl.ondrop = scDragDrop;
    let menu = cre("div"); menu.id = "sshMenu"; hd.appendChild(menu);
        let tx = ic("menu"); menu.appendChild(tx);
        let pop = createSSpopup(obj);
        menu.appendChild(pop);

// CENTER Preview
let pv = cre("div"); pv.id = "scPreview"; div.appendChild(pv);
pv.refresh = function(data){
    if (!data){data = div.order();}
    scCreatePreview(data,pd("scPreview"))
}
// RIGHT Style Sheet
let sd = cre("div"); sd.id = "scStyleList"; div.appendChild(sd);
    ssStyleList()
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
div.refresh = function(elem,data){elem.refresh(data)}
div.order = function(){
    let arr = [];
    let hdlList = Array.from(hdl.childNodes).filter(x => x.className.includes("scModule"))
        hdlList.map(x => arr.push(x.data()))
    return arr
}

div.dataset.data = JSON.stringify(js)


c.appendChild(div)
}


function createSSpopup(obj){
    let pop = cre("div"); pop.id = "sshPopup";
    let crb = coolButton("Create Story Sheet","save_as"); crb.classList.add("schmpOption");
        crb.style = "border-radius: 0; width: 100%;";
    if (obj && obj.storySheet && obj.storySheet.length > 0){
        crb = coolButton("Edit Story Sheet","save_as")
    }
    pop.appendChild(crb);
    crb.onclick = function(){
        obj.storySheet = getSCOrder();
        let ind = storyList.findIndex(x=>x.id === obj.id);
        if (ind !== -1) {storyList[ind] = obj; pd("storySheet").parentNode.remove(); saveLS(); }
    }
    let addTitle = cre("div",null,"border-radius: 0; width: 100%; padding: 0.5em; background-color: white; text-align: center; font-weight: bold;"); pop.appendChild(addTitle);
        addTitle.innerText = "Add Item"
    let ops = [
        {tx: "Text", ic: "text_format", func: function(){
                let it = ssCreateItem("text"); pd("ssList").appendChild(it);
                let order = pd("storySheet").order();
                ssCreatePreview(order,pd("scPreview"));
            }
        },
        {tx: "Group", ic: "create_new_folder", func: function(){
                let it = ssCreateItem("group"); pd("ssList").appendChild(it);
                let order = pd("storySheet").order();
                ssCreatePreview(order,pd("scPreview"));
            }
        },
        {tx: "Module", ic: "extension", func: function(){
                //scModulePicker(c,d[1].order,hdl);
            }
        }
    ]


for (var i=0; i<ops.length; i++){ let oj = ops[i];
let btn = coolButton(oj.tx,oj.ic); btn.classList.add("schmpOption"); pop.appendChild(btn); btn.style = "border-radius: 0; width: 100%";
    btn.addEventListener("click",oj.func)
}

return pop
}



function ssStyleList(styles){
let p = pd("scStyleList"); while (p.childNodes.length > 0){p.childNodes[0].remove();}

// Text Styles
let textPack = [
{style: "background-color: white; display: flex", className: "packRow", childStyle: {}, children: [
    {name: "color", type: "input", obj: { text: "Color", textStyle: "font-size: 0.7em; font-family: 'Chakra Petch'; margin-top: 0.1em; margin-left: 0.1em;",
    type: "input-color", style: [ {type: "width", val: "2em", affect: "parent"}, {type: "height", val: "3em", affect: "child"}, {type: "padding", val: "0", affect: ["parent","child"]}, {type: "border", val: "none", affect: ["child"]}, {type: "borderBottom", val: "2px solid black", affect: "child"}, {type: "backgroundColor", val: "rgba(0,0,0,0)", affect: "child"} ], defaultVal: "#000",
        fList: {input: function(){
     }}
}},
    {name: "fontSize", type: "input", obj: {text: "Size", textStyle: "font-size: 0.7em; font-family: 'Chakra Petch'; margin-top: 0.1em;",
    type: "input-text", style: [{type: "width", val: "3em", affect: ["parent"]}, {type: "height", val: "100%", affect: "child"}, {type: "margin", val: "0", affect: "parent"}, {type: "borderTop", val: "none", affect: "child"},{type: "fontSize", val: "0.8em", affect: "child"},{type: "borderRadius", val: 0, affect: "child"}], defaultVal: "18px",
        fList: {keyup: function(){
    }}
}}, // fontSIZE
    {name: "fontFamily", type: "input", obj: { text: "Font Family", textStyle: "font-size: 0.7em; font-family: 'Chakra Petch'; margin-top: 0.1em;",
    type: "input-text", style: [{type: "width", val: "calc(100% - 5em)", affect: ["parent"]}, {type: "height", val: "100%", affect: "child"}, {type: "margin", val: "0", affect: "parent"}, {type: "border", val: "none", affect: "child"}, {type: "border-bottom", val: "2px solid black", affect: "child"}, {type: "fontSize", val: "0.8em", affect: "child"}], defaultVal: "Noto Sans",
        fList: {keyup: function(){
    }}
}}
    ]},
{style: "background-color: white; border-bottom: 2px solid black; border-top: 2px solid black; display: flex; margin-top: 1em;", className: "packRow", childStyle: {}, children: [
    {name: "BIU", type: "opsList", args: [
        [ {icon: "format_bold", value: {fontWeight: "bold"}}, {icon: "format_italic", value: {fontStyle: "italic"}}, {icon: "format_underlined", value: {textDecoration: "underline"}}], "multi", function(){

    }, "border: none; border-right: 2px solid black; width: 48%; margin: 0;", "width: 33%; font-size: 0.9em;"]
    },
    {name: "justify-text", type: "opsList", args: [
        [{icon: "format_align_left", value: {justifyContent: "left"}},{icon: "format_align_center", value: {justifyContent: "center"}},{icon: "format_align_right", value: {justifyContent: "right"}}],
    "single", function(){

    }, "border: none; width: 48%; margin: 0;", "width: 33%; font-size: 0.9em;"
    ]}
    ]},
{style: "background-color: white;", className: "packRow", childStyle: {}, children: [
    {name: "align-text", type: "opsList", args: [
    [{icon: "vertical_align_top", value: {alignItems: "left"}},{icon: "vertical_align_center", value: {alignItems: "center"}},{icon: "vertical_align_bottom", value: {alignItems: "right"}}],
    "single", function(){

    }, "width: 100%; border: none; margin-left: 0;", "width: 33%; font-size: 0.9em"
]}
    ]}
]
let p1 = createPack(textPack,styles) // TEXT STYLES
let title1 = cre("div","slTitle"); title1.innerText = "Text Options"; p.appendChild(title1);
p.appendChild(p1); p1.classList.add("packRowGroup");


// Group Styles --- Child Alignment, Row Direction
let groupPack = [
{style: "background-color: white; display: flex", className: "packRow", childStyle: {}, children: [
    {name: "flex", type: "opsList", args: [
        [{icon: "table_rows", value: {flexDirection: "row", display: "flex"}},{icon: "view_week", value: {flexDirection: "column", display: "flex"}}],
    "single", function(){

    }, "border: none; border-right: 2px solid black; width: 48%; margin: 0;", "width: 50%; font-size: 0.9em;"
            ]},
    {name: "justifyContent", type: "opsList", args: [
        [{icon: "format_align_left", value: {justifyContent: "left"}},{icon: "format_align_center", value: {justifyContent: "center"}},{icon: "format_align_right", value: {justifyContent: "right"}}],
    "single", function(){

    }, "border: none; width: 48%; margin: 0;", "width: 33%; font-size: 0.9em;"
            ]}
    ]}
]
let p2 = createPack(groupPack,styles) // TEXT STYLES
let title2 = cre("div","slTitle"); title2.innerText = "Group Options"; p.appendChild(title2);
p.appendChild(p2); p2.classList.add("packRowGroup");


// Module Styles?

// ALL Styles
let allPack = [
{style: "border-bottom: 2px solid black; display: flex;", className: "packRow", children: [
    {name: "width", type: "input", obj: {
    type: "input-text", fList: {keyup: function(){
        console.log("WEH")
    }}, style: [
        {type: "width", val: "50%", affect: "parent"}, {type: "border", val: "none", affect: "child"}, {type: "border-right", val: "2px solid black", affect: "parent"}
    ], placeholder: "Width"
    }},
    {name: "height", type: "input", obj: {
    type: "input-text", fList: {keyup: function(){
        console.log("WEH")
    }}, style: [
        {type: "width", val: "50%", affect: "parent"}, {type: "border", val: "none", affect: "child"}
    ], placeholder: "Height"
    }}
]},
{style: "border-bottom: 2px solid black; display: flex;", className: "packRow", children: [
    {name: "padding", type: "input", obj: {
    type: "input-text", fList: {keyup: function(){
        console.log("WEH")
    }}, style: [
        {type: "width", val: "50%", affect: "parent"}, {type: "border", val: "none", affect: "child"}, {type: "border-right", val: "2px solid black", affect: "parent"}
    ], placeholder: "Padding"
    }},
    {name: "margin", type: "input", obj: {
    type: "input-text", fList: {keyup: function(){
        console.log("WEH")
    }}, style: [
        {type: "width", val: "50%", affect: "parent"}, {type: "border", val: "none", affect: "child"}
    ], placeholder: "Margin"
    }}
]},
{style: "border-bottom: 2px solid black; display: flex;", className: "packRow", children: [
    {name: "border", type: "input", obj: {
    type: "input-text", fList: {keyup: function(){
        console.log("WEH")
    }}, style: [
        {type: "width", val: "50%", affect: "parent"}, {type: "border", val: "none", affect: "child"}
    ], placeholder: "Border"
    }}
]},
{style: "border-bottom: 2px solid black; display: flex;", className: "packRow", children: [
    {name: "backgroundColor", type: "input", obj: {
        type: "input-color", style: [ {type: "width", val: "3em", affect: "parent"}, {type: "height", val: "3em", affect: "child"}, {type: "padding", val: "0", affect: ["parent","child"]}, {type: "border", val: "none", affect: ["child"]}, {type: "marginBottom", val: "0", affect: "parent"}, {type: "backgroundColor", val: "rgba(0,0,0,0)", affect: "child"} ], defaultVal: "#000",
                fList: {input: function(){

        }}, text: "Background", textStyle: "font-size: 0.6em; margin-left: 1px;"
    }},
    { name: "opacity", type: "input", obj: {
        text: "Opacity", type: "input-range", style: [{type: "margin", val: "0.25em", affect: "parent"}, {type: "padding", val: 0, affect: "child"}, {type: "backgroundColor", val: "#000000", affect: "child"}, {type: "justifyContent", val: "center", affect: "parent"}, {type: "width", val: "calc(50% - 2.25em)", affect: "parent"}
        ],
            max: 100, min: 0, step: 1, defaultVal: "100",
            fList: {input: function(){
                console.log("S");
            }}
    }},
    { name: "borderRadius", type: "input", obj: {
        text: "Roundness", type: "input-range", style: [{type: "margin", val: "0.25em", affect: "parent"}, {type: "padding", val: 0, affect: "child"}, {type: "backgroundColor", val: "#000000", affect: "child"}, {type: "justifyContent", val: "center", affect: "parent"}, {type: "width", val: "calc(50% - 2.25em)", affect: "parent"}
        ],
            max: 50, min: 0, step: 1, defaultVal: "0",
            fList: {input: function(){
                console.log("S");
            }}
    }}
]}
]
let p3 = createPack(allPack,styles) // TEXT STYLES
let title3 = cre("div","slTitle"); title3.innerText = "Other Options"; p.appendChild(title3);
p.appendChild(p3); p3.classList.add("packRowGroup");

// FUNCTIONS
p.styles = function(){
    let arr = [];
        let childs = Array.from(p.childNodes).filter(x => x.className && x.className.includes("packRow"))
    for (var i=0; i<childs.length; i++){
        arr.push(childs[i].list())
    }
return arr;
}



//p.appendChild(p3)
}



function ssCreateItem(obj){
let order = pd("storySheet").order();


if (typeof obj === "string"){
    if (obj === "text"){
    obj = {id: randomUntil(4,4,order), type: "text", title: "Text",
        style: {
            value: "Text"
        }};
    } else if (obj === "group"){
    obj = {id: randomUntil(4,4,order), type: "group", title: "Group",
        style: {

        }, items: []};
    }
} else if (typeof obj === "object" && obj.type.includes("-")) { //console.log("576",obj)
    obj = {id: randomUntil(4,4,order), type: "module", title: obj.name, mID: obj.id,
         style: {

         }}
} else {return false}
let iconName = "";
if (obj.type === "text"){iconName = "text_format"}
if (obj.type === "group"){iconName = "folder"}
if (obj.type === "module"){iconName = "extension";}

let i = cre("div","scModule"); i.dataset.data = JSON.stringify(obj);
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

    let icon = ic(iconName); i.appendChild(icon);
    let inpD = document.createElement("div"); inpD.className = "scmInpDiv"; i.appendChild(inpD);
    let ip = document.createElement("input"); i.appendChild(ip);
    ip.onkeyup = function(){ i.change("title",ip.value); }
    if (obj.title){ip.value = obj.title;}


if (obj.type === "group"){i.ondblclick = function(){
    if (i.nextSibling && i.nextSibling.className === "scmBody"){i.nextSibling.remove();}
    else { let body = document.createElement("div"); body.className = "scmBody"; i.after(body);
        let o = i.data(); if (o && o.items){
        for (var x=0; x<o.items.length; x++){
            body.appendChild(scCreateItem(o.items[x].type,o.items[x]));}
        };
        body.ondragover = function(){event.preventDefault()}; body.ondrop = scDragDrop; body.dataset.id = o.id;
    }
};





i.addEventListener("click",function(){
    console.log("click")
    ssStyleList(i);
    //selectDiv("scOpenItem","stay");
    if (pd("scContextMenu") !== null){pd("scContextMenu").remove()}
});


/* DRAGGABLE */
i.draggable = true; i.ondragstart = scDragStart;
/* onContextMEnu */
i.oncontextmenu = function(){event.preventDefault(); scContextMenu(o);}
/* dragover */
i.ondragover = function(){event.preventDefault()}; i.ondrop = scDragDrop;}
return i;
}




function ssCreatePreview(arr,p){
let ss = pd("storySheet");
    while (p.childNodes.length > 0){p.childNodes[0].remove();}
    for (var i=0; i<arr.length; i++){ let mod = arr[i]; //console.log(mod);
        let div = document.createElement("div");
            div.dataset.data = JSON.stringify(mod);
            div.data = function(){return JSON.parse(div.dataset.data)}
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
    }
if (ss.order().length > 0){
    ss.save(ss.order(),"order")
}
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
    if (type === "group"){i.ondblclick = function(){
        if (i.nextSibling && i.nextSibling.className === "scmBody"){i.nextSibling.remove();}
        else { let body = document.createElement("div"); body.className = "scmBody"; i.after(body);
            let o = i.data(); if (o && o.items){
            for (var x=0; x<o.items.length; x++){body.appendChild(scCreateItem(o.items[x].type,o.items[x]));}};
            body.ondragover = function(){event.preventDefault()}; body.ondrop = scDragDrop; body.dataset.id = o.id;
        }
    }; i.ondragover = function(){event.preventDefault()}; i.ondrop = scDragDrop;}
    let icon = ic(iconName); i.appendChild(icon);
    let inpD = document.createElement("div"); inpD.className = "scmInpDiv"; i.appendChild(inpD);
    let ip = document.createElement("input"); i.appendChild(ip);
    ip.onkeyup = function(){ i.change("title",ip.value); }
    if (o && o.title){ip.value = o.title;}
    i.data = function(){return this.dataset.data;}
    i.save = function(data,key){
        if (key){i.dataset[key] = JSON.stringify(data); return}
        i.dataset.data = JSON.stringify(data);
        }
    i.change = function(key,value){
        let data = i.data(); data[key] = value;
        i.save(data);
    }


    i.addEventListener("click",function(){
        scCreateStyleList(i);
        selectDiv("scOpenItem","stay");
        if (pd("scContextMenu") !== null){pd("scContextMenu").remove()}
    });
    /* DRAGGABLE */
    i.draggable = true; i.ondragstart = scDragStart;
    /* onContextMEnu */
    i.oncontextmenu = function(){event.preventDefault(); scContextMenu(o);}
    return i;
}




function scCreateStyleList(elem){ let p = pd("scStyleList"); while (p.childNodes.length >0){p.childNodes[0].remove();};
    function scSLSave(){ let sl = getSCstyleList(); let d = getDataset(elem,"data"); d[1].style = sl; d[0].dataset.data = JSON.stringify(d[1]);
        let newOrder = save_item(d[1].id,d[1],getSCOrder(),"items")
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
    if (pd("shNormalOptions") !== null){
        list = pd("shNormalOptions").list()
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
        let newOrder = save_item(d[1].id,d[1],getSHOrder(),"items");
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