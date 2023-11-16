function createModuleCreator(parent,obj){ //console.log("350",obj)
    let c = coverDiv(parent); let div = document.createElement("div"); div.id = "moduleCreator"; c.appendChild(div);
        if (obj && obj.id){div.dataset.id = obj.id}
    /* Divs inside container */
    let l = document.createElement("div"); l.id = "mcLeftDiv"; div.appendChild(l);
    let prev = document.createElement("div"); prev.id = "mcPreviewMod"; l.appendChild(prev);
    let lb = document.createElement("div"); lb.id = "mclBottom"; l.appendChild(lb);
    let lbl = document.createElement("div"); lbl.id = "mclInfoDiv"; lb.appendChild(lbl);

    /* Dropdown for Main Type */
    let dobj = dpList.find(x => x.id === "mcType");
    let lbl_dp = createDropdown(dobj); lbl.appendChild(lbl_dp);

    let st_obj = dpList.find(x => x.id === "mcSubtype"); let st = createDropdown(st_obj); lbl.appendChild(st);

    let nObj = inpList.find(x => x.id === "mcName"); let name = createInput(nObj); lbl.appendChild(name);

    // GUIDE BUTTON
    let gb = createInput(inpList.find(x => x.id === "mcGuideBtn")); lbl.appendChild(gb);
        gb.style.margin = "1rem 0 0.25rem";

    if (obj && obj.id){console.log("EDIT")
        let eObj = inpList.find(x => x.id === "mcCreateBtn"); eObj.value = "Edit Module";
        let erBtn = createInput(eObj); lbl.appendChild(erBtn);
    } else {
        let cObj = inpList.find(x => x.id === "mcCreateBtn"); let crBtn = createInput(cObj); lbl.appendChild(crBtn);
    }
    let mdl = document.createElement("div"); mdl.id = "mcModList"; lb.appendChild(mdl);
    // mod options

    let r = document.createElement("div"); r.id = "mcRightDiv"; div.appendChild(r);
// STYLE LIST //
    let rdata = {Container: [], Element: [], focus: "Container"};
    if (obj){
        // style
        rdata = {};
            rdata.Container = obj.style.filter(x => x.affect === "parent");
            rdata.Element = obj.style.filter(x => x.affect === "child");
            rdata.focus = "Container";
    }
    r.dataset.data = JSON.stringify(rdata);
    r.data = function(){return JSON.parse(r.dataset.data)}
    r.set = function(obj,key,name){
        if (key === "all" && name){r.save(obj,name);} // save all data into dataset

        let data = r.data(); data[key] = obj; // save specific key
        r.save(data,"data");
    }
    r.save = function(obj,name){
        r.dataset[name] = JSON.stringify(obj);
    }
    r.swap = function(type){
        getStyleList()
        if (type){
            r.set(type,"focus");
            addStyleList(rl,r.data(),type)
        } else {// switch specifically to this
            if (r.data().focus.toLowerCase() === "element"){
                r.set("Container","focus")
            } else {r.set("Element","focus")}
        let rdata = r.data();
        slct.innerText = rdata.focus;
        addStyleList(rl,rdata.focus)
        }
    }

    let rt = cre("div","mcrTitle"); rt.innerText = "Style List"; r.appendChild(rt);
    let ch = cre("div","mcrTitle"); r.appendChild(ch);

    let slct = cre("div",null,"width: 100%; height: 100%;"); slct.innerText = "Container"; ch.appendChild(slct);
        slct.onclick = function(){r.swap()};
    let chIc = ic("autorenew"); ch.appendChild(chIc); chIc.style = "position: absolute; top: 0; right: 0; margin: 0.2em; padding: 0; font-size: 1em;"
    // let rLIST
    let rl = document.createElement("div"); rl.id = "mcStyleList"; r.appendChild(rl);
        addStyleList(rl,rdata.focus)

    if (!obj) {
        lbl_dp.list()[0].click(); let ml = getModOptions(); createModList(mdl,ml);
    } // CHANGE THIS
// mod options last?

if (obj){ //console.log("392",obj);
    console.log(obj)
// main Type
    lbl_dp.select(obj.type.split("-")[0]);
// sub
    st.select(obj.type.split("-")[1]);
// name
    name.inputElem.value = obj.name;

    div.dataset.data = JSON.stringify(obj);
createModList(mdl,obj);
createPreview(prev,obj);
}// if obj

    return div
}

function getModOptions(){ let obj = {}
// styleList
getStyleList();
let styleList = pd("mcRightDiv").data();

// {affect: ["parent"], type: "width", val: "100%"}
obj.style = [];
// CONTAINER
for (var i=0; i<styleList.Container.length; i++){ let c = styleList.Container[i];
    obj.style.push({affect: "parent", type: c.type, val: c.value})
}
// ELEMENT
for (var i=0; i<styleList.Element.length; i++){ let e = styleList.Element[i];
    obj.style.push({affect: "child", type: e.type, val: e.value})
}

let t1 = pd("mcType").input(); let t2 = pd("mcSubtype").input();
obj.type = t1.toLowerCase() + "-" + t2.toLowerCase();

let n = pd("mcName"); if (n.value.length > 0){obj.name = n.value;} else {obj.name = "Untitled Module"}
// INPUTS
let pl = pd("mcPlaceholder"); if (pl !== null && pl.value.length > 0){obj.placeholder = pl.value;}
let dv = pd("mcDefaultVal"); if (dv !== null && dv.value.length > 0){obj.defaultVal = dv.value;}
let rs = pd("mcResize"); if (rs !== null && rs.value > 0){obj.resize = rs.value;}
let mx = pd("mcMax"); if (mx !== null && mx.value > 0){obj.max = mx.value;}
let mn = pd("mcMin"); if (mn !== null && mn.value > 0){obj.min = mn.value;}
let sp = pd("mcStep"); if (sp !== null && sp.value > 0){obj.step = sp.value;}
// DROPDOWN
let dpo = pd("mcOptions"); if (dpo !== null){ obj.ops = dpo.input();}
// TABLE
let tr = pd("mcRows"); if (tr !== null){if (tr.value > 0){obj.rows = JSON.parse(tr.value)} else {obj.rows = 1;}}
let co = pd("mcCols"); if (co !== null){if (co.value > 0){obj.cols = JSON.parse(co.value)} else {obj.cols = 1;}}
let to = pd("mcTableOptionsDiv");
if (to !== null && to.dataset.data !== undefined){ obj.table = JSON.parse(to.dataset.data).table;} else if (obj.type.includes("table")) {
        let titleStyle = {backgroundColor: "#ffffff", color: "#000000", fontFamily: "Noto Sans", fontSize: "1em", type: "Title", value: "Title"};
        let inputStyle = {backgroundColor: "#ffffff", color: "#000000", fontFamily: "Noto Sans", fontSize: "1em", type: "Input", value: "Input"};
    obj.table = [
        [{type: "Title", value: "Title", style: titleStyle}, {type: "Title", value: "Title", style: titleStyle}],
        [{type: "Input", value: "Input", style: inputStyle}, {type: "Input", value: "Input", style: inputStyle}]
    ]; obj.rows = 2; obj.cols = 2;} // else {}
    let exp = pd("mctExpandable"); if (exp !== null){obj.expand = exp.input();}

// PREVIEW
    let pv = pd("mcPreviewMod"); if (pv !== null){ createPreview(pv,obj); }
    return obj
}


function ptSave(){
let ptd = getDataset("mcTableOptionsDiv","data");
let co = pd("mcptPopup"); if (co !== null && co.getStyles && co.loc){
    let cell = co.table().findCell(co.loc());
    let data = cell.getDataset("data"); let styles = co.getStyles();
        data.type = styles["type"]; data.value = styles["value"];
        data.style = styles; cell.setDataset("data",data);
    pd("selectedCell").setDataset("data",data)
} // if options exists
// Save
let tbl = pd("mcPrepTable"); let arr = []; let pos = []
for (var i=0; i<tbl.childNodes.length; i++){ let rowA = [];
    let row = tbl.childNodes[i];
    for (var x=0; x<row.childNodes.length; x++){
        let cl = row.childNodes[x]; let js = cl.getDataset("data");
       // console.log(i,x,js)
        if (cl.id === "selectedCell"){pos = [i,x];}
        rowA.push(js)
    }; arr.push(rowA);

    }; ptd[1].table = arr; ptd[0].dataset.data = JSON.stringify(ptd[1]);
    // PrepTable
    let prep = createPrepTable(ptd[1]);
        pd("mcTOPrev").appendChild(prep);
    if (pos.length > 0){
        prep.childNodes[pos[0]].childNodes[pos[1]].id = "selectedCell";
        //pd("selectedCell").onclick()
    }
    saveDataset("moduleCreator","data",getModOptions())
}

function ptShiftTable(type,num){ let t = getDataset("mcPrepTable","data");
    let cObject = {type: "Input", value: "Input"};
    if (type === "row"){ let rowCount = t[0].childNodes.length;
        // INCREASE
        if (num > rowCount){
            for (var i=0; i<num; i++){
                if (t[0].childNodes[i] === null || t[0].childNodes[i] === undefined){
                    let row = document.createElement("tr"); row.className = "row";
                    for (var x=0; x<t[1].table[0].length; x++){row.appendChild(createPTCell(cObject,t[0],i,x))}
                    t[0].appendChild(row);}
            }}
        else { for (var i=rowCount-1; i>num-1; i--){ let rowDel = t[0].childNodes[i]; rowDel.remove(); }}// DECREASE
    } // type row
    else if (type === "col"){ let colCount = t[0].childNodes[0].childNodes.length;
        if (num > colCount){
            for (var i=0; i<t[0].childNodes.length; i++){let row = t[0].childNodes[i];
                for (var x=row.childNodes.length; x<num; x++){ row.appendChild(createPTCell(cObject,t[0],i,x));}}
        } else { // remove
            for (var i=0; i<t[0].childNodes.length; i++){ let row = t[0].childNodes[i];
                for (var x=colCount; x>num; x--){row.childNodes[row.childNodes.length-1].remove();}
            }
        }
    }
    else {console.log("err")}
    if (pd("selectedCell") !== null) {pd("selectedCell").id = ""};
    ptSave()
    createPreview(pd("mcPreviewMod"),getModOptions())
}

function createCell(p,cObject){
    let cell = document.createElement("div"); cell.className = "cell"; cell.dataset.data = JSON.stringify(cObject); cell.innerText = cObject.type;
    let icon; if (cObject.type === "Input"){icon = ic("keyboard_keys");
    } else {icon = ic("text_fields"); }; cell.appendChild(icon);
    cell.onclick = function(){ selectDiv("selectedCell","stay"); ptOpenOptions(cell);}
    p.appendChild(cell)
    return cell
}






function addStyleList(p,type){
let d = pd("mcRightDiv").data();
//console.log(d)
let list = mlStyles;
    // console.log("-",p,type); console.log(d[1][type])
while (p.childNodes.length > 0){p.childNodes[0].remove();}

for (var i=0; i<list.length; i++){ let l = list[i];
    let op = cre("div","mlsdDiv"); p.appendChild(op);
        op.dataset.data = JSON.stringify(l);
        op.data = function(){return JSON.parse(op.dataset.data);}
        op.value = function(){return inp.value}
    let inp = document.createElement("input"); op.appendChild(inp);
    let tx = document.createElement("span"); tx.innerText = l.name; op.appendChild(tx);

 if ("placeholder" in l){inp.placeholder = l.placeholder}

 let f = d[type].find(x => x.type === l.type);
if (f){
    op.dataset.data = JSON.stringify(f);
    inp.value = f.value
    if (f.val){inp.value = f.val}
}
    inp.onkeyup = function(){getModOptions()}

    } // for loop
}
function getStyleList(){
    let rd = pd("mcRightDiv"); let data = rd.data();
    let sld = pd("mcStyleList"); let list = [];
    for (var i=0; i<sld.childNodes.length; i++){ let dc = sld.childNodes[i];
        if (dc.value().length > 0){
            let dcData = dc.data(); dcData.value = dc.value(); list.push(dcData);
        }}
    data[data.focus] = list; rd.save(data,"data")
}


function createModList(p,obj){ let t = obj.type.split("-"); while (p.childNodes.length > 0){p.childNodes[0].remove()}
    //console.log(" ",obj)
    let objStyle = {}; if (obj && obj.style){objStyle = obj}
if (t[0] === "input"){ // placeholder, default value, range/num: max,min,step
    let rowL = { style: "display: flex; width: 100%", className: "packRow", childStyle: {}, children: [
        {name: "placeholder", type: "input", obj: inpList.find(x => x.id === "mcPlaceholder")},
        {name: "defaultVal", type: "input", obj: inpList.find(x => x.id === "mcDefaultVal")}
    ] }
    if (t[1] === "color"){rowL.children = rowL.children.filter(x => x.name !== "placeholder")}
    if (t[1] === "textarea"){
        rowL.children.push({name: "resize", type: "dropdown", obj: {
        type: "dropdown-static",
        text: "Resize", ops: ["Both","Horizontal","Vertical","None"], defaultVal: "Both", fList: {click: function(){getModOptions()}}, style: []
        }})
        console.log(rowL)
    }
    if (t[1] === "range" || t[1] === "number"){
        rowL.children.push({name: "max", type: "input", obj: inpList.find(x => x.id === "mcMax")})
        rowL.children.push({name: "min", type: "input", obj: inpList.find(x => x.id === "mcMin")})
    if (t[1] === "range"){
        rowL.children.push({name: "step", type: "input", obj: inpList.find(x => x.id === "mcStep")})
        rowL.children = rowL.children.filter(x => x.name !== "placeholder")
        }
    }

        let pack = createPackRow(rowL,objStyle); p.appendChild(pack)
} else if (t[0] === "dropdown"){ // options
    let op = createDropdown(dpList.find(x => x.id === "mcOptions")); p.appendChild(op)
} else if (t[0] === "table"){ // table
let rws = inpList.find(x => x.id === "mcRows");
let cls = inpList.find(x => x.id === "mcCols");
p.appendChild(createInput(rws)); p.appendChild(createInput(cls));
if (t[1] === "expandable"){
    p.appendChild(createDropdown(dpList.find(x => x.id === "mctExpandable")))
}

    let tbd = document.createElement("div"); tbd.id = "mcTableOptionsDiv"; p.appendChild(tbd);
    let titleStyle = {
        type: "Title", value: "Title",
        color: "#000000", fontFamily: "Noto Sans", fontSize: "1em", backgroundColor: "#ffffff"
    }
    let inpStyle = {
        type: "Placeholder", value: "Input",
        color: "#000000", fontFamily: "Noto Sans", fontSize: "1em", backgroundColor: "#ffffff"
    }

    let js = {rows: 2, cols: 2, table: [
        [{type: "Title", value: "Title", style: titleStyle}, {type: "Title", value: "Title", style: titleStyle}],
        [{type: "Input", value: "Input", style: inpStyle}, {type: "Input", value: "Input", style: inpStyle}]
    ]}; if (obj.table){js = obj}; tbd.dataset.data = JSON.stringify(js)
    let tbdUI = cre("div"); tbdUI.id = "mcTOPrev"; tbd.appendChild(tbdUI)

    let tb = createPrepTable(JSON.parse(tbd.dataset.data)); tbdUI.appendChild(tb);
    //let tbdOP = cre("div"); tbdOP.id = "mcTOODiv"; tbd.appendChild(tbdOP)


} // table
else {console.log("err")}
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


function mccbPopup(obj){ let c = coverDiv(pd("content"));
    let id = pd("moduleCreator").dataset.id; if (id){obj.id = id;}

    let d = cre("div"); d.id = "mccbPopup"; c.appendChild(d);
    let prev = cre("div"); prev.id = "mccbpPrev"; d.appendChild(prev);
    createPreview(prev,obj);

    let bot = cre("div"); bot.id = "mccbpBot"; d.appendChild(bot);
    let tx = cre("div"); tx.id = "mccpbText";
    tx.innerText = "[" + obj.name + "] \nwas created!"; bot.appendChild(tx);
        if (obj.id){tx.innerText = "[" + obj.name + "] \nwas edited!";}

    let btnl = cre("div"); btnl.id = "mccpbBList"; bot.appendChild(btnl);
    let b1 = coolButton("Create New Mod","add_circle"); btnl.appendChild(b1);
    b1.onclick = function(){c.remove(); pd("moduleCreator").parentNode.remove(); createModuleCreator("content")}

    let b2 = coolButton("Go to List","list"); btnl.appendChild(b2);
    b2.onclick = function(){c.remove(); pd("moduleCreator").parentNode.remove(); createModuleManager("content")}

    let b3 = coolButton("Close","list"); btnl.appendChild(b3);
    b3.onclick = function(){
        c.remove(); pd("moduleManager").refresh();
    }

    if (obj.id){
        let ind = modList.findIndex(x => x.id === obj.id);
        modList[ind] = obj; saveLS();
    }
    else {
        obj.id = randomUntil(5,5,modList);
        modList.push(obj); saveLS();
    }; pd("moduleManager").refresh()
    if (pd("moduleManager") !== null){pd("moduleManager").refresh();}
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
    if (obj.children){for (var i=0; i<obj.children.length; i++){
    let child = obj.children[i]; let c; //console.log(i,child)
        if (child.type === "opsList"){let a = child.args; c = ptCreateOps(a[0],a[1],a[2],a[3],a[4]);
            array.push([child.name,c]);
            if (styleObj && c.options){ let sarr = {}; let op = c.options();
                for (var x=0; x<op.length; x++){ let st = op[x]; if (styleObj[st]){sarr[st] = styleObj[st]}}; c.refresh(sarr);}
        }
        else if (child.type.includes("input")){c = createInput(child.obj);
            array.push([child.name,c]);
            if (styleObj && child.name in styleObj){c.inputElem.value = styleObj[child.name];
                if (typeof styleObj[child.name] === "boolean" && child.obj.type.includes("check")){c.inputElem.checked = styleObj[child.name]}
            }}
        else if (child.type.includes("dropdown")){c = createDropdown(child.obj);
            array.push([child.name,c]);
            if (styleObj && child.name in styleObj){c.select(styleObj[child.name]);}}
        else {console.log("err"); return}

        m.appendChild(c); c.dataset.name = child.name;
    }}
    m.list = function(){let r = {};
        for (var i=0; i<array.length; i++){ let at = array[i];
            if (at[1].classList.contains("inputContainer")){
                if (typeof at[1].getVal() === "boolean" || at[1].getVal().length > 0){r[at[0]] = at[1].getVal();}
            } else if (at[1].classList.contains("opDiv")){
                let lis = at[1].getValue(); for (key in lis){r[key] = lis[key]}
            } else if (at[1].classList.contains("dropdownContainer")){
                r[at[0]] = at[1].input()
            } else {console.log("err",i,at); break}
        };
    return r
    };
    m.refresh = function(styleList){
         console.log(styleList)
        for (var x=0; x<m.childNodes.length; x++){let mr = m.childNodes[x];
            if (mr.classList.contains("opDiv")){
                mr.refresh(styleList);
            }
            else if (mr.classList.contains("inputContainer")){
                if (styleList[mr.dataset.name]){mr.inputElem.value = styleList[mr.dataset.name]}
            }  else if (mr.classList.contains("dropdownContainer")) {
                if (mr.dataset.name !== undefined){
                mr.select(styleList[mr.dataset.name])}
                    else {console.log("--",mr)}
            } else {console.log("?")}
        }
    }
    m.addListener = function(type,func){
        for (var x=0; x<m.childNodes.length; x++){ let mr = m.childNodes[x];
            if (mr.classList.contains("opDiv")){
                mr.addListener(type,func)
            }
            else if (mr.classList.contains("inputContainer")){
                mr.inputElem.addEventListener(type,func)
            }  else if (mr.classList.contains("dropdownContainer")) {
                mr.addListener(type,func)
            } else {console.log("?")}
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


txld.addListener = function(type,func){
for (var i=0;i<txld.childNodes.length; i++){
    txld.childNodes[i].addListener(type,func)
}}

    return txld
}