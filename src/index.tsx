import * as React from 'react';
import { parse } from 'svg-parser';
import { HastNode, SVGProps } from './types';
import ReactDomServer from 'react-dom/server';
import grayscaleSVG from './utils/grayscale';
import colorizeSVG from './utils/colorize';

const hastToReact = (hastNode: HastNode, index?: number): React.ReactNode => {
    if(!index) index = 0;
    if (hastNode.type === 'text') {
      return hastNode.value || null;
    }
  
    const { tagName = 'div', properties, children = [] } = hastNode;
  
    if (!tagName) {
      return null;
    }
  
    const reactChildren = children.map((child, index) => hastToReact(child, index));
  
    return React.createElement(tagName, { ...properties, key: properties?.key || index }, ...reactChildren);
  }

const SVGFilter: React.FC<SVGProps> = ({ src, children, grayscale, color }) => {
    // TODO: handle external svg in src arg
    var elem: string|null = null;
    if (children) {
        if(React.isValidElement(children) && children.type === 'svg'){
            elem = ReactDomServer.renderToStaticMarkup(children);
        }else{
            throw new Error("Invalid SVG file.")
        }
    }else{
        if(src){
            // TODO: read external SVG file
            // elem = ReactDomServer.renderToString(<img src={src}></img>)
            fetch(src).then((res) => res.text()).then((res) => elem = res)
        }
    }

    console.log(elem)

    // Process element into HAST
    if(elem){
        // Convert to HAST
        var parsedElem = parse(elem) as HastNode;

        // Process the HAST props
        if(grayscale !== undefined){
            parsedElem = grayscaleSVG(parsedElem);
        }

        if(color !== undefined){
            parsedElem = colorizeSVG(parsedElem, color);
        }

        // Convert back to ReactNode
        const resultElem = hastToReact(parsedElem);

        return resultElem;
    }

    return <></>
}

export default SVGFilter;