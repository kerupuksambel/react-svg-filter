export interface SVGProps {
    src?: string,
    children?: React.ReactNode,
    color?: string,
    grayscale?: boolean,
}

export interface HastNode {
    type: string;
    tagName?: string;
    properties?: Record<string, any>;
    children?: HastNode[];
    value?: string;
}