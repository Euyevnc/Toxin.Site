import "./Search_room_Filter_PreferencesDropdown.scss";

import header from "../../blocks/header/header.js"
import datePicker from "../../blocks/date-picker/date-picker"
import rangePicker from "../../blocks/range-picker/range-picker";
import counter from "../../blocks/input-with-counter/input-with-counter";
import droppingCheckboxes from "../../blocks/dropping-checkboxes/dropping-checkboxes";
import numberDemo from "../../blocks/number-demo/number-demo";

document.addEventListener('DOMContentLoaded', handlerDocumentDomLoaded)

//////
function handlerDocumentDomLoaded(){
    header()  
    datePicker()
    droppingCheckboxes()
    numberDemo()
    rangePicker()
    let counters = counter()
    counters[1].input.focus()

}




