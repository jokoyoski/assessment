const { defineConfig } = require('@vue/cli-service')
const dotenv = require('dotenv');

module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = () => {
  const env = dotenv.config().parsed;
  const environmentVariables = {};
  for (const key in env) {
    environmentVariables[`process.env.${key}`] = JSON.stringify(env[key]);
  }
   console.log(environmentVariables)
  return {
    pluginOptions: {
      define: environmentVariables
    }
  };
};
