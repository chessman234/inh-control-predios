param(
  [int]$Puerto = 5173,
  [int]$TimeoutSegundos = 90
)

$limite = (Get-Date).AddSeconds($TimeoutSegundos)

while ((Get-Date) -lt $limite) {
  $escuchando = Get-NetTCPConnection -LocalPort $Puerto -State Listen -ErrorAction SilentlyContinue
  if ($escuchando) {
    exit 0
  }
  Start-Sleep -Milliseconds 400
}

Write-Host "[ERROR] El puerto $Puerto no respondio a tiempo."
exit 1
