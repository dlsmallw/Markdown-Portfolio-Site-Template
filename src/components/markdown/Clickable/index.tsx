import ButtonComponentRegistry from "./Buttons";
import LinkComponentRegistry from "./Links";

const ComponentRegistry = {
    ...ButtonComponentRegistry,
    ...LinkComponentRegistry,
}

export default ComponentRegistry;