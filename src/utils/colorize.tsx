import { ColorProps, HastNode } from "../types";

export default function colorizeSVG(element: HastNode, props: ColorProps) {
    // const fillRegex =  new RegExp("fill=\"(.*?)\"");
    // const filteredSrc = src.replace(fillRegex, (match, group) => {
    //     const calculatedHex = calculateGrayscaleFromHex(group);
    //     if(!calculatedHex) {
    //         throw new Error("Invalid RGB hexcode or HTML color name. Module currently accepts RGB and HTML color names.");
    //     }
    //     return `fill=\"${calculatedHex}\"`
    // })

    // return filteredSrc;
    // Cast props.omittedColors to array

    // TODO: map color name to hexcode
    props.omittedColors = props.omittedColors?.map(color => color.toLowerCase());
    console.log(props)

    if(element.properties && element.properties.fill){
        if(!(props.omittedColors && (props.omittedColors.includes(element.properties.fill.toLowerCase())))){
            element.properties.fill = props.color
        }
    }

    if(element.children){
        element.children = element.children.map((child) => colorizeSVG(child, props));
    }

    return element
}