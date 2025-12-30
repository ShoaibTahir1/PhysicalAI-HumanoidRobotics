---
sidebar_position: 13
---

# Sim-to-Real

## Concept Explanation
Sim-to-Real is the process of transferring AI models trained in simulation to physical robots. To overcome the "reality gap," techniques like Domain Randomization and Domain Adaptation are used to make models robust to real-world variations.

## Architecture Diagram Description
The Sim-to-Real pipeline:
- **High-Fidelity Simulation**: Initial training in environment.
- **Domain Randomization**: Varying textures, friction, mass, and lighting.
- **System Identification**: Calibrating sim parameters to match reality.
- **Deployment**: Running the trained policy on physical hardware.

## Tooling Stack
- NVIDIA Isaac Gym / Orbit
- Reinforcement Learning (PPO, SAC)
- Deployment Scripts
- Hardware Middleware (ROS 2)

## Practical Learning Goals
1. Implement basic domain randomization in Isaac Sim.
2. Understand the challenges of the reality gap.
3. Compare simulated performance vs real-world performance.
4. Scale training using Isaac Gym.
