import os
from PIL import Image
from PIL.ExifTags import TAGS
from PIL.PngImagePlugin import PngInfo

image = Image.open('trash_panda1.jpg') # opening metadata

exif = {} # storing tags from image here

for tag, value in image._getexif().items(): # loop to get tags and stores them in dictionay exif
    if tag in TAGS:
        exif[TAGS[tag]] = value

print(exif) # prints the stored values, do not keep here

if 'Make' in exif: # checks if specific tag is in and prints if
    print("\n\nMake: ", exif['Make'])


# This is the start of modifying metadata
metadata = PngInfo()    # will store new metadata

# loop to store previous metadata in new message
for key in exif:
    metadata.add_text(key, str(exif[key]))

metadata.add_text("my new message", "a secret message") # adding the new metadata

image.save("New-img.png", pnginfo=metadata) # saving metadata, creates new image rn
# end of modyifying metadata


image = Image.open("New-img.png") # opening new image to verify message
print("\n\n", image.text)


exif2 = {} # check to see if previous images tags transfeered

# for tag, value in image._getexif().items():
#     if tag in TAGS:
#         exif2[TAGS[tag]] = value

# end of rereading tags/previous metadata

print("\n\n", exif2)