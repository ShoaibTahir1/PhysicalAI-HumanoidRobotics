---
sidebar_position: 7
---

# URDF vs SDF

## Concept Explanation
Roboticists primarily use two formats to describe robot models: URDF (Unified Robot Description Format) and SDF (Simulation Description Format). While URDF is the ROS standard for kinematics and tree-structured robots, SDF is the Gazebo native format that supports complex world environments, multiple robots, and non-tree joints (loop closures).

## Architecture Diagram
```
URDF (XML) -> [Robot State Publisher] -> /tf + Robot Description
SDF (XML)  -> [Gazebo Server] -> Physics World + Multiple Models
```

Comparison:
- URDF: Single robot, tree structure only, ROS-centric.
- SDF: Multiple robots, world assets, complex physics, Gazebo-centric.

## Tooling Stack
- `xacro` (XML Macros)
- `gz-sdf` tools
- URDF-to-SDF converters

## Practical Learning Goals
1. Convert a static URDF model into an SDF format for advanced simulation.
2. Understand why humanoids with closed-loop kinematic chains require SDF.
3. Use Xacro to manage complex robot descriptions for both formats.
