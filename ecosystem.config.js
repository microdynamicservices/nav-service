module.exports = {
  apps: [{
    name: 'nav-service',
    script: './server/index.js'  
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-18-223-184-74.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/hello_world.pem',
      ref: 'origin/master',
      repo: 'git@github.com:selder18/nav-service.git',
      path: '/home/ubuntu/nav-service',
      'post-deploy': 'npm install && npm run start-deploy && npm run restart'
    }
  }
}