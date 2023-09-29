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