# -*- coding: utf-8 -*-
"""
Created on Sat Mar  9 17:12:39 2019

@author: naren
"""
import cv2

# Tut 1: How to read an image and figure out it's channels
#########################################################

# Converting the pnanda image to a 3d array
img01 = cv2.imread("H:/Pictures/status/panda.jpeg",1)
print("Converted to 3D RGB numpy array...")
print(img01)

# Converting the panda image to a 2D Grayscale array
img02 = cv2.imread("H:/Pictures/status/panda.jpeg",0)
print("Converted to 2D Gray Scale numpy array...")
print(img02)

# knowing the sizes
print(img01.shape)
print(img02.shape)

##########################################################

# Tut 2: How to display an image
##########################################################

# Display the panda
cv2.imshow("Panda",img01)
# Display until any key is pressed
cv2.waitKey(200)

cv2.destroyAllWindows()

##########################################################


# Tut 3: Resize an image
##########################################################

# resizing and storing it in a new variable called resize
resized = cv2.resize(img01, (int(img01.shape[1]*2),int(img01.shape[0]*2)))
# display that on screen
cv2.imshow("resizedPanda", resized)
cv2.waitKey(200)
cv2.destroyAllWindows()

##########################################################


# Tut 4: Face detection!
##########################################################

# creating a cascade classifier object
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")#cv2.CascadeClassifier("haarcascade_frontalface_default.xml")
# Reading the image as it is
emma = cv2.imread("emma.jpg")
# Reading the image as gray scale image
gray_emma = cv2.cvtColor(emma,cv2.COLOR_BGR2GRAY)
# Search the co-ordintes of the image
faces = face_cascade.detectMultiScale(gray_emma, scaleFactor = 1.05, minNeighbors=5)
for x,y,w,h in faces:
    emma = cv2.rectangle(emma, (x,y), (x+w,y+h),(0,255,0),3)
factor = 1
resized = cv2.resize(emma, (int(emma.shape[1]/factor),int(emma.shape[0]/factor)))
cv2.imshow("Gray", resized)
cv2.waitKey(200)
cv2.destroyAllWindows()

##########################################################


# Tut 5: Capturing Videos
##########################################################
import time
# the variable
video = cv2.VideoCapture(0)
#time.sleep(4)
#video.release()

# lets add a window to see the video in actual
check, frame = video.read()
# time.sleep(4)
# cv2.imshow('Capturing', frame)
# cv2.waitKey(200)
#
# video.release()
# cv2.destroyAllWindows()


# Capture videos, instead of the first frame/ image

# to get a record of frame
a = 1
while True:
    a = a + 1
    check, frame = video.read()
    cv2.imshow('Cap2', frame)
    key = cv2.waitKey(1)
    if key == ord('q'):
        break
print(a)
video.release()
cv2.destroyAllWindows()

##########################################################
