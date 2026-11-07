
Add-Type -AssemblyName System.Drawing
$src = [System.Drawing.Bitmap]::FromFile('C:\Users\TUF\.gemini\antigravity\brain\2efd6f03-2cfa-4342-8d24-f648f028e078\.user_uploaded\media_1793382594029_b4421092.jpg')

function Crop-Image($x, $y, $w, $h, $name) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $dest = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($dest)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
    $g.DrawImage($src, $destRect, $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()

    $destPath = Join-Path 'C:\\Users\\TUF\\Documents\\client-project\\demo page(verhost)\\public\\projects\\solvix\\assets\\images' $name
    $dest.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $dest.Dispose()
}

# 1. Hero background architectural visual (top half, 1024x340)
Crop-Image 0 0 1024 338 'hero-bg.jpg'

# 2. Middle Row:
# Left: Planet / Orbital Sphere (Service 03 - AI & Automation, Project Orbit)
Crop-Image 0 342 340 168 'service-ai.jpg'
# Center: Fluid Wave Orange/Violet (Service 01 - Brand & Digital, Project Pulse)
Crop-Image 342 342 340 168 'service-brand.jpg'
# Right: Minimalist Sunset Window (Project Vertex, Industry Finance)
Crop-Image 684 342 340 168 'project-vertex.jpg'

# 3. Bottom Row:
# Left: Snowy Sunset Mountains (Project Lumina, Industry Entertainment)
Crop-Image 0 513 340 169 'project-lumina.jpg'
# Center: Prismatic Geometric Glass Facade (Service 04 - Growth Strategy)
Crop-Image 342 513 340 169 'service-growth.jpg'
# Right: Sleek Curved Abstract Fluid (Service 02 - Web Applications)
Crop-Image 684 513 340 169 'service-web.jpg'

# 4. Featured Project Horizon Platform thumbnail (crop focal building)
Crop-Image 460 60 520 270 'project-horizon.jpg'

$src.Dispose()
Set-Content -Path 'C:\\Users\\TUF\\Documents\\client-project\\demo page(verhost)\\public\\projects\\solvix\\assets\\images\\status.txt' -Value 'Assets cropped successfully'
