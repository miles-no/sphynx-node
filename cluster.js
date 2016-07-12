import cluster from 'cluster';

if (cluster.isMaster) {
  require('./varnish');
  cluster.fork({worker: 'server'});
  cluster.fork({worker: 'moduleService'});
  cluster.fork({worker: 'api'});
  cluster.fork({worker: 'kipp'});
} else {
  require('./' + process.env.worker);
}
