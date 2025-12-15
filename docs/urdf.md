---
sidebar_position: 8
---

# Understanding URDF (Unified Robot Description Format) for Humanoids

## What is URDF?

URDF (Unified Robot Description Format) is an XML-based format used to describe robots in terms of their physical and visual properties. It's like a blueprint that defines every aspect of a robot's structure, from the shape of its body parts to how its joints connect and move.

## Key Components of URDF

### Links
Links represent the rigid parts of a robot:
- **Visual**: How the part looks (shape, color, texture)
- **Collision**: How the part interacts physically
- **Inertial**: Physical properties like mass and center of gravity

### Joints
Joints connect links and define how they can move:
- **Fixed**: No movement (welded connection)
- **Revolute**: Rotational movement around an axis
- **Prismatic**: Linear sliding movement
- **Continuous**: Free rotation (like a wheel)

### Materials
Define the visual appearance:
- Color values (red, green, blue, alpha)
- Textures and surface properties
- Shading and lighting characteristics

## URDF Structure for Humanoid Robots

A humanoid robot's URDF typically includes:
```
robot
├── base_link (torso)
    ├── head
    ├── left_arm
    │   ├── left_forearm
    │   └── left_hand
    ├── right_arm
    │   ├── right_forearm
    │   └── right_hand
    ├── left_leg
    │   ├── left_lower_leg
    │   └── left_foot
    └── right_leg
        ├── right_lower_leg
        └── right_foot
```

## Example URDF Elements

### A Simple Link Definition
```xml
<link name="upper_arm">
  <visual>
    <geometry>
      <cylinder length="0.3" radius="0.05"/>
    </geometry>
    <material name="blue">
      <color rgba="0 0 0.8 1"/>
    </material>
  </visual>
  <collision>
    <geometry>
      <cylinder length="0.3" radius="0.05"/>
    </geometry>
  </collision>
  <inertial>
    <mass value="1.0"/>
    <inertia ixx="1.0" ixy="0.0" ixz="0.0" iyy="1.0" iyz="0.0" izz="1.0"/>
  </inertial>
</link>
```

## Benefits of URDF

- **Standardization**: Common format across robotics platforms
- **Simulation**: Enables accurate robot simulation
- **Visualization**: Allows 3D visualization of robots
- **Control**: Provides kinematic information for control systems

## Tools and Ecosystem

URDF integrates with:
- **ROS (Robot Operating System)**: Primary platform for URDF
- **Gazebo**: Physics simulation environment
- **RViz**: 3D visualization tool
- **MoveIt!**: Motion planning framework

## Challenges with URDF

- **Complexity**: Large robots have very complex URDF files
- **Accuracy**: Small errors can cause simulation problems
- **Maintenance**: Changes require careful updates to maintain consistency
- **Validation**: Ensuring the description matches the real robot

## Real-World Applications

URDF is essential for:
- Robot simulation and testing
- Motion planning and control
- Visualization and debugging
- Robot design and prototyping

---

**Previous Chapter**: [Balance, Walking & Posture](./balance-walking-posture.md)
**Next Chapter**: [AI Models That Control Robotic Bodies](./ai-models.md)