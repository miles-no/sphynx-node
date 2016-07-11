import readLayout from './readLayout';

export default function (config) {
  return function ({page, req}) {
    return readLayout(config.resolveTemplateName(page, req))
     .then((layout) => {
       const data = config.prepareTemplateData(page, req);
       return config.renderTemplate(layout, data, req);
   });
  };
}
