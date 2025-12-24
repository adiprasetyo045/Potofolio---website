# fix-git.ps1 - Script untuk memperbaiki nested git

Write-Host "🔧 Memperbaiki Git Repository..." -ForegroundColor Cyan

# 1. Hapus semua .git dari subfolder
Write-Host "🗑️  Menghapus nested git repositories..." -ForegroundColor Yellow
$nestedGit = Get-ChildItem -Path . -Filter .git -Recurse -Force -Directory -ErrorAction SilentlyContinue
if ($nestedGit) {
    foreach ($gitFolder in $nestedGit) {
        if ($gitFolder.FullName -ne (Get-Location).Path + "\.git") {
            Write-Host "   Hapus: $($gitFolder.FullName)" -ForegroundColor Gray
            Remove-Item -Path $gitFolder.FullName -Recurse -Force
        }
    }
} else {
    Write-Host "   ✓ Tidak ada nested git ditemukan" -ForegroundColor Green
}

# 2. Hapus dari staging
Write-Host "📦 Membersihkan staging area..." -ForegroundColor Yellow
git rm -r --cached . 2>$null

# 3. Tambahkan semua file
Write-Host "➕ Menambahkan file ke git..." -ForegroundColor Yellow
git add .

# 4. Buat file .nojekyll jika belum ada
if (-not (Test-Path ".nojekyll")) {
    Write-Host "📄 Membuat file .nojekyll..." -ForegroundColor Yellow
    New-Item -ItemType File -Name ".nojekyll" -Force
    git add .nojekyll
}

# 5. Commit
Write-Host "💾 Commit perubahan..." -ForegroundColor Yellow
git commit -m "fix: clean repository structure - ready for GitHub Pages"

Write-Host "✅ Selesai!" -ForegroundColor Green
Write-Host "🚀 Sekarang push ke GitHub:" -ForegroundColor Cyan
Write-Host "   git push -u origin main --force" -ForegroundColor White