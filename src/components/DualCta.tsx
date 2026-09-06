import { CopyCommand } from './CopyCommand'
import { INSTALL_COMMAND, REPO_URL } from '../catalog'

export function DualCta() {
  return (
    <div className="cta-row">
      <div className="cta-primary">
        <p className="cta-label">In another project</p>
        <CopyCommand command={INSTALL_COMMAND} />
        <p className="cta-secondary">
          Run that in your product repo. Clone Official in Cursor when you want
          the 10 specialists.
        </p>
      </div>
      <p className="cta-secondary">
        <a href={REPO_URL}>Clone this repo in Cursor</a> for the 10 subagents
        (do not install all 50 skills into one Cursor project).
      </p>
    </div>
  )
}
