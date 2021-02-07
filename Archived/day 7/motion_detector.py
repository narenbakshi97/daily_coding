# The final part of the tutorial

# The Use case: Motion detector
# Steps:
# Store the first frame
# Fetch the second and compare both
# if got a big difference, considering the threshold as well
# then store it and make a boundry over the object
# store the data into a data frame
# visualize it
# thats it!

################################################
# the actual program

import cv2, time

first_frame = None

video = cv2.VideoCapture(0)

while True:
    check, frame = video.read()

    # to gray scale
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    # to gausianBlur
    gray = cv2.GaussianBlur(gray, (21,21), 0)

    if first_frame is None:
        first_frame = gray
        continue

    # calculate the difference
    delta_frame =  cv2.absdiff(first_frame, gray)
