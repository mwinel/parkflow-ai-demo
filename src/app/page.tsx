"use client";

import { useState, useCallback } from "react";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type OnConnect,
} from "@xyflow/react";
import Flow from "@/components/flow";

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  initialNodes,
  exitFlowNodes,
  type CustomNodeType,
} from "@/components/nodes";
import {
  initialEdges,
  exitFlowEdges,
  type CustomEdgeType,
} from "@/components/edges";

export default function Page() {
  const [activeFlowKey, setActiveFlowKey] = useState<"entry" | "exit">("entry");
  const [nodes, setNodes] = useState<CustomNodeType[]>(initialNodes);
  const [edges, setEdges] = useState<CustomEdgeType[]>(initialEdges);

  const onNodesChange = useCallback((changes: any) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes: any) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  const updateNodeData = useCallback(
    (nodeId: string, updates: Record<string, any>) => {
      setNodes((existing) =>
        existing.map((n) =>
          n.id === nodeId ? { ...n, data: { ...n.data, ...updates } } : n
        )
      );
    },
    []
  );

  const deleteNode = useCallback((nodeId: string) => {
    setNodes((existing) => existing.filter((n) => n.id !== nodeId));
    setEdges((existing) =>
      existing.filter((e) => e.source !== nodeId && e.target !== nodeId)
    );
  }, []);

  const addNode = useCallback((nodeData: any) => {
    setNodes((existingNodes) => {
      const maxX = existingNodes.reduce(
        (acc, n) => Math.max(acc, n.position.x),
        0
      );
      const avgY = existingNodes.length
        ? existingNodes.reduce((sum, n) => sum + n.position.y, 0) /
          existingNodes.length
        : 200;

      const newNode: CustomNodeType = {
        id: nodeData.id,
        type: nodeData.type,
        position: { x: maxX + 250, y: avgY },
        data: {
          label: nodeData.label,
          description: nodeData.description,
          ...(nodeData.type === "condition" && {
            trueLabel: nodeData.trueLabel,
            falseLabel: nodeData.falseLabel,
          }),
          ...(nodeData.type === "action" && {
            showIntegrations: nodeData.showIntegrations,
            integrations: nodeData.integrations,
          }),
        },
      };
      return [...existingNodes, newNode];
    });
  }, []);

  const handleSelectFlow = useCallback((key: "entry" | "exit") => {
    setActiveFlowKey(key);
    if (key === "entry") {
      setNodes(initialNodes);
      setEdges(initialEdges);
    } else {
      setNodes(exitFlowNodes);
      setEdges(exitFlowEdges);
    }
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar onAddNode={addNode} />
      <SidebarInset>
        <div className="absolute bottom-3 left-3 z-20">
          <SidebarTrigger className="-ml-1" />
        </div>
        <div className="flex flex-1 flex-col gap-4 pt-0">
          <Flow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onUpdateNodeData={updateNodeData}
            onDeleteNode={deleteNode}
            onSelectFlow={handleSelectFlow}
            activeFlowKey={activeFlowKey}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
