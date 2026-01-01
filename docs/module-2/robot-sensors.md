---
sidebar_position: 9
---

# Robot Sensors: LiDAR, Depth Cameras, and IMUs

## Concept Explanation
Sensors are the eyes and ears of a humanoid robot. They provide the raw data needed for perception and localization.
- **LiDAR**: Uses light pulses to measure distance, creating a 360-degree map.
- **Depth Cameras (RGB-D)**: Provide color and distance data per pixel, essential for object recognition.
- **IMU**: Measures acceleration and angular velocity, critical for maintaining balance in humanoids.

## Architecture Diagram
```text
[Environment] -> [Sensors] -> [Raw Data (LaserScan/Image)] -> [Processing Node]
      |                                                        |
      +------------------< [Feedback Loop (IMU)] <------------+
```

## Tooling Stack
- OpenCV (Image processing)
- PCL (Point Cloud Library)
- ROS 2 Sensor Messages (`sensor_msgs`)
- Rviz2 (Visualization)

## Practical Learning Goals
1. Differentiate between Time-of-Flight (ToF) and Structured Light cameras.
2. Filter LiDAR point clouds for noise reduction.
3. Interpret IMU data for robot orientation (roll, pitch, yaw).
4. Synchronize multiple sensor streams for accurate perception.
