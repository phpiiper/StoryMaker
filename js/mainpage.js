/* HOME PAGE */
function createHomePage(parent){
let p = pd(parent); let div = cre("div"); div.id = "homePage";


// TITLE of Website
let tx = cre("h1"); tx.id = "hpTitle"; div.appendChild(tx);
    tx.innerText = "Character Creator";

// LINKS
let ld = cre("div"); ld.id = "hpLinksDiv"; div.appendChild(ld);
    /*let rd = createElement({
        type: "a", tags: {href: "https://www.reddit.com",target: "_blank", innerText: "REDDIT", className: "hpLink no-underline"}
    }); ld.appendChild(rd)*/
    let gh = createElement({
        type: "a", tags: {href: "https://github.com/phpiiper",target: "_blank", innerText: "GITHUB", className: "hpLink no-underline"}
    }); ld.appendChild(gh)
// current state
let cs = createElement(ceList.find(x => x.i === "CurrentState"));
div.appendChild(cs);
    // header dropdown
    let csdp = createDropdown({
    type: "dropdown-static", ops: curStateList,
    fList: {click: function(){
        let csObj = curStateList.find(x=> x.id === this.id);
        while (cstd.childNodes.length > 0) { cstd.childNodes[0].remove(); }
        // TITLE
        let h1 = cre("div"); h1.innerText = "[" + csObj.date[0] + "/" + csObj.date[1] + "] " + csObj.title; cstd.appendChild(h1);
        // TEXT
        for (var i=0;i<csObj.text.length;i++){
            let tx = csObj.text[i]; let e;
            if (typeof tx === "string"){e = cre("p"); e.innerHTML = tx;
            } else {e = createElement(tx);}
            cstd.appendChild(e);
        }
    }}, style: []
    });
    cs.appendChild(csdp);
    // text
    let cstd = cre("div"); cstd.id = "hpcsTextDiv"; cs.appendChild(cstd);

                csdp.list()[1].click()
// button lists!
// Stories, Modules, How to Use, Settings
let bl = createElement(ceList.find(x => x.i === "hpBtns"));
div.appendChild(bl)
p.appendChild(div);

// state

return div
}


function createStoryManager(parent){
let c = coverDiv(parent); let div = cre("div"); div.id = "storyManager";

div.select = function(id){
    Array.from(sl.childNodes).find(x => x.dataset.id === id).click()
}
div.openStory = function(id){   if (!id){return}
while (rbot.childNodes.length > 0){rbot.childNodes[0].remove();}
div.dataset.id = id;
div.story = function(){return storyList.find(x => x.id === id)}
    //console.log(id)

// Char Sheet LEFT
let lf = cre("div","left"); rbot.appendChild(lf);
    let csprev = cre("div"); csprev.id = "smCharSheet"; lf.appendChild(csprev);
        csprev.refresh = function(){
            console.log("REFRESH_CHARSHEET")
        }
    let cstx = cre("span"); cstx.innerText = "Character Sheet"; lf.appendChild(cstx);
// Options RIGHT
let ro = cre("div","right"); rbot.appendChild(ro);
    // DROPDOWN
    let dp = createDropdown({
        type: "dropdown-static", ops: div.story().charList,
        style: [
            {type: "height", val: "5rem", affect: "parent"}
        ], fList: {click: function(){
            // Char selected
            div.selectedChar = this.item();
            // show page
            csprev.refresh()
        }}
    }); ro.appendChild(dp); if (dp.list().length > 0){dp.list()[0].click();}
    // EDIT CHAR, DEL Char
    let ed = createElement({
        type: "span", tags: {innerText: "Edit Character"}, methods: [{type: "click", func: function(){
            if (dp.input().length === 1){ smEditCharacter(div); }
            /* TEST */
        }}]
    }); ro.appendChild(ed)
    let del = createElement({
    type: "span", tags: {innerText: "Delete Character"}, methods: [{type: "click", func: function(){
        if (dp.input().length > 0){
        let s = div.story(); let loc = storyList.findIndex(x => x.id === s.id);
        s.charList = s.charList.filter(x => x.id !== dp.inputElem().childNodes[0].id)
        if (loc !== -1){storyList[loc] = s};
        div.openStory(s.id);
    }
            }}]
    }); ro.appendChild(del)
}

let left = cre("div","left"); div.appendChild(left)
    let sl = cre("div"); sl.id = "smList"; left.appendChild(sl)


sl.createList = function(){
while (sl.childNodes.length > 0){sl.childNodes[0].remove()};
for (var i=0; i<storyList.length; i++){
    let st = storyList[i]; let o = createElement({
    type: "div", tags: {className: "smStory"}, children: [
        {type: "div", tags: {className: "letter", innerText: st.title[0]}},
        {type: "div", tags: {className: "smsName", innerText: st.title}}
    ], methods: [
        {type: "click", func: function(){
            div.openStory(st.id)
            let mp = Array.from(sl.childNodes); mp.map(x => x.classList.remove("selected"));
            o.classList.add("selected")
            }}
    ], dataset: { id: st.id }
    });

sl.appendChild(o)
} // for loop
}



    let sb = cre("div"); sb.id = "smMenu"; left.appendChild(sb);
        let cb = coolButton("Add Story","add","flat"); cb.onclick = function(){
            smStoryAdd("content")
        }
        sb.appendChild(cb); cb.style.flexDirection = "row-reverse";

let right = cre("div","right"); div.appendChild(right);
    let rtop = createElement(ceList.find(x => x.i === "smOptions")); right.appendChild(rtop)
        // Add Char, story-charsheet, story details, GUIDE
    let rbot = cre("div"); rbot.id = "smBody"; right.appendChild(rbot); // div.openStory


c.appendChild(div)
sl.createList()

//div.select("abcd1234")
}
function smEditCharacter(parent,story,charID){
if (pd("smCharacterEditor") !== null){pd("smCharacterEditor").remove();}
let div = cre("div"); div.id = "smCharacterEditor";
    let left = cre("div","left"); div.appendChild(left);
    left.changePreview = function(){
        // get obj
        while (left.childNodes.length > 0){left.childNodes[0].remove();}
        // change
    }
    let right = cre("div","right"); div.appendChild(right);
    right.createList = function(){
        // get story sheet
    }
    right.refresh = function(){
        // put values of charID in here
    }
let rList = cre("div","list"); right.appendChild(rList);
    // where "right" changes
let btnL = cre("div","closeBtns"); right.appendChild(btnL);
    let lv = cre("div","partBtn"); btnL.appendChild(lv);
        lv.appendChild(ic("arrow_left"));
        lv.appendChild(createElement({
            type: "span", tags: {innerText: "Leave"}
        }));
    let ch = cre("div","partBtn"); btnL.appendChild(ch);
        ch.appendChild(ic("done"));


lv.onclick = function(){ div.remove();}
ch.onclick = function(){
    console.log("change")
}

pd(parent).appendChild(div)
}
function smCreateCharacterPopup(parent){
    let c = coverDiv(parent);
    let div = createElement({type: "div",
        tags: {id: "smCCPopup"}, children: [
            createInput({style: [], type: "input-text", text: "Name of Character", fList: {keyup: function(event){if (event.key === "Enter"){
                div.childNodes[1].click()
            }}}}),
            {type: "div", children: [
                    ic("check")
            ], methods: [ {type: "click", func: function(){
                if (this.previousSibling.getVal().length > 0){
                let s = pd("storyManager").story();
                let ch = {id: randomUntil(4,4,s.charList), name: this.previousSibling.getVal(), charOps: []};   s.charList.push(ch); saveLS();
                c.remove();
                div.openStory(s.id);
                } else {toast("Please write the character name in!"); this.previousSibling.inputElem.select()}
            }}  ]}
        ]
    }); c.appendChild(div)
}

function smStoryAdd(parent,obj){
    let c = coverDiv(parent);
    let del = createElement({type: "div", tags: {className: "iconDiv"}, children: [
            ic("delete"),
            createElement({type:"span", tags: {innerText: "Delete"}})
    ], methods: [{type: "click", func: function(){
        storyList = storyList.filter(x => x.id !== obj.id)
        saveLS();
        c.remove();
        pd("smList").createList();
    }}]})
    let sav = createElement({type: "div", tags: {className: "iconDiv"}, children: [
            ic("save"),
            createElement({type:"span", tags: {innerText: "Save"}})
    ], methods: [{type: "click", func: function(){
        let dt = div.getDetails();
        if (dt.title){
            if (obj){
                storyList[storyList.findIndex(x => x.id === dt.id)] = dt;
            } else {
                dt.id = randomUntil(4,4,storyList); dt.charSheet = []; dt.charList = []; dt.storySheet = [];
                storyList.push(dt);
            };
            saveLS(); c.remove();
            pd("smList").createList();
            pd("storyManager").select(dt.id)
        } else {toast("Please name the story!"); pd("smsaName").select()}
    }}]})


let div = createElement({ type: "div", tags: {id: "smStoryAdder"}, children: [
    {type: "div", tags: {className: "left"}}, // LETTER
    {type: "div", tags: {className: "center"}, children: [
        createInput({id: "smsaName", type: "input-text", text: "Story Name", fList: {keyup: function(){
            let st = div.getDetails();
            if (st.title) {
                div.firstElementChild.innerText = st.title[0].toUpperCase();
            } else {div.firstElementChild.innerText = "";}
        }}}),
        createInput({id: "smsaDesc", type: "input-textarea", text: "Description", resize: "none"})
    ]},
    {type: "div", tags: {className: "right"}, children: [
        del, sav
    ]} // OPTIONS
        ]
    });


div.getDetails = function(){
    let story = {};
    if (pd("smsaName").getVal().length > 0) {story.title = pd("smsaName").getVal();}
    if (pd("smsaDesc").getVal().length > 0) {story.desc = pd("smsaDesc").getVal();}
    return story
}
div.refresh = function(){ if (div.data){
    pd("smsaName").value = div.data.title;
    if (div.data.desc){ pd("smsaDesc").value = div.data.desc;   }
    div.firstElementChild.innerText = div.data.title[0].toUpperCase();
}}

let l = div.firstElementChild;
let r = div.lastElementChild;
    c.appendChild(div)


if (!obj){ del.remove();
} else {
    div.data = obj;
    div.refresh();
}

    return div
}

function createModuleManager(parent){
let c = coverDiv(pd(parent))
let div = cre("div"); div.id = "moduleManager"

let top = createElement(ceList.find(x=>x.i==="mmOptions"))
// CREATE MOD, DEL, CHANGE

let list = cre("div","body");

let pane = cre("div","pane");
    let pn = cre("span"); pane.appendChild(pn);
    let id = cre("span"); pane.appendChild(id);
    let type = cre("span"); pane.appendChild(type);
    let popup = ic("open_in_new"); popup.id = "mmpIcon"; pane.appendChild(popup);
        popup.onclick = function(){
            if (div.selectedModule()){
            let c = coverDiv(div);
                c.style = "padding: 4rem;"
            createPreview(c,div.selectedModule().data());}
        }
pane.reset = function(){
    pn.innerText = ""; id.innerText = ""; type.innerText = "";
    while (pd("mmPreview").childNodes.length > 0){pd("mmPreview").childNodes[0].remove()}
}
let prev = cre("div"); prev.id = "mmPreview"

div.appendChild(top); div.appendChild(list); div.appendChild(pane); div.appendChild(prev);


div.refresh = function(){
while (list.childNodes.length > 0){list.childNodes[0].remove();}
for (var i=0;i<modList.length; i++){
    list.appendChild(mmCreateModule(modList[i]));
}}
div.selectedModule = function(){
    return div.list().find(x => x.classList.contains("selected"))
}
div.list = function(){
    return Array.from(list.childNodes)
}
div.changePreview = function(){
    let m = div.selectedModule(); if (!m){
    while (prev.childNodes.length > 0){prev.childNodes[0].remove()}
    return false
    }
    m = m.data();
    // DETAILS
    pn.innerText = "NAME: " + m.name;
    id.innerText = "ID: " + m.id;
    let t1 = m.type.split("-")[0]; t1 = t1[0].toUpperCase() + t1.substring(1);
    let t2 = m.type.split("-")[1]; t2 = t2[0].toUpperCase() + t2.substring(1)
    type.innerText = "TYPE: " + t1+"-"+t2;
    // PREVIEW
    while (prev.childNodes.length>0){prev.childNodes[0].remove();}
    createPreview(prev,m)
}


c.appendChild(div)
div.refresh()
return div
}


function mmCreateModule(obj){
let div = cre("div","mmModule");
    let iconDiv = cre("div","iconDiv");
        let icon = ic(mmIconTypes[obj.type.split("-")[0]]); iconDiv.appendChild(icon);
    let tx = cre("div","mmmText"); tx.innerText = obj.name;

div.data = function(){return obj}
div.onclick = function(){
    div.select(div)
}
div.select = function(elem){ // select "elem"
let children = pd("moduleManager").list();
children.map(x => x.classList.remove("selected"));
elem.classList.add("selected")
    // CHANGE DETAIL PANE
    pd("moduleManager").changePreview();
    // SHOW PREVIEW
}
div.appendChild(iconDiv); div.appendChild(tx);
return div
}



function createGuideDiv(parent){
let c = coverDiv(parent); let div = cre("div"); div.id = "mainGuide"; c.appendChild(div);

let lf = createElement({type:"div",tags:{className:"left"}}); div.appendChild(lf);
// BASIC OVERVIEW, Creating modules, Story Sheet, Character Sheet
let bcsc = [
    {icon: "arrow_selector_tool", name: "Basic Overview", article: "basic_overview"},
    {icon: "add_ad", name: "Creating Module", article: "create_module"},
    {icon: "contract_edit", name: "Story Sheet", article: "story_sheet"},
    {icon: "person_add", name: "Character Sheet", article: "chararacter_sheet"}
];
for (var i=0; i<bcsc.length; i++){ let b = bcsc[i];
    lf.appendChild(createElement({
        type: "div", tags: {className: "mgBigOption"}, children: [
            ic(b.icon), {type: "div",tags:{innerText:b.name}}
        ], methods: [{type: "click", func: function(){
            div.article(b.article)
        }}]
    }))
}

let rg = createElement({type:"div",tags:{className:"right"}}); div.appendChild(rg);
let mlist = [
    {name: "Learn Styling Options", article: "styleOptions"},
    {name: "Tables", article: "mod_table"},
    {name: "Dropdown", article: "mod_dropdown"},
    {name: "Input", article: "mod_input"},
    {name: "Sto. Sheet Tips", article: "story_sheet_tips"},
    {name: "Cha. Sheet Advanced Styling", article: "character_sheet_advanced"}
];
for (var i=0;i<mlist.length; i++){ let m = mlist[i];
rg.appendChild(createElement({
    type: "div", tags: {className: "mgOption", innerText: m.name}, methods: [{type: "click", func: function(){
                div.article(m.article)
            }}]
    }))
}

let mex = createElement({type:"div",tags:{className:"mgOption exitBtn",innerText:"EXIT"},methods:[{type:"click",func: function(){c.remove()}}]}); rg.appendChild(mex);

div.article = function(id){
if (pd("mgArticle") !== null){pd("mgArticle").parentNode.remove();}
if (!id){return}
let art = guideArticles.find(x => x.id === id); if (!art){return}
let ca = coverDiv(div);

let a = createElement({
type: "div", tags: {id: "mgArticle"}, children: [
    {type: "div", tags: {id: "mgaBody"}},
    {type: "div", tags: {id: "mgaBtnList"}, children: [
        {type: "div", tags: {className: "mgOption exitBtn", innerText: "MENU"}, methods: [{type:"click",func: function(){
            ca.remove();
        }}]},
        {type: "div", tags: {className: "mgOption exitBtn", innerText: "EXIT"}, methods: [{type:"click",func: function(){
            c.remove();
        }}]}
    ]}
]});
ca.appendChild(a);
    pd("mgaBody").appendChild(createElement(art.obj));
    if (id === "styleOptions"){pd("mgsoPicker").select("width")}
} // div.article

return div
}


function mgStyleOptions(option){
let op = mgsoOptions.find(x => x.title === option);
if (!op){return}
let desc = pd("mgsoVal"); let inpD = pd("mgsoInputs");
    if (op.text){pd("mgsoDescTx").innerText = op.text;}

while (inpD.childNodes[2].childNodes.length > 0){inpD.childNodes[2].childNodes[0].remove()}
// ops length
let ct = cre("div","mgsoContainer"); inpD.childNodes[2].appendChild(ct)
ct.refresh = function(){
    let val = "";
    for (var i=0; i<ct.childNodes.length; i++){
        val += ct.childNodes[i].getVal() + " "
    }
    pd("mgExampleBox").style[op.style] = val;
    pd("mgsoVal").innerText = val

    if (pd("mgsoAppliedStyles") !== null) {
        function test(){
            let t = pd("mgExampleBox"); if (t === null){return false}
            t = t.style; let curStyles = []; for (var i=0; i<mgsoOptions.length; i++){curStyles.push(mgsoOptions[i].style)}
            let styles = {}
            for (key in t){
                if (t[key] !== null && typeof t[key] === "string" && t[key] !== "" && t[key].length > 0 && curStyles.includes(key)){
                    styles[key] = t[key]
                }
            }
            return styles
        }

        pd("mgsoAppliedStyles").innerText = JSON.stringify(test())
    }
}
    let ti = cre("div"); ti.innerText = op.title;
    for (var i=0; i<op.ops.length; i++){
        let mct = cre("div","mgsocDiv"); ct.appendChild(mct);
        mct.getVal = function(){
            let val = "";
            for (var i=0; i<bot.childNodes.length; i++){
                let bc = bot.childNodes[i]; let v;
                if (bc.getVal){v = bc.getVal()
                    if (v.length === 0){break}
                }
                else {v = bc.input()}
                if (v && v.length > 0){val += v.toString()}
            }
            return val
        }
            let o = op.ops[i];
            let top = cre("div","top"); top.innerText = o.name;
            let bot = cre("div","bot");
            mct.appendChild(top); mct.appendChild(bot);
            for (var x=0; x<o.ops.length; x++){ let oo = o.ops[x];
                if (oo.type.includes("input-")){
                    oo.fList.input = ct.refresh;
                    oo.fList.keyup = ct.refresh;
                    bot.appendChild(createInput(oo))
                } else {
                    oo.fList.click = ct.refresh;
                    bot.appendChild(createDropdown(oo))
                }
            }
    }
}