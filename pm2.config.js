module.exports = {
  apps: [
    {
      name: 'kinobook',
      exec_mode: 'cluster',
      instances: 4,
      autorestart: true,
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 4000',
    },
  ],
};
