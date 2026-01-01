---
sidebar_position: 21
---

# Lab Setup: On-Prem vs Cloud

Building a lab for Physical AI involves balancing local hardware capabilities with cloud-based scalability. This chapter guides you through creating an environment that minimizes Sim-to-Real risks and maximizes developer efficiency.

## Learning Objectives
- Compare the costs and benefits of On-Premise vs. Cloud GPUs for robotics.
- Design a physical space suitable for humanoid testing (Safety & Equipment).
- Implement a hybrid workflow for model training and simulation.

## Concept Explanation
Robotics development requires unique infrastructure. Since physical robots are expensive and can be dangerous, a "Lab" is more than just a desk; it is a controlled environment. The digital part of this lab can exist on local "bare-metal" servers or in the cloud (AWS/Azure/GCP). The goal is to create a seamless pipeline where a model trained in a virtual "Cloud" environment can be validated on a "Local" workstation before being deployed to the "Physical" robot.

### Sim-to-Real Gap
A major focus of lab setup is mitigating the **Sim-to-Real Gap**—the discrepancy between simulated physics and real-world behavior. This is handled by:
- **Domain Randomization:** Randomizing lighting, textures, and mass in simulation.
- **System Identification:** Accurately measuring the physical robot's properties (friction, latency) to tune the simulator.

## System Architecture
A hybrid laboratory architecture includes:
1.  **Cloud Layer (Scalability):** Using GPU clusters (e.g., NVIDIA A100s) for large-scale Hyperparameter Optimization and parallel Reinforcement Learning.
2.  **On-Prem Layer (Iteration):** Local RTX Workstations for daily coding, visual debugging in Isaac Sim, and URDF configuration.
3.  **Physical Testing Layer (Validation):**
    - **Safety Gantry:** Overhead rails to prevent the robot from falling during gait testing.
    - **Motion Capture:** Vicon or OptiTrack systems for ground-truth tracking.
    - **Computing Bench:** Dedicated network switches for low-latency robot communication.

## Tools & Technologies
- **NVIDIA Omniverse Cloud:** For collaborative simulation across locations.
- **Docker-Compose:** For managing complex multi-node robotics stacks.
- **Terraform/Ansible:** For Automating the deployment of lab environments.
- **VS Code Remote - Tunnels:** For developing on local workstations from anywhere.

---
