import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'oph7176c',
    dataset: 'production',
  },
  deployment: {
    appId: 'aneeagwo4uuzbady2qi3iy52',
    autoUpdates: true,
  },
  studioHost: 'phys-notes',
})
