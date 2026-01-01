---
sidebar_position: 11
---

# Synthetic ڈیٹا

## تصور کی وضاحت
Synthetic Data Generation (SDG) میں سمولیٹڈ ماحول میں annotated ڈیٹاسیٹس بنانا شامل ہے۔ Isaac Sim میں، یہ Isaac Replicator کے ذریعہ چلتا ہے، جو کمپیوٹر وژن ماڈلز کی تربیت کے لیے پکسل-پریفیکٹ گراؤنڈ ٹروتھ ڈیٹا کی بڑی مقدار بنانے کی اجازت دیتا ہے۔

## آرکیٹیکچر ڈایاگرام کی وضاحت
SDG ورک فلو میں شامل ہے:
- **Randomizer**: اثاثوں، لائٹنگ، اور کیمرے کی پوزیشنوں کو تبدیل کرتا ہے
- **Annotators**: گراؤنڈ ٹروتھ (2D/3D Bounding Boxes، Segmentation، Depth) بناتے ہیں
- **Writer**: ڈیٹا کو ڈسک یا کلاؤڈ پر فارمیٹ کرکے محفوظ کرتا ہے
- **Data Augmentation**: ڈیٹاسیٹس کی تنوع بڑھاتا ہے

## ٹولنگ اسٹیک
- Isaac Replicator
- NVIDIA TAO Toolkit
- PyTorch / TensorFlow
- OpenCV

## عملی سیکھنے کے اہداف
1. خودکار سین جنریشن کے لیے Isaac Replicator ترتیب دیں
2.物体 پہچان کے لیے annotated ڈیٹا بنائیں
3. SDG میں domain randomization کے کردار کو سمجھیں
4. ماڈل تربیت کے لیے ڈیٹاسیٹس برآمد کریں
