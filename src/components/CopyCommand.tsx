import { useRef, useState } from 'react'

export function CopyCommand({
  command,
  label = 'Copy command',
}: {
  command: string
  label?: string
}) {
  const [copied, setCopied] = useState(false)
  const codeRef = useRef<HTMLElement>(null)

  async function copy() {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      const node = codeRef.current
      if (node) {
        const range = document.createRange()
        range.selectNodeContents(node)
        const selection = window.getSelection()
        selection?.removeAllRanges()
        selection?.addRange(range)
      }
      setCopied(false)
    }
  }

  return (
    <div className="command">
      <code ref={codeRef}>{command}</code>
      <button type="button" onClick={() => copy()} aria-label={`Copy ${command}`}>
        {copied ? 'Copied' : label}
      </button>
    </div>
  )
}
