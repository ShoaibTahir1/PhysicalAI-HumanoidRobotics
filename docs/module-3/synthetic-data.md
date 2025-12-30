---
sidebar_position: 11
---

# Synthetic Data

## Concept Explanation
Synthetic Data Generation (SDG) involves creating annotated datasets in a simulated environment. In Isaac Sim, this is powered by Isaac Replicator, which allows for the creation of vast amounts of pixel-perfect ground truth data for training computer vision models.

## Architecture Diagram Description
The SDG workflow includes:
- **Randomizer**: Modifies assets, lighting, and camera positions.
- **Annotators**: Generates ground truth (2D/3D Bounding Boxes, Segmentation, Depth).
- **Writer**: Formats and saves the data to Disk or Cloud.
- **Data Augmentation**: Enhances the diversity of the datasets.

## Tooling Stack
- Isaac Replicator
- NVIDIA TAO Toolkit
- PyTorch / TensorFlow
- OpenCV

## Practical Learning Goals
1. Configure Isaac Replicator for automated scene generation.
2. Generate annotated data for object detection.
3. Understand the role of domain randomization in SDG.
4. Export datasets for model training.
