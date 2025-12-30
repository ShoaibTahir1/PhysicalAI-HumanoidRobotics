
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Physical AI & Humanoid Robotics',
      items: [
        'intro',
        'embodied-intelligence',
        'software-to-motion',
        'sensors',
        'actuators',
        'humanoid-structure',
        'balance-walking-posture',
        'urdf',
        'ai-models',
        'simulation-vs-real-world',
        'safety-ethical-considerations',
        'future-humanoid-robotics',
        'glossary',
        'final-summary'
      ],
    },
    {
      type: 'category',
      label: 'Module 1: The Robotic Nervous System (ROS 2)',
      items: [
        'module-1/intro-to-physical-ai',
        'module-1/ros2-architecture',
        'module-1/python-ai-agents',
        'module-1/humanoid-urdf',
      ],
    },
    {
      type: 'category',
      label: 'Module 2: The Digital Twin (Gazebo & Unity)',
      items: [
        'module-2/gazebo-physics',
        'module-2/urdf-vs-sdf',
        'module-2/unity-robotics',
        'module-2/robot-sensors',
      ],
    },
    {
      type: 'category',
      label: 'Module 3: The AI-Robot Brain (NVIDIA Isaac)',
      items: [
        'module-3/isaac-sim-overview',
        'module-3/synthetic-data',
        'module-3/visual-slam',
        'module-3/sim-to-real',
      ],
    },
    {
      type: 'category',
      label: 'Module 4: Vision-Language-Action (VLA)',
      items: [
        'module-4/llms-in-robotics',
        'module-4/voice-to-action',
        'module-4/cognitive-planning',
        'module-4/action-sequencing',
      ],
    },
    {
      type: 'category',
      label: 'Module 5: Hardware, Labs & Deployment',
      items: [
        'module-5/rtx-workstations',
        'module-5/jetson-deployment',
        'module-5/sensors-actuators-hardware',
        'module-5/lab-setup',
      ],
    },
  ],
};

module.exports = sidebars;
