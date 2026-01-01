---
sidebar_position: 24
---

# Evaluation Criteria: Success, Safety, and Performance

How do we measure the intelligence of a humanoid? Standard AI metrics like "Accuracy" are not enough. In Physical AI, we must evaluate safety, robustness, and the efficiency of movement.

## Learning Objectives
- Define key performance indicators (KPIs) for humanoid robotics.
- Understand the "Human-in-the-loop" evaluation methodology.
- Conduct safety audits for autonomous robot behaviors.

## Concept Explanation
Evaluation in Physical AI is multi-dimensional. A robot that completes a task but causes damage to the environment is a failure. We use a combination of **Objective Metrics** (Success Rate, Path Length) and **Subjective Metrics** (Smoothness of motion, Human trust). Evaluation happens first in simulation (massive parallel testing) and then in physical "Gauntlet" tests.

### Essential Metrics
- **Success Rate (SR):** Percentage of times the robot completes the task without human intervention.
- **Mean Time Between Interventions (MTBI):** A measure of autonomy duration.
- **Fall Rate:** Crucial for humanoids; measures balance stability.
- **Energy Efficiency:** Joules consumed per meter or per successful task.

## System Architecture
The Evaluation Framework architecture:
1.  **Simulated Benchmarking:** Using NVIDIA Isaac Gym to run 1000+ parallel instances with randomized physics to stress-test policies.
2.  **Safety Guardrails:** A monitoring node that tracks joint limits, torque spikes, and collision proximity in real-time.
3.  **Telemetry Logger:** Recording all sensor data, model outputs, and control commands for post-run analysis (Black Box).
4.  **Scoring Engine:** Automatically calculating SR and efficiency based on log data.

## Tools & Technologies
- **NVIDIA Isaac Lab Benchmarks:** Standardized tasks for humanoid RL.
- **MCAP / Rosbag:** Industry standard file formats for recording robotics data.
- **Weights & Biases (W&B):** For tracking training and evaluation metrics over time.
- **Safety-Critical Middleware:** Ensuring that emergency stops override all AI decisions.

---
