import os, shutil, re

root = r"D:\AI设计\personal web"
docs = os.path.join(root, "docs")

# Clean & recreate docs/
if os.path.exists(docs):
    shutil.rmtree(docs)

# 1. Copy standalone.html → docs/index.html, fix paths
with open(os.path.join(root, "standalone.html"), "r", encoding="utf-8") as f:
    html = f.read()

html = html.replace('public/videos/', 'videos/')
html = html.replace('public/audio/', 'audio/')

os.makedirs(docs, exist_ok=True)
with open(os.path.join(docs, "index.html"), "w", encoding="utf-8") as f:
    f.write(html)

# 2. Copy videos
src_videos = os.path.join(root, "public", "videos")
dst_videos = os.path.join(docs, "videos")
shutil.copytree(src_videos, dst_videos)
print(f"Copied {len(os.listdir(dst_videos))} videos")

# 3. Copy audio
src_audio = os.path.join(root, "public", "audio")
dst_audio = os.path.join(docs, "audio")
shutil.copytree(src_audio, dst_audio)
print(f"Copied audio")

print("Done! docs/ is ready for GitHub Pages")
