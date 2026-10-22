import type { Edge, Node } from '@xyflow/react'
import { boxes, guideIndex, processSteps, projects } from '../data/portfolio'

export type RouteEdgeData = {
  label: string
  focusIds: string[]
  guideIndex: number
}

export type ProjectNodeData = {
  projectId: string
  guideIndex: number
}

export type ProjectFlowNode = Node<ProjectNodeData, 'project'>
export type StepFlowNode = Node<{ stepId: string }, 'step'>
export type RouteFlowEdge = Edge<RouteEdgeData, 'route'>

export function buildNodes(): Node[] {
  const box = (id: string) => {
    const frame = boxes[id]
    return {
      position: { x: frame.x, y: frame.y },
      width: frame.width,
      height: frame.height,
      style: { width: frame.width, height: frame.height },
      draggable: false,
    }
  }

  return [
    { id: 'intro', type: 'intro', data: {}, ...box('intro') },
    { id: 'contact', type: 'contact', data: {}, ...box('contact') },
    { id: 'practice', type: 'practice', data: {}, ...box('practice') },
    { id: 'process', type: 'process', data: {}, ...box('process') },
    { id: 'work', type: 'work', data: {}, ...box('work') },
    { id: 'note', type: 'note', data: {}, ...box('note') },
    ...processSteps.map((step) => ({
      id: step.id,
      type: 'step',
      data: { stepId: step.id },
      ...box(step.id),
    })),
    ...projects.map((project) => ({
      id: project.id,
      type: 'project',
      data: { projectId: project.id, guideIndex: guideIndex(project.id) } satisfies ProjectNodeData,
      ...box(project.id),
    })),
  ]
}

export function buildEdges(): Edge<RouteEdgeData>[] {
  return [
    {
      id: 'route-process',
      source: 'intro',
      target: 'process',
      sourceHandle: 'left',
      targetHandle: 'in',
      type: 'route',
      data: { label: 'how I work', focusIds: ['process'], guideIndex: guideIndex('process') },
    },
    {
      id: 'route-work',
      source: 'intro',
      target: 'work',
      sourceHandle: 'right',
      targetHandle: 'in',
      type: 'route',
      data: { label: 'selected work', focusIds: ['work'], guideIndex: guideIndex('work') },
    },
    {
      id: 'route-contact',
      source: 'intro',
      target: 'contact',
      sourceHandle: 'top',
      targetHandle: 'in',
      type: 'route',
      data: { label: 'contact', focusIds: ['contact'], guideIndex: guideIndex('contact') },
    },
    {
      id: 'route-practice',
      source: 'intro',
      target: 'practice',
      sourceHandle: 'bottom',
      targetHandle: 'in',
      type: 'route',
      data: { label: 'practice', focusIds: ['practice'], guideIndex: guideIndex('practice') },
    },
    ...processSteps.slice(0, -1).map((step, index) => ({
      id: `link-${step.id}`,
      source: step.id,
      target: processSteps[index + 1].id,
      sourceHandle: 'out',
      targetHandle: 'in',
      type: 'route' as const,
      data: { label: '', focusIds: [processSteps[index + 1].id], guideIndex: guideIndex(processSteps[index + 1].id) },
    })),
    {
      id: 'link-process-step',
      source: 'process',
      target: 'step-1',
      sourceHandle: 'down',
      targetHandle: 'in',
      type: 'route',
      data: { label: '', focusIds: ['step-1'], guideIndex: guideIndex('step-1') },
    },
    ...[
      ['work', 'neuralyzer', 'out', 'in'],
      ['work', 'emotion', 'out', 'in'],
      ['neuralyzer', 'clinical', 'out', 'in'],
      ['emotion', 'guardrails', 'out', 'in'],
      ['emotion', 'godseye', 'down', 'top'],
      ['guardrails', 'godseye', 'down', 'top'],
    ].map(([source, target, sourceHandle, targetHandle]) => ({
      id: `link-${source}-${target}`,
      source,
      target,
      sourceHandle,
      targetHandle,
      type: 'route' as const,
      data: {
        label: '',
        focusIds: [target],
        guideIndex: guideIndex(target),
      },
    })),
  ]
}
