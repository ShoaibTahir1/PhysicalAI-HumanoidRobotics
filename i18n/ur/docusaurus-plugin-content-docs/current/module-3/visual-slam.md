---
sidebar_position: 12
---

# Visual SLAM

## تصور کی وضاحت
Visual SLAM (Simultaneous Localization and Mapping) روبوٹس کو بصری ان پٹ کا استعمال کرتے ہوئے اپنے ماحول کا نقشہ بنانے اور اپنی پوزیشن ٹریک کرنے کے قابل بناتا ہے۔ NVIDIA Isaac ROS ہارڈویئر-تیز VSLAM پیکیج فراہم کرتا ہے جو ریل-ٹائم کارکردگی کے لیے GPU طاقت کا فائدہ اٹھاتے ہیں۔

## آرکیٹیکچر ڈایاگرام کی وضاحت
Visual SLAM سسٹم کے اجزا:
- **Visual Odometry**: کیمرے کے فریمز سے حرکت کا تخمینہ لگاتا ہے
- **Mapping Engine**: ماحول کا sparse یا dense نقشہ تعمیر کرتا ہے
- **Loop Closure Detection**: پہلے ملے ہوئے مقامات کو پہچان کرکے ڈریٹ درست کرتا ہے
- **NVIDIA NvSlam**: ہارڈویئر-تیز SLAM عملدرآمد

## ٹولنگ اسٹیک
- Isaac ROS / ROS 2
- Stereo Cameras (RealSense، ZED)
- IMU (Inertial Measurement Unit)
- NVIDIA Jetson / GPU

## عملی سیکھنے کے اہداف
1. Isaac ROS VSLAM نودز ترتیب دیں
2. روبوٹ حالت کے تخمینے کے ساتھ visual odometry کو مربوط کریں
3. سمولیٹڈ Isaac Sim ماحول میں میپنگ کریں
4. ہیومنوڈ نیویگیشن کے لیے SLAM پیرامیٹر بہتر بنائیں
