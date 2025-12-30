---
sidebar_position: 5
---

# Humanoid URDF

The Unified Robot Description Format (URDF) is an XML-based language used to describe the visual, physical, and kinematic properties of a humanoid robot.

## Concept: Kinematic Chains
A humanoid robot is described as a collection of **Links** (limbs/parts) connected by **Joints** (pivots/motors). The URDF tells the computer where the arms, legs, and head are relative to the torso.

## Architecture Diagram
```text
[Torso Link]
    |
    +-- [Shoulder Joint] -- [Upper Arm Link]
    |
    +-- [Neck Joint] -- [Head Link]
    |
    +-- [Hip Joint] -- [Thigh Link]
```
*Description: A tree structure (hierarchy) representing the robot's skeletal frame.*

## Core Elements
- **Links**: Visual (mesh), Collision (physics), and Inertial (mass/gravity) properties.
- **Joints**: Type (revolute, fixed, prismatic), limits (angles), and parent/child relationships.
- **Transmission**: Mechanical reduction and motor specifications.

## Tooling Stack
- **XML**: The base language.
- **Xacro**: XML Macros to simplify complex humanoid files.
- **MeshLab / Blender**: For creating 3D visual and collision meshes.
- **Rviz2**: To visualize the robot model.

## Practical Learning Goals
1. Understand the tree-based structure of a robot model.
2. Differentiate between visual, collision, and inertial properties.
3. Learn how to define movement constraints for humanoid joints.
