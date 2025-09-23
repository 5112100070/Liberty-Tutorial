# Load Testing Using k6

## Installation
### RHEL 9
```
sudo dnf install -y --nogpgcheck https://dl.k6.io/rpm/repo.rpm
sudo dnf install -y k6
k6 version
```

### UBUNTU
```
sudo apt update
sudo apt install -y ca-certificates gnupg
curl -fsSL https://dl.k6.io/key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/k6-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt update
sudo apt install -y k6
```

### Ramp 0->4000 rps start from 0 to 4000 then hold 3 minute
```
k6 run -e PRE_VUS=1200 -e MAX_VUS=6000 -e INSECURE=true k6_4000rps_ramp_fixed.js
```
[example file](k6_4000rps_ramp.js)

### Constant on 8000 rps for 3 minute
```
k6 run -e PRE_VUS=1200 -e MAX_VUS=6000 -e INSECURE=true k6_4000rps_constant_fixed.js
```
[example file](k6_8000rps_constant.js)