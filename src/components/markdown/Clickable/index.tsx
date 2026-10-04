import { type AnchorHTMLAttributes } from "react";

import ButtonComponentRegistry from "./Buttons";
import LinkComponentRegistry from "./Links";

export const LinkComponent: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ ...props }) => {
    return <a {...props} />;
}

const ComponentRegistry = {
    ['link']: LinkComponent,
    ...ButtonComponentRegistry,
    ...LinkComponentRegistry,
}

export default ComponentRegistry;