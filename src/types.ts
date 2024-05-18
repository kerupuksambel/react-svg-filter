export interface SVGProps {
    src?: string,
    children?: React.ReactNode,
    filter: "grayscale" | "color",
    color?: string,
    grayscale?: number,
}