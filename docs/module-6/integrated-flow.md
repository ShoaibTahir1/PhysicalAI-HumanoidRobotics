---
sidebar_position: 23
---

# Integrated Flow: Voice → Plan → Navigate → Perceive → Act

The "Integrated Flow" is the sequence of events that allows a robot to translate a human's abstract voice command into a series of coordinated physical movements. This chapter breaks down this pipeline step-by-step.

## Learning Objectives
- Trace the lifecycle of a command through the robot's software stack.
- Understand how vision and language are fused for robotic decision-making.
- Implement a state-machine or behavior-tree to manage robot tasks.

## Concept Explanation
Robotic autonomy isn't just one model; it's a **pipeline**. When you tell a robot "Bring me a bottle from the kitchen," several distinct AI systems must collaborate. The *Integrated Flow* manages the handoff between these systems. If the vision system fails to see the bottle, the flow must trigger a "Search" behavior rather than attempting to "Grasp" empty air.

### The Pipeline Steps
1.  **Voice:** Audio is captured and converted to text using ASR (Automatic Speech Recognition).
2.  **Plan:** An LLM extracts intent and parameters (Task: Fetch, Object: Bottle, Location: Kitchen).
3.  **Navigate:** The robot uses its internal map and LiDAR to move to the kitchen.
4.  **Perceive:** Once there, the VLM (Vision-Language Model) identifies the exact bottle on the counter.
5.  **Act:** The motion policy executes the grasp and return movement.

## System Architecture
The flow is orchestrated using a **Behavior Tree (BT)**:
- **Root Node:** Main Task Controller.
- **Sequence Node (Voice-to-Plan):** Listens for command -> Analyzes text -> Confirms intent.
- **Fallback Node (Perception):** If object not found -> Rotate 360 degrees -> If still not found -> Ask for help.
- **Action Node (Locomotion):** Sends velocity commands to the legs/wheels.
- **Action Node (Manipulation):** Sends joint positions to the arm.

## Tools & Technologies
- **BehaviorTree.CPP / Nav2:** For task orchestration and navigation.
- **VIMA / RT-2:** Examples of Vision-Language-Action (VLA) models.
- **NVIDIA Riva / Whisper:** For high-accuracy voice processing.
- **Foxglove Studio:** For visualizing the flow and debugging specific pipeline stages.

---
