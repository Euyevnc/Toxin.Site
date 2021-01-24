export default function(expend, container){
    let expanded = Boolean(expend)
    let area = container || document 
    area.querySelectorAll('.js-dropping-checkboxes').forEach(checkboxes=>{
        let icon = checkboxes.querySelector('i.material-icons')
        let menu = checkboxes.querySelector(".js-dropping-checkboxes__container")
        if(expanded) {
            menu.style.display = "block"
            icon.innerHTML = 'expand_less'
        }

        checkboxes.querySelector(".js-dropping-checkboxes__header").addEventListener('click', handlerHeaderClick)
        checkboxes.querySelector(".js-dropping-checkboxes__header").addEventListener('keydown', handlerHeaderKeydown)

        ////////
        function handlerHeaderClick(e){
            if(expanded){
                icon.innerHTML = 'expand_more'
                menu.style.display = "none"
            }
            else{
                icon.innerHTML = 'expand_less'
                menu.style.display = "block"
            }
            expanded = !expanded
        }
        function handlerHeaderKeydown(e){
            if(e.code=="Enter"){
                if(expanded){
                    icon.innerHTML = 'expand_more'
                    menu.style.display = "none"
                }
                else{
                    icon.innerHTML = 'expand_less'
                    menu.style.display = "block"
                }
                expanded = !expanded
            }
        }
    })
}

