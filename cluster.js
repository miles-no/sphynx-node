import cluster from 'cluster';

if (cluster.isMaster) {
  require('./varnish');
  cluster.fork({worker: 'backend'});
  cluster.fork({worker: 'module-service'});
  cluster.fork({worker: 'api'});
} else {
  if(process.env.worker === 'backend'){
    require('./server');
  }
  if(process.env.worker === 'module-service'){
    require('./moduleService');
  }
  if(process.env.worker === 'api'){
    require('./api');
  }
}
