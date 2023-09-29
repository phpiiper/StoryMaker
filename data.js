var modList = [
];
var storyList = [
    {title: "Story Name", id: "abcd1234", charList: [], desc: "A short description", charSheet: [], storySheet: [], id: "randomA", }
];
var groupList = []
var charList = [];


const mlStyles = [
    {name: "Width", style: "width", family: "Size"},
    {name: "Height", style: "height", family: "Size"},
    {name: "Padding", style: "padding", family: "Size"},
    {name: "Margin", style: "margin", family: "Size"},
    {name: "Box Sizing", style: "box-sizing", family: "Size"},
    {name: "Text Align", style: "text-align", family: "Font"},
    {name: "Font Size", style: "font-size", family: "Font"},
    {name: "Font Family", style: "font-family", family: "Font"},
    {name: "Font Color", style: "color", family: "Font"},
    {name: "Background Color", style: "background-color", family: "Style"},
    {name: "Outline", style: "outline", family: "Style"},
    {name: "Border", style: "border", family: "Style"},
    {name: "Border Radius", style: "radius", family: "Style"}
]
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const moduleTypes = {Input: ["Text","Number","Textarea","Range","Color"], Dropdown: ["Static","Input"], Table: ["Static","Expandable"]}

var sbOptions = [

]


const dpList = [
{ text: "Stories", ops: storyList, id: "storyPicker", type: "dropdown-static", fList: {
        click: function(){
            if (pd("storyPicker").inputElem && pd("storyPicker").inputElem.childNodes.length > 0){
                let obj = JSON.parse(pd("storyPicker").inputElem.childNodes[0].dataset.data);
                let d = getDataset("storyManager","data"); d[0].dataset.data = JSON.stringify(obj)
                console.log(JSON.parse(d[0].dataset.data))
            }


        }}, style: [
            {affect: ["parent"], type: "width", val: "70%"}, {affect: ["parent"], type: "border-radius", val: "0.25em"}, {affect: "parent", type: "margin-right", val: "2em"}
        ]
    },
{ text: "Type", ops: ["Input","Dropdown","Table"], id: "mcType", type: "dropdown-static", fList: { click: function(){
let ch = event.currentTarget.innerText; let st = document.getElementById("mcSubtype"); for (var i=0; i<st.listElem.childNodes.length; i++){ let n = st.listElem.childNodes[i]; if (!moduleTypes[ch].includes(n.innerText)){n.style.display = "none"} else {n.style.display = null}} // for loop
    let inpV = st.inputElem; if (inpV.childNodes.length > 0){
    if (!moduleTypes[ch].includes(inpV.childNodes[0].innerText)){inpV.childNodes[0].style.display = "none";}; st.listElem.appendChild(inpV.childNodes[0]);}
    let fi = Array.from(st.listElem.childNodes).filter(x => x.style.display !== "none");
        st.inputElem.appendChild(fi[0]);
    // modoptions
   saveDataset("moduleCreator","data",getModOptions());createModList(document.getElementById("mcModList"),getModOptions()); createPreview(document.getElementById("mcPreviewMod"),getModOptions())
}}, style: [ {affect: ["parent"], type: "width", val: "100%"}, {affect: ["parent"], type: "border-radius", val: "0.25em"}, {affect: "parent", type: "margin-right", val: "2em"}]},
{ text: "Subtype", ops: ["Text","Number","Textarea","Range","Color","Static","Input","Expandable"], id: "mcSubtype", type: "static", style: [ {affect: ["parent"], type: "width", val: "100%"}, {affect: ["parent"], type: "border-radius", val: "0.25em"}, {affect: "parent", type: "margin-right", val: "2em"},{affect: ["child"], type: "display", val: "none"}],
fList: {click: function(){saveDataset("moduleCreator","data",getModOptions());createModList(document.getElementById("mcModList"),getModOptions()); createPreview(document.getElementById("mcPreviewMod"),getModOptions())}}
},
{id: "mcOptions", type: "dropdown-input", text: "Options", style: [{type: "width", val: "100%",affect: ["parent"]}, {type: "height", val: "3em", affect: "parent"}], fList: {change: function(){ saveDataset("moduleCreator","data",getModOptions()); }, click: function(){saveDataset("moduleCreator","data",getModOptions());}, keyup: function(){saveDataset("moduleCreator","data",getModOptions());}
}},
{id: "mctType", type: "dropdown-static", text: "Type", style: [{type: "width", val: "100%",affect: ["parent"]}, {type: "height", val: "3em", affect: "parent"},{type: "border", val: "none", affect: "parent"},{type: "border-bottom", val: "2px solid black", affect: "parent"}], ops: ["Title","Input"], fList: {click: function(){
    let tx = event.currentTarget.innerText; let pto = document.getElementById("mcTOODiv")
        if (pto !== null){ let dt = getDataset(pto,"data"); dt[1].type = tx; dt[0].dataset.data = JSON.stringify(dt[1])
    ptSave(); saveDataset("moduleCreator","data",getModOptions());}
    }}
},
{id: "mctExpandable", type: "dropdown-static", text: "Expand", ops: ["Right","Bottom"], style: [{type: "width", val: "8em", affect: "parent"},{type: "margin-left", val: "1em", affect: "parent"},{type: "height", val: "3em", affect: "parent"}],fList: {
    click: function(){let d = getDataset("mcTableOptionsDiv","data"); if (d){ d[1].expand = this.innerText; d[0].dataset.data = JSON.stringify(d[1]); getModOptions();} }}
},
{id: "slgAlignment", type: "dropdown-static", text: "Item Alignment", ops: ["Horizontal","Vertical"], style: [{type: "width", val: "100%", affect: "parent"},{type: "height", val: "3em", affect: "parent"}],fList: {
    click: function(){
    }}
}
]


const inpList = [
{id: "mcName", type: "input-text", text: "Name of Module", style: [], fList: {change: function(){ saveDataset("moduleCreator","data",getModOptions());
}}},
{id: "mcPlaceholder", type: "input-text", text: "Placeholder", style: [{type: "width", val: "100%", affect: ["parent"]}, {type: "margin-right", val: "2em",affect: "parent"}], fList: {change: function(){ saveDataset("moduleCreator","data",getModOptions());
}}},
{id: "mcResize", type: "input-text", text: "Textbox Resize", style: [{type: "width", val: "30%", affect: ["parent"]}, {type: "margin-right", val: "2em",affect: "parent"}], fList: {change: function(){ saveDataset("moduleCreator","data",getModOptions());
}}},
{id: "mcDefaultVal", type: "input-text", text: "Default Value", style: [{type: "width", val: "100%",affect: ["parent"]},{type: "margin-right", val: "2em", affect: "parent"}], fList: {change: function(){ saveDataset("moduleCreator","data",getModOptions());
}}},
{id: "mcMax", type: "input-number", text: "Max", min: 0, style: [{type: "width", val: "5em",affect: ["parent"]},{type: "margin-right", val: "2em",affect: "parent"}], fList: {change: function(){ saveDataset("moduleCreator","data",getModOptions());
}}},
{id: "mcMin", type: "input-number", text: "Min", min: 0, style: [{type: "width", val: "5em",affect: ["parent"]},{type: "margin-right", val: "2em",affect: "parent"}], fList: {change: function(){ saveDataset("moduleCreator","data",getModOptions());
}}},
{id: "mcStep", type: "input-number", text: "Step", min: 0, style: [{type: "width", val: "5em",affect: ["parent"]}], fList: {change: function(){ saveDataset("moduleCreator","data",getModOptions());
}}},
{id: "mcCreateBtn", type: "input-button", value: "Create Module", style: [{type: "cursor", val: "pointer", affect: "parent"},{type: "backgroundColor",val: "black", affect: "parent"}, {type: "color", val: "white", affect: "parent"}], fList: {click: function(){ saveDataset("moduleCreator","data",getModOptions());
mccbPopup(getModOptions())
}}},
{id: "mcRows", type: "input-number", text: "Rows", value: 2, style: [{type: "width", val: "4em", affect: "parent"},{type: "margin-right", val: "1em", affect: "parent"}], fList: {change: function(){
    ptShiftTable("row",event.currentTarget.value)
}}},
{id: "mcCols", type: "input-number", text: "Columns", value: 2, style: [{type: "width", val: "4em", affect: "parent"}], fList: {change: function(){
    ptShiftTable("col",event.currentTarget.value)
}}},
{id: "ptValue", type: "input-text", text: "Value", style: [{type: "border-left", val: "none",affect: ["parent"]},{type: "border-right", val: "none",affect: ["parent"]},{type:"margin-top",val: "1em",affect:"parent"}], fList: {change: function(){
ptSave(); saveDataset("moduleCreator","data",getModOptions());
}}},
{id: "ptWidth", type: "input-text", text: "Width", style: [{type: "border-left", val: "none",affect: ["parent"]},{type: "border-right", val: "none",affect: ["parent"]},{type:"margin-top",val: "1em",affect:"parent"}], fList: {change: function(){
ptSave(); saveDataset("moduleCreator","data",getModOptions());
}}},
{id: "ptHeight", type: "input-text", text: "Height", style: [{type: "border-left", val: "none",affect: ["parent"]},{type: "border-right", val: "none",affect: ["parent"]},{type:"margin-top",val: "1em",affect:"parent"}], fList: {change: function(){
ptSave(); saveDataset("moduleCreator","data",getModOptions());
}}},
{id: "ptBorder", type: "input-text", text: "Border", style: [{type: "border-left", val: "none",affect: ["parent"]},{type: "border-right", val: "none",affect: ["parent"]},{type:"margin-top",val: "1em",affect:"parent"}], fList: {change: function(){
ptSave(); saveDataset("moduleCreator","data",getModOptions());
}}},
{id: "ptFontColor", type: "input-text", text: "Font Color", style: [{type: "border-left", val: "none",affect: ["parent"]},{type: "border-right", val: "none",affect: ["parent"]}], fList: {change: function(){
ptSave(); saveDataset("moduleCreator","data",getModOptions());
}}},
{id: "ptBackgroundCol", type: "input-text", text: "Background Color", style: [{type: "border-left", val: "none",affect: ["parent"]},{type: "border-right", val: "none",affect: ["parent"]}], fList: {change: function(){
ptSave(); saveDataset("moduleCreator","data",getModOptions());
}}},
// sc Style LIST //
{id: "slValue", type: "input-text", text: "Value", style: [{type: "width", val: "100%", affect: ["parent"]}]},
{id: "slFontFamily", type: "input-text", text: "Font Family", style: [{type: "margin-right", val: "1em",affect: ["parent"]}, {type: "width", val: "100%", affect: ["parent"]}]},
{id: "slFontSize", type: "input-text", text: "Size", style: [{type: "width", val: "4em", affect: ["parent"]}]},
{id: "slFontColor", type: "input-text", text: "Font Color", style: [{type: "width", val: "100%", affect: "parent"},{type: "border-radius", val: "0.1em 0 0 0.1em", affect: "child"}]},
{id: "slColorWheel", type: "input-color", text: "Color", style: [{type: "width", val: "3em", affect: ["parent"]},{type: "padding", val: "0", affect: ["parent"]},{type: "border-radius", val: "0 0.1em 0.1em 0", affect: "child"},{type: "border-left", val: "none", affect: "child"}]},
{id: "slAlignText", type: "input-text", text: "Align Text", style: [{type: "width", val: "100%", affect: ["parent"]}]},
{id: "slWidth", type: "input-text", text: "Width", style: [{type: "width", val: "100%", affect: ["parent"]}]},
{id: "slHeight", type: "input-text", text: "Height", style: [{type: "width", val: "100%", affect: ["parent"]}]},
{id: "slPadding", type: "input-text", text: "Padding", style: [{type: "width", val: "100%", affect: ["parent"]}]},
{id: "slMargin", type: "input-text", text: "Margin", style: [{type: "width", val: "100%", affect: ["parent"]}]},
{id: "slBackgroundCol", type: "input-text", text: "Background Color", style: [{type: "width", val: "100%", affect: ["parent"]},{type: "border-radius", val: "0.1em 0 0 0.1em", affect: ["child"]}]},
]


const menuList = [
    {id: "shMenu", options: [
        {type: "header", text: "Add Module", style: "background-color: black; color: white;", textStyle: "justify-content: center; width: 100%;"},
        {type: "option", text: "Add Flipcard", dataset: {data: "flipcard"}, ic: "view_agenda", style: "", icStyle: "border-radius: 1em; margin-right: 0.5em;"},
        {type: "option", text: "Add Bar", dataset: {data: "bar-range"}, ic: "linear_scale", style: "", icStyle: "border-radius: 1em; margin-right: 0.5em;"},
        {type: "option", text: "Add Component", dataset: {data: "component"}, ic: "inventory_2", style: "", icStyle: "border-radius: 1em; margin-right: 0.5em;"},
        {type: "option", text: "Add Text", dataset: {data: "text"}, ic: "text_format", style: "", icStyle: "border-radius: 1em; margin-right: 0.5em;"},
        {type: "option", text: "Add Group", dataset: {data: "group"}, ic: "folder", style: "", icStyle: "border-radius: 1em; margin-right: 0.5em;"}
    ], fList: {click: function(){
        let option = event.currentTarget.dataset.data;
        pd("shList").appendChild(shCreateItem(option)); shRefreshList(getSHOrder())

    }}}
]



const inputRowList = [
    // ROW1 for BAR-Text
{i: "barText1", style: "background-color: white; border: 2px solid black; display: flex;", className: "packRow", childStyle: {}, children: [
    {name: "BIU", type: "opsList", args: [
    [ {icon: "format_bold", value: {fontWeight: "bold"}}, {icon: "format_italic", value: {fontStyle: "italic"}}, {icon: "format_underlined", value: {textDecoration: "underline"}}], "multi", function(){
        shBarSave()
    }, "border: none; border-right: 2px solid black; width: fit-content; margin: 0;", "width: 2em; font-size: 1em;"]
    }, // BIU
    {name: "fontSize", type: "input", obj: {
        type: "input-text", style: [{type: "width", val: "3em", affect: ["parent"]}, {type: "height", val: "100%", affect: "child"}, {type: "margin", val: "0", affect: "parent"}, {type: "border", val: "none", affect: "child"}, {type: "borderRight", val: "2px solid black", affect: "child"},{type: "fontSize", val: "0.8em", affect: "child"},{type: "borderRadius", val: 0, affect: "child"}], placeholder: "F. Size", fList: {keyup: function(){shBarSave()}}
    }}, // fontSIZE
    {name: "fontFamily", type: "input", obj: {
        type: "input-text", style: [{type: "width", val: "40%", affect: ["parent"]}, {type: "height", val: "100%", affect: "child"}, {type: "margin", val: "0", affect: "parent"}, {type: "border", val: "none", affect: "child"}, {type: "fontSize", val: "0.8em", affect: "child"}], placeholder: "F. Family", fList: {keyup: function(){shBarSave()}}
    }} // fontfamily
]},
    // ROW 2 for Bar-Text
{i: "barText2", style: "background-color: white; display: flex; align-items: center; border: 2px solid black; border-top: none;",  className: "packRow",  childStyle: {}, children: [
    {name: "showVal", type: "input", obj: {
        type: "input-checkbox",  style: [{type: "width", val: "3em", affect: "parent"}, {type: "height", val: "2em", affect: "child"}, {type: "margin", val: "0", affect: "parent"}, {type: "borderRight", val: "2px solid black", affect: "parent"},{type: "alignItems", val: "center", affect: "parent"}, {type: "height", val: "2.4em", affect: "parent"}], fList: {change: function(){shBarSave()}}
                }}, // checkbox
    {name: "color", type: "input", obj: {
        type: "input-color", style: [ {type: "width", val: "2em", affect: "parent"}, {type: "height", val: "2.4em", affect: "child"}, {type: "padding", val: "0", affect: ["parent","child"]}, {type: "border", val: "none", affect: ["child"]}, {type: "marginBottom", val: "0", affect: "parent"}, {type: "backgroundColor", val: "rgba(0,0,0,0)", affect: "child"} ], fList: {keyup: function(){shBarSave()}}
    }}, // color
    {name: "value", type: "input", obj: {
        placeholder: "Text", type: "input-text", style: [{type: "height", val: "100%", affect: ["child"]}, {type: "margin", val: 0, affect: "parent"}, {type: "width", val: "6em", affect: "parent"}, {type: "border", val: "none", affect: "child"}, {type: "borderRight", val: "2px solid black", affect: "child"}, {type: "borderRadius", val: "0", affect: "child"},{type: "fontSize", val: "0.8em", affect: "child"}, {type: "height", val: "2.4em", affect: "parent"}], fList: {keyup: function(){shBarSave()}}
    }}, // text/value
    {name: "padding", type: "input", obj: {
        placeholder: "Padding", type: "input-text", style: [{type: "height", val: "100%", affect: ["child"]}, {type: "margin", val: 0, affect: "parent"}, {type: "width", val: "6em", affect: "parent"},{type: "border", val: "none", affect: "child"}, {type: "fontSize", val: "0.8em", affect: "child"}], fList: {keyup: function(){shBarSave()}}
    }}, // padding
    { name: "borderRadius", type: "input", obj: {
        text: "Roundness", type: "input-range", style: [{type: "margin", val: "0.25em", affect: "parent"}, {type: "transform", val: "scale(0.7)", affect: "parent"}, {type: "padding", val: 0, affect: "child"}, {type: "backgroundColor", val: "#000000", affect: "child"}], max: 50, min: 0, value: 0, step: 1, fList: {input: function(){console.log("S"); shBarSave()}}
}}
]},
{i: "barText3", style: "background-color: yellow; border: 2px solid black; border-top: none; display: flex; align-items: center;",  className: "packRow", childStyle: {},  children: [
    {name: "border", type: "input", obj: {
        placeholder: "Border", type: "input-text", style: [{type: "height", val: "100%", affect: ["child"]}, {type: "margin", val: 0, affect: "parent"}, {type: "width", val: "50%", affect: "parent"},{type: "border", val: "none", affect: "child"}, {type: "borderRight", val: "2px solid black", affect: "child"}, {type: "borderRadius", val: "0", affect: "child"}, {type: "fontSize", val: "0.8em", affect: "child"}], fList: {keyup: function(){shBarSave()}}
    }},
    {name: "padding", type: "input", obj: {
        placeholder: "Padding", type: "input-text", style: [{type: "height", val: "100%", affect: ["child"]}, {type: "margin", val: 0, affect: "parent"}, {type: "width", val: "50%", affect: "parent"},{type: "border", val: "none", affect: "child"}, {type: "fontSize", val: "0.8em", affect: "child"}, ], fList: {keyup: function(){shBarSave()}}
    }}
    // BORDER, BORDER RADIUS
]}, // NORMALOPS
{i: "shNormal1", style: "padding: 0.5em; display: flex;", className: "packRow", childStyle: {}, children: [
    {name: "width", type: "input", obj: {id: "shWidth", type: "input-text", text: "Width", style: [{type: "width", val: "100%", affect: ["parent"]}, {type: "marginRight", val: "1em", affect: "parent"}], fList: {keyup: function(){SLSave()}}}},
    {name: "height", type: "input", obj: {id: "shHeight", type: "input-text", text: "Height", style: [{type: "width", val: "100%", affect: ["parent"]}], fList: {keyup: function(){SLSave()}}}}
]},
{i: "shNormal2", style: "padding: 0.5em; display: flex;", className: "packRow", childStyle: {}, children: [
    {name: "padding", type: "input", obj: {id: "shPadding", type: "input-text", text: "Padding", style: [{type: "width", val: "100%", affect: ["parent"]}, {type: "marginRight", val: "1em", affect: "parent"}], fList: {keyup: function(){SLSave()}}}},
    {name: "margin", type: "input", obj: {id: "shMargin", type: "input-text", text: "Margin", style: [{type: "width", val: "100%", affect: ["parent"]}], fList: {keyup: function(){SLSave()}}}}
]},
{i: "shNormal3", style: "padding: 0.5em; display: flex;", className: "packRow", childStyle: {}, children: [
    {name: "backgroundColor", type: "input", obj: {type: "input-text", text: "Background Color", style: [{type: "width", val: "100%", affect: ["parent"]},{type: "border-radius", val: "0.1em 0 0 0.1em", affect: ["child"]}], fList: {keyup: function(){
        if (event.currentTarget.parentNode.nextSibling !== null && event.currentTarget.value.length > 6){event.currentTarget.parentNode.nextSibling.inputElem.value = event.currentTarget.value; SLSave();}
    }}}
    },
    {name: "backgroundColor", type: "input", obj: {type: "input-color", text: "Color", style: [{type: "width", val: "3em", affect: ["parent"]},{type: "padding", val: "0", affect: ["parent"]},{type: "border-radius", val: "0 0.1em 0.1em 0", affect: "child"},{type: "border-left", val: "none", affect: "child"}], fList: {input: function(){
        if (event.currentTarget.parentNode.previousSibling !== null){
        event.currentTarget.parentNode.previousSibling.inputElem.value = event.currentTarget.value; SLSave();}
    }}}}
]},
{i: "shMaxMinVal", id: "barStartEnd", style: "padding: 0.5em; display: flex;", className: "packRow", childStyle: {}, children: [
    {name: "start", type: "input", obj: {type: "input-number", text: "Start", min: 0, style: [{type: "width", val: "3.5em",affect: ["parent"]},{type: "margin-right", val: "1em",affect: "parent"}], fList: {change: function(){ SLSave()}}}},
    {name: "end", type: "input", obj: {type: "input-number", text: "End", min: 0, style: [{type: "width", val: "3.5em",affect: ["parent"]},{type: "margin-right", val: "1em",affect: "parent"}], fList: {change: function(){ SLSave()}}}},
    {name: "value", type: "input", obj: {type: "input-text", text: "Value", style: [{type: "width", val: "calc(100% - 9em)",affect: ["parent"]}], fList: {change: function(){SLSave()}}}}
]}
]