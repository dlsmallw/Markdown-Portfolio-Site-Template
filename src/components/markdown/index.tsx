import type { Components } from "react-markdown";

const modules = import.meta.glob<Components>("./*/index.tsx", {
  import: "default",
  eager: true,
});

const ComponentRegistry: Components = {};

// Dynamically imports all markdown components from each subdirectory
for (const [fp, importRegistry] of Object.entries(modules)) {
  console.log(`Loading component registry from ${fp}`);

  // Exclude the root registry itself
  if (fp === "./index.tsx") continue;

  Object.assign(ComponentRegistry, importRegistry);
}

export default ComponentRegistry;