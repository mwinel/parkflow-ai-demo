import type { BuiltInEdge } from "@xyflow/react";

import { AnimatedSvgEdge } from "@/components/ui/animated-svg-edge";

export const initialEdges = [
  // ENTRY FLOW
  {
    id: "t1->c1",
    source: "t1",
    target: "c1",
    type: "animatedSvgEdge",
  },

  // REGISTERED VEHICLE FLOW
  {
    id: "c1->a1",
    source: "c1",
    sourceHandle: "true",
    target: "a1",
    type: "animatedSvgEdge",
  },
  {
    id: "a1->a2",
    source: "a1",
    target: "a2",
    type: "animatedSvgEdge",
  },
  {
    id: "a2->a3",
    source: "a2",
    target: "a3",
    type: "animatedSvgEdge",
  },

  // UNREGISTERED VEHICLE FLOW
  {
    id: "c1->a4",
    source: "c1",
    sourceHandle: "false",
    target: "a4",
    type: "animatedSvgEdge",
  },
  {
    id: "a4->c2",
    source: "a4",
    target: "c2",
    type: "animatedSvgEdge",
  },
  {
    id: "c2->a1",
    source: "c2",
    sourceHandle: "true",
    target: "a1",
    type: "animatedSvgEdge",
  },
] satisfies AnimatedSvgEdge[];

export const exitFlowEdges = [
  {
    id: "t2->c3",
    source: "t2",
    target: "c3",
    type: "animatedSvgEdge",
  },
  {
    id: "c3->a4-exit",
    source: "c3",
    sourceHandle: "true",
    target: "a4-exit",
    type: "animatedSvgEdge",
  },
  {
    id: "c3->a5-exit",
    source: "c3",
    sourceHandle: "false",
    target: "a5-exit",
    type: "animatedSvgEdge",
  },
  {
    id: "a4-exit->a5-exit",
    source: "a4-exit",
    target: "a5-exit",
    targetHandle: "target-right",
    type: "animatedSvgEdge",
  },
  {
    id: "a5-exit->a6-exit",
    source: "a5-exit",
    target: "a6-exit",
    type: "animatedSvgEdge",
  },
] satisfies AnimatedSvgEdge[];

export const edgeTypes = {
  animatedSvgEdge: AnimatedSvgEdge,
};

// Append the types of you custom edges to the BuiltInEdge type
export type CustomEdgeType = BuiltInEdge | AnimatedSvgEdge;
