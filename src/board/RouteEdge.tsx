import { BaseEdge, EdgeLabelRenderer, getStraightPath, useViewport, type EdgeProps } from '@xyflow/react'
import type { RouteFlowEdge } from './graph'
import { useBoardActions } from './actions'

export function RouteEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
}: EdgeProps<RouteFlowEdge>) {
  const { enter } = useBoardActions()
  const { zoom } = useViewport()
  const [edgePath, labelX, labelY] = getStraightPath({ sourceX, sourceY, targetX, targetY })
  const label = data?.label ?? ''
  const index = data?.guideIndex ?? -1
  const angle = Math.atan2(targetY - sourceY, targetX - sourceX)
  const pull = 20 / Math.max(zoom, 0.2)
  const arrowX = targetX - Math.cos(angle) * pull
  const arrowY = targetY - Math.sin(angle) * pull
  const degrees = (angle * 180) / Math.PI

  return (
    <>
      <BaseEdge id={id} path={edgePath} className="route-line" />
      <EdgeLabelRenderer>
        <span
          className="route-arrow"
          style={{
            transform: `translate(-50%, -50%) translate(${arrowX}px, ${arrowY}px) rotate(${degrees}deg) scale(${1 / zoom})`,
          }}
        />
        {label ? (
          <button
            type="button"
            className="route-pill nopan"
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            }}
            onClick={() => enter(index)}
          >
            {label}
          </button>
        ) : null}
      </EdgeLabelRenderer>
    </>
  )
}
