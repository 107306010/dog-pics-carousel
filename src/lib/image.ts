import SEARCH_ICON from "../../public/search.svg"
import CLOSE_ICON from "../../public/close.svg"
import LEFT_ICON from "../../public/chevron-left.svg"
import RIGHT_ICON from "../../public/chevron-right.svg"

export const get_image = (type:string, name:string) => {
    if (type==="svg"){
        if (name ==="search"){
            return SEARCH_ICON
        } else if (name ==="close") {
            return CLOSE_ICON
        } else if (name ==="right_arrow") {
            return RIGHT_ICON
        } else if (name ==="left_arrow") {
            return LEFT_ICON
        } else {
            return null
        }
    }
    return null
}