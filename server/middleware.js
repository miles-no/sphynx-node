import fetch from 'node-fetch';
import prepareModules from './prepareModules';
import renderTemplate from './renderTemplate';

export default function (config) {
  return (req, res, next) => {
    const path = encodeURIComponent(req.path);
    Promise.all([
        fetch(`${config.apiUrl}/pages/${path}`),
        fetch(`${config.apiUrl}/moduledefinitions`)
      ])
      .then((results) => Promise.all([results[0].json(), results[1].json()]))
      .then((results) => {
        return {
          req,
          page: results[0],
          moduleDefinitions: results[1],
        };
      })
      .then(prepareModules(config))
      .then(renderTemplate(config))
      .then((html) => {
        res.send(html).end();
      })
      .catch((err) => {
        next(err);
      });
  };
}
