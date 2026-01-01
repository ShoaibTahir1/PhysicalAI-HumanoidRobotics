---
sidebar_position: 10
---

# Isaac Sim کا جائزہ

## تصور کی وضاحت
NVIDIA Isaac Sim ایک حوالہ ایپلیکیشن ہے جو NVIDIA Omniverse پر بنی ہے جو روبوٹکس سمولیشن اور synthetic ڈیٹا جنریشن ٹول فراہم کرتی ہے۔ یہ ترقی دہندگان کو فوٹوریلسٹک ماحول میں AI پر مبنی روبوٹس ڈیزائن، سمولیٹ، اور ٹیسٹ کرنے کے قابل بناتی ہے۔

## آرکیٹیکچر ڈایاگرام کی وضاحت
Isaac Sim آرکیٹیکچر درج ذیل پرتوں پر مشتمل ہے:
- **Omniverse Nucleus**: اثاثوں کو ذخیرہ اور شیئر کرنے کے لیے تعاونی پلیٹ فارم
- **USD (Universal Scene Description)**: سین کی تفصیل کے لیے بنیادی ڈیٹا فارمیٹ
- **Physics Engine (PhysX)**: ہائی-فیڈیلیٹی طبیعیات سمولیشن فراہم کرتا ہے
- **OmniGraph**: روبوٹ کے رویے اور سینسر لاجک کے لیے ویزول سکرپٹنگ انٹرفیس
- **Isaac SDK/ROS 2 Bridges**: روبوٹ کنٹرول اور میسیجنگ کی لے آؤٹ

## ٹولنگ اسٹیک
- NVIDIA Omniverse
- USD (Universal Scene Description)
- Python API
- ROS 2 Bridge
- URDF/MJCF Importers

## عملی سیکھنے کے اہداف
1. Isaac Sim ماحول میں نیویگیٹ کریں
2. URDF ماڈلز کو Isaac Sim میں درآمد کریں
3. USD ورک فلو کو سمجھیں
4. ہیومنوڈ روبوٹس کے لیے طبیعیات کی خاصیات ترتیب دیں
