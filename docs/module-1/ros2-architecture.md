---
sidebar_position: 3
---

# ROS 2 Architecture

The Robot Operating System (ROS 2) is the industry-standard middleware used to build robot software. It provides a structured way for different parts of a robot (the "nervous system") to talk to each other.

## Concept: Distributed Processing
ROS 2 uses a peer-to-peer architecture where software is broken down into small, reusable programs called **Nodes**. These nodes communicate using established patterns.

## Architecture Diagram
```text
[Node A: Camera] --- (Topic: /image_raw) ---> [Node B: Object Detection]
[Node C: Brain]  <-- (Service Call) --------> [Node D: Map Server]
[Node C: Brain]  === (Action: Navigate) ====> [Node E: Base Controller]
```
*Description: Nodes connected via Topics (streaming data), Services (request/response), and Actions (long-running goals with feedback).*

## Core Components
- **Nodes**: Individual processes that perform computation.
- **Topics**: Asynchronous "bus" for streaming data (Publisher/Subscriber).
- **Services**: Synchronous request/response communication.
- **Actions**: High-level communication for goals with feedback and cancellation.
- **Parameters**: Global variables for configuring nodes.

## Tooling Stack
- **RCL (ROS Client Libraries)**: rclpy for Python, rclcpp for C++.
- **Rviz2**: Visualization tool.
- **Rqt**: Graphical user interface tools.
- **DDS (Data Distribution Service)**: The underlying transport layer.

## Practical Learning Goals
1. Explain the role of a middleware in robotics.
2. Differentiate between Topics, Services, and Actions.
3. Understand how distributed nodes contribute to system reliability.
