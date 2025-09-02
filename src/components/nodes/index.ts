import type { BuiltInNode, Node, NodeTypes } from "@xyflow/react";
import { Position } from "@xyflow/react";

import TriggerNode, {
  type TriggerNode as TriggerNodeType,
} from "./trigger-node";
import ConditionNode, {
  type ConditionNode as ConditionNodeType,
} from "./condition-node";
import ActionNode, { type ActionNode as ActionNodeType } from "./action-node";

export const initialNodes = [
  // ENTRY FLOW
  {
    id: "t1",
    type: "trigger",
    position: { x: 400, y: 480 },
    data: {
      label: "Vehicle detected at entry gate",
      description:
        "License plate recognition system detects incoming vehicle and triggers the parking workflow automation.",
    },
  },
  {
    id: "c1",
    type: "condition",
    position: { x: 400, y: 680 },
    data: {
      label: "Is vehicle registered?",
      description:
        "Check if the vehicle is in our registered member database with valid parking privileges.",
      trueLabel: "Yes",
      falseLabel: "No",
    },
  },

  // REGISTERED VEHICLE FLOW
  {
    id: "a1",
    type: "action",
    position: { x: 900, y: 960 },
    data: {
      label: "Assign parking slot",
      description:
        "Automatically assign an available parking slot for the registered member.",
      targetHandlePosition: Position.Left,
      actionCategory: "gate",
    },
  },
  {
    id: "a2",
    type: "action",
    position: { x: 900, y: 1140 },
    data: {
      label: "Send notification with slot",
      description:
        "Send SMS/email notification to user with their assigned parking slot number and location.",
      showIntegrations: true,
      integrations: ["Twilio", "SendGrid"],
      actionCategory: "notification",
    },
  },
  {
    id: "a3",
    type: "action",
    position: { x: 900, y: 1430 },
    data: {
      label: "Open gate",
      description:
        "Open the entry gate to allow the registered vehicle to proceed to their assigned slot.",
      actionCategory: "gate",
    },
  },

  // UNREGISTERED VEHICLE FLOW
  {
    id: "a4",
    type: "action",
    position: { x: 0, y: 960 },
    data: {
      label: "Send payment link notification",
      description:
        "Send SMS/email notification to user with Stripe payment link for parking fee.",
      showIntegrations: true,
      integrations: ["Stripe", "Twilio", "SendGrid"],
      actionCategory: "payment",
    },
  },
  {
    id: "c2",
    type: "condition",
    position: { x: 0, y: 1220 },
    data: {
      label: "Payment successful?",
      description:
        "Verify that the payment transaction was completed successfully via Stripe.",
      trueLabel: "Yes",
      falseLabel: "No",
      trueHandlePosition: Position.Right,
    },
  },
] satisfies Node[];

export const exitFlowNodes = [
  {
    id: "t2",
    type: "trigger",
    position: { x: 400, y: 480 },
    data: {
      label: "Vehicle detected at exit gate",
      description:
        "License plate recognition system detects vehicle approaching the exit gate to leave the parking lot.",
    },
  },
  {
    id: "c3",
    type: "condition",
    position: { x: 400, y: 680 },
    data: {
      label: "Stay > 2 hours?",
      description:
        "Monitor parking duration and check if the vehicle has exceeded the parking limit.",
      trueLabel: "Yes",
      falseLabel: "No",
      trueHandlePosition: Position.Bottom,
      falseHandlePosition: Position.Bottom,
    },
  },
  {
    id: "a4-exit",
    type: "action",
    position: { x: 740, y: 1060 },
    data: {
      label: "Apply extra charge",
      description:
        "Calculate and apply additional parking fees for vehicles that exceeded the free parking duration.",
      targetHandlePosition: Position.Top,
      sourceHandlePosition: Position.Left,
    },
  },
  {
    id: "a5-exit",
    type: "action",
    position: { x: 60, y: 1060 },
    data: {
      label: "Generate invoice, send notification",
      description:
        "Create final parking invoice and send notification (SMS/email) to the customer when they exit the parking lot.",
      actionCategory: "notification",
      targetHandlePosition: Position.Top,
      additionalTargetHandlePositions: [Position.Right],
    },
  },
  {
    id: "a6-exit",
    type: "action",
    position: { x: 60, y: 1270 },
    data: {
      label: "Open gate",
      description: "Open the exit gate to let the vehicle leave.",
      actionCategory: "gate",
      targetHandlePosition: Position.Top,
    },
  },
] satisfies Node[];

export const nodeTypes = {
  trigger: TriggerNode,
  condition: ConditionNode,
  action: ActionNode,
} satisfies NodeTypes;

// Append the types of you custom edges to the BuiltInNode type
export type CustomNodeType =
  | BuiltInNode
  | TriggerNodeType
  | ConditionNodeType
  | ActionNodeType;
