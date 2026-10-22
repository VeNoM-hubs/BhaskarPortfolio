import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Background,
  BackgroundVariant,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type EdgeTypes,
  type FitViewOptions,
  type NodeTypes,
} from '@xyflow/react'
import { guide } from '../data/portfolio'
import { BoardActionsContext, type BoardActions } from './actions'
import { buildEdges, buildNodes } from './graph'
import { ContactNode, IntroNode, NoteNode, PracticeNode, ProcessNode, ProjectNode, StepNode, WorkNode } from './nodes'
import { Cursor } from './Cursor'
import { RouteEdge } from './RouteEdge'

const nodeTypes = {
  intro: IntroNode,
  step: StepNode,
  project: ProjectNode,
  contact: ContactNode,
  practice: PracticeNode,
  process: ProcessNode,
  work: WorkNode,
  note: NoteNode,
} as NodeTypes

const edgeTypes = {
  route: RouteEdge,
} as EdgeTypes

type BoardProps = {
  openId: string | null
  onOpen: (id: string | null) => void
  tourSignal: number
  homeSignal: number
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function viewOptions(ids: string[], home = false): FitViewOptions {
  const group = ids.length > 1
  return {
    nodes: ids.map((id) => ({ id })),
    duration: prefersReducedMotion() ? 0 : 700,
    padding: home ? 0.22 : group ? 0.28 : 0.35,
    maxZoom: home ? 1.12 : group ? 0.9 : 1.2,
    minZoom: home ? 0.9 : 0.45,
  }
}

function BoardCanvas({ openId, onOpen, tourSignal, homeSignal }: BoardProps) {
  const { fitView, getViewport, setViewport, zoomIn, zoomOut } = useReactFlow()
  const fitViewRef = useRef(fitView)
  const [guideIndex, setGuideIndex] = useState(-1)

  useEffect(() => {
    fitViewRef.current = fitView
  }, [fitView])

  const nodes = useMemo(() => buildNodes(), [])
  const edges = useMemo(() => buildEdges(), [])

  const goHome = useCallback(() => {
    setGuideIndex(-1)
    onOpen(null)
    void fitViewRef.current(viewOptions(['intro'], true))
  }, [onOpen])

  const enter = useCallback(
    (index: number) => {
      const stop = guide[index]
      if (!stop) return
      setGuideIndex(index)
      onOpen(null)
      void fitViewRef.current(viewOptions(stop.focusIds))
    },
    [onOpen],
  )

  const back = useCallback(() => {
    const stop = guide[guideIndex]
    if (!stop?.parentId) {
      goHome()
      return
    }
    const parent = guide.findIndex((item) => item.id === stop.parentId)
    if (parent >= 0) enter(parent)
    else goHome()
  }, [enter, goHome, guideIndex])

  const next = useCallback(() => {
    if (guideIndex < guide.length - 1) enter(guideIndex + 1)
    else goHome()
  }, [enter, goHome, guideIndex])

  useEffect(() => {
    if (tourSignal > 0) enter(0)
  }, [tourSignal, enter])

  useEffect(() => {
    if (homeSignal > 0) goHome()
  }, [homeSignal, goHome])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (openId) return
      const target = event.target
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        const viewport = getViewport()
        void setViewport({ ...viewport, x: viewport.x + 56 })
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        const viewport = getViewport()
        void setViewport({ ...viewport, x: viewport.x - 56 })
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        const viewport = getViewport()
        void setViewport({ ...viewport, y: viewport.y + 56 })
      } else if (event.key === 'ArrowDown') {
        event.preventDefault()
        const viewport = getViewport()
        void setViewport({ ...viewport, y: viewport.y - 56 })
      } else if (event.key === '+' || event.key === '=') {
        event.preventDefault()
        void zoomIn({ duration: prefersReducedMotion() ? 0 : 160 })
      } else if (event.key === '-' || event.key === '_') {
        event.preventDefault()
        void zoomOut({ duration: prefersReducedMotion() ? 0 : 160 })
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [getViewport, openId, setViewport, zoomIn, zoomOut])

  const actions = useMemo<BoardActions>(() => ({ enter }), [enter])
  const stop = guideIndex >= 0 ? guide[guideIndex] : null

  return (
    <BoardActionsContext.Provider value={actions}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onInit={(instance) => {
          void instance.fitView({ ...viewOptions(['intro'], true), duration: 0 })
        }}
        minZoom={0.28}
        maxZoom={1.45}
        nodesDraggable={false}
        nodesConnectable={false}
        nodesFocusable={false}
        edgesFocusable={false}
        elementsSelectable={false}
        panOnScroll
        zoomOnScroll
        zoomOnPinch
        zoomActivationKeyCode={['Control', 'Meta']}
        zoomOnDoubleClick={false}
        proOptions={{ hideAttribution: false }}
        onPaneClick={() => onOpen(null)}
        style={{ background: '#f3f0e8' }}
      >
        <Background variant={BackgroundVariant.Dots} gap={22} size={1.4} color="#d4cdc2" />
      </ReactFlow>
      {stop ? (
        <>
          <button type="button" className="back-button" data-cursor="Back" onClick={back}>
            Back
          </button>
          {stop.nextLabel ? (
            <button type="button" className="next-button" data-cursor="Next" onClick={next}>
              <span className="next-kicker">Next</span>
              <span className="next-name">{stop.nextLabel}</span>
            </button>
          ) : null}
        </>
      ) : (
        <>
          <p className="map-hint">scroll to explore · drag to pan · ctrl scroll to zoom</p>
          <div className="tour-dock">
            <button type="button" className="tour-button" onClick={() => enter(0)}>
              <span className="copper-dot" />
              Start tour
            </button>
          </div>
        </>
      )}
    </BoardActionsContext.Provider>
  )
}

export function Board(props: BoardProps) {
  return (
    <div className="board">
        <ReactFlowProvider>
        <BoardCanvas {...props} />
      </ReactFlowProvider>
      <Cursor />
    </div>
  )
}
