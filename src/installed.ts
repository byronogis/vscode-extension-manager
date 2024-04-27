import { execSync } from 'node:child_process'
import { vscodeExtensionIdWithVersionPattern } from './_utils'

export function installed(): InstalledItem[] {
  const output = execSync('code --list-extensions --show-versions', { encoding: 'utf-8' })

  const list: InstalledItem[] = output.split('\n')
    .filter(i => vscodeExtensionIdWithVersionPattern.test(i))
    .map((i) => {
      const [id, version] = i.split('@')
      return { id, version }
    })

  return list
}

export interface InstalledItem {
  /**
   * extension id
   */
  id: string
  /**
   * extension version
   */
  version: string
}
