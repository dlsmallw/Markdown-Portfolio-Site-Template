import type { Components } from "react-markdown";

let ComponentRegistry: Components = {}

const modules = (import.meta as ImportMeta & {
    glob: <T>(pattern: string, options: { eager: true }) => Record<string, T>
}).glob<Components>('./*/index.tsx', { eager: true });

for (const fp in modules) {
    if (fp === './index.tsx') continue;
    
    const module = await import(/* @vite-ignore */ fp);
    if (!module) continue;

    const importRegistry = module.default as Components;
    ComponentRegistry = {
        ...ComponentRegistry,
        ...importRegistry
    }
};

export default ComponentRegistry;