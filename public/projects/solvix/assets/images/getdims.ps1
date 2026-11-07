
Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile('C:\Users\TUF\.gemini\antigravity\brain\2efd6f03-2cfa-4342-8d24-f648f028e078\.user_uploaded\media_1793382594029_b4421092.jpg')
$w = $img.Width
$h = $img.Height
$img.Dispose()
Set-Content -Path 'C:\Users\TUF\Documents\client-project\demo page(verhost)\public\projects\solvix\assets\images\dims.txt' -Value "$w x $h"
