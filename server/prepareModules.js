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

    const headerAssets = mergedModules.map((module) => {
      return config.resolveHeaderAssets(module.definition, req);
    }).reduce((a, b) => {
      return a.concat(b);
    });

    const footerAssets = mergedModules.map((module) => {
      return config.resolveFooterAssets(module.definition, req);
    }).reduce((a, b) => {
      return a.concat(b);
    });

    const mergedPage = Object.assign({}, page, {
      modules: mergedModules,
      headerAssets: [...new Set(headerAssets)],
      footerAssets: [...new Set(footerAssets)]
    });

    return {
      page: mergedPage,
      moduleDefinitions,
      req
    };
  }
};
