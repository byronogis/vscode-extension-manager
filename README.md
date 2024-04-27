# vscem

## Why

I use different config files in VSCode and often develop remotely via remote-ssh.

However, not all VSCode extensions in the remote environment are readily available; they require manual reinstallation, which is tedious. I wanted to automate the installation with the remote.SSH.defaultExtensions setting, but it can't be configured per configuration, so I abandoned that idea.

Looking for an easier way to install extensions, I created this package. First, run `code --list-extensions` on the local host to get the extension list, then print the list separated by commas (without new lines) and pass it to the install feature for installation. Or install extensions by profile (generate from export).

## Usage

```bash
npx vscem@latest
```
