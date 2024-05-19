import * as React from 'react';
import { parse } from 'svg-parser';
import { HastNode, SVGProps } from './types';
import ReactDomServer from 'react-dom/server';
import grayscaleSVG from './utils/grayscale';

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

const SVGFilter: React.FC<SVGProps> = ({ src, children, filter, grayscale, color }) => {
    // TODO: handle external svg in src arg
    var elem: string|null = null;
    if (children) {
        if(React.isValidElement(children) && children.type === 'svg'){
            // const div = document.createElement('div');
            const renderedChildren = ReactDomServer.renderToStaticMarkup(children);
            elem = renderedChildren
            // elem = div.innerHTML; 
        }else{
            throw new Error("Invalid SVG file.")
        }
    }else{
        elem = null;
    }

    

    // Process element into HAST
    if(elem){
        // Convert to HAST
        var parsedElem = parse(elem) as HastNode;

        // Processing started here
        if(filter === "grayscale"){
            parsedElem = grayscaleSVG(parsedElem);
        }

        // Processing end

        // Convert back to ReactNode
        const resultElem = hastToReact(parsedElem);
        
        return resultElem;
    }

    return <></>
    
}

export default SVGFilter;