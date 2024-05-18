import * as React from 'react';
import { parse } from 'svg-parser';
import { SVGProps } from './types';
import ReactDomServer from 'react-dom/server';
import grayscaleSVG from './utils/grayscale';

const SVGFilter: React.FC<SVGProps> = ({ src, children, filter, grayscale, color }) => {
    // TODO: handle external svg in src arg
    var elem: string|null = null;
    if (children) {
        if(React.isValidElement(children) && children.type === 'svg'){
            // const div = document.createElement('div');
            const renderedChildren = ReactDomServer.renderToStaticMarkup(children);
            console.log(renderedChildren)
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
        const parsedElem = parse(elem);

        console.log(parsedElem)
    }
    
    return elem ? <>{elem}</> : <></>;
}

export default SVGFilter;