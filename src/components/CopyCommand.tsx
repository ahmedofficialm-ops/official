import { useState } from 'react'

export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="command">
      <code>{command}</code>
      <button type="button" onClick={() => copy()}>
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}
