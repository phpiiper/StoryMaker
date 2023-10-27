var modList = [
];
var storyList = [
    {title: "Story Name", id: "abcd1234", charList: [], desc: "A short description", charSheet: [], storySheet: [] }
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
    {name: "Border", style: "border", family: "Style"},
    {name: "Border Radius", style: "border-radius", family: "Style"}
]

let mgsoOptions = [
{title: "Width", style: "width", ops: [
    {name: "Size", ops: [
    {fList: {}, text: "Size", type: "input-number", style: [], defaultVal: 300},
    {fList: {}, text: "Measurement", type: "dropdown-static", ops:["px","%","em","rem","vw","vh"], defaultVal: "px"}
    ]}
], text: "Defines the width/horizontal length of the element."
},
{title: "Height", style: "height", ops: [
    {name: "Size", ops: [
    {fList: {}, text: "Size", type: "input-number", style: [], defaultVal: 300},
    {fList: {}, text: "Measurement", type: "dropdown-static", ops:["px","%","em","rem","vw","vh"], defaultVal: "px"}
    ]}
], text: "Defines the height/vertical length of the element."
},
{title: "Padding", style: "padding", ops: [
    {name: "Value (Top)", ops: [
    {fList: {}, text: "Size", type: "input-number", style: [], defaultVal: 2},
    {fList: {}, text: "Measurement", type: "dropdown-static", ops:["px","%","em","rem","vw","vh"], defaultVal: "rem"}
    ]},
    {name: "Value (Right)", ops: [
    {fList: {}, text: "Size", type: "input-number", style: [], defaultVal: 2},
    {fList: {}, text: "Measurement", type: "dropdown-static", ops:["px","%","em","rem","vw","vh"], defaultVal: "rem"}
    ]},
    {name: "Value (Bottom)", ops: [
    {fList: {}, text: "Size", type: "input-number", style: [], defaultVal: 2},
    {fList: {}, text: "Measurement", type: "dropdown-static", ops:["px","%","em","rem","vw","vh"], defaultVal: "rem"}
    ]},
    {name: "Value (Left)", ops: [
    {fList: {}, text: "Size", type: "input-number", style: [], defaultVal: 2},
    {fList: {}, text: "Measurement", type: "dropdown-static", ops:["px","%","em","rem","vw","vh"], defaultVal: "rem"}
    ]},
], text: "Defines the internal width between the container and the contents inside. Shorthand 2 values '[val] [val]' will affect [Top-Bottom] [Left-Right] while the last value in the shorthand 3 values '[val] [val] [val]' affects the bottom."
},
{title: "Margin", style: "margin", ops: [
    {name: "Value (Top)", ops: [
    {fList: {}, text: "Size", type: "input-number", style: [], defaultVal: 2},
    {fList: {}, text: "Measurement", type: "dropdown-static", ops:["px","%","em","rem","vw","vh"], defaultVal: "rem"}
    ]},
    {name: "Value (Right)", ops: [
    {fList: {}, text: "Size", type: "input-number", style: [], defaultVal: 2},
    {fList: {}, text: "Measurement", type: "dropdown-static", ops:["px","%","em","rem","vw","vh"], defaultVal: "rem"}
    ]},
    {name: "Value (Bottom)", ops: [
    {fList: {}, text: "Size", type: "input-number", style: [], defaultVal: 2},
    {fList: {}, text: "Measurement", type: "dropdown-static", ops:["px","%","em","rem","vw","vh"], defaultVal: "rem"}
    ]},
    {name: "Value (Left)", ops: [
    {fList: {}, text: "Size", type: "input-number", style: [], defaultVal: 2},
    {fList: {}, text: "Measurement", type: "dropdown-static", ops:["px","%","em","rem","vw","vh"], defaultVal: "rem"}
    ]},
], text: "Defines the external width between the container and the parent. Shorthand 2 values '[val] [val]' will affect [Top-Bottom] [Left-Right] while the last value in the shorthand 3 values '[val] [val] [val]' affects the bottom."
},
{title: "Box Sizing", style: "boxSizing", ops: [
    {name: "Type", ops: [
        {fList: {}, text: "Type", type: "dropdown-static", ops:["Border-Box","Content-Box"], defaultVal: "Border-Box"}
    ]}
], text: "Sets how to calculate total width. Border-Box (default) will keep the size of the element compared to the content. Content-Box allows the overflow (affects padding the most)."},
{title: "Text Align", style: "textAlign", ops: [
    {name: "Type", ops: [
        {fList: {}, text: "Type", type: "dropdown-static", ops:["Left","Center","Right"], defaultVal: "Center"}
    ]}
], text: "Sets the alignment of the text inside the container."
},
{title: "Font Size", style: "fontSize", ops: [
    {name: "Size", ops: [
    {fList: {}, text: "Size", type: "input-number", style: [], defaultVal: 18},
    {fList: {}, text: "Measurement", type: "dropdown-static", ops:["px","%","em","rem","vw","vh"], defaultVal: "px"}
    ]}
], text: "Sets the font size of the text inside the container."
},
{title: "Font Family", style: "fontFamily", ops: [
    {name: "Size", ops: [
    {fList: {}, text: "Measurement", type: "dropdown-input", ops: ["Times","Cairo","Smooch Sans","Noto Sans","Arial"], defaultVal: "Times"}
    ]}
], text: "Sets the font (family) of the text inside the container."
},
{title: "Font Color", style: "color", ops: [
    {name: "Color", ops: [
    {fList: {}, text: "Value", type: "input-color", defaultVal: "#ffffff", style: []}
    ]}
], text: "Sets the font color of the text inside the container."
},
{title: "Background Color", style: "backgroundColor", ops: [
    {name: "Color", ops: [
    {fList: {}, text: "Value", type: "input-color", defaultVal: "#000000", style: []}
    ]}
], text: "Sets the background color of the container."
},
{title: "Border", style: "border", ops: [
    {name: "Size", ops: [
    {fList: {}, text: "Size", type: "input-number", style: [], defaultVal: 4},
    {fList: {}, text: "Measurement", type: "dropdown-static", ops:["px","%","em","rem","vw","vh"], defaultVal: "px"}
    ]},
    {name: "Style", ops: [
    {fList: {}, text: "Type", type: "dropdown-static", ops: ["Solid","Dotted","Dashed","Double","Groove","Inset"], defaultVal: "Dotted"}
    ]},
    {name: "Color", ops: [
    {fList: {}, text: "Color", type: "input-color", style: [], defaultVal: "#3f3f3f"},
    ]}
], text: "Sets the font size of the text inside the container."
},
{title: "Border Radius", style: "borderRadius", ops: [
    {name: "Value (Top)", ops: [
    {fList: {}, text: "Size", type: "input-number", style: [], defaultVal: 10},
    {fList: {}, text: "Measurement", type: "dropdown-static", ops:["px","%","em","rem","vw","vh"], defaultVal: "px"}
    ]},
    {name: "Value (Right)", ops: [
    {fList: {}, text: "Size", type: "input-number", style: [], defaultVal: 10},
    {fList: {}, text: "Measurement", type: "dropdown-static", ops:["px","%","em","rem","vw","vh"], defaultVal: "px"}
    ]},
    {name: "Value (Bottom)", ops: [
    {fList: {}, text: "Size", type: "input-number", style: [], defaultVal: 10},
    {fList: {}, text: "Measurement", type: "dropdown-static", ops:["px","%","em","rem","vw","vh"], defaultVal: "px"}
    ]},
    {name: "Value (Left)", ops: [
    {fList: {}, text: "Size", type: "input-number", style: [], defaultVal: 10},
    {fList: {}, text: "Measurement", type: "dropdown-static", ops:["px","%","em","rem","vw","vh"], defaultVal: "px"}
    ]},
], text: "Defines the roundness of the borders/edges of the container. Doesn't require an active \"Border\" style."
},
]

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const moduleTypes = {Input: ["Text","Number","Textarea","Range","Color"], Dropdown: ["Static","Input"], Table: ["Static","Expandable"]}
const mmIconTypes = {
    table: "table_chart", input: "page_info", text: "text_select_end", group: "folder", flipcard: "view_agenda", bar: "linear_scale", component: "inventory_2"
}

const dpList = [
{ text: "Type", ops: ["Input","Dropdown","Table"], id: "mcType", type: "dropdown-static", fList: {click: function(){
    let ch = pd("mcType").input(); let st = pd("mcSubtype");
        st.select();
    for (var i=0; i<st.list().length; i++){
        let n = st.list()[i]; if (!moduleTypes[ch].includes(n.innerText)){n.style.display = "none"} else {n.style.display = null}
    }
    let fi = st.list().filter(x => x.style.display !== "none" && x.parentNode.classList.contains("dpBot"));
    console.log(fi[0])
    fi[0].click()
    // mod options
    saveDataset("moduleCreator","data",getModOptions());
    createModList(pd("mcModList"),getModOptions());
    createPreview(pd("mcPreviewMod"),getModOptions());
    }
}, style: [ {affect: ["parent"], type: "width", val: "100%"}, {affect: ["parent"], type: "border-radius", val: "0.25em"}, {affect: "parent", type: "margin-right", val: "2em"}]},
{ text: "Subtype", ops: ["Text","Number","Textarea","Range","Color","Static","Input","Expandable"], id: "mcSubtype", type: "static", style: [ {affect: ["parent"], type: "width", val: "100%"}, {affect: ["parent"], type: "border-radius", val: "0.25em"}, {affect: "parent", type: "margin-right", val: "2em"},{affect: ["child"], type: "display", val: "none"}],
fList: {click: function(){saveDataset("moduleCreator","data",getModOptions());createModList(document.getElementById("mcModList"),getModOptions()); createPreview(document.getElementById("mcPreviewMod"),getModOptions())}}
},
{id: "mcOptions", type: "dropdown-input", text: "Options", style: [{type: "width", val: "100%",affect: ["parent"]}, {type: "height", val: "3rem", affect: "parent"}], fList: {change: function(){ saveDataset("moduleCreator","data",getModOptions()); }, click: function(){saveDataset("moduleCreator","data",getModOptions());}, keyup: function(){saveDataset("moduleCreator","data",getModOptions());}
}},
{id: "mctType", type: "dropdown-static", text: "Type", style: [{type: "width", val: "100%",affect: ["parent"]}, /*{type: "height", val: "3em", affect: "parent"},*/{type: "border", val: "none", affect: "parent"},{type: "border-bottom", val: "2px solid black", affect: "parent"}], ops: ["Title","Input"], fList: {click: function(){
    let tx = event.currentTarget.innerText; let pto = document.getElementById("mcTOODiv")
        if (pto !== null){ let dt = getDataset(pto,"data"); dt[1].type = tx; dt[0].dataset.data = JSON.stringify(dt[1])
    ptSave(); saveDataset("moduleCreator","data",getModOptions());}
}}
},
{id: "mctExpandable", defaultVal: "Right", type: "dropdown-static", text: "Expand", ops: ["Right","Bottom","Both"], style: [{type: "width", val: "8em", affect: "parent"},{type: "margin-left", val: "1em", affect: "parent"}],fList: {
    click: function(){
        ptSave();
        getModOptions();
    }}
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
{id: "mcGuideBtn", type: "input-button", value: "GUIDE", style: [{type:"cursor",val:"pointer",affect:"child"}], fList: {click: function(){
    pd("hpButtonList").childNodes[2].click()
    pd("mainGuide").article("create_module");

}}},
{id: "mcCreateBtn", type: "input-button", value: "Create Module", style: [{type: "cursor", val: "pointer", affect: "parent"},{type: "backgroundColor",val: "black", affect: "parent"}, {type: "color", val: "white", affect: "parent"}], fList: {click: function(){
    saveDataset("moduleCreator","data",getModOptions());
    mccbPopup(getModOptions())
}}},
{id: "mcRows", min: 1, type: "input-number", text: "Rows", value: 2, style: [{type: "width", val: "4em", affect: "parent"},{type: "margin-right", val: "1em", affect: "parent"}], fList: {change: function(){
    ptShiftTable("row",event.currentTarget.value)
}}},
{id: "mcCols", min: 1, type: "input-number", text: "Columns", value: 2, style: [{type: "width", val: "4em", affect: "parent"}], fList: {change: function(){
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
]},
{i: "ssTextRow1", style: "", className: "packRow prType1", childStyle: {}, children: [
    {name: "value", type: "input", obj: { text: "Value",
        type: "input-text", style: [  ], defaultVal: "#000"
    }}]},
    /*
    background-color: white; display: flex; margin-bottom: 1em; padding: 0 1em;


    {type: "width", val: "100%", affect: "parent"}, {type: "height", val: "3em", affect: "child"}, {type: "padding", val: "0", affect: ["parent","child"]}, {type: "border", val: "none", affect: ["child"]}, {type: "borderBottom", val: "2px solid black", affect: "child"}, {type: "backgroundColor", val: "rgba(0,0,0,0)", affect: "child"}, {type: "padding", val: "0.2em 0.4em", affect: "child"}
     */
{i: "ssTextRow2", style: "", className: "packRow prType1", childStyle: {}, children: [
    {name: "color", type: "input", obj: { text: "Color",
        type: "input-color",
        style: [ {type: "width", val: "4em", affect: "parent"}, {type: "padding", val: "0.4em 0.2em", affect: "child"}], defaultVal: "#000"
    }},
    {name: "fontSize", type: "input", obj: {text: "Size",
    type: "input-text",
    style: [/*{type: "width", val: "3em", affect: ["parent"]}, {type: "height", val: "100%", affect: "child"}, {type: "margin", val: "0", affect: "parent"}, {type: "borderTop", val: "none", affect: "child"},{type: "fontSize", val: "0.8em", affect: "child"},{type: "borderRadius", val: 0, affect: "child"}*/], defaultVal: "18px"
    }}, // fontSIZE
    {name: "fontFamily", type: "input", obj: { text: "Font Family",
    type: "input-text", style: [/*{type: "width", val: "calc(100% - 5em)", affect: ["parent"]}, {type: "height", val: "100%", affect: "child"}, {type: "margin", val: "0", affect: "parent"}, {type: "border", val: "none", affect: "child"}, {type: "border-bottom", val: "2px solid black", affect: "child"}, {type: "fontSize", val: "0.8em", affect: "child"}*/], defaultVal: "Noto Sans"
    }}
]},
{i: "ssTextRow3", style: "", className: "packRow prType1", childStyle: {}, children: [
    {name: "BIU", type: "opsList", args: [
        [ {icon: "format_bold", value: {fontWeight: "bold"}}, {icon: "format_italic", value: {fontStyle: "italic"}}, {icon: "format_underlined", value: {textDecoration: "underline"}}], "multi", function(){}, undefined /*"border: none; border-right: 2px solid black; width: 48%; margin: 0;", "width: 33%; font-size: 0.9em;"*/]
    },
    {name: "justify-text", type: "opsList", args: [
        [{icon: "format_align_left", value: {justifyContent: "left"}},{icon: "format_align_center", value: {justifyContent: "center"}},{icon: "format_align_right", value: {justifyContent: "right"}}],
        "single", function(){}, undefined /*"border: none; width: 48%; margin: 0;", "width: 33%; font-size: 0.9em;"*/
    ]}
]},
{i: "ssTextRow4", style: "", className: "packRow prType1", childStyle: {}, children: [
    {name: "align-text", type: "opsList", args: [
    [{icon: "vertical_align_top", value: {alignItems: "start"}},{icon: "vertical_align_center", value: {alignItems: "center"}},{icon: "vertical_align_bottom", value: {alignItems: "end"}}],
    "single", function(){}, undefined /* "width: 100%; border: none; margin-left: 0;", "width: 33%; font-size: 0.9em"*/
    ]}
]},
{i: "ssGroupRow1", style: "background-color: white; display: flex", className: "packRow", childStyle: {}, children: [
    {name: "flex", type: "opsList", args: [
    [{icon: "table_rows", value: {flexDirection: "row"}},{icon: "view_week", value: {flexDirection: "column"}}],
    "single", function(){}, "border: none; border-right: 2px solid black; width: 48%; margin: 0;", "width: 50%; font-size: 0.9em;"
    ]},
    {name: "justifyContent", type: "opsList", args: [
    [{icon: "format_align_left", value: {justifyContent: "left"}},{icon: "format_align_center", value: {justifyContent: "center"}},{icon: "format_align_right", value: {justifyContent: "right"}}],
    "single", function(){}, "border: none; width: 48%; margin: 0;", "width: 33%; font-size: 0.9em;"
    ]}
]}

]


const ceList = [
{i: "CurrentState", type: "div", tags: {id: "hpCurrentState"}},
{i: "hpBtns", type: "div", tags: {id: "hpButtonList"}, children: [
    {type: "span", tags: {innerText: "Stories"}, methods: [
        {type: "click", func: function(){
                createStoryManager("content")
        }} ]},
    {type: "span", tags: {innerText: "Modules"}, methods: [
        {type: "click", func: function(){
                createModuleManager("content")
        }} ]},
    {type: "span", tags: {innerText: "Guide"}, methods: [
        {type: "click", func: function(){
            createGuideDiv("content")
        }} ]},
    {type: "span", tags: {innerText: "Settings"}, methods: [
        {type: "click", func: function(){
            console.log("click")
        }} ]}
]},
{i: "smOptions", type: "div", tags: {id: "smOptions", className: "top"}, children: [
    {type: "span", tags: {innerText: "ADD CHARACTER", className: "smOpDiv"}, methods: [
        {type: "click", func: function(){
            // ADD CHARACTER POPUP
        }}
    ]},
    {type: "span", tags: {innerText: "Story Sheet", className: "smOpDiv"}, methods: [
        {type: "click", func: function(){
            // Open Story Sheet
        }}
    ]},
    {type: "span", tags: {innerText: "Character Sheet", className: "smOpDiv"}, methods: [
        {type: "click", func: function(){
            // Open Story Sheet
        }}
    ]},
    {type: "span", tags: {innerText: "Story Details", className: "smOpDiv"}, methods: [
        {type: "click", func: function(){
            // Open Story Info Editor --> createStory popup changed
        }}
    ]},
    {type: "span", tags: {innerText: "GUIDE", className: "smOpDiv"}, methods: [
        {type: "click", func: function(){
            // OPEN mainguide(storymanager)
        }}
    ]},
    {type: "span", tags: {innerText: "EXIT", className: "smOpDiv"}, methods: [
        {type: "click", func: function(){
            pd("storyManager").parentNode.remove()
        }}
    ]}
]},
{i: "mmOptions", type: "div", tags: {id: "mmOptions", className: "top"}, children: [
    {type: "span", tags: {innerText: "CREATE MODULE", className: "mmOpDiv"}, methods: [
        {type: "click", func: function(){
            createModuleCreator(pd("moduleManager"))
        }}
    ]},
    {type: "span", tags: {innerText: "Delete Module", className: "mmOpDiv"}, methods: [
        {type: "click", func: function(){
            // Open Story Sheet
        }}
    ]},
    {type: "span", tags: {innerText: "Change Module", className: "mmOpDiv"}, methods: [
        {type: "click", func: function(){
            // Open Story Sheet
        }}
    ]},
    {type: "div", children: [
            {type: "span", tags: {innerText: "GUIDE", className: "smOpDiv"}, methods: [
                    {type: "click", func: function(){
                            createGuideDiv("content").article("create_module")
                        }}
                ]},
            {type: "span", tags: {innerText: "EXIT", className: "smOpDiv"}, methods: [
                    {type: "click", func: function(){
                            pd("moduleManager").parentNode.remove()
                        }}
                ]}
    ]}
]}
]


const curStateList = [
    {id: "cs1", title: "First Release", date: ["12","2023"], text: [
        "This is a small text."
    ]}
]
const guideArticles = [
{id: "basic_overview", obj: { type: "div", children: [
    {type: "h2", tags: {innerHTML: "Basic Overview"}},
    {type: "h3", tags: {innerHTML: "WHAT IS THIS?"}},
    {type: "p", tags: {innerHTML: "This is a site with the goal of “making the perfect character sheet” because I found myself needing very specific requirements for different stories, decided that I should make a bigger, modular version. Because it was made for such purpose, this is not the most simplistic tool, will certainly break, but it here for proof-of-concept. <br><u>So, this is a guide on getting started:</u>"}},
    {type: "h3", tags: {innerHTML: "Step 1 - CREATE MODULES"}},
    {type: "p", tags: {innerHTML: "Modules are your building blocks. Although there are already pre-made ones, it won’t fit all of your needs. Modules, however, are only useful for inputting data, and are not meant to be part of the main Character Sheet looks. Modules are used to put information about characters, built in the Story Sheet."}},
    {type: "p", tags: {innerHTML: "As you create a module, you can watch the changes live."}},
    {type: "div", tags: {style: "display: flex; margin: 1rem;"}, children: [
        {type: "span", tags: {innerText: "Related Articles", className: "linkHeader"}},
        {type: "span", tags: {innerText: "Creating Modules", className: "link"}, methods: [{type: "click", func: function(){ pd("mainGuide").article("create_module")}}]},
        {type: "span", tags: {innerText: "Tables", className: "link"}, methods: [{type: "click", func: function(){ pd("mainGuide").article("mod_table")}}]},
        {type: "span", tags: {innerText: "Dropdown", className: "link"}, methods: [{type: "click", func: function(){ pd("mainGuide").article("mod_dropdown")}}]},
        {type: "span", tags: {innerText: "Input", style: "font-weight: bold; cursor: pointer;", className: "link"}, methods: [{type: "click", func: function(){ pd("mainGuide").article("mod_input")}}]}
    ]},
    {type: "p", tags: {innerHTML: "You will most likely spend most of your time here, trying to build the different pieces you'll want for your character sheet(s). Once you build up your pieces, you will then want to create your Story Sheet."}},
    {type: "h3", tags: {innerHTML: "Step 2 - CREATE STORY SHEET"}},
    {type: "p", tags: {innerHTML: "The Story Sheet serves as the medium of getting information for each character. As in, everytime you create a character, you'll be using this exact sheet to input the values. You'll get to style the Character Sheets on the next step."}},
    {type: "div", tags: {style: "display: flex; margin: 1rem;"}, children: [
        {type: "span", tags: {innerText: "Related Articles", className: "linkHeader"}},
        {type: "span", tags: {innerText: "Story Sheet", className: "link"}, methods: [{type: "click", func: function(){ pd("mainGuide").article("story_sheet")}}]},
        {type: "span", tags: {innerText: "Story Sheet Tips", className: "link"}, methods: [{type: "click", func: function(){ pd("mainGuide").article("story_sheet_tips")}}]}
    ]}
]
}},
{id: "mod_input", obj: { type: "div", children: [
    {type: "span", tags: {innerText: "Related: Creating Modules", className: "link"}, methods: [{type: "click", func: function(){ pd("mainGuide").article("create_module")}}]},
    {type: "h3", tags: {innerHTML: "Mod Type: Input", style: "margin: 0; font-weight: bold;"}},
    {type: "p", tags: {innerHTML: "Possibly the most common type that you will create, [Inputs] are made to get general information, not bound to specific constraints."}},
    {type: "p", tags: {innerHTML: "There are <u>5 different types</u>, and you can customize them with certain characteristics:"}},
        // INPUT-TEXT & NUMBER
    {type: "div", tags: {style: "display: flex; margin: 0.25em; border-top: 3px dashed black;"}, children: [
    {type: "div", tags: {className: "mgExampleDiv"}, children: [
        {type: "span", tags: {innerText: "Text"}},
        createInput({type: "input-text", placeholder: "This is a placeholder", text: "Input-Text", style: [{type:"width",affect:"parent",val:"100%"}]})
        ]},
        {type: "div", tags: {className: "mgExampleDiv"}, children: [
        {type: "span", tags: {innerText: "Number"}},
        createInput({type: "input-number", min: 1, max: 9, placeholder: "1-9", text: "Input-Number", style: [{type:"width",affect:"parent",val:"100%"}]})
        ]}
    ]},
        // INPUT-Textarea & RANGE & COL
    {type: "div", tags: {style: "display: flex; margin: 0.25em; border-bottom: 3px dashed black;"}, children: [
        {type: "div", tags: {className: "mgExampleDiv", style: "width: 40%"}, children: [
        {type: "span", tags: {innerText: "Textarea"}},
        createInput({type: "input-textarea", placeholder: "This is a placeholder for this textarea", text: "Input-Textarea", resize: "vertical", style: [{type:"width",affect:"parent",val:"70%"}]})
    ]},
    // INPUT-Range
    {type: "div", tags: {className: "mgExampleDiv",style: "width: 40%"}, children: [
        {type: "span", tags: {innerText: "Range"}},
        createInput({type: "input-range", min: 1, max: 10, placeholder: "1-9", text: "Input-Range (1-10)", style: [{type:"width",affect:"parent",val:"70%"}]})
    ]},
    // INPUT-COLOR
    {type: "div", tags: {className: "mgExampleDiv", style: "width: 20%;"}, children: [
        {type: "span", tags: {innerText: "Color"}},
        createInput({type: "input-color", min: 1, max: 9, placeholder: "1-9", text: "Input-Color", textStyle: "margin-top: 1rem; margin-left: 0;", style: [{type:"width",affect:"child",val:"2em"},{type:"width",affect:"parent",val:"100%"},{type:"padding",affect:"child",val:"0"}], fList: {
            input: function(){
                this.parentNode.childNodes[1].style.color = this.value;
            }
        }})
    ]}
    ]},
    {type: "p", tags: {innerHTML: "There are also 5 special tags that can be changed. The availability of them depends on the type you create."}},
    {type: "ul", children: [
        {type: "li", tags: {innerHTML: "[All] <strong>Default Value</strong> - The initialized value of the module. <br>Example: A specific color signifying a faction, value in a personality range set to the middle"}},
        {type: "li", tags: {innerHTML: "[Text, Number, Textarea] <strong>Placeholder</strong> - Changes the placeholder text to use as a guide of what the input may want. <br>Example: Input for the character's name has a placeholder to explain what should go in there."}},
        {type: "li", tags: {innerHTML: "[Range, Number] <strong>Max</strong> - The maximum value of what the value of the input can be."}},
        {type: "li", tags: {innerHTML: "[Range, Number] <strong>Min</strong> - The minimum value of what the value of the input can be."}},
        {type: "li", tags: {innerHTML: "[Range] <strong>Step</strong> - Given the max and min, this is how many values you want the slider to step at. <br>Example: A slider of 0-100 with a 25 step will have 5 marks at 0, 25, 50, 75, and 100"}},
    ]},
    {type: "h3", tags: {innerHTML: "How will these be used?"}},
    {type: "p", tags: {innerHTML: "Well, generally, the design of the mods will not matter except for creating the Story Sheet. But, what you can do with the values when creating the format for the Character Sheet is endless. The specific color can be grabbed and have a specific part of the character sheet that color. The value of a range can determine transparency of an object. Everything I could conceive and code into existence could probably be thought of."}}
]}
},
{id: "mod_dropdown", obj: { type: "div", children: [
    {type: "span", tags: {innerText: "Related: Creating Modules", className: "link"}, methods: [{type: "click", func: function(){ pd("mainGuide").article("create_module")}}]},
    {type: "h3", tags: {innerHTML: "Mod Type: Dropdown", style: "margin: 0; font-weight: bold;"}},
    {type: "p", tags: {innerHTML: "A bit more specialized, [Dropdowns] will narrow down specific parts of required information to your own choosing, or the character's requirements! "}},
    {type: "p", tags: {innerHTML: "There are <u>2 different types</u>, and you can customize them with certain characteristics:"}},
        // INPUT-TEXT & NUMBER
    {type: "div", tags: {style: "display: flex; margin: 0.25em; border-top: 3px dashed black;"}, children: [
    {type: "div", tags: {className: "mgExampleDiv"}, children: [
        {type: "span", tags: {innerText: "Static"}},
        createDropdown({type: "dropdown-static", text: "Dropdown-Static", style: [{type:"width",affect:"parent",val:"100%"}], ops: ["Choice 1","Choice 2"]})
        ]},
        {type: "div", tags: {className: "mgExampleDiv"}, children: [
        {type: "span", tags: {innerText: "Input"}},
        createDropdown({type: "dropdown-input", text: "Dropdown-Input", textStyle: "top: 102%;", style: [{type:"width",affect:"parent",val:"100%"}],ops: ["Choice 1","Choice 2"]})
        ]}
    ]},
    {type: "p", tags: {innerHTML: "There are 1 major customization that can be changed."}},
    {type: "ul", children: [
        {type: "li", tags: {innerHTML: "<strong>Options</strong> - These are predefined options you can key in. When it comes Static, it will act as one of the options. For Input, it takes the option as the value."}}
    ]},
    {type: "h3", tags: {innerHTML: "STATIC vs INPUT?"}},
    {type: "p", tags: {innerHTML: "[Static] should be used to get 1 specific value from a pre-defined list (Ex: The role in the story, race of character). On the other hand [Input] should be used to get ANY amount of values from the user's inputs (Ex: Key characteristics of a character)."}},
    {type: "h3", tags: {innerHTML: "How will these be used?"}},
    {type: "p", tags: {innerHTML: "The dropdowns will act as a list of values that can be used in the design of the Character Sheet. It can be styled to show the whole list a particular way. Though, it's a more specific way of getting a user input."}}
]}
},
{id: "mod_table", obj: { type: "div", children: [
    {type: "span", tags: {innerText: "Related: Creating Modules", className: "link"}, methods: [{type: "click", func: function(){ pd("mainGuide").article("create_module")}}]},
    {type: "h3", tags: {innerHTML: "Mod Type: Table", style: "margin: 0; font-weight: bold;"}},
    {type: "p", tags: {innerHTML: "More complex, the table allows for grouping larger pieces of data in a relationship."}},
    {type: "p", tags: {innerHTML: "There are <u>2 different types</u>, and you can customize them with certain characteristics:"}},
        // INPUT-TEXT & NUMBER
    {type: "div", tags: {style: "display: flex; margin: 0.25em; border-top: 3px dashed black; border-bottom: 3px dashed black; max-height: 50vh; min-height: 30vh;"}, children: [
    {type: "div", tags: {className: "mgExampleDiv"}, children: [
        {type: "span", tags: {innerText: "Static"}},
        createTable({type: "table-static", style: [], rows: 2, cols: 2, table: [
                [{"type": "Title","value": " ","style": {
                "backgroundColor": "black","color": "white","fontFamily": "Noto Sans","fontSize": "1em","type": "Title","value": " "
                 }},
                {
                "type": "Title", "value": "Character", "style": {
                "backgroundColor": "black","color": "white","fontFamily": "Noto Sans","fontSize": "1em", "type": "Title", "value": "Title"
                }},
                {
                "type": "Title", "value": "Character", "style": {
                "backgroundColor": "black","color": "white","fontFamily": "Noto Sans","fontSize": "1em", "type": "Title", "value": "Title"
                }}
                ],
                [
                {
                "type": "Title", "value": "Character", "style": {
                "backgroundColor": "black","color": "white","fontFamily": "Noto Sans","fontSize": "1em", "type": "Title", "value": "Character"
                }},
                {
                "type": "Input", "value": "Relationship", "style": {
                "backgroundColor": "white","color": "black","fontFamily": "Noto Sans","fontSize": "1em", "type": "Title", "value": "Title"
                }},
                {
                "type": "Input", "value": "Relationship", "style": {
                "backgroundColor": "white","color": "black","fontFamily": "Noto Sans","fontSize": "1em", "type": "Title", "value": "Title"
                }}
                ]
            ]
        })
        ]},
        {type: "div", tags: {className: "mgExampleDiv"}, children: [
        {type: "span", tags: {innerText: "Expandable"}},
        createTable({type: "table-expandable", style: [{type:"maxWidth",val:"40vw",affect:"parent"}], rows: 2, cols: 2, table: [
                [{"type": "Title","value": " ","style": {
                "backgroundColor": "black","color": "white","fontFamily": "Noto Sans","fontSize": "1em","type": "Title","value": " "
                 }},
                {
                "type": "Title", "value": "Character", "style": {
                "backgroundColor": "black","color": "white","fontFamily": "Noto Sans","fontSize": "1em", "type": "Title", "value": "Title"
                }},
                {
                "type": "Title", "value": "Character", "style": {
                "backgroundColor": "black","color": "white","fontFamily": "Noto Sans","fontSize": "1em", "type": "Title", "value": "Title"
                }}
                ],
                [
                {
                "type": "Title", "value": "Character", "style": {
                "backgroundColor": "black","color": "white","fontFamily": "Noto Sans","fontSize": "1em", "type": "Title", "value": "Character"
                }},
                {
                "type": "Input", "value": "Relationship", "style": {
                "backgroundColor": "white","color": "black","fontFamily": "Noto Sans","fontSize": "1em", "type": "Title", "value": "Title"
                }},
                {
                "type": "Input", "value": "Relationship", "style": {
                "backgroundColor": "white","color": "black","fontFamily": "Noto Sans","fontSize": "1em", "type": "Title", "value": "Title"
                }}
                ]
        ]})
    ]}]},
    {type: "p", tags: {innerHTML: "Everything about the table can be customized, and for [Table-Expandable], even after it is made, by each individual Cell."}},
    {type: "ul", children: [
        {type: "li", tags: {innerHTML: "<strong>Type</strong> - There are two types that each [Cell] of the table can be: <b>Titles</b> are used as headers or dividers, depending on what you require. <b>Inputs</b> are used to define spaces that the user can input data."}},
        {type: "li", tags: {innerHTML: "<strong>Text Options</strong> - You can change the text color, text value, font family, and font size."}},
        {type: "li", tags: {innerHTML: "<strong>Colors</strong> - You can change the background color of the [Cell]."}},
        {type: "li", tags: {innerHTML: "<strong>Text Styles</strong> - You can change if the text is bold, italic, or underline."}},
        {type: "li", tags: {innerHTML: "<strong>Text Alignment</strong> - You can change the position of the text. For example, it can be centered in the middle, left-aligned to the bottom, or right-aligned to the top."}}
    ]},
    {type: "h3", tags: {innerHTML: "STATIC vs EXPANDABLE?"}},
    {type: "p", tags: {innerHTML: "[Static] should be used to get specific values a known/specific list (personality traits, reaction-table for known elements, etc). [Expandable] should be used to get a variable amount of values from known content (relationship matrix, list of past occupations, etc)"}},
    {type: "li", tags: {innerHTML: "<strong>Expandable Feature</strong> - You can Right Click (context menu) a [Table-Expandable] module to get specific options: [Change Type] will switch the Cell to [Input]-[Title] and [Change Value] will let you input a new value (text for Title, placeholder for Input). Delete Row & Delete Column will delete the mentioned the cell is in (Ex: Deleting the entire row the cell is in)"}},
    {type: "h3", tags: {innerHTML: "How will these be used?"}},
    {type: "p", tags: {innerHTML: "The values of the table can be used to design anything in the character sheet, but will most likely be a list in certain functions (similar to a dropdown)."}}
]}
},
{id: "styleOptions", obj: { type: "div", tags: {id:"mgStyleOptions"}, children: [
    {type: "h3", tags: {innerText: "Style Options", style: "margin: 0;"}},
    {type: "p", tags: {innerText: "This will teach you about how to use each open-ended style in the [Module Creator] Style List.", style: "margin: 0;"}},
    {type: "div", children: [
        {type: "p", tags: {innerHTML: "The newest part will be deciding on value measurements. Here are an explanation of them. The left container has a width of 500px and height of 500px with the test element having a default 350px by 350px size.;"}}
    ]},
    {type: "div", tags: {style: "display: flex;"}, children: [
        {type: "div", tags: {id: "mgsoDiv"}, children: [
        createDropdown({id: "mgsoPicker", type: "dropdown-static", ops: mgsoOptions, fList: {
            click: function(){
                mgStyleOptions(this.dropdown.input())
        }}}),
        {type: "div", tags: {id:"mgsoAppliedStyles"}},
        {type: "div", tags: {id: "mgsoVal", innerText: "This will change to the current style value."}},
        {type: "div", tags: {id: "mgsoDesc"}, children: [
            {type: "div", tags: {id: "mgExampleBox", innerText: "This is example text to fill the box to show how the specified style affects this div. Some part of this element will shift depending on the value of the style you change."}}
        ]}
        ]},
        {type: "div", tags: {id: "mgsoInputs"}, children: [
            {type: "div", tags: {id:"mgsoDescTx"}},
            {type: "div", tags:{className: "mgsoMeasurements"}, children: [
                {type: "div", tags: {innerHTML: "<strong>px (pixel)</strong>:<br> = pixel size on display<br>Relative to the user's computer's resolution"}},
                {type: "div", tags: {innerHTML: "<strong>em</strong>:<br>= current size of the container<br>[2em] of an element inside a container's font size of [18px] will equal [36px]."}},
                {type: "div", tags: {innerHTML: "<strong>rem (root em)</strong>:<br> = root font size<br> Always standardized and 1.4rem will always be the exact same sizing across all usage cases."}},
                {type: "div", tags: {innerHTML: "<strong>% (percentage)</strong>:<br> = size when compared<br> [50% width] of an element inside a container of [300px] will take up  [150px]."}},
                {type: "div", tags: {innerHTML: "<strong>vw (viewport width)</strong>:<br> = 1% of  WINDOW WIDTH<br>[50vw] will fill exactly 50% of the screen entire width."}},
                {type: "div", tags: {innerHTML: "<strong>vh (viewport height)</strong>:<br> = 1% of  WINDOW HEIGHT<br>[50vh] will fill exactly 50% of the screen entire height."}},
            ]},
            {type: "div"}
        ]}
    ]}
]//mlStyles
}},
{id: "create_module", obj: {type: "div", children: [
    {type: "h3", tags: {innerHTML: "Creating Modules", style: "margin: 0; font-weight: bold;"}},
    {type: "p", tags: {innerHTML: "This will be a simple run down of how the whole thing looks. Each part is discussed more in-depth in their respective pages: "}},
    {type: "div", tags: {style: "display: flex; margin: 1rem;"}, children: [
        {type: "span", tags: {innerText: "Tables", className: "link"}, methods: [{type: "click", func: function(){ pd("mainGuide").article("mod_table")}}]},
        {type: "span", tags: {innerText: "Dropdown", className: "link"}, methods: [{type: "click", func: function(){ pd("mainGuide").article("mod_dropdown")}}]},
        {type: "span", tags: {innerText: "Input", style: "font-weight: bold; cursor: pointer;", className: "link"}, methods: [{type: "click", func: function(){ pd("mainGuide").article("mod_input")}}]},
    ]},
    {type: "div", tags: {id: "mcMockup"}, children: [
        {type: "div", tags: {className: "left"}, children: [
            {type: "div", tags: {innerText: "Preview: Changes with every change you make!"}},
            {type: "div", children: [
                {type: "div", tags: {innerHTML: "<strong>Main Settings</strong><br>Change Module Types<br>Read This Guide Again<br>Finish & Create Module"}},
                {type: "div", tags: {innerHTML: "<strong>Module Options</strong><br>Change the way the module is used!"}}
            ]},
        ]},
        {type: "div", tags:{className: "right"}, children: [
            {type: "div", tags: {innerText: "Shift between Container & Element. The Module (element) is inside the Container."}},
            {type: "div", tags: {style: "display: flex; flex-direction: column;"}, children: [
                {type: "div", tags: {innerText: "Change all of the values here!"}},
                {type: "span", tags: {innerText: "View Info", style: "font-weight: bold; cursor: pointer; margin-right: 0;", className: "link"}, methods: [{type: "click", func: function(){ pd("mainGuide").article("styleOptions")}}]},
            ]}
        ]}
    ]}
    ]
}},
{id: "story_sheet", obj: { type: "div", children: [
    {type: "h3", tags: {innerText: "Story Sheet", style: "margin: 0px; font-weight: bold;"}},
    {type: "p", tags: {innerText: "Story Sheets are unique to each story. They function as the guide (body) to input the data of future characters. You'll get to style how the Character Sheets are made after creating the Story Sheet."}},
    {type: "p", tags: {innerText: "The main layout can be simplified into this:"}},
    {type: "div", tags: {id: "ssMockup"}, children: [
        {type: "div", tags: {className: "left", innerText: "This is a LIST of all Elements in the story sheet. You can organize the list here, add new Elements, and Save the Story Sheet here."}},
        {type: "div", tags: {className: "center", innerText: "This is your PREVIEW window. It will show you all of your changes as you makes changes."}},
        {type: "div", tags: {className: "right", innerText: "This is the STYLE LIST, which pops up whenever you select an Element from the List window. All of the options available will be through here."}}
    ]}
]}},
{id: "story_sheet_tips", obj: { type: "div", children: [
    {type: "h3", tags: {innerText: "Story Sheet Tips", style: "margin: 0px; font-weight: bold;"}},
    {type: "p", tags: {innerText: "Here are some quick tips for using the Story Sheet."}}

]}}
]


