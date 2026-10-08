import ClickableComponentRegistry from "./Clickable";
import IconComponentRegistry from "./Icons";

const PresetComponentRegistry = {
    ...IconComponentRegistry,
    ...ClickableComponentRegistry
}

export default PresetComponentRegistry;