function randomID(amountNum,amountChar){
    if (amountNum === undefined){amountNum = 4}
    if (amountChar === undefined){amountChar = 4}
    let str = "";
    for (var i=0; i<amountNum; i++){ str += Math.floor(Math.random()*10);}
    for (var i=0; i<amountChar; i++){ str += alphabet[Math.floor(Math.random()*alphabet.length)]}
    return str
}

function randomUntil(amountNum,amountChar,array){
let num = randomID(amountNum,amountChar);
    while (array.findIndex(x => x.id === num) !== -1){num = randomID(amountNum,amountChar)}
return num
}


function deleteFrom(arrayName,obj){
    let c = window[arrayName]; console.log(c)
    let ic = c.findIndex(x => JSON.stringify(obj) === JSON.stringify(x));
    let newArr = []; for (var i=0; i<c.length; i++){if (i !== ic){newArr.push(c[i])}}
    window[arrayName] = newArr; save();
}

function getDataset(elem,name){
try {
let e = elem; if (typeof elem === "string"){e = document.getElementById(elem);}
let data = e.dataset[name];
    if (data === undefined){e.dataset[name] = JSON.stringify({}); data = {};}
    else {data = JSON.parse(e.dataset[name])}
return [e,data]}
catch(err){console.log("err: ",err); return false}
}

function saveDataset(elem,name,newData){ if (newData !== undefined) {let d = getDataset(elem,name);
    if (d[0] !== null && d[0] !== undefined){d[0].dataset.data = JSON.stringify(newData); return d}
return false
}return false;}

function filter(arr,key,value,type){
// arr = array to look through,     key = array key to filter
// value = value to look for        type = how to search (i for include, e for equals exactly)
    arr.filter(x => littleFilter(x))
function littleFilter(ob){
    if (!key in obj) {return false}
        if (type === "i" && !ob[key].includes(value)) {return false}
        if (type === "e" && ob[key] != value){return false}
    return true
}
return arr
}

function random(max,min){   return Math.floor(Math.random() * (max-min))+min  }

function selectDiv(id,type){
    let p = event.currentTarget;
    let prev = document.getElementById(id);
    if (prev !== null) {
        if (p.id === prev.id && type !== "stay"){prev.id = ""; return}
        prev.id = "";  }
    p.id = id;
}

function getModOptions(){ let obj = {}
    // styleList
    getStyleList(); getStyleList(); let styleList = getDataset("mcRightDiv","data")[1];
    // {affect: ["parent"], type: "width", val: "100%"}
    obj.style = []; styleList.Container.map(x => obj.style.push({affect: "parent", type: x.style, val: x.val})); styleList.Element.map(x => obj.style.push({affect: "child", type: x.style, val: x.val}))
    let t1 = document.getElementById("mcType").inputElem; let t2 = document.getElementById("mcSubtype").inputElem;
    obj.type = t1.innerText.toLowerCase() + "-" + t2.innerText.toLowerCase()
    let n = document.getElementById("mcName"); if (n.value.length > 0){obj.name = n.value;} else {obj.name = "Untitled Module"}
    // INPUTS
    let pl = document.getElementById("mcPlaceholder"); if (pl !== null && pl.value.length > 0){obj.placeholder = pl.value;}
    let dv = document.getElementById("mcDefaultVal"); if (dv !== null && dv.value.length > 0){obj.defaultVal = dv.value;}
        let rs = document.getElementById("mcResize"); if (rs !== null && rs.value > 0){obj.resize = rs.value;}
        let mx = document.getElementById("mcMax"); if (mx !== null && mx.value > 0){obj.max = mx.value;}
        let mn = document.getElementById("mcMax"); if (mn !== null && mn.value > 0){obj.min = mn.value;}
        let sp = document.getElementById("mcMax"); if (sp !== null && sp.value > 0){obj.step = sp.value;}
    // DROPDOWN
    let dpo = document.getElementById("mcOptions"); if (dpo !== null){ obj.ops = dpo.getVal();}
    // TABLE
        let tr = document.getElementById("mcRows"); if (tr !== null){if (tr.value > 0){obj.rows = JSON.parse(tr.value)} else {obj.rows = 1;}}
        let co = document.getElementById("mcCols"); if (co !== null){if (co.value > 0){obj.cols = JSON.parse(co.value)} else {obj.cols = 1;}}
        let to = document.getElementById("mcTableOptionsDiv");
            if (to !== null && to.dataset.data !== undefined){ obj.table = JSON.parse(to.dataset.data).table;} else if (obj.type.includes("table")) {obj.table = [
            [{type: "Title", value: "Header"}, {type: "Title", value: "Header"}],
            [{type: "Input", value: "Placeholder"}, {type: "Input", value: "Placeholder"}]
        ]; obj.rows = 2; obj.cols = 2;} else {}
        let exp = document.getElementById("mctExpandable"); if (exp !== null){obj.expand = exp.inputElem.innerText;}
// PREVIEW
let pv = document.getElementById("mcPreviewMod"); if (pv !== null){ createPreview(pv,obj); }

return obj
}




function ptSave(){ let ptd = getDataset("mcTableOptionsDiv","data"); let tg = ptd[0].childNodes[1]; let tgd = getDataset("mcTOODiv","data");

   let co = getCellOptions(); if (co){ let sc = getDataset(document.getElementById("selectedCell"),"data");
    for (key in co){sc[1][key] = co[key];}
    sc[0].dataset.data = JSON.stringify(sc[1])
   } // if options exists

   // Save
   let tbl = ptd[0].childNodes[0].childNodes[0]; let arr = []; let pos = []
   for (var i=0; i<tbl.childNodes.length; i++){ let rowA = []; let row = tbl.childNodes[i]; for (var x=0; x<row.childNodes.length; x++){ let cl = row.childNodes[x]; let js = JSON.parse(cl.dataset.data);
        if (document.getElementById("selectedCell") !== null && cl.id === document.getElementById("selectedCell").id){pos = [i,x];
            rowA.push(JSON.parse(document.getElementById("selectedCell").dataset.data))
            } else {rowA.push(js)}
   }; arr.push(rowA);

   }; ptd[1].table = arr; ptd[0].dataset.data = JSON.stringify(ptd[1]); //console.log(arr)

    // ptable
        let prepB = document.getElementById("mcPrepTable").parentNode;
           // console.log("135",ptd[1].table)
           // console.log(pos)

    let prep = createPrepTable(ptd[1]); prepB.appendChild(prep);
    if (pos.length > 0){ prep.childNodes[pos[0]].childNodes[pos[1]].id = "selectedCell"; }
}

    function ptShiftTable(type,num){ let t = getDataset("mcPrepTable","data");
    let cObject = {type: "Input", value: "Placeholder"};
if (type === "row"){ let rowCount = t[0].childNodes.length;
    // INCREASE
    if (num > rowCount){
    for (var i=0; i<num; i++){
        if (t[0].childNodes[i] === null || t[0].childNodes[i] === undefined){
        let row = document.createElement("tr"); row.className = "row";
        for (var x=0; x<t[1].table[0].length; x++){createCell(row,cObject)}
        t[0].appendChild(row);}
    }}
    else { for (var i=rowCount-1; i>num-1; i--){ let rowDel = t[0].childNodes[i]; rowDel.remove(); }}// DECREASE
} // type row
else if (type === "col"){ let colCount = t[0].childNodes[0].childNodes.length;
    if (num > colCount){
        for (var i=0; i<t[0].childNodes.length; i++){let row = t[0].childNodes[i];
        for (var x=row.childNodes.length; x<num; x++){ createCell(row,cObject);}}
    } else { // remove
    for (var i=0; i<t[0].childNodes.length; i++){ let row = t[0].childNodes[i];
        for (var x=colCount; x>num; x--){row.childNodes[row.childNodes.length-1].remove();}
        }
    }
}
else {console.log("err")}
while (document.getElementById("mcTOODiv").childNodes.length > 0){document.getElementById("mcTOODiv").childNodes[0].remove();}; if (document.getElementById("selectedCell") !== null) {document.getElementById("selectedCell").id = ""};
ptSave()
createPreview(document.getElementById("mcPreviewMod"),getModOptions())
}

function getCellOptions(){ let p = document.getElementById("mcTOODiv"); if (p !== null && p.childNodes.length > 0){ let obj = {}
/* TYPE */   let t = document.getElementById("mctType").inputElem.innerText;

/* STYLES */
let st = []; let pt1 = document.getElementById("ptWidth"); let pt2 = document.getElementById("ptHeight");
if (pt1 !== null && pt1.value.length > 0){st.push({type: "width", val: pt1.value})}
if (pt2 !== null && pt2.value.length > 0){st.push({type: "height", val: pt2.value})}

let pt3 = document.getElementById("ptBorder"); let pt4 = document.getElementById("ptBackgroundCol");
if (pt3 !== null && pt3.value.length > 0){st.push({type: "border", val: pt3.value})}
if (pt4 !== null && pt4.value.length > 0){st.push({type: "backgroundColor", val: pt4.value})}
let pt5 = document.getElementById("ptFontColor"); if (pt5 !== null && pt5.value.length > 0){st.push({type: "color", val: pt5.value})}

// let seriesBtns
let biu = document.getElementById("ptBIU"); if (biu !== null) {let biuD = JSON.parse(biu.dataset.data); obj.biu = biuD;}
let lcr = document.getElementById("ptLCR"); if (lcr !== null) {let lcrD = JSON.parse(lcr.dataset.data); obj.lcr = lcrD;}

/* VALUE */
let val = document.getElementById("ptValue"); if (val !== null){obj.value = val.value;}

obj.type = t; obj.style = st; // obj.value = val.value;
return obj
} return false}

function createCell(p,cObject){
    let cell = document.createElement("div"); cell.className = "cell"; cell.dataset.data = JSON.stringify(cObject); cell.innerText = cObject.type;
    let icon; if (cObject.type === "Input"){icon = ic("keyboard_keys");
    } else {icon = ic("text_fields"); }; cell.appendChild(icon);
    cell.onclick = function(){ selectDiv("selectedCell","stay"); ptOpenOptions(cell);}
    p.appendChild(cell)
    return cell
}





function saveLS(){ let obj = {}; let types = ["modList","storyList","groupList","charList"]
for (var i=0;i<types.length;i++){obj[types[i]] = window[types[i]];}
localStorage.storyCreator = JSON.stringify(obj);
console.log(obj)
}
function loadLS(){if (localStorage.storyCreator){
try { let obj = JSON.parse(localStorage.storyCreator); console.log(obj)
for (key in obj){window[key] = obj[key];}
} //try
catch(err){console.log("ERR",err)}
}}
loadLS()

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

/* A few functions from a different project I abandoned */
function deleteItem(pID,iID,list){
    //parent id, item id
    //console.log(pID,iID)
        let ids = [pID,iID]; var array = [] // will contain all elements that will not contain [i]
        if (ids.includes("MAIN")){ //deleting a home option
            for (var i=0; i<list.length; i++){  if (list[i].id !== ids[1]) {array.push(list[i])} }
            list = array; // gets all text_list items EXCEPT for the deleting note
        }
        else{
            let parent_id_loc = get_index("id",ids[0],list,"items")
            let parent_insides = get_insides(parent_id_loc,list)
            let array = []
            for (var i=0; i<parent_insides.length; i++){
                if (parent_insides[i].id != ids[1]) {array.push(parent_insides[i])}
            }
            //console.log("259",parent_id_loc,parent_insides,array)
            //console.log(parent_id_loc); console.log(get_item(parent_id_loc,list))
            let parent = get_item(parent_id_loc,list);
            parent.items = array
        }

    return list
}
function addItem(pID,obj,list){ //parent id, note id
let m = list; let ids = [pID,obj];
    if (ids.includes("MAIN")){m.push(ids[1]); return m}
let addLoc = get_index("id",pID,m,"items");
let addObj = get_item(addLoc,m); addObj.items.push(ids[1]);
return m
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




/*
Use: Find the location in text_list of the needed key as an array.
Typically used to find location based on an item's ID
*/
function get_index(key,text,array,parentKey){
    var list; var found = false;
    get_index_formula(key,text,array,[])
    /*
    Use: Loops through entire "text_list", keeping track of the location being searched through (index) until key matches. Returns array
    */
    function get_index_formula(key,text,array,index){
        for (var i=0; i<array.length; i++){
            if (key in array[i] && array[i][key] === text) {var new_ind = index; new_ind.push(i); list = new_ind; found = true; return}
        } //searches first in array if it exists

//then, looks inside folders of the array if nothing is returned
        for (var i=0; i<array.length; i++){
            if (parentKey in array[i] && array[i][parentKey].length > 0 && !found) {
// looking through folders with "texts" inside
                var child_nodes = array[i][parentKey]
                var new_ind = index; new_ind.push(i); // this is how index is tracked, and then reported if it matches in the above loop
                get_index_formula(key,text,child_nodes,new_ind)
                // continues the loop to look through each groups insides
            }
        }}

// then this returns an array which have the indexes of the array:
// example [1,0] would be array[1].items[0]
    /*
    << because of how this is stored,
     if parent == MAIN is checked in all of the functions.
    */
    return list
}


function get_insides(location,list,parentKey){
var li = list; for (var i=0; i<location.length;i++){
    if (li[location[i]] !== undefined && parentKey in li[location[i]]) {li = li[location[i]][parentKey]}
    else {li = li[location[i]]}     }; return li; }
function get_item(location,list,parentKey){
var li = list;  for (var i=0; i<location.length;i++){
if (li[location[i]] !== undefined && parentKey in li[location[i]]) {
    if (i === location.length -1) {li = li[location[i]]}
    else {li = li[location[i]][parentKey]}
}   else {li = li[location[i]]}     }; return li; }


function save_item(id,newObj,list){
    let p = get_index("id",id,list,"items"); p.pop();
    let parent = get_insides(p,list); itemInd = parent.findIndex(x => x.id === id);
        parent[itemInd] = newObj
    return list
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
shRefreshList(save_item(id,obj,getSHOrder()),get_index("id",id,getSHOrder(),"items"),id)
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
    let newOrder = save_item(d[1].id,d[1],order);

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




createHomePage("content")
//createStoryManager("content")
//createModuleCreator("content")
//createModuleManager("content")
//createStoryCreator("content")
sheetCreator("content")
    // mainStoryCreator("content");
/*
    let item = scCreateItem("text");
    pd("schList").appendChild(item); //item.onclick()
    let item2 = scCreateItem("group");
    pd("schList").appendChild(item2); //item2.onclick()
    let item2a = scCreateItem("group");
    pd("schList").appendChild(item2a); //item2.onclick()
    //pd("schmPopup").childNodes[2].click()
    let item3 = scCreateItem("module",modList[1]);
    pd("schList").appendChild(item3); //item2.onclick()
*/


/*
let order = [
    {"id": "3731ZSBY","type": "text", "title": "Text", "style": {"value": "Text"}},
    {"id": "8247NRYR","type": "group","title": "Group2","style": {},"items": []},
    {"id": "0275GYME", "type": "group", "title": "Group", "style": {},
        "items": [{"id": "0410ASBK", "type": "group", "title": "Group", "style": {}, "items": [{"id": "3731ZSBY","type": "text", "title": "Small Text", "style": {"value": "WOW"}}]}]},
    {"id": "2760JBHR", "type": "module", "title": "3 Likes", "mID": "74035CAWAB", "style": []}
]
for (var i=0; i<order.length; i++){pd("schList").appendChild(scCreateItem(order[i].type,order[i]))}
scCreatePreview(getSCOrder(),pd("scPreview"))
 */

pd("shList").appendChild(shCreateItem("text")).click(); shRefreshList(getSHOrder())
