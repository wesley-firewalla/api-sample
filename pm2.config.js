const envs = ['development', 'test', 'staging', 'production']
module.exports = {
  apps: [
    ...envs.map(it => ({
      name: 'api-' + it,
      instances: 1,
      script: 'index.js',
      args: [],
      cwd: './',
      exec_mode: 'cluster_mode',
      env: {
        NODE_APP_INSTANCE: '',
        NODE_ENV: it
      }
    }))
  ]
}
