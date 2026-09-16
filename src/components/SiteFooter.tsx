import { INSTALL_COMMAND, REPO_URL, UPSTREAM_URL } from '../catalog'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      MIT · fork of{' '}
      <a href={UPSTREAM_URL}>coreyhaines31/marketingskills</a> ·{' '}
      <a href={REPO_URL}>GitHub</a> · <code>{INSTALL_COMMAND}</code>
    </footer>
  )
}
