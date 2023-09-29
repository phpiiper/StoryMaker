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