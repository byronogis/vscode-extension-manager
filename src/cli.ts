#!/usr/bin/env node

import { defineCommand, runMain } from 'citty'
import { consola } from 'consola'
import { description, name, version } from '../package.json'
import { install } from './install'
import { uninstall } from './uninstall'
import { installed } from './installed'

const main = defineCommand({
  meta: {
    name,
    version,
    description,
  },
  async run() {
    const selected = await consola.prompt('Choose the feature you want to use:', {
      type: 'select',
      options: [
        'install',
        'uninstall',
      ],
    })

    if (selected === 'install') {
      const ids_install = await consola.prompt('Enter extension IDs (separated by commas):', {
        type: 'text',
        placeholder: 'pub.name,pub.name,...',
      })

      if (!ids_install) {
        consola.warn('No extension to install.')
      }
      else {
        consola.start('Installing...')
        await install(ids_install)
        consola.success('Installed')
      }
    }
    else if (selected === 'unistall') {
      const ids_uninstall = await consola.prompt('Select the plugins to uninstall:', {
        type: 'multiselect',
        options: installed().map(({ id }) => id),
      })
      consola.start('Uninstalling...')
      await uninstall(ids_uninstall)
      consola.success('Uninstalled')
    }
  },
})

runMain(main)
