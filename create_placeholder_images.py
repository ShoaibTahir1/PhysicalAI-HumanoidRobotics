#!/usr/bin/env python3
"""
Script to create placeholder images for the Physical AI & Humanoid Robotics book chapters
"""

import os
from PIL import Image, ImageDraw, ImageFont
import textwrap

def create_placeholder_image(filename, title, subtitle, directory="static/img/chapters"):
    """Create a placeholder image with title and subtitle"""

    # Create the directory if it doesn't exist
    os.makedirs(directory, exist_ok=True)

    # Full path for the image
    filepath = os.path.join(directory, filename)

    # Create a new image with white background
    width, height = 800, 400
    image = Image.new('RGB', (width, height), color=(73, 109, 137))  # Blue-gray background

    # Create drawing context
    draw = ImageDraw.Draw(image)

    # Draw a border
    border_width = 10
    draw.rectangle([border_width, border_width, width - border_width, height - border_width],
                   outline=(255, 255, 255), width=border_width)

    # Try to use a default font, fallback to default if not available
    try:
        font_large = ImageFont.truetype("arial.ttf", 40)
        font_small = ImageFont.truetype("arial.ttf", 24)
    except:
        font_large = ImageFont.load_default()
        font_small = ImageFont.load_default()

    # Wrap the text to fit within the image
    def draw_wrapped_text(draw, text, position, font, max_width, fill=(255, 255, 255)):
        x, y = position
        lines = textwrap.wrap(text, width=30)  # Adjust width as needed

        for line in lines:
            bbox = draw.textbbox((0, 0), line, font=font)
            text_width = bbox[2] - bbox[0]
            text_height = bbox[3] - bbox[1]

            # Center the text horizontally
            text_x = (width - text_width) // 2
            draw.text((text_x, y), line, fill=fill, font=font)
            y += text_height + 5  # Add some spacing between lines

    # Draw the title
    draw_wrapped_text(draw, title, (50, height // 3), font_large, width - 100, (255, 255, 255))

    # Draw the subtitle
    draw_wrapped_text(draw, subtitle, (50, height // 2 + 30), font_small, width - 100, (200, 200, 200))

    # Add a simple robot-like shape for visual interest
    draw.ellipse((width - 150, 50, width - 50, 150), fill=(100, 150, 200))  # Head
    draw.rectangle((width - 125, 150, width - 75, 250), fill=(100, 150, 200))  # Body
    draw.line((width - 100, 150, width - 100, 50), fill=(255, 255, 255), width=2)  # Neck
    draw.line((width - 130, 200, width - 170, 180), fill=(255, 255, 255), width=2)  # Arm
    draw.line((width - 70, 200, width - 30, 180), fill=(255, 255, 255), width=2)  # Arm
    draw.line((width - 115, 250, width - 130, 300), fill=(255, 255, 255), width=2)  # Leg
    draw.line((width - 85, 250, width - 70, 300), fill=(255, 255, 255), width=2)  # Leg

    # Save the image
    image.save(filepath)
    print(f"Created placeholder image: {filepath}")

def main():
    # Define the images to create
    images = [
        ("balance-robot.jpg", "Balance & Walking", "Humanoid Robot Maintaining Balance"),
        ("embodied-intelligence.jpg", "Embodied Intelligence", "Conceptual Image of AI in Physical Bodies"),
        ("humanoid-future.jpg", "Future Humanoid", "Futuristic Humanoid Robot Design"),
        ("future-humanoid.jpg", "Future Robotics", "Advanced Humanoid Technology"),
        ("glossary-robotics.jpg", "Robotics Glossary", "Key Terms in Robotics"),
        ("humanoid-structure.jpg", "Humanoid Structure", "Diagram of Robot Anatomy"),
        ("robot-safety.jpg", "Robot Safety", "Safe Human-Robot Interaction"),
        ("robot-sensors.jpg", "Robot Sensors", "Sensing the Environment"),
        ("sim-vs-real.jpg", "Simulation vs Reality", "Virtual vs Physical Robotics"),
        ("software-to-motion.jpg", "Software to Motion", "Digital Commands to Physical Action"),
        ("urdf-model.jpg", "URDF Model", "Unified Robot Description Format")
    ]

    for filename, title, subtitle in images:
        create_placeholder_image(filename, title, subtitle)

if __name__ == "__main__":
    main()