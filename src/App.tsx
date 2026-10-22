import { useCallback, useEffect, useState } from 'react'
import { Board } from './board/Board'
import { Detail } from './Detail'
import { Loader } from './Loader'
import { ReadView } from './read/ReadView'

type View = 'explore' | 'read'

function initialView(): View {
  return window.matchMedia('(max-width: 800px)').matches ? 'read' : 'explore'
}

export function App() {
  const [booting, setBooting] = useState(true)
  const [view, setView] = useState<View>(initialView)
  const [projectId, setProjectId] = useState<string | null>(null)
  const [tourSignal, setTourSignal] = useState(0)
  const [homeSignal, setHomeSignal] = useState(0)
  const finishBoot = useCallback(() => setBooting(false), [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setProjectId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const startTour = () => {
    setProjectId(null)
    setView('explore')
    setTourSignal((value) => value + 1)
  }

  const goHome = () => {
    setView('explore')
    setHomeSignal((value) => value + 1)
  }

  return (
    <div className={view === 'explore' ? 'app is-explore' : 'app is-read'}>
      {booting ? <Loader onDone={finishBoot} /> : null}
      <header className="chrome">
        <button type="button" className="home-mark" aria-label="Back to introduction" onClick={goHome} />
        <div className="chrome-actions">
          <div className="view-switch" role="group" aria-label="View">
            <button type="button" aria-pressed={view === 'explore'} onClick={() => setView('explore')}>
              Explore
            </button>
            <button type="button" aria-pressed={view === 'read'} onClick={() => setView('read')}>
              Read
            </button>
          </div>
          {view === 'read' ? (
            <button type="button" className="tour-button" onClick={startTour}>
              <span className="copper-dot" />
              Start tour
            </button>
          ) : null}
        </div>
      </header>
      {view === 'explore' ? (
        <Board openId={projectId} onOpen={setProjectId} tourSignal={tourSignal} homeSignal={homeSignal} />
      ) : (
        <ReadView />
      )}
      {projectId ? <Detail projectId={projectId} onClose={() => setProjectId(null)} /> : null}
    </div>
  )
}
