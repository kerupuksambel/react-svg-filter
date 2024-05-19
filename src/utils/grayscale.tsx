import { HastNode } from "../types";

const calculateGrayscale = (color: string) => {
    // Calculate grayscale RPG from color
    color = color.replace(/^#/, '').toLowerCase();

    // Check if color match with RGB format
    if (!(color.match(/([a-fA-F0-9]{6})+/))) {
        // If not, try to convert the color code to hex
        if(hexFromColorConst(color)){
            color = hexFromColorConst(color) as string
        }

        return false
    }

    // Parse the R, G, B values
    let r = parseInt(color.substring(0, 2), 16);
    let g = parseInt(color.substring(2, 4), 16);
    let b = parseInt(color.substring(4, 6), 16);

    // NTSC calculation on grayscaling
    const grayscale = 0.299 * r + 0.587 * g + 0.114 * b;
    
    // Get calculated grayscale and return as hex
    const grayscaledHex = Math.round(grayscale).toString(16);
    return `#${grayscaledHex.repeat(3)}`;
}

const hexFromColorConst = (color: string) => {
    // list of html colors and its hex equivalent
    const colorList: {[key: string]: string} = {
        "aqua": "00FFFF",
        "black": "000000",
        "blue": "0000FF",
        "fuchsia": "FF00FF",
        "gray": "808080",
        "green": "008000",
        "lime": "00FF00",
        "maroon": "800000",
        "navy": "000080",
        "olive": "808000",
        "purple": "800080",
        "red": "FF0000",
        "silver": "C0C0C0",
        "teal": "008080",
        "white": "FFFFFF",
        "yellow": "FFFF00",
    }

    return colorList[color] || false
}

export default function grayscaleSVG(element: HastNode) {
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
        element.properties.fill = calculateGrayscale(element.properties.fill as string)
    }

    if(element.children){
        element.children = element.children.map((child) => grayscaleSVG(child));
    }

    return element
}