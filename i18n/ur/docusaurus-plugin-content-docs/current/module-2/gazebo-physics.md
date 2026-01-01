---
sidebar_position: 6
---

# Gazebo طبیعیات سمولیشن

## تصور کی وضاحت
Gazebo روبوٹکس کے لیے صنعت کا معیاری طبیعیات سمولیٹر ہے۔ یہ طبیعی قوتوں، کشش ثقل، اور رابطہ ڈینامکس کو سمولیٹ کرنے کے لیے ایک ہائی-فیڈیلیٹی ماحول فراہم کرتا ہے۔ فزیکل AI میں، Gazebo وہ ٹریننگ گراؤنڈ ہے جہاں روبوٹس ہارڈ ویئر کو نقصان پہنچائے بغیر دنیا سے تعامل کرنا سیکھتے ہیں۔ اہم تصورات میں Rigid Body Dynamics، ODE (Open Dynamics Engine)، اور ریل-ٹائم فیکٹر کیلکولیشن شامل ہیں۔

## آرکیٹیکچر ڈایاگرام
```text
[Robot URDF/SDF Model] <--> [Gazebo Physics Engine (ODE/Bullet/DART)]
          |                         |
          |                         v
[Sensor Plugins (IMU/LiDAR)] <--> [ROS 2 Transport Layer] <--> [Controller Node]
```

## ٹولنگ اسٹیک
- Gazebo Harmonic / Classic
- ROS 2 Gz Bridge
- ODE (Open Dynamics Engine)
- SDF (Simulation Description Format)

## عملی سیکھنے کے اہداف
1. کشش ثقل اور دنیا کی رگڑ کے پیرامیٹرز کی ترتیب کریں
2. ہیومنوڈ links کے لیے تصادم جیومیٹری لاگو کریں
3. روبوٹ ماڈل پر ورچوئل سینسر (IMU اور کیمرے) منسلک کریں
4. ریل-ٹائم سمولیشن کی کارکردگی اور طبیعیات سٹیپ سائز کی تصدیق کریں
