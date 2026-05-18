import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'oph7176c',
    dataset: 'production'
  },
  deployment: {
    appId: 'c6tcf2u7k88jbnkulqkmnju2',
    autoUpdates: true,
  }
})
