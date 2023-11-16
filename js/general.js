/*
Functions that are general utilized
 */

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
function selectDiv(id,type){
    let p = event.currentTarget;
    let prev = document.getElementById(id);
    if (prev !== null) {
        if (p.id === prev.id && type !== "stay"){prev.id = ""; return}
        prev.id = "";  }
    p.id = id;
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





/*
Use: Find the location in object array of the needed key as an array.
Typically used to find location based on an item's ID
*/
/* A few functions from a different project I abandoned */
function deleteItem(pID,iID,list,parentKey){
    let ids = [pID,iID]; var array = []
    if (ids.includes("MAIN")){
        for (var i=0; i<list.length; i++){  if (list[i].id !== ids[1]) {array.push(list[i])} }
        list = array;
    }
    else{
        let parent_id_loc = get_index("id",ids[0],list,parentKey)
        let parent_insides = get_insides(parent_id_loc,list,parentKey)
        let array = parent_insides.filter(x => x.id !== ids[1]);
        let parent = get_item(parent_id_loc,list,parentKey);
        parent.items = array
    }

    return list
}
function addItem(pID,obj,list,parentKey){ //parent id, note id
    let m = list; let ids = [pID,obj];
    if (ids.includes("MAIN")){m.push(ids[1]); return m}
    let addLoc = get_index("id",pID,m,parentKey);
    let addObj = get_item(addLoc,m,parentKey);
    addObj.items.push(ids[1]);
    return m
}
function insertItemAfter(index,pLoc,obj,list,parentKey){
    let m = list; let ids = [pLoc,obj];
    let p = (pLoc.length === 0) ? m : get_item(pLoc,m,parentKey)
    if (pLoc.length === 0){
        p = p.filter(x => x.id !== obj.id);
        let p1 = p.slice(0,index);
        let p2 = p.slice(index);
        p1.push(obj);
        p = p1.concat(p2);
        m = save_item("MAIN",p,m,parentKey)
    } else {
        p[parentKey] = p[parentKey].filter(x => x.id !== obj.id);
        let p1 = p[parentKey].slice(0, index);
        let p2 = p[parentKey].slice(index);
        p1.push(obj);
        p[parentKey] = p1.concat(p2);
        m = save_item(p.id,p,m,parentKey)
    }
    return m
}
function get_index(key,text,array,parentKey){
var list; var found = false;
get_index_formula(key,text,array,[])
    /*
    Use: Loops through entire array[], keeping track of the location being searched through (index) until key matches. Returns array
    */
function get_index_formula(key,text,array,index){
for (var i=0; i<array.length; i++){
    if (key in array[i] && array[i][key] === text) {
        var new_ind = index; new_ind.push(i);
        list = new_ind; found = true; return}
} //searches first in array if it exists

//then, looks inside folders of the array if nothing is returned
for (var i=0; i<array.length; i++){
    if (parentKey in array[i] && array[i][parentKey].length > 0 && !found) {
// looking through folders with "texts" inside
    var child_nodes = array[i][parentKey]
    var new_ind = index; new_ind.push(i); // this is how index is tracked, and then reported if it matches in the above loop
    get_index_formula(key,text,child_nodes,new_ind)
    // continues the loop to look through each groups insides
    }}
}

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
        else {li = li[location[i]]}     };
        if (li[parentKey]){return li[parentKey]}
        return li; }
function get_item(location,list,parentKey){
    var li = list;  for (var i=0; i<location.length;i++){
        //console.log(location,li[location[i]])
        if (li[location[i]] !== undefined && parentKey in li[location[i]]) {
            if (i === location.length -1) {li = li[location[i]]}
            else {li = li[location[i]][parentKey]}
        }   else {li = li[location[i]]}     }; return li; }


function save_item(id,newObj,list,parentKey){
if (id === "MAIN"){
    list = newObj;
    return list
}
    let folder = get_index("id",id,list,parentKey);
    let item = folder.pop();
if (folder.length === 0){
    list[item] = newObj
} else {// main
    let t = get_item(folder, list, parentKey)
    t.items[item] = newObj;
}
    return list
}

