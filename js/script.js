createHomePage("content")
//createStoryManager("content")
//createModuleCreator("content");
//document.getElementsByClassName("cell")[5].oncontextmenu()

//createModuleManager("content")
//createStoryCreator("content")

/*
sheetCreator("content")
pd("shList").appendChild(shCreateItem("text")).click();
shRefreshList(getSHOrder())
*/
    //mainStoryCreator("content");
/*
createStoryCreator("content")
    let item = scCreateItem("text");
    pd("schList").appendChild(item); //item.onclick()
    let item2 = scCreateItem("group");
    pd("schList").appendChild(item2); //item2.onclick()
    let item2a = scCreateItem("group");
    pd("schList").appendChild(item2a); //item2a.click()
    //pd("schmPopup").childNodes[2].click()
*/
createStorySheet("content")
pd("sshPopup").childNodes[2].click()
pd("ssList").childNodes[0].click()


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

/*
t.onmousedown = function(){
    // moving
    let x = event.clientX; let y = event.clientY;
    document.onmousemove = function(){ event.preventDefault(); let evt = n;
        // length of note container
        let width = evt.parentNode.scrollWidth;
        evt.style.top = (evt.offsetTop - (y - event.clientY)) + "px"; evt.style.left = (evt.offsetLeft  - (x - event.clientX)) + "px"; x = event.clientX; y = event.clientY;
        if (evt.style.left.split("px")[0] < 0){evt.style.left = "0px"}
        if (evt.style.top.split("px")[0] < 0){evt.style.top = "0px"}
        // if scrolling
        if (document.getElementById("noteList").getBoundingClientRect().width < event.clientX + 150){ document.getElementById("noteList").scrollLeft += 20;}
        if (document.getElementById("noteList").getBoundingClientRect().height < event.clientY + 150){ document.getElementById("noteList").scrollTop += 20;}
        let nt = notesList.find(x => x.id === evt.dataset.id);
        nt.location = [JSON.parse(evt.style.left.replace("px","")),JSON.parse(evt.style.top.replace("px",""))]
    }
}

 */