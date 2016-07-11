export default function (config) {
  return function ({page, moduleDefinitions, req}) {
   // Reduce array of module definitions to hash map
   const defs = moduleDefinitions.reduce((acc, def) => ({ ...acc, [def.key]: def }), {});

   // Assign url to each module on the page
   const mergedModules = page.modules.map((module) => {
     return Object.assign({}, module, {
       url: config.resolveModuleUrl(defs[module.key], req),
       definition: defs[module.key]
     });
   }).filter((module) => {
     // Filter hidden modules
     return config.shouldLoadModule(module, req);
   });

   const mergedPage = Object.assign({}, page, {
     modules: mergedModules
   });

   return {
     page: mergedPage,
     moduleDefinitions,
     req
   };
  }
};
