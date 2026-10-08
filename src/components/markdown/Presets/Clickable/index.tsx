import ButtonPresetsComponentRegistry from "./Buttons";
import LinkPresetsComponentRegistry from "./Links";

const ClickableComponentRegistry = {
    ...LinkPresetsComponentRegistry,
    ...ButtonPresetsComponentRegistry
}

export default ClickableComponentRegistry;