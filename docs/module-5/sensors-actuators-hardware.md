---
sidebar_position: 20
---

# Sensors & Actuators Hardware Guide

A humanoid robot bridges the digital and physical worlds through its sensors (perception) and actuators (action). Selecting and integrating the right hardware is critical for the stability and intelligence of the robot.

## Learning Objectives
- Identify the types of sensors required for humanoid balance and spatial awareness.
- Distinguish between different actuator technologies (Quasi-Direct Drive vs. Series Elastic).
- Understand communication protocols for high-frequency feedback loops.

## Concept Explanation
Sensors provide the data that fuels the "Brain" of the Physical AI, while actuators execute the "Will" of the neural network. In a humanoid, synchronizing these components at high frequencies (typically 500Hz to 1kHz) is necessary to prevent falling and to ensure smooth manipulation.

### Essential Components
- **Perception Sensors:** Stereo Depth Cameras (RGB-D), LiDAR for mapping, and IMUs (Inertial Measurement Units) for posture.
- **Proprioception Sensors:** High-resolution encoders for joint position and torque sensors for contact detection.
- **Actuators:** High-torque density motors, often brushless DC (BLDC), combined with precise planetary or cycloidal gearboxes.

## System Architecture
The hardware integration follows a hierarchical control loop:
1.  **High-Level Perception (Non-Real-Time):** Cameras and LiDAR sending data to the Jetson Orin for SLAM and Object detection.
2.  **Mid-Level Planning (Soft Real-Time):** ROS 2 navigation nodes calculating path and trajectory.
3.  **Low-Level Control (Hard Real-Time):** A dedicated microcontroller (like ESP32 or STM32) or a Real-Time Linux kernel managing motor control loops via CAN FD or EtherCAT.
4.  **Physical Interface:** The skeletal structure (Carbon fiber or Aluminum) supporting the actuators and housing the sensors.

## Tools & Technologies
- **CAN FD / EtherCAT:** High-speed communication buses.
- **Dynamixel / Unitree Motors:** Popular actuator choices for humanoid research.
- **Intel RealSense / OAK-D:** Common depth camera solutions for spatial AI.
- **VectorNav / Xsens:** High-performance IMUs for stable gait control.

---
