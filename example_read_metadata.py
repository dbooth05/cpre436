import pyexiv2

def read_metadata(image_path):
    # Load the image
    img = pyexiv2.ImageMetadata(image_path)
    img.read()

    print(img)

    # Print all metadata
    for key in img.exif_keys:
        print(f"{key}: {img[key]}")

read_metadata('lake_sunset.jpg')