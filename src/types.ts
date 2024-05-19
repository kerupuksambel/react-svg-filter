export interface SVGProps {
    src?: string,
    children?: React.ReactNode,
    filter: "grayscale" | "color",
    color?: string,
    grayscale?: number,
}

export interface HastNode {
    type: string;
    tagName?: string;
    properties?: Record<string, any>;
    children?: HastNode[];
    value?: string;
}