---
sidebar_position: 7
---

# URDF بمقابلہ SDF

## تصور کی وضاحت
روبوٹکسٹس بنیادی طور پر روبوٹ ماڈلز کو بیان کرنے کے لیے دو فارمیٹس استعمال کرتے ہیں: URDF (Unified Robot Description Format) اور SDF (Simulation Description Format)۔ جبکہ URDF کائینیٹکس اور ٹری-سٹرکچرڈ روبوٹس کے لیے ROS معیار ہے، SDF Gazebo کی مقامی شکل ہے جو پیچیدہ دنیا کے ماحول، متعدد روبوٹس، اور غیر-ٹری joints (loop closures) کی حمایت کرتی ہے۔

## آرکیٹیکچر ڈایاگرام
```text
URDF (XML) -> [Robot State Publisher] -> /tf + Robot Description
SDF (XML)  -> [Gazebo Server] -> Physics World + Multiple Models
```

 موازنہ:
- URDF: ایک روبوٹ، صرف ٹری ساخت، ROS-مرکوز
- SDF: متعدد روبوٹس، دنیا کے اثاثے، پیچیدہ طبیعیات، Gazebo-مرکوز

## ٹولنگ اسٹیک
- `xacro` (XML Macros)
- `gz-sdf` tools
- URDF-to-SDF converters

## عملی سیکھنے کے اہداف
1. ایک جامد URDF ماڈل کو اعلیٰ درجے کی سمولیشن کے لیے SDF فارمیٹ میں تبدیل کریں
2. سمجھیں کہ کیوں closed-loop kinematic chains والے ہیومنوڈز کو SDF کی ضرورت ہے
3. دونوں فارمیٹس کے لیے پیچیدہ روبوٹ کی تفصیرات کو منظم کرنے کے لیے Xacro استعمال کریں
