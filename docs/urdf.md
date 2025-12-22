---
sidebar_position: 8
---

# Understanding URDF (Unified Robot Description Format) for Humanoids

![URDF Robot Model](/img/chapters/urdf-model.jpg)

URDF (Unified Robot Description Format) is the standard XML-based format used to describe robot models in ROS (Robot Operating System) and other robotics frameworks. For humanoid robots, URDF provides a comprehensive way to define the robot's physical structure, kinematic properties, and visual appearance.

## What is URDF?

### Definition and Purpose
URDF stands for Unified Robot Description Format, a XML-based format that describes robots in terms of:

- **Physical structure**: Links and joints that make up the robot
- **Kinematic properties**: Joint limits, ranges of motion, and connections
- **Visual appearance**: Meshes, colors, and visual properties
- **Collision properties**: Shapes used for collision detection
- **Inertial properties**: Mass, center of mass, and inertia tensors

### Why URDF Matters for Humanoids
- **Simulation**: Enables accurate physics simulation in Gazebo and other simulators
- **Visualization**: Provides 3D models for RViz and other visualization tools
- **Kinematics**: Enables inverse and forward kinematics calculations
- **Control**: Provides the robot structure needed for motion planning

## URDF Structure

### Links
Links represent rigid bodies in the robot:

```xml
<link name="base_link">
  <inertial>
    <mass value="1.0"/>
    <origin xyz="0 0 0"/>
    <inertia ixx="0.1" ixy="0" ixz="0" iyy="0.1" iyz="0" izz="0.1"/>
  </inertial>
  <visual>
    <origin xyz="0 0 0"/>
    <geometry>
      <box size="0.1 0.1 0.1"/>
    </geometry>
    <material name="blue">
      <color rgba="0 0 1 1"/>
    </material>
  </visual>
  <collision>
    <origin xyz="0 0 0"/>
    <geometry>
      <box size="0.1 0.1 0.1"/>
    </geometry>
  </collision>
</link>
```

#### Link Components
- **Inertial**: Mass properties for physics simulation
- **Visual**: How the link appears in visualization
- **Collision**: Shape used for collision detection

### Joints
Joints connect links and define their motion:

```xml
<joint name="base_to_upper" type="revolute">
  <parent link="base_link"/>
  <child link="upper_link"/>
  <origin xyz="0 0 0.1" rpy="0 0 0"/>
  <axis xyz="0 0 1"/>
  <limit lower="-3.14" upper="3.14" effort="100" velocity="1"/>
</joint>
```

#### Joint Types
- **Revolute**: Rotational joint with limited range
- **Continuous**: Rotational joint with unlimited range
- **Prismatic**: Linear sliding joint
- **Fixed**: No movement between links
- **Floating**: 6 degrees of freedom
- **Planar**: Motion in a plane

## Humanoid-Specific Considerations

### Humanoid Joint Structure

#### Typical Humanoid Configuration
- **6 DOF** in each leg (hip, knee, ankle)
- **7 DOF** in each arm (shoulder, elbow, wrist)
- **3 DOF** in torso (waist rotation and tilt)
- **2-3 DOF** in head (neck movement)

#### Common Joint Arrangements
- **Hip joints**: 3 DOF (roll, pitch, yaw)
- **Knee joints**: 1 DOF (pitch only)
- **Ankle joints**: 2 DOF (pitch, roll)
- **Shoulder joints**: 3 DOF (roll, pitch, yaw)
- **Elbow joints**: 1 DOF (pitch only)
- **Wrist joints**: 2-3 DOF (pitch, roll, yaw)

### Kinematic Chains

#### Leg Chain
```
base_link -> hip -> thigh -> shin -> foot
```

#### Arm Chain
```
torso -> shoulder -> upper_arm -> lower_arm -> hand
```

#### Full Body
- **Multiple chains**: Legs, arms, head as separate kinematic chains
- **Base connection**: All chains connected through torso
- **End effectors**: Hands and feet as terminal links

## URDF for Humanoid Simulation

### Physics Properties
- **Mass distribution**: Realistic mass for each body part
- **Inertia tensors**: Proper moment of inertia values
- **Center of mass**: Accurate CoM location for balance simulation
- **Damping**: Joint friction and damping parameters

### Visual Properties
- **Mesh files**: Detailed 3D models for realistic appearance
- **Materials**: Colors and textures for different parts
- **Transparency**: For showing internal components
- **Scaling**: Proper size relationships between parts

### Collision Properties
- **Simplified shapes**: Efficient collision detection
- **Multiple shapes**: Complex collision geometry when needed
- **Padding**: Extra space to prevent visual collisions
- **Groups**: Organizing collision properties

## Creating Humanoid URDF

### Basic Structure
```xml
<?xml version="1.0"?>
<robot name="humanoid_robot">
  <!-- Define all links -->
  <link name="base_link">
    <!-- Link properties -->
  </link>

  <!-- Define all joints -->
  <joint name="joint_name" type="revolute">
    <parent link="parent_link"/>
    <child link="child_link"/>
    <!-- Joint properties -->
  </joint>

  <!-- Include other files -->
  <xacro:include filename="arms.urdf.xacro"/>
  <xacro:include filename="legs.urdf.xacro"/>
</robot>
```

### Best Practices

#### Organization
- **Modular design**: Break complex robots into components
- **Xacro macros**: Use Xacro for parameterized definitions
- **Consistent naming**: Clear, descriptive names for links and joints
- **Documentation**: Comments explaining complex sections

#### Validation
- **URDF check**: Use `check_urdf` to validate syntax
- **Visualization**: Test in RViz to verify structure
- **Simulation**: Test in Gazebo for physics accuracy
- **Kinematics**: Verify with forward/inverse kinematics

## Advanced URDF Features

### Transmission Elements
Define how actuators connect to joints:

```xml
<transmission name="joint1_trans">
  <type>transmission_interface/SimpleTransmission</type>
  <joint name="joint1">
    <hardwareInterface>PositionJointInterface</hardwareInterface>
  </joint>
  <actuator name="joint1_motor">
    <mechanicalReduction>1</mechanicalReduction>
  </actuator>
</transmission>
```

### Gazebo-Specific Elements
Add simulation-specific properties:

```xml
<gazebo reference="link_name">
  <material>Gazebo/Blue</material>
  <mu1>0.2</mu1>
  <mu2>0.2</mu2>
</gazebo>
```

### Sensors in URDF
Include sensor definitions:

```xml
<gazebo reference="camera_link">
  <sensor type="camera" name="camera1">
    <pose>0 0 0 0 0 0</pose>
    <visualize>true</visualize>
    <update_rate>30.0</update_rate>
    <camera name="head_camera">
      <horizontal_fov>1.3962634</horizontal_fov>
      <image>
        <width>800</width>
        <height>600</height>
        <format>R8G8B8</format>
      </image>
    </camera>
  </sensor>
</gazebo>
```

## Tools for Working with URDF

### Validation Tools
- **check_urdf**: Validate URDF syntax
- **urdf_to_graphiz**: Visualize robot structure
- **RViz**: Visualize robot model
- **Gazebo**: Test physics simulation

### Creation Tools
- **SolidWorks to URDF**: Export from CAD software
- **Blender**: Create visual meshes
- **MeshLab**: Process and optimize meshes
- **Custom scripts**: Python tools for URDF generation

## Common Pitfalls and Solutions

### Kinematic Issues
- **Singularity problems**: Avoid joint configurations that cause mathematical issues
- **Joint limit violations**: Ensure realistic joint limits
- **Chain breakage**: Verify all parts are properly connected

### Performance Issues
- **Complex meshes**: Simplify collision geometry for better performance
- **Too many joints**: Balance complexity with computational requirements
- **Inertial problems**: Use realistic mass properties for stable simulation

### Simulation Issues
- **Floating robots**: Ensure proper world connection
- **Unstable joints**: Add damping and realistic parameters
- **Collision problems**: Verify collision geometry matches visual geometry

## URDF in Practice

### Popular Humanoid Models
- **Atlas**: Boston Dynamics humanoid robot
- **HRP-2**: Humanoid Robotics Project robot
- **Schaft**: Advanced humanoid with complex kinematics
- **Custom models**: Research and commercial humanoid designs

### Integration with ROS
- **Robot State Publisher**: Publish joint states to TF
- **MoveIt!**: Motion planning with URDF models
- **RViz**: Visualization of URDF robot models
- **Controllers**: Joint trajectory control

## Future Developments

### New Formats
- **SDF (Simulation Description Format)**: Gazebo's native format
- **MJCF (MuJoCo XML)**: For MuJoCo physics engine
- **GLTF**: For modern 3D graphics and simulation

### Enhanced Capabilities
- **Soft robotics**: Deformable body parts
- **Variable topology**: Reconfigurable robots
- **Learning-based models**: Adaptive robot descriptions

## Conclusion

URDF provides the foundation for describing humanoid robots in simulation and control systems. A well-crafted URDF file enables accurate physics simulation, proper kinematic calculations, and effective visualization. For humanoid robots, careful attention to joint structure, mass distribution, and kinematic chains is essential for realistic and useful models.

As humanoid robotics continues to advance, URDF remains a critical tool for bridging the gap between robot design and practical implementation in simulation and real-world applications.

---
**Previous Chapter**: [Balance, Walking & Posture](./balance-walking-posture.md)
**Next Chapter**: [AI Models That Control Robotic Bodies](./ai-models.md)