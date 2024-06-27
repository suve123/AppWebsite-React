Write-Host "Running npm build..." -ForegroundColor Green
npm run build

Write-Host "Syncing build folder to S3..." -ForegroundColor Green
aws s3 sync build/ s3://v10d-customerportal-hosting

Write-Host "Invalidating CloudFront distribution..." -ForegroundColor Green
aws cloudfront create-invalidation --distribution-id E2BNBVLZGM9S95 --paths "/*"

Write-Host "Deployment complete." -ForegroundColor Green
