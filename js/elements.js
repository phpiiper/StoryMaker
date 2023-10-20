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

function headerDrag(event,main){
    let x = event.clientX; let y = event.clientY;
    let ohThis = this; if (!ohThis.classList){ohThis = event.target}
    document.onmousemove = function(event){ event.preventDefault();
        let evt = ohThis.parentNode;
        let bd = evt.parentNode.getBoundingClientRect();
            if (main !== undefined){bd = main.getBoundingClientRect();}
        let ed = evt.getBoundingClientRect();
        let bdr = [bd.width,bd.height]; let edr = [ed.width,ed.height]
        let hdr = [ohThis.getBoundingClientRect().width,ohThis.getBoundingClientRect().height]
        //console.log(bdr,event.x,event.y)
        let perc = [event.x/bdr[0]*100,event.y/bdr[1]*100]
        evt.style.left = "calc(" + perc[0] + "%" + " - " + edr[0]/2+"px)";
        evt.style.top = "calc(" + perc[1] + "%" + " - " + ohThis.getBoundingClientRect().height+"px)";

        if (perc[0] - edr[0]/2/bdr[0]*100 < 0){evt.style.left = "0px"}
        if (perc[0] + edr[0]/2/bdr[0]*100 >= 100){evt.style.left = (100 - edr[0]/bdr[0]*100) + "%"}

        if (perc[1] - hdr[1]/bdr[1]*100 < 0){evt.style.top = "5px"}
        if (perc[1] + (edr[1]-hdr[1])/bdr[1]*100 >= 100){evt.style.top = (100 -(edr[1]+5)/bdr[1]*100)+"%";}
    }
    document.onmouseup = function(){ event.preventDefault();
        document.onmousemove = null; document.onmouseup = null;
    }; //document.onmouseout = document.onmouseup;
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



function createDropdown(obj){
function cdInput(x){
let div = cre("div","dpOption");
// moving function
div.addEventListener("click",function(){
if (div.parentNode.classList.contains("dpBot")){
    if (obj.type.includes("static")){
        if (ct.input().length > 0){ let lis = ct.inputElem();
            for (var i=0; i<lis.childNodes.length; i++){ bot.appendChild(lis.childNodes[i]); }; ct.sort(ct.listElem());
        }}; inp.prepend(div);
    }// move TO list
else { if (!obj.type.includes("static")){ div.remove();} } // move BACK
    });

    if (typeof x === "string"){div.innerText = x;
    } else { // OBJECT
        let types = ["title", "name", "text", "id"];
        for (var i=0; i<types.length; i++){if (x[types[i]]){ div.innerText = x[types[i]]; break }}}
    div.item = function(){return x}
    div.id = x.id;
    if ("fList" in obj){ // event listeners WHEN selected - css trickery
        for (key in obj.fList){ div.addEventListener(key,obj["fList"][key])}}
    return div
} // cdInput
    // MAIN CONTAINER OF DROPDOWN
let ct = cre("div","dropdownContainer"); ct.dataset.data = JSON.stringify(obj);
    let div = cre("div","dropdown"); ct.appendChild(div); // Actual dropdown
    let top = cre("div","dpTop"); div.appendChild(top);
        let inp = document.createElement("div"); if (obj.type.includes("input")){inp = document.createElement("input");}; top.appendChild(inp);
        let bot = cre("div","dpBot"); div.appendChild(bot);
    if (obj.ops){ for (var i=0; i<obj.ops.length; i++){
        bot.appendChild(cdInput(obj.ops[i]))} }
    if (obj.type.includes("static")){
    // Add button
    let sh = ic("arrow_drop_down"); top.appendChild(sh);
    } else { // INPUTS
    // Add button
        let sh = ic("add_circle"); top.appendChild(sh); sh.addEventListener("click",function(x){
        let tx = inp.value; if (typeof x === "string"){tx = x;}
        if (tx.length > 0){
            let o = cdInput(tx); inp.before(o); inp.value = "";
        }}); inp.addEventListener("keyup", function(){if (event.key === "Enter"){sh.click()}});
        if (obj.fList && obj.fList.keyup){inp.addEventListener("keyup",obj.fList.keyup)}
    }

    /* methods */
    div.arr = function(){return Array.from(top.childNodes).find(x => x.nodeName === "SPAN")};
    div.options = function(){
        if (!obj.ops) {return false} else {return this.input(obj.ops)}}
    div.listElem = function(){return bot;};
    div.list = function(){return Array.from(this.listElem().childNodes);}
    div.inputElem = function(){
        if (inp.nodeName === "DIV"){return top.childNodes[0]} // p elem of (Static) dropdown top
        return Array.from(top.childNodes).filter(x => x.classList.contains("dpOption"))
    }
    div.input = function(x){
        if (typeof x === "string"){return x}
        let arr = []; let list = this.inputElem(); if (x){list = x;}
            if (!Array.isArray(list) && list.nodeName){list = Array.from(list.childNodes)} // element
        for (var i=0; i<list.length; i++){ let item = list[i];
            if (x === undefined || list.nodeName) {item = list[i].item();}
//console.log(item)
            if (typeof item === "string"){arr.push(item);}
            else {
                let types = ["title","name", "text", "id","value"];
                for (var i=0; i<types.length; i++){if (item[types[i]]){
                    arr.push(item[types[i]]); break;
                }}}}
        if (arr.length === 1){return arr[0]}
        return arr
    };
    div.sort = function(elem){
        let ops = this.input(this.options()); let ec = Array.from(elem.childNodes);
        for (var i=0; i<ops.length; i++){
            let r = ec.find(x => div.input(x.item()) === ops[i]);
            if (r) {elem.appendChild(r);}
        }
    }
    div.select = function(tx){ // for static only --> leave blank to just remove all selected options and sort
        let inputs = this.inputElem();
            while (inputs.childNodes.length > 0){
                bot.appendChild(inputs.childNodes[0]);
            }; this.sort(bot);
        let lis = this.list();
            if (tx){
                let selectedDiv = lis.find(x => x.innerText.toLowerCase() === tx.toLowerCase());
                inp.appendChild(selectedDiv);
                    //console.log(selectedDiv);
                return selectedDiv }
    }
    div.addListener = function(type,func){
        // add listener for ALL options
        /* TOP and BOT */
        for (var i=0; i<top.childNodes.length; i++){
            console.log(i)
        }
        console.log(top)
        console.log(bot)
    }

    ct.options = div.options; ct.listElem = div.listElem; ct.list = div.list; ct.inputElem = div.inputElem; ct.input = div.input; ct.sort = div.sort; ct.select = div.select; ct.addListener = div.addListener;

    if (obj.id) {div.id = obj.id;}



    // key STYLE exists
    if (obj.style){
        let styleObj = {parent: {}, child: {}}
        for (var i=0; i<obj.style.length; i++){ let sob = obj.style[i];
            if (sob.affect.includes("parent")){styleObj.parent[sob.type] = sob.val;}
            if (sob.affect.includes("child")){styleObj.child[sob.type] = sob.val;}
        } // get styles
        for (key in styleObj.parent){ct.style[key] = styleObj.parent[key];}
        let lis = div.list()
        for (var i=0; i<lis.length; i++){
            for (key in styleObj.child){lis[i].style[key] = styleObj.child[key];}
        }
    }
    // key TEXT exists
    if (obj.text) {
        let tx = cre("span"); ct.appendChild(tx); tx.innerText = obj.text;
        if ("textStyle" in obj){tx.style = obj.textStyle}
    }
    // if value exists
    if (obj.defaultVal || obj.value){
        if (obj.defaultVal){ct.select(obj.defaultVal)}
        if (obj.value){ct.select(obj.value)}
    }

    return ct;
}

function createInput(obj){
    let inpD = document.createElement("div"); inpD.className = "inputContainer"; inpD.dataset.data = JSON.stringify(obj);
    let inp; if (obj.type.includes("textarea")) {inp = document.createElement("textarea")} else {
        inp = document.createElement("input"); inp.type = obj.type.split("-")[1];};
    inpD.appendChild(inp); inp.className = "input";

    inp.addEventListener("keyup",function(){
        if (inp.parentNode.parentNode.id !== "mcPreviewMod" && document.getElementById("moduleCreator") !== null){
            saveDataset("moduleCreator","data",getModOptions());}})
    if ("fList" in obj){for (key in obj.fList){inp.addEventListener(key,obj.fList[key])}}
    if ("text" in obj){let sp = document.createElement("span"); sp.innerText = obj.text; inpD.appendChild(sp);
        if ("textStyle" in obj){sp.style = obj.textStyle}
    }
    if (obj.id){inp.id = obj.id;}
    if (obj.resize){inp.style.resize = obj.resize;}
    if (obj.min){inp.min = obj.min;}
    if (obj.max){inp.max = obj.max;}
    if (obj.step){inp.step = obj.step;}
    if (obj.defaultVal){inp.value = obj.defaultVal;}
    if (obj.value){inp.value = obj.value;}
    if (obj.placeholder){inp.placeholder = obj.placeholder;}
    inpD.inputElem = inp;
    for (var i=0; i<obj.style.length; i++){ // ALL styles
        let s = obj.style[i];  //console.log(s)
        if ("affect" in s && s.affect.includes("parent")){ inpD.style[s.type] = s.val;}
        if ("affect" in s && s.affect.includes("child")){inp.style[s.type] = s.val; }
    };
    inp.getVal = function(){return inp.value;}; inpD.getVal = function(){return inp.value}
    return inpD
}


function createTable(obj){ let tdiv = document.createElement("div"); tdiv.className = "tableDiv";
    let t = document.createElement("div"); t.className = "table"; tdiv.appendChild(t); t.dataset.data = JSON.stringify(obj);
        t.data = function(){return JSON.parse(this.dataset.data);}
    //console.log(obj)
    // cols, name, rows, style, table, type
        // {   type: "Title", value: "Header", style: {}  }
    for (var i=0; i<obj.table.length; i++){ let row = document.createElement("div"); row.className = "row"; t.appendChild(row);
        let r = obj.table[i]; for (var x=0; x<r.length; x++){
            let cell = ctCell(r[x],[i,x],t); row.appendChild(cell);
        }
    }

    tdiv.json = function(){return JSON.parse(t.dataset.data)}
    tdiv.set = function(json,key){
        if (key === "all"){
            t.dataset.data = JSON.stringify(json);
            tdiv.dataset.data = JSON.stringify(json)
        } else {
            let j = this.json(); j[key] = json;
            t.dataset.data = JSON.stringify(j);
            tdiv.dataset.data = JSON.stringify(j);
        }
    }
    tdiv.save = function(){ let arr = [];
        for (var i=0; i<t.childNodes.length; i++){
            let row = []; let r = t.childNodes[i];
            for (var x=0; x<r.childNodes.length; x++){
                row.push(r.childNodes[x].data())
            }; arr.push(row);
        };
        tdiv.set(arr,"table");
        tdiv.set(t.childNodes.length,"rows")
        tdiv.set(t.childNodes[0].childNodes.length,"cols")
        return arr
    }
    tdiv.change = function(loc,json){
        this.findCell(loc).dataset.data = json;
        return t.childNodes[loc[0]].childNodes[loc[1]];
    }
    tdiv.replace = function(loc,json){
        let child = this.findCell(loc)
        let replace = ctCell(json,child.loc(),t); child.after(replace); child.remove();
    }
    tdiv.findCell = function(loc){return t.childNodes[loc[0]].childNodes[loc[1]]}
    t.json = tdiv.json; t.set = tdiv.set; t.save = tdiv.save; t.change = tdiv.change; t.refresh = tdiv.refresh; t.replace = tdiv.replace; t.findCell = tdiv.findCell;


// IF table-expandable
if (obj.type.includes("expandable")){
    // RIGHT, BOTTOM, BOTH
    let top = cre("div",undefined,"display: flex; height: calc(100% - 2em);");
        top.appendChild(t);
        let expR = cre("div","tablePlus","width: 1.5em; height: 100%; align-items: center; justify-content: center;");
        top.appendChild(expR); expR.innerText = "+";
    let bottom = cre("div",undefined,"display: flex;");
        let expB = cre("div","tablePlus","width: calc(100% - 1.5em); height: 1.5em; align-items: center; justify-content: center;");
        bottom.appendChild(expB); expB.innerText = "+";
    tdiv.appendChild(top); tdiv.appendChild(bottom);
    top.table = t; bottom.table = t;
// expand right //
expR.onclick = function(){ // add new column
    for (var i=0; i<t.childNodes.length; i++){
        let row = t.childNodes[i]
        let addCell = ctCell(row.childNodes[row.childNodes.length-1].data(),[i,row.childNodes.length],t);
        row.appendChild(addCell)
    }; t.save();
}
expB.onclick = function(){
    let lastRow = t.childNodes[t.childNodes.length-1];
    let newRow = document.createElement("div"); newRow.className = "row"; t.appendChild(newRow);
    for (var i=0; i<lastRow.childNodes.length; i++){
        let lastRowCellData = lastRow.childNodes[i].data();
        newRow.appendChild(ctCell(lastRowCellData,[t.childNodes.length-1,i],t));
    }; t.save();
}



    if (obj.expand === "Right"){bottom.remove();}
    if (obj.expand === "Bottom"){expR.remove(); expB.style.width = "100%";}
    tdiv.style.flexDirection = "column"
}
// STYLES //
if (obj.style && obj.style.length > 0){
    for (var i=0;i<obj.style.length; i++) {
     let st = obj.style[i];
        // affect parent
        if (st.affect.includes("parent")){tdiv.style[st.type] = st.val;}
        // affect child
        if (st.affect.includes("child")){t.style[st.type] = st.val;}
    }
}


    return tdiv
}
function ctCell(obj,loc,tb){
    let c = obj; let cell; if (c.type === "Title"){
        cell = cre("div","cell"); cell.innerText = "[" + c.value + "]";
        if (c.value){cell.innerText = c.value;}
    } else {
        cell = cre("input","cell"); cell.placeholder = c.value;
    }

    if (c.style){for (key in c.style){cell.style[key] = c.style[key]}}
    cell.table = function(){return tb}
    cell.cell = function(loc){
        return cell.table().childNodes[loc[0]].childNodes[loc[1]]
    }
    cell.loc = function(){return loc};
    cell.data = function(){return JSON.parse(this.dataset.data)}
    cell.change = function(data){cell.dataset.data = JSON.stringify(data)}
    cell.popup = function(l){
        if (pd("ctPopup") !== null){pd("ctPopup").remove();}
        let popup = cre("div"); popup.id = "ctPopup";
        this.table().parentNode.parentNode.appendChild(popup);
        // close
        let h = cre("div",undefined,"width: 100%; height: 1.5em; background-color: black; display: flex; justify-content: right; align-items: center; padding: 0.25em 0.5em;"); popup.appendChild(h)
        let sp = cre("span",undefined,"color: white; cursor: pointer; user-select: none;"); sp.innerText = "X"; h.appendChild(sp); sp.onclick = function(){popup.remove()}
        // pop up option settings
        // CHANGE TYPE, DELETE ROW, DELETE (AND CHANGE VALUE)
        let ops = cre("div",undefined,"width: 100%; height: 100%;"); popup.appendChild(ops);
        let ty = coolButton("Change Type","cached","blank"); ops.appendChild(ty); ty.onclick = function(){
            let r = cell.cell(loc).data(); let p = cell.table();
            if (r.type === "Title"){r.type = "Input"} else {r.type = "Title"}
            p.replace(loc,r);
            p.findCell(loc).oncontextmenu();
        }
        let cv = coolButton("Change Value","ink_pen","blank"); ops.appendChild(cv); cv.onclick = function(){
            let r = cell.cell(loc).data(); let p = cell.table();
                // ASK FOR INPUT
                let prpt = prompt("Rename this from [" + r.value + "]? ",r.value)
                if (!prpt){return}
                r.value = prpt
            p.replace(loc,r);
            p.findCell(loc).oncontextmenu();
        }
        let dr = coolButton("Delete Row","table_rows","blank"); ops.appendChild(dr); dr.onclick = function(){
            cell.parentNode.remove(); popup.remove()
        }
        let dc = coolButton("Delete Column","view_week","blank"); ops.appendChild(dc); dc.onclick = function(){
            let l = cell.loc()[1]; let t = cell.table();
            for (var i=0; i<t.childNodes.length; i++){
                t.childNodes[i].childNodes[l].remove();}
            popup.remove()
        }

        popup.loc = function(){return l.loc()};
        return popup
    }
    cell.oncontextmenu = function(){event.preventDefault();
        let pop = cell.popup(this.loc());
        if (pd("slctCell") !== null){pd("slctCell").id = "";}
        cell.id = "slctCell"; let head = pop.childNodes[0];
        pop.style.left = "1em"; pop.style.top = "1em";
        head.onmousedown = headerDrag;
    }
    cell.setDataset = function(key,data){
        this.dataset[key] = JSON.stringify(data);
    };
    cell.getDataset = function(key){return JSON.parse(this.dataset[key])}
    cell.save = function(obj){
        for (key in obj.style){this.style[key] = obj.style[key]}
        cell.setDataset("data",obj);
    }

    cell.setDataset("data",obj)
    return cell
}


function createPrepTable(obj){ let pt = pd("mcPrepTable"); if (pt !== null){pt.remove();}
    //console.log("210",((pt === null) ? pt : JSON.parse(pt.dataset.data).table),obj.table)
    //if (pd("mcptPopup") !== null){pd("mcptPopup").remove();}
pt = document.createElement("div"); pt.id = "mcPrepTable"; pt.dataset.data = JSON.stringify(obj);
    pt.findCell = function(loc){return pt.childNodes[loc[0]].childNodes[loc[1]];}

for (var i=0; i<obj.table.length; i++){ let r = obj.table[i]; let rd = document.createElement("div"); rd.className = "row"; pt.appendChild(rd); for (var x=0; x<r.length; x++){
    rd.appendChild(createPTCell(r[x],pt,i,x))
} } // x, i
    return pt
} // preptable
function createPTCell(obj,table,i,x){let c = obj; let location = [i,x];
    let cell = cre("div","cell");
    cell.innerText = "["+c.type+"]"; if (c.value){cell.innerText = c.value;}

let icon; if (c.type === "Input"){icon = ic("keyboard_keys");
} else {icon = ic("text_fields"); }; cell.appendChild(icon);
icon.style = "position: absolute; right: 0; bottom: 0; margin: 0.2em; font-size: 0.8em;";

cell.data = function(){return this.getDataset("data")}
cell.loc = function(){return location}
cell.table = function(){return table}
cell.setDataset = function(key,data){ cell.dataset[key] = JSON.stringify(data);};
cell.getDataset = function(key){return JSON.parse(cell.dataset[key])}

    if (c.style) {c.style.type = c.type;}
    cell.setDataset("data",c)

cell.onclick = function(){
if (pd("selectedCell") !== null){pd("selectedCell").id = ""}; this.id = "selectedCell";
//console.log(pd("mcptPopup"))
if (pd("mcptPopup") !== null){
    let r = pd("mcptPopup"); //console.log(r.loc(),this.loc())
    if (r.loc().toString() !== this.loc().toString()) {
        r.changeLoc(this.loc());
        r.replace(cell.getDataset("data").style)
    } //; console.log(r.loc())
    return
}
    let pop = cre("div"); pop.id = "mcptPopup";
    //this.table().parentNode.appendChild(pop);
    pd("mcRightDiv").appendChild(pop)
    let top = cre("div",undefined,"width: 100%; height: 2em; background-color: black; display: flex; align-items: center; justify-content: right;");
    pop.appendChild(top)
    let x = cre("div",undefined,"padding: 0.25em; padding-right: 0.5em; cursor: pointer; color: white;"); x.onclick = function(){pop.remove()}; top.appendChild(x); x.innerText = "X";
// POSITION CORRECTLY
// OPTIONS
let slctObj = table.findCell(this.loc()).data();
//console.log(slctObj)
    let r1 = {style: "display: flex; width: calc(100% - 1em); margin: 0.5em;", className: "packRow", childStyle: {}, children: [
            {name: "type", type: "dropdown", obj: {
                    type: "dropdown-static", text: "Type", ops: ["Title","Input"], style: [{type: "height", val: "3em", affect: "parent"}],
                    fList: {click: function(){ptSave()}},
                    defaultVal: this.table().findCell(location).data().type
                }},
            {name: "color", type: "input", obj: {
                    type: "input-color", text: "Color", style: [
                        {type: "width", val: "5em", affect: "parent"},
                        {type: "padding", val:"0 0.1em", affect: "child"},
                        {type: "borderRadius", val: "0", affect: "child"},
                        {type: "borderLeft", val: "none", affect: "child"},
                        {type: "borderRight", val: "none", affect: "child"}
                    ],
                    fList: {input: function(){ptSave()}}
                }},
            {name: "value", type: "input", obj: {
                    type: "input-text", text: "Text", style: [{type: "width", val: "100%", affect: "parent"}, {type: "borderRadius", val: "0", affect: "child"}], defaultVal: this.table().findCell(location).data().type,
                    fList: {keyup: function(){ptSave()}}
                }}
        ]}; let row1 = createPackRow(r1,slctObj.style); pop.appendChild(row1);
    let r2 = {style: "display: flex; width: calc(100% - 1em); margin: 0.5em;", className: "packRow", childStyle: {}, children: [
            {name: "fontFamily", type: "input", obj: {
                    type: "input-text", text: "Font Family", style: [
                        {type: "borderRadius", val: 0, affect: "child"},
                        {type: "borderRight", val: "none", affect: "child"}
                    ], defaultVal: "Noto Sans",
                    fList: {keyup: function(){ptSave()}}
                }},
            {name: "fontSize", type: "input", obj: {
                    type: "input-text", text: "F. Size", style: [
                        {type: "width", val: "5em", affect: "parent"}, {type: "borderRadius", val: "0", affect: "child"}
                    ], defaultVal: "1em",
                    fList: {keyup: function(){ptSave()}}
                }},
            {name: "backgroundColor", type: "input", obj: {
                    type: "input-color", text: "Backgr. Col.", style: [
                        {type: "width", val: "calc(100% - 8em)", affect: "parent"},
                        {type: "padding", val:"0 0.1em", affect: "child"},
                        {type: "borderRadius", val: "0", affect: "child"},
                        {type: "borderLeft", val: "none", affect: "child"}
                    ], defaultVal: "#ffffff",
                    fList: {input: function(){ptSave()}}
                }}
        ]}; let row2 = createPackRow(r2,slctObj.style); pop.appendChild(row2);
    let r3 = {style: "display: flex; width: calc(100% - 1em); margin: 0.5em;", className: "packRow", childStyle: {}, children: [
            {name: "BIU", type: "opsList", args: [
                    [{icon: "format_bold", value: {fontWeight: "bold"}},{icon: "format_italic", value: {fontStyle: "italic"}},{icon: "format_underlined", value: {textDecoration: "underline"}}],
                    "multi", function(){
                        ptSave()
                    }, "width: 33%; border: 2px solid black; margin-right: 0; margin-left: 0;", "width: 33%; font-size: 1em"
                ]},
            {name: "justify-text", type: "opsList", args: [
                    [{icon: "format_align_left", value: {justifyContent: "left"}},{icon: "format_align_center", value: {justifyContent: "center"}},{icon: "format_align_right", value: {justifyContent: "right"}}],
                    "single", function(){
                        ptSave()
                    }, "width: 33%; border: 2px solid black; border-left: none; margin-left: 0; margin-right: 0;", "width: 33%; font-size: 1em"
                ]},
            {name: "align-text", type: "opsList", args: [
                    [{icon: "vertical_align_top", value: {alignItems: "left"}},{icon: "vertical_align_center", value: {alignItems: "center"}},{icon: "vertical_align_bottom", value: {alignItems: "right"}}],
                    "single", function(){
                        ptSave()
                    }, "width: 33%; border: 2px solid black; border-left: none; margin-left: 0;", "width: 33%; font-size: 1em"
                ]}
        ]}; let row3 = createPackRow(r3,slctObj.style); pop.appendChild(row3);

pop.table = function(){return table}
pop.changeLoc = function(x){location = x;}
pop.loc = function(){return location}
pop.getStyles = function(){ //let c = table.findCell(location);
    let list = {};
    let rows = [row1.list(),row2.list(),row3.list()]
    for (var ri=0;ri<rows.length;ri++){for (key in rows[ri]){
        list[key] = rows[ri][key]
    }}
    return list
};
pop.refresh = function(styleList){
    //console.log(this.loc(),styleList)
    for (var i=1; i<pop.childNodes.length;i++){ pop.childNodes[i].refresh(styleList); }
}


pop.refresh(cell.getDataset("data").style)
//console.log(pop.loc())
    //console.log("HOLA")
}; // onclick popup
return cell
}


function ptCreateOps(arr,type,f,pStyle,opStyle) {let opd = cre("div","opDiv"); opd.dataset.data = JSON.stringify({});
    if (pStyle){opd.style = pStyle;}
    /* array = [
        ["icon","value"]
    ]
     */
for (var i=0; i<arr.length; i++){
let op = cre("div","opdOp"); opd.appendChild(op); let a = arr[i]
    let icon = ic(a.icon); op.appendChild(icon); op.dataset.data = JSON.stringify(a.value); if (opStyle){op.style = opStyle;};
        op.data = function(){return a}
    op.onclick = function(){
        let c = JSON.parse(opd.dataset.data); let option = JSON.parse(op.dataset.data);
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
                c = option; //console.log(c,opd.childNodes.length)
                for (var x=0; x<opd.childNodes.length; x++){
                    opd.childNodes[x].classList.remove("selected");
                    };
                //console.log(op)
                op.classList.add("selected");};
        }; opd.dataset.data = JSON.stringify(c);
           // console.log(c)
    }
        if (f){op.addEventListener("click",f)}
}; // loop
    opd.options = function(){ let arr = [];
        for (var i=0; i<opd.childNodes.length; i++){
            let v = opd.childNodes[i].data().value;
            if (typeof v === "object" && !Array.isArray(v)){arr = arr.concat(Object.keys(v))} else {arr.push(v)}
        }
    return arr
    }
    opd.refresh = function(ops){ let d = getDataset(opd,"data"); d[1] = ops; d[0].dataset.data = JSON.stringify(d[1]);
        for (var i=0; i<opd.childNodes.length; i++){ let oc = opd.childNodes[i];
        if (JSON.stringify(d[1]) === JSON.stringify(oc.data().value)){oc.classList.add("selected"); console.log("HUH")
        } else {oc.classList.remove("selected")}
        }
       // console.log(ops)
    };
    opd.getValue = function(){
        let ob = {};
        for (var i=0; i<opd.childNodes.length; i++){
            if (opd.childNodes[i].classList.contains("selected")){
                let dp = JSON.parse(opd.childNodes[i].dataset.data); for (key in dp){ob[key] = dp[key];}
            }
        }
        return ob;
    }
    opd.addListener = function(type,func){
        for (var i=0; i<opd.childNodes.length; i++){
            opd.childNodes[i].addEventListener(type,func)
        }
    }

    return opd
}