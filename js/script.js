createHomePage("content")
//createGuideDiv("content").article("module_manager")
loadLS()


//pd("hpButtonList").childNodes[1].click()
//pd("mmOptions").childNodes[0].click()
//pd("smOptions").childNodes[1].click()
//pd("sshPopup").childNodes[4].click()
//div.article("creating_module")


//createStoryManager("content")
//createModuleCreator("content");
//pd("mcGuideBtn").click()
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
/*
createStorySheet("content")
// ITEM //
//pd("sshPopup").childNodes[2].click()
//pd("ssList").childNodes[0].click()


// GROUP //
//pd("sshPopup").childNodes[3].click()
//pd("ssList").childNodes[0].click()
pd("storySheet").save([
    {
        "id": "1578VOGW",
        "type": "group",
        "title": "Group",
        "style": {
            "width": "200px",
            "height": "300px",
            "padding": "1em",
            "margin": "1em",
            "border": "0.25em dotted white",
            "backgroundColor": "#fe9595",
            "opacity": "100",
            "borderRadius": "62.5"
        },
        "items": []
    },
    {
        "id": "4445IONA",
        "type": "text",
        "title": "Text",
        "style": {
            "value": "Text",
            "color": "#000000",
            "fontSize": "18px",
            "fontFamily": "Noto Sans",
            "justifyContent": "left",
            "alignItems": "center",
            "backgroundColor": "#ffffff",
            "opacity": "100",
            "borderRadius": "0"
        }
    }
],"order")
pd("ssList").refresh()
pd("ssList").childNodes[1].click()

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


