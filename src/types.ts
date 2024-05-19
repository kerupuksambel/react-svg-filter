export interface SVGProps {
    src?: string,
    children?: React.ReactNode,
    // Color props
    colorize?: boolean,
    colorProps?: ColorProps
    grayscale?: boolean,
}

export interface HastNode {
    type: string;
    tagName?: string;
    properties?: Record<string, any>;
    children?: HastNode[];
    value?: string;
}

export interface ColorProps {
    omittedColors?: string[],
    color: string
}