import { exec as execCb } from 'node:child_process'
import { promisify } from 'node:util'
import { vscodeExtensionIdPattern } from './_utils'

const exec = promisify(execCb)

export async function install(ids: string | string[]) {
  if (typeof ids === 'string') {
    ids = ids.split(',')
      .map(id => id.trim())
      .filter(id => vscodeExtensionIdPattern.test(id))
  }

  return Promise.all(ids.map(id => exec(`code --install-extension ${id}`)))
}
