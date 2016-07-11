import handlebars from 'handlebars';

const config = {
  // Determine which template to load for a page.
  // This can be customized to your own taste.
  resolveTemplateName(page, req) {
    return req.isAuthenticated() ? page.adminLayout : page.layout;
  },

  // Determine which url to fetch a module from.
  // This can be customized to your own taste.
  resolveModuleUrl(moduleDefinition, req) {
    return req.isAuthenticated() ? moduleDefinition.adminUrl : moduleDefinition.url;
  },

  // Determine whether or not to load a module,
  // Can be used to show/hide modules for non authenticated users.
  // This can be customized to your own taste.
  shouldLoadModule(module, req) {
    if (module.requireAuth) {
      return req.isAuthenticated();
    }
    return true;
  },

  prepareTemplateData(page, req) {
    return {
      page,
      req,
      isAuthenticated: req.isAuthenticated(),
    };
  },

  // Render layouts.
  // Choose whatever rendering engine you like
  renderTemplate(layout, data) {
    // TODO: Cache compiled templates
    const template = handlebars.compile(layout);
    return template(data);
  },

  renderInclude(module, req) {
    if (req.isAuthenticated()) {
      return `<div data-module-id="${module.id}">
                <div>${module.definition.name}</div>
                <div><esi:include src="${module.url}" /></div>
              </div>`;
    }
    return `<esi:include src="${module.url}" />`;
  },
};

handlebars.registerHelper('renderInclude', (module, req) => {
  return config.renderInclude(module, req);
});

export default config;
