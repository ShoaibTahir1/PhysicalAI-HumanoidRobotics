---
sidebar_position: 13
---

# Sim-to-Real

## تصور کی وضاحت
Sim-to-Real وہ عمل ہے جس میں سمولیشن میں تربیت یافتہ AI ماڈلز کو جسمانی روبوٹس میں منتقل کیا جاتا ہے۔ "reality gap" پر قابو پانے کے لیے، Domain Randomization اور Domain Adaptation جیسی تکنیکوں کا استعمال کیا جاتا ہے تاکہ ماڈلز حقیقی دنیا کی تغیرات کے لیے مضبوط بنیں۔

## آرکیٹیکچر ڈایاگرام کی وضاحت
Sim-to-Real پائپ لائن:
- **High-Fidelity Simulation**: ماحول میں ابتدائی تربیت
- **Domain Randomization**: ٹیکسچرز، رگڑ، ماس، اور لائٹنگ میں تغیرات
- **System Identification**: سم پیرامیٹر کو حقیقت سے مماثل بنانے کے لیے کیلیبریشن
- **Deployment**: تربیت یافتہ پالیسی کو جسمانی ہارڈ ویئر پر چلانا

## ٹولنگ اسٹیک
- NVIDIA Isaac Gym / Orbit
- Reinforcement Learning (PPO، SAC)
- Deployment Scripts
- Hardware Middleware (ROS 2)

## عملی سیکھنے کے اہداف
1. Isaac Sim میں بنیادی domain randomization لاگو کریں
2. reality gap کے چیلنجز کو سمجھیں
3. سمولیٹڈ کارکردگی بمقابلہ حقیقی دنیا کی کارکردگی کا موازنہ کریں
4. Isaac Gym کا استعمال کرتے ہوئے تربیت کو سکیل کریں
