import { HastNode } from "../types";


export default function colorizeSVG(element: HastNode, color: string) {
    // const fillRegex =  new RegExp("fill=\"(.*?)\"");
    // const filteredSrc = src.replace(fillRegex, (match, group) => {
    //     const calculatedHex = calculateGrayscaleFromHex(group);
    //     if(!calculatedHex) {
    //         throw new Error("Invalid RGB hexcode or HTML color name. Module currently accepts RGB and HTML color names.");
    //     }
    //     return `fill=\"${calculatedHex}\"`
    // })

    // return filteredSrc;
    if(element.properties && element.properties.fill){
        element.properties.fill = color
    }

    if(element.children){
        element.children = element.children.map((child) => colorizeSVG(child, color));
    }

    return element
}