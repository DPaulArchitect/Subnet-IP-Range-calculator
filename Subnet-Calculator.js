<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AWS CIDR Range Calculator</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        .form-group {
            margin-bottom: 15px;
        }
        .result {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>AWS CIDR Range Calculator</h1>
    <div class="form-group">
        <label for="ipAddress">IP Address Range:</label>
        <input type="text" id="ipAddress" placeholder="e.g., 192.168.0.0/16">
    </div>
    <div class="form-group">
        <label for="subnetCount">Number of Subnets:</label>
        <select id="subnetCount">
            <!-- Options will be populated by JavaScript -->
        </select>
    </div>
    <div id="subnetInputs"></div>
    <button onclick="calculateCIDR()">Calculate CIDR Ranges</button>
    <div class="result" id="result"></div>

    <script>
        document.addEventListener("DOMContentLoaded", function() {
            const subnetCountSelect = document.getElementById("subnetCount");
            for (let i = 1; i <= 30; i++) {
                const option = document.createElement("option");
                option.value = i;
                option.textContent = i;
                subnetCountSelect.appendChild(option);
            }

            subnetCountSelect.addEventListener("change", function() {
                const count = parseInt(this.value);
                const subnetInputs = document.getElementById("subnetInputs");
                subnetInputs.innerHTML = '';
                for (let i = 1; i <= count; i++) {
                    const div = document.createElement("div");
                    div.className = "form-group";
                    div.innerHTML = `<label for="subnet${i}">IPs needed for Subnet ${i}:</label>
                                     <input type="number" id="subnet${i}" placeholder="e.g., 256" min="1" value="256">`;
                    subnetInputs.appendChild(div);
                }
            });
        });

        function calculateCIDR() {
            const ipAddress = document.getElementById("ipAddress").value;
            const subnetCount = parseInt(document.getElementById("subnetCount").value);
            const ipNeeds = [];
            for (let i = 1; i <= subnetCount; i++) {
                const ipNeed = parseInt(document.getElementById(`subnet${i}`).value);
                ipNeeds.push(ipNeed);
            }

            // Perform CIDR calculation 
            const results = calculateSubnetCIDRs(ipAddress, ipNeeds);

            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = "<h2>Calculated CIDR Ranges:</h2>";
            results.forEach((range, index) => {
                resultDiv.innerHTML += `<p>Subnet ${index + 1}: ${range}</p>`;
            });
        }

        function calculateSubnetCIDRs(ipAddress, ipNeeds) {
            return ipNeeds.map((ipNeed, index) => `${ipAddress.split('/')[0]}/${32 - Math.ceil(Math.log2(ipNeed))}`);
        }
    </script>
</body>
</html>
