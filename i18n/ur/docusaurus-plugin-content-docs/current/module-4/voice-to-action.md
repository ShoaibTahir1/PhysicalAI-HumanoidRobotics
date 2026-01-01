---
sidebar_position: 15
---

# Whisper اور Voice-to-Action

OpenAI's Whisper کا استعمال کرتے ہوئے speech recognition اور voice commands کو روبوٹ کاروائیوں میں مپ کرنا۔

## تصور کی وضاحت
آواز روبوٹ کنٹرول کا ایک قدرتی اور دوستانہ ذریعہ ہے۔ Whisper ایک طاقتور speech recognition ماڈل ہے جو مختلف زبانوں اور لہجوں کو سمجھ سکتا ہے۔

## آرکیٹیکچر ڈایاگرام
```text
[آواز] -> [Whisper API] -> [ٹیکسٹ] -> [LLM سمجھ] -> [ROS 2 Action] -> [روبوٹ]
                          |
                     [Error Handling]
```

## ٹولنگ اسٹیک
- OpenAI Whisper
- ROS 2 Audio Transport
- PocketSphinx (آفلاین)
- VAD (Voice Activity Detection)

## عملی سیکھنے کے اہداف
1. Whisper کو روبوٹک سسٹم میں انٹیگریٹ کریں
2. آواز کی سرگرمی کا پتہ لگانے کو ترتیب دیں
3. آواز کی غلطیوں کو سنبھالنے کا منطق لاگو کریں
4. ملٹی-لینگوئل سپورٹ کو فعال کریں
