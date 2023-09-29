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

pd("shList").appendChild(shCreateItem("text")).click();
    shRefreshList(getSHOrder())
