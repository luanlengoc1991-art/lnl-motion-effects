"""Mỗi hiệu ứng một tệp zip (dự án HyperFrames chạy ngay) vào dist/zips/; danh mục cho app ở dist/api/effects.json."""
import hashlib
import json
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
BASE = sys.argv[1].rstrip("/") if len(sys.argv) > 1 else "https://effects.luangroup.asia"
fx = json.loads((ROOT / "effects.json").read_text(encoding="utf-8"))
show = json.loads((ROOT / "showcase.json").read_text(encoding="utf-8"))
(DIST / "zips").mkdir(parents=True, exist_ok=True)
(DIST / "api").mkdir(parents=True, exist_ok=True)
SKIP = {"preview.mp4", "poster.jpg", ".render-hash"}


def version(src: Path) -> str:
    """Mã nội dung của hiệu ứng: app so mã này để biết cần tải lại bản mới."""
    h = hashlib.sha1()
    for f in sorted(src.rglob("*")):
        if f.is_file() and ".hyperframes" not in f.parts and f.name != ".render-hash":
            h.update(f.relative_to(src).as_posix().encode())
            h.update(f.read_bytes())
    return h.hexdigest()[:12]


for e in fx:
    src = ROOT / "effects" / e["slug"]
    with zipfile.ZipFile(DIST / "zips" / f"{e['slug']}.zip", "w", zipfile.ZIP_DEFLATED) as z:
        for f in sorted(src.rglob("*")):
            if f.is_file() and f.name not in SKIP and ".hyperframes" not in f.parts:
                z.write(f, f"{e['slug']}/{f.relative_to(src).as_posix()}")
items = [{**e, "version": version(ROOT / "effects" / e["slug"]),
          "preview": f"{BASE}/effects/{e['slug']}/preview.mp4",
          "poster": f"{BASE}/effects/{e['slug']}/poster.jpg",
          "scene": f"{BASE}/effects/{e['slug']}/compositions/fx.html",
          "spec": f"{BASE}/effects/{e['slug']}/spec.md",
          "zip": f"{BASE}/zips/{e['slug']}.zip"} for e in fx]
import datetime
api = {"version": 1, "name": "LNL Motion Effects", "count": len(items), "updated": datetime.datetime.now(datetime.timezone.utc).isoformat(timespec="seconds"),
       "groups": sorted({e["group"] for e in fx}, key=lambda g: [x["group"] for x in fx].index(g)),
       "effects": items,
       "showcase": [{**s, "video": f"{BASE}/{s['video']}", "poster": f"{BASE}/{s['poster']}"} for s in show],
       "usage": "Tải zip, giải nén, sửa chữ trong compositions/fx.html, chạy: npx hyperframes render"}
(DIST / "api" / "effects.json").write_text(json.dumps(api, ensure_ascii=False, indent=1), encoding="utf-8")
print("zip:", len(fx), "· api/effects.json")
